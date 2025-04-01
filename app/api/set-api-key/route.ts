import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { apiKey } = body

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required", success: false }, { status: 400 })
    }

    // Validate that the API key has the correct format
    if (typeof apiKey !== "string" || !apiKey.startsWith("sk-") || apiKey.length < 20) {
      return NextResponse.json(
        {
          error: "Invalid API key format. OpenAI API keys should start with 'sk-' and be at least 20 characters long.",
          success: false,
        },
        { status: 400 },
      )
    }

    // Set the API key in the environment
    process.env.OPENAI_API_KEY = apiKey

    // In a real application, you might update a .env file or use a secret manager
    try {
      const envFilePath = path.join(process.cwd(), ".env.local")
      let envContent = ""

      if (fs.existsSync(envFilePath)) {
        envContent = fs.readFileSync(envFilePath, "utf8")

        // Replace existing OPENAI_API_KEY or add it if it doesn't exist
        if (envContent.includes("OPENAI_API_KEY=")) {
          envContent = envContent.replace(/OPENAI_API_KEY=.*(\r?\n|$)/g, `OPENAI_API_KEY=${apiKey}$1`)
        } else {
          envContent += `\nOPENAI_API_KEY=${apiKey}\n`
        }
      } else {
        envContent = `OPENAI_API_KEY=${apiKey}\n`
      }

      fs.writeFileSync(envFilePath, envContent)
      console.log("API key successfully saved to .env.local file")
    } catch (error) {
      console.error("Error updating .env.local file:", error)
      // Continue even if we couldn't update the file
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error setting API key:", error)
    return NextResponse.json(
      {
        error: `Failed to set API key: ${error instanceof Error ? error.message : String(error)}`,
        success: false,
      },
      { status: 500 },
    )
  }
}

