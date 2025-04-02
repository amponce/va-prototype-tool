import { NextResponse } from "next/server"
import { loadChat, saveChat } from "@/lib/storage"
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await Promise.resolve(params)

    // Get the chat messages from file storage
    const messages = await loadChat(id)
    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Error loading chat:", error)
    return NextResponse.json({ error: "Failed to load chat" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await Promise.resolve(params)
    const { appState } = await request.json()

    // Get the current messages from file storage
    const messages = await loadChat(id)
    // Find the last assistant message and update its appState
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") {
        messages[i].appState = {
          ...(messages[i].appState || {}),
          ...appState,
        }
        break
      }
    }

    // Save the updated messages to file storage
    await saveChat(id, messages)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating app state:", error)
    return NextResponse.json({ error: "Failed to update app state" }, { status: 500 })
  }
}

