"use client"

import type React from "react"

import { useChat } from "ai/react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Send, PaperclipIcon, Code, Eye, Save, Undo } from "lucide-react"
import { getLatestAppState, type ExtendedMessage, type AppState } from "@/lib/chat-store"
import { VAHeader } from "@/components/va-header"
import { VAFooter } from "@/components/va-footer"
import { ImprovedCodeEditor } from "@/components/improved-code-editor"
import { extractCodeFromMessage } from "@/lib/code-extractor"

interface ChatProps {
  id: string
  initialMessages?: ExtendedMessage[]
  initialPrompt?: string
}

export default function Chat({ id, initialMessages = [], initialPrompt }: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const initialPromptSentRef = useRef(false)
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [hasChanges, setHasChanges] = useState(false)
  const [originalCode, setOriginalCode] = useState("")
  const [displayMessages, setDisplayMessages] = useState<ExtendedMessage[]>([])
  const [iframeKey, setIframeKey] = useState(0) // Add key to force iframe refresh

  // Initialize appState from initialMessages
  const [appState, setAppState] = useState<AppState>(() => {
    return getLatestAppState(initialMessages as ExtendedMessage[])
  })

  // Initialize code from appState
  const [code, setCode] = useState(appState.code || "")

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, append } = useChat({
    id,
    initialMessages,
    api: "/api/chat",
    body: {
      id,
    },
    onFinish: (message) => {
      // Extract code from the message
      const extractedCode = extractCodeFromMessage(message.content)

      if (extractedCode) {
        // Update code state
        setCode(extractedCode)
        setOriginalCode(extractedCode)
        setHasChanges(false)

        // Update appState
        const newAppState = {
          ...appState,
          code: extractedCode,
        }
        setAppState(newAppState)

        // Save to server
        saveAppState(newAppState)

        // Switch to preview tab to show the result
        setActiveTab("preview")

        // Force iframe refresh
        setIframeKey((prev) => prev + 1)
      }
    },
  })

  // Function to remove code blocks from message content
  const removeCodeBlocks = (content: string): string => {
    // Remove code blocks with language specifier
    let cleaned = content.replace(
      /```(?:jsx|tsx|javascript|typescript)[\s\S]*?```/g,
      "(Code has been moved to the code editor panel)",
    )

    // Remove any remaining code blocks
    cleaned = cleaned.replace(/```[\s\S]*?```/g, "(Code has been moved to the code editor panel)")

    return cleaned
  }

  // Save app state to server
  const saveAppState = async (updatedAppState: AppState) => {
    try {
      await fetch(`/api/chat/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appState: updatedAppState,
        }),
      })
    } catch (error) {
      console.error("Error saving app state:", error)
    }
  }

  // Update displayMessages when messages change
  useEffect(() => {
    const newDisplayMessages = messages.map((message) => {
      if (message.role === "assistant") {
        return {
          ...message,
          content: removeCodeBlocks(message.content),
        }
      }
      return message
    })

    setDisplayMessages(newDisplayMessages)
  }, [messages])

  // Handle initial prompt if provided
  useEffect(() => {
    if (initialPrompt && !initialPromptSentRef.current && messages.length === 0) {
      initialPromptSentRef.current = true
      append({
        role: "user",
        content: initialPrompt,
      })
    }
  }, [initialPrompt, append, messages.length])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      const newHeight = Math.min(textareaRef.current.scrollHeight, 150)
      textareaRef.current.style.height = `${newHeight}px`

      if (textareaRef.current.scrollHeight > 150) {
        textareaRef.current.style.overflowY = "auto"
      } else {
        textareaRef.current.style.overflowY = "hidden"
      }
    }
  }, [input])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [displayMessages])

  // Custom submit handler
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await handleSubmit(e)
    } catch (err) {
      console.error("Error submitting message:", err)
    }
  }

  // Handle code changes
  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    setHasChanges(true)
  }

  // Save changes
  const handleSave = async () => {
    try {
      // Update appState with new code
      const updatedAppState = {
        ...appState,
        code,
      }

      // Save to server
      await saveAppState(updatedAppState)

      setAppState(updatedAppState)
      setOriginalCode(code)
      setHasChanges(false)

      // Force iframe refresh
      setIframeKey((prev) => prev + 1)
    } catch (error) {
      console.error("Error saving changes:", error)
    }
  }

  // Revert changes
  const handleRevert = () => {
    setCode(originalCode)
    setHasChanges(false)
  }

  // Create HTML content for the iframe
  const createHtmlContent = () => {
    // Ensure we have a default export or App component
    let processedCode = code

    // If code doesn't have export default or function App, wrap it in a default export
    if (!code.includes("export default") && !code.includes("function App")) {
      processedCode = `
function App() {
  return (
    ${code}
  );
}

export default App;
      `
    }

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <script type="module" src="https://unpkg.com/@department-of-veterans-affairs/web-components/dist/va-components.esm.js"></script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/component-library/dist/main.css">
          <style>
            body { margin: 0; padding: 0; }
            #error-display {
              color: red;
              padding: 20px;
              font-family: monospace;
              white-space: pre-wrap;
              display: none;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <div id="error-display"></div>
          
          <script type="text/babel">
            try {
              ${processedCode}
              
              // Find the component to render
              let ComponentToRender;
              
              // Check for default export
              if (typeof App !== 'undefined') {
                ComponentToRender = App;
              } else {
                // Look for any exported component
                const moduleExports = Object.keys(window).filter(key => 
                  key.match(/^[A-Z]/) && typeof window[key] === 'function'
                );
                
                if (moduleExports.length > 0) {
                  ComponentToRender = window[moduleExports[0]];
                }
              }
              
              if (ComponentToRender) {
                ReactDOM.createRoot(document.getElementById('root')).render(
                  <React.StrictMode>
                    <ComponentToRender />
                  </React.StrictMode>
                );
              } else {
                throw new Error("No React component found to render");
              }
            } catch (error) {
              console.error("Rendering error:", error);
              const errorDisplay = document.getElementById('error-display');
              errorDisplay.style.display = 'block';
              errorDisplay.innerHTML = '<h2>Error rendering component</h2><pre>' + error.toString() + '</pre>';
            }
          </script>
        </body>
      </html>
    `
  }

  return (
    <div className="flex flex-col min-h-screen">
      <VAHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Section - 40% width */}
        <div className="w-2/5 flex flex-col border-r">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {displayMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${message.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}
              >
                <div className="whitespace-pre-wrap break-words">{message.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                <span>Generating response...</span>
              </div>
            )}
            {error && (
              <div className="bg-red-100 p-4 rounded-lg text-red-600">
                <p>Error: {error.message || "Something went wrong. Please try again."}</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={onSubmit} className="border-t p-4 flex items-center gap-2">
            <div className="relative flex-1">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Ask v0 to build something..."
                className="w-full border rounded-md py-3 px-4 pr-10 resize-none min-h-[50px] overflow-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                <PaperclipIcon className="h-5 w-5" />
              </button>
            </div>
            <Button type="submit" disabled={!input.trim() || isLoading} className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Preview/Code Section - 60% width */}
        <div className="w-3/5 flex flex-col">
          <div className="bg-gray-100 border-b">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">VA Prototyping</h2>
                <div className="flex items-center space-x-2">
                  {hasChanges && (
                    <>
                      <Button variant="outline" size="sm" onClick={handleRevert} className="flex items-center gap-1">
                        <Undo className="h-4 w-4" />
                        <span>Revert</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="bg-[#0071bc] hover:bg-[#205493] flex items-center gap-1"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Custom Tab Navigation */}
          <div className="bg-gray-100 border-b">
            <div className="container mx-auto">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-2 px-6 py-3 font-medium text-sm ${
                    activeTab === "preview" ? "bg-white text-gray-900" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-2 px-6 py-3 font-medium text-sm ${
                    activeTab === "code" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Code className="h-4 w-4" />
                  Code
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === "preview" && (
              <div className="bg-gray-100 flex-1 p-4">
                <div className="bg-white border rounded-md shadow-sm max-w-6xl mx-auto h-full">
                  {code ? (
                    <iframe
                      key={iframeKey} // Add key to force refresh
                      srcDoc={createHtmlContent()}
                      className="w-full h-full min-h-[600px] border-0"
                      title="Preview"
                      sandbox="allow-scripts"
                      onLoad={() => {
                        console.log("iframe loaded")
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-[600px] text-gray-500">
                      No preview available yet. Ask v0 to build something!
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "code" && (
              <div className="bg-gray-100 flex-1 p-4">
                <div className="bg-white border rounded-md shadow-sm max-w-7xl mx-auto p-6">
                  <ImprovedCodeEditor code={code} onChange={handleCodeChange} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <VAFooter />
    </div>
  )
}

