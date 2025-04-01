import type { Message } from "ai"

// Add a function to generate unique IDs
function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

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
}`,
  },
}

// Create a new chat
export async function createChat(): Promise<string> {
  try {
    const id = generateUniqueId()

    // Get the base URL for API requests
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"

    // Use absolute URL for API request
    const response = await fetch(`${baseUrl}/api/chat/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      throw new Error("Failed to create chat")
    }

    return id
  } catch (error) {
    console.error("Error creating chat:", error)
    throw new Error("Failed to create chat")
  }
}

// Load chat messages
export async function loadChat(id: string): Promise<ExtendedMessage[]> {
  try {
    // Get the base URL for API requests
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"

    // Use absolute URL for API request
    const response = await fetch(`${baseUrl}/api/chat/${id}/load`)

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data.messages || []
  } catch (error) {
    console.error("Error loading chat:", error)
    return []
  }
}

// Save chat messages
export async function saveChat({
  id,
  messages,
}: {
  id: string
  messages: ExtendedMessage[]
}): Promise<void> {
  try {
    // Get the base URL for API requests
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"

    // Use absolute URL for API request
    const response = await fetch(`${baseUrl}/api/chat/${id}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) {
      throw new Error("Failed to save chat")
    }
  } catch (error) {
    console.error("Error saving chat:", error)
    throw new Error("Failed to save chat")
  }
}

// Update app state in the last assistant message
export async function updateAppState({
  id,
  appState,
}: {
  id: string
  appState: Partial<AppState>
}): Promise<void> {
  try {
    const messages = await loadChat(id)

    // Find the last assistant message
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") {
        messages[i].appState = {
          ...(messages[i].appState || defaultAppState),
          ...appState,
        }
        break
      }
    }

    await saveChat({ id, messages })
  } catch (error) {
    console.error("Error updating app state:", error)
    throw new Error("Failed to update app state")
  }
}

// Get the latest app state from messages
export function getLatestAppState(messages: ExtendedMessage[]): AppState {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].appState) {
      return messages[i].appState
    }
  }
  return defaultAppState
}

