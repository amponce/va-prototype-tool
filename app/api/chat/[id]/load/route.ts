import { NextResponse } from "next/server"
import { loadChat } from "@/lib/storage"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 })
    }

    // Get the chat messages from file-based storage
    const messages = await loadChat(id)

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Error loading chat:", error)
    return NextResponse.json({ error: "Failed to load chat" }, { status: 500 })
  }
}

