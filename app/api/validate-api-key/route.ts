import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if the OPENAI_API_KEY environment variable is set
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        valid: false,
        error: "API key is not set",
      })
    }

    // Simple validation without using the OpenAI client
    // This avoids the toLowerCase() error
    if (typeof apiKey !== "string" || !apiKey.startsWith("sk-") || apiKey.length < 20) {
      return NextResponse.json({
        valid: false,
        error: "Invalid API key format. OpenAI API keys should start with 'sk-' and be at least 20 characters long.",
      })
    }

    // Since we can't reliably test the API key without making an API call,
    // we'll just assume it's valid if it has the correct format
    return NextResponse.json({
      valid: true,
      message: "API key format is valid. Note: This doesn't guarantee the key will work with OpenAI.",
    })
  } catch (error) {
    console.error("Error in validate-api-key route:", error)
    return NextResponse.json(
      {
        valid: false,
        error: "Internal server error while validating API key",
      },
      { status: 500 },
    )
  }
}

