import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { saveChat } from "@/lib/chat-store"
import { defaultAppState } from "@/lib/chat-store"
import { extractCodeFromMessage } from "@/lib/code-extractor"
import type { ExtendedMessage } from "@/lib/chat-store"

export async function POST(req: Request) {
  try {
    const { messages, id } = await req.json()

    // Extract the last user message to analyze for code generation requests
    const lastUserMessage =
      messages.length > 0 && messages[messages.length - 1].role === "user" ? messages[messages.length - 1].content : ""

    // Check if the message is asking for code generation
    const isCodeRequest = /build|create|generate|make|design|implement|code|develop/i.test(lastUserMessage)

    const result = streamText({
      model: openai("gpt-4o"),
      messages,
      system: `You are a VA application development assistant. Help users build VA-compliant applications.
      When users ask you to build, create, or generate something, provide working React code.
      Format your code responses using markdown code blocks with the appropriate language.
      For React components, use TypeScript and Tailwind CSS.
      Follow VA design guidelines and accessibility standards.
      Use VA web components when appropriate (va-button, va-alert, etc.).
      ALWAYS include a default export or an App component in your code.`,
      async onFinish({ response }) {
        try {
          // Get the response content
          // Get the response content
          const responseContent = response.messages[0].content

          // Extract code from the response, ensuring content is a string
          const extractedCode = typeof responseContent === 'string' 
            ? extractCodeFromMessage(responseContent)
            : ''
          // Create app state with the extracted code
          const appState = {
            ...defaultAppState,
            code: extractedCode || defaultAppState.code,
          }

          // Create extended messages array
          const extendedMessages: ExtendedMessage[] = [...messages]

          // Add the assistant message with appState
          extendedMessages.push({
            id: response.messages[0].id,
            role: "assistant",
            content: responseContent,
            appState,
          })

          // Save the chat with the updated messages
          await saveChat({
            id,
            messages: extendedMessages,
          })
        } catch (error) {
          console.error("Failed to save chat:", error)
        }
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API route:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

