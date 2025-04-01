import { NextResponse } from "next/server"
import { createChat } from "@/lib/storage"

export async function POST(request: Request) {
  try {
    // Generate a new unique ID for the chat
    const id = await createChat()
    
    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error("Error creating chat:", error)
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 })
  }
}
