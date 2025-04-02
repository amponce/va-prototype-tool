import { NextResponse } from "next/server"
import { getLargePrompt } from "@/lib/storage"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 })
    }

    // Get the large prompt from storage
    const prompt = await getLargePrompt(id)

    if (!prompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 })
    }

    return NextResponse.json({ prompt })
  } catch (error) {
    console.error("Error retrieving prompt:", error)
    return NextResponse.json({ error: "Failed to retrieve prompt" }, { status: 500 })
  }
} 