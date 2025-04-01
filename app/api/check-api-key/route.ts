import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if the OPENAI_API_KEY environment variable is set
    const apiKey = process.env.OPENAI_API_KEY
    const isSet = !!apiKey

    // Check if the API key has the correct format
    const isValidFormat = typeof apiKey === "string" && apiKey ? apiKey.startsWith("sk-") && apiKey.length >= 20 : false

    return NextResponse.json({
      isSet,
      isValidFormat,
      message: isSet
        ? isValidFormat
          ? "API key is set and has the correct format."
          : "API key is set but may have an invalid format."
        : "API key is not set.",
    })
  } catch (error) {
    console.error("Error checking API key:", error)
    return NextResponse.json(
      {
        error: `Failed to check API key: ${error instanceof Error ? error.message : String(error)}`,
        isSet: false,
        isValidFormat: false,
      },
      { status: 500 },
    )
  }
}

