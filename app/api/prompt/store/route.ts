import { NextResponse } from "next/server"
import { storeLargePrompt } from "@/lib/storage"

export async function POST(request: Request) {
  try {
    const { id, prompt } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 })
    }

    if (!prompt) {
      return NextResponse.json({ error: "Prompt text is required" }, { status: 400 })
    }

    // Store the large prompt
    await storeLargePrompt(id, prompt)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error storing prompt:", error)
    return NextResponse.json({ error: "Failed to store prompt" }, { status: 500 })
  }
} 