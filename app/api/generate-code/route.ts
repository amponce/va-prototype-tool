import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Check if API key is set
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "OpenAI API key is not set. Please set your API key in the API Key Setup section.",
        },
        { status: 400 },
      )
    }

    // Validate API key format
    if (typeof apiKey !== "string" || !apiKey.startsWith("sk-") || apiKey.length < 20) {
      return NextResponse.json(
        {
          error: "Invalid API key format. OpenAI API keys should start with 'sk-' and be at least 20 characters long.",
        },
        { status: 400 },
      )
    }

    try {
      // Make a direct fetch request to OpenAI API instead of using the client
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are an AI assistant that generates React code using the VA Design System web components.
              
              Use the official VA web components like:
              - va-button
              - va-alert
              - va-accordion
              - va-text-input
              - va-checkbox
              - va-radio
              - va-select
              - va-card
              - va-breadcrumbs
              - va-additional-info
              - va-table
              
              Always wrap your components in a VAContentContainer component to ensure proper styling.
              Always include the 'uswds' attribute on components that support it.
              Follow VA design guidelines for spacing, typography, and color.
              Ensure all components are accessible.
              
              Return ONLY the React component code without any explanation.`,
            },
            {
              role: "user",
              content: `Generate a React component using VA Design System components for: ${prompt}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      const generatedCode = data.choices[0]?.message?.content || ""

      return NextResponse.json({ code: generatedCode })
    } catch (error: any) {
      console.error("OpenAI API error:", error)

      return NextResponse.json(
        {
          error: `Failed to generate code: ${error.message || "Unknown error"}`,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error generating code:", error)
    return NextResponse.json(
      {
        error: `Failed to generate code: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}

