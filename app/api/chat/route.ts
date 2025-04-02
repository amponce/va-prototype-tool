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
      
      IMPORTANT REQUIREMENTS:
      1. ALWAYS wrap your components with VAStylesProvider from "@/app/va-styles"
      2. NEVER use Tailwind CSS classes
      3. Use VA Design System classes instead (vads-u-*, vads-l-*, etc.)
      4. Use VA web components (va-button, va-alert, etc.) with the 'uswds' attribute
      5. Wrap content in VAContentContainer for proper layout
      
      Example structure:
      import { VAStylesProvider } from "@/app/va-styles";
      import { VAContentContainer } from "@/components/va-specific/va-content-container";
      import { VaButton, VaAlert } from "@department-of-veterans-affairs/component-library/dist/react-bindings";
      import "@department-of-veterans-affairs/component-library/dist/main.css";
      
      export default function App() {
        return (
          <VAStylesProvider>
            <VAContentContainer>
              <VaAlert status="info" visible uswds>
                <h2 slot="headline">Welcome</h2>
                <p>This is a VA-compliant component.</p>
              </VaAlert>
              <VaButton text="Click me" uswds />
            </VAContentContainer>
          </VAStylesProvider>
        );
      }
      
      Follow VA design guidelines and accessibility standards.
      ALWAYS include a default export or an App component in your code.`,
      async onFinish({ response }) {
        try {
          // Get the response content and ensure it's a string
          const responseContent = Array.isArray(response.messages[0].content)
            ? response.messages[0].content.map(part => 
                typeof part === 'string' ? part : JSON.stringify(part)
              ).join('\n')
            : typeof response.messages[0].content === 'string'
              ? response.messages[0].content
              : JSON.stringify(response.messages[0].content);

          // Extract code from the response
          const extractedCode = extractCodeFromMessage(responseContent);

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

