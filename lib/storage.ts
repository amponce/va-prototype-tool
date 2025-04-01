import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { Message } from "ai";

// Define the path to the storage file
const STORAGE_FILE_PATH = process.env.STORAGE_FILE_PATH || path.join(process.cwd(), 'data', 'chats.json');

// Use in-memory fallback when file system operations fail (e.g., in serverless environments)
let inMemoryStorage: { [chatId: string]: ChatMessage[] } = {};
let usingInMemory = false;

// Type definitions
// Type for our application state that includes code and preview state
export interface AppState {
  code: string
  previewVisible: boolean
  previewMode: "desktop" | "tablet" | "mobile"
  activeFile: string
  files: Record<string, string>
}

// Extended message type that includes app state
export interface ExtendedMessage extends Message {
  appState?: AppState
}

// Default app state
export const defaultAppState: AppState = {
  code: "",
  previewVisible: false,
  previewMode: "desktop",
  activeFile: "App.tsx",
  files: {
    "App.tsx": `import React from 'react';

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to VA Rapid Prototyping</h1>
        <p className="text-gray-600 mb-6 text-center">
          Start by describing what you want to build in the chat.
        </p>
      </div>
    </div>
  );
}`
  },
}

export interface ChatMessage {
  id: string;
  role: string;
  content: string;
  createdAt: string;
  appState?: AppState;
}

interface StorageData {
  [chatId: string]: ChatMessage[];
}

/**
 * Ensures the storage file and directory exist
 */
async function ensureStorageExists(): Promise<void> {
  try {
    const directory = path.dirname(STORAGE_FILE_PATH);
    
    // Check if directory exists, create if it doesn't
    try {
      await fs.access(directory);
    } catch (error: unknown) {
      await fs.mkdir(directory, { recursive: true });
    }
    
    // Check if file exists, create if it doesn't
    try {
      await fs.access(STORAGE_FILE_PATH);
    } catch (error: unknown) {
      await fs.writeFile(STORAGE_FILE_PATH, JSON.stringify({}), 'utf-8');
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn(`Using in-memory storage: ${errorMessage}`);
    usingInMemory = true;
  }
}

/**
 * Reads the storage file and returns its contents
 */
async function readStorage(): Promise<StorageData> {
  try {
    if (usingInMemory) {
      return inMemoryStorage;
    }
    
    await ensureStorageExists();
    const data = await fs.readFile(STORAGE_FILE_PATH, 'utf-8');
    return JSON.parse(data || '{}');
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn(`Reading from in-memory storage: ${errorMessage}`);
    usingInMemory = true;
    return inMemoryStorage;
  }
}

/**
 * Writes data to the storage file atomically
 */
async function writeStorage(data: StorageData): Promise<void> {
  if (usingInMemory) {
    inMemoryStorage = { ...data };
    return;
  }
  
  try {
    await ensureStorageExists();
    
    // Create a temporary file
    const tempFilePath = `${STORAGE_FILE_PATH}.temp`;
    
    // Write to temporary file
    await fs.writeFile(tempFilePath, JSON.stringify(data, null, 2), 'utf-8');
    
    // Atomically replace the original file with the temporary file
    await fs.rename(tempFilePath, STORAGE_FILE_PATH);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn(`Writing to in-memory storage: ${errorMessage}`);
    usingInMemory = true;
    inMemoryStorage = { ...data };
  }
}

/**
 * Creates a new chat with a unique ID
 */
export async function createChat(): Promise<string> {
  try {
    const id = uuidv4();
    const storage = await readStorage();
    
    // Initialize empty array for the new chat
    storage[id] = [];
    
    await writeStorage(storage);
    return id;
  } catch (error: unknown) {
    // Fallback to create an in-memory chat if storage fails
    const id = uuidv4();
    inMemoryStorage[id] = [];
    usingInMemory = true;
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Falling back to in-memory storage for chat creation: ${errorMessage}`);
    return id;
  }
}

/**
 * Saves chat messages for a specific chat ID
 */
export async function saveChat(id: string, messages: ChatMessage[]): Promise<void> {
  try {
    const storage = await readStorage();
    
    // Update or create the chat messages
    storage[id] = messages;
    
    await writeStorage(storage);
  } catch (error: unknown) {
    // Fallback to save in memory
    inMemoryStorage[id] = [...messages];
    usingInMemory = true;
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Falling back to in-memory storage for chat save: ${errorMessage}`);
  }
}

/**
 * Loads chat messages by chat ID
 */
export async function loadChat(id: string): Promise<ChatMessage[]> {
  try {
    const storage = await readStorage();
    
    // Return the chat messages or an empty array if not found
    return storage[id] || [];
  } catch (error: unknown) {
    // Fallback to load from memory
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Falling back to in-memory storage for chat load: ${errorMessage}`);
    return inMemoryStorage[id] || [];
  }
}

/**
 * Deletes a chat by ID
 */
export async function deleteChat(id: string): Promise<boolean> {
  try {
    const storage = await readStorage();
    
    // Check if the chat exists
    if (!storage[id]) {
      return false;
    }
    
    // Delete the chat
    delete storage[id];
    
    await writeStorage(storage);
    return true;
  } catch (error: unknown) {
    // Fallback to delete from memory
    if (inMemoryStorage[id]) {
      delete inMemoryStorage[id];
      return true;
    }
    return false;
  }
}

/**
 * Lists all chat IDs
 */
export async function listChats(): Promise<string[]> {
  try {
    const storage = await readStorage();
    return Object.keys(storage);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Falling back to in-memory storage for chat listing: ${errorMessage}`);
    return Object.keys(inMemoryStorage);
  }
}

/**
 * Get the latest app state from messages
 */
export function getLatestAppState(messages: ExtendedMessage[] | ChatMessage[]): AppState {
  for (let i = messages.length - 1; i >= 0; i--) {
    const appState = messages[i].appState;
    if (appState) {
      return appState;
    }
  }
  return defaultAppState;
}
