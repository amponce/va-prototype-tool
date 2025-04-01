import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { Message } from "ai";

// Define the path to the storage file
const STORAGE_FILE_PATH = process.env.STORAGE_FILE_PATH || path.join(process.cwd(), 'data', 'chats.json');

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
    } catch (error) {
      await fs.mkdir(directory, { recursive: true });
    }
    
    // Check if file exists, create if it doesn't
    try {
      await fs.access(STORAGE_FILE_PATH);
    } catch (error) {
      await fs.writeFile(STORAGE_FILE_PATH, JSON.stringify({}), 'utf-8');
    }
  } catch (error) {
    throw new Error(`Failed to ensure storage exists: ${error.message}`);
  }
}

/**
 * Reads the storage file and returns its contents
 */
async function readStorage(): Promise<StorageData> {
  try {
    await ensureStorageExists();
    const data = await fs.readFile(STORAGE_FILE_PATH, 'utf-8');
    return JSON.parse(data || '{}');
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Handle JSON parse error
      throw new Error(`Storage file contains invalid JSON: ${error.message}`);
    }
    throw new Error(`Failed to read storage: ${error.message}`);
  }
}

/**
 * Writes data to the storage file atomically
 */
async function writeStorage(data: StorageData): Promise<void> {
  try {
    await ensureStorageExists();
    
    // Create a temporary file
    const tempFilePath = `${STORAGE_FILE_PATH}.temp`;
    
    // Write to temporary file
    await fs.writeFile(tempFilePath, JSON.stringify(data, null, 2), 'utf-8');
    
    // Atomically replace the original file with the temporary file
    await fs.rename(tempFilePath, STORAGE_FILE_PATH);
  } catch (error) {
    throw new Error(`Failed to write to storage: ${error.message}`);
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
  } catch (error) {
    throw new Error(`Failed to create chat: ${error.message}`);
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
  } catch (error) {
    throw new Error(`Failed to save chat: ${error.message}`);
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
  } catch (error) {
    throw new Error(`Failed to load chat: ${error.message}`);
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
  } catch (error) {
    throw new Error(`Failed to delete chat: ${error.message}`);
  }
}

/**
 * Lists all chat IDs
 */
export async function listChats(): Promise<string[]> {
  try {
    const storage = await readStorage();
    return Object.keys(storage);
  } catch (error) {
    throw new Error(`Failed to list chats: ${error.message}`);
  }
}

/**
 * Get the latest app state from messages
 */
export function getLatestAppState(messages: ExtendedMessage[] | ChatMessage[]): AppState {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].appState) {
      return messages[i].appState;
    }
  }
  return defaultAppState;
}
