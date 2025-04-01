import { NextResponse } from "next/server"
import { saveChat } from "@/lib/storage"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { messages } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 })
    }

    if (!messages) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 })
    }

    // Store the messages in file-based storage
    await saveChat(id, messages)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving chat:", error)
    return NextResponse.json({ error: "Failed to save chat" }, { status: 500 })
  }
}

