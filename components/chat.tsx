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
      // Handle object content
      const messageContent = typeof message.content === 'string' 
        ? message.content 
        : typeof message.content === 'object' && message.content !== null
          ? JSON.stringify(message.content)
          : String(message.content);
          
      // Extract code from the message
      const extractedCode = extractCodeFromMessage(messageContent)

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

        // Show code first, then automatically switch to preview after a delay
        setActiveTab("code")
        
        // Force iframe refresh
        setIframeKey((prev) => prev + 1)
        
        // Switch to preview after a short delay to allow the iframe to load
        setTimeout(() => {
          // Force another iframe refresh before showing
          setIframeKey((prev) => prev + 1)
          setActiveTab("preview")
          
          // Add another refresh after showing preview to ensure content is displayed
          setTimeout(() => {
            setIframeKey((prev) => prev + 1)
          }, 300)
        }, 800)
      }
    },
  })

  // Function to remove code blocks from message content
  const removeCodeBlocks = (content: any): string => {
    // Handle non-string content
    if (typeof content !== 'string') {
      return "I've generated code for you! Check the code panel to view and edit it.";
    }
    
    // Remove all code blocks with more aggressive approach
    let cleaned = content;
    
    // Check if the content contains code blocks
    if (content.includes("```")) {
      // Replace the entire content with a simpler message
      return "I've generated code for you! Check the code panel to view and edit it.";
    }
    
    return cleaned;
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
      // Ensure each message has an id
      if (!message.id) {
        message.id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      }
      
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
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>VA Prototype Preview</title>
          
          <!-- React -->
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          
          <!-- VA Components and Styles -->
          <script src="https://unpkg.com/@department-of-veterans-affairs/web-components/dist/va-components.js"></script>
          <link rel="stylesheet" href="https://unpkg.com/@department-of-veterans-affairs/formation/dist/formation.min.css">
          <link rel="stylesheet" href="https://unpkg.com/@department-of-veterans-affairs/component-library/dist/main.css">
          
          <!-- Tailwind CSS -->
          <script src="https://cdn.tailwindcss.com"></script>
          
          <!-- Font Awesome -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
          
          <style>
            html, body { 
              margin: 0; 
              padding: 0; 
              font-family: 'Source Sans Pro', sans-serif;
              background-color: white;
              height: 100%;
              width: 100%;
            }
            
            #root {
              min-height: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
            }
            
            #error-display {
              color: red;
              padding: 20px;
              font-family: monospace;
              white-space: pre-wrap;
              display: none;
            }
            
            /* Ensure VA components are properly displayed */
            va-button, va-alert {
              display: block;
            }
            
            /* VA Design System Utility Classes */
            .vads-u-margin-bottom--2 {
              margin-bottom: 16px !important;
            }
            
            .vads-u-margin-bottom--4 {
              margin-bottom: 32px !important;
            }
            
            .vads-u-margin-top--2 {
              margin-top: 16px !important;
            }
            
            .vads-u-margin-top--4 {
              margin-top: 32px !important;
            }
            
            .vads-u-font-size--h1 {
              font-size: 2.5rem !important;
              font-weight: 700 !important;
            }
            
            .vads-u-font-size--h2 {
              font-size: 1.93rem !important;
              font-weight: 700 !important;
            }
            
            .vads-l-grid-container {
              max-width: 1440px;
              margin-left: auto;
              margin-right: auto;
              padding-left: 1rem;
              padding-right: 1rem;
            }
            
            .vads-l-row {
              display: flex;
              flex-wrap: wrap;
              margin-left: -1rem;
              margin-right: -1rem;
            }
            
            .vads-l-col {
              flex: 0 0 100%;
              padding-left: 1rem;
              padding-right: 1rem;
            }
            
            .vads-l-col--12 {
              flex: 0 0 100%;
              max-width: 100%;
              padding-left: 1rem;
              padding-right: 1rem;
            }
            
            @media (min-width: 768px) {
              .medium-screen\\:vads-l-col--8 {
                flex: 0 0 66.66667%;
                max-width: 66.66667%;
              }
            }
            
            .va-introtext {
              font-family: "Source Sans Pro", sans-serif;
              font-size: 1.25rem;
              font-weight: 400;
              line-height: 1.65;
              margin-top: 1rem;
              margin-bottom: 1rem;
            }
            
            /* Alert Styles */
            .usa-alert {
              background-color: #f3f3f4;
              border-left: 0.25rem solid #a6aaad;
              padding: 16px;
              position: relative;
            }
            
            .usa-alert--info {
              background-color: #e7f6f8;
              border-left-color: #00bde3;
            }
            
            .usa-alert__body {
              padding-left: 24px;
            }
            
            .usa-alert__heading {
              font-family: "Source Sans Pro", sans-serif;
              margin-top: 0;
              margin-bottom: 8px;
              font-size: 1.17rem;
              font-weight: 700;
              color: #323a45;
            }
            
            .usa-alert__text {
              margin-bottom: 0;
              margin-top: 0;
              font-family: "Source Sans Pro", sans-serif;
            }
            
            /* Button Styles */
            .usa-button {
              background-color: #0071bc;
              color: white;
              border-radius: 5px;
              border: none;
              cursor: pointer;
              font-weight: 700;
              font-family: "Source Sans Pro", sans-serif;
              padding: 10px 20px;
              text-decoration: none;
              display: inline-block;
              font-size: 1rem;
              line-height: 1.5;
            }
            
            .usa-button:hover {
              background-color: #205493;
            }
            
            /* Initialize VA Custom Elements */
            va-breadcrumbs {
              display: block;
              margin: 1rem 0;
            }
            
            /* Main container for VA content */
            .va-sandbox {
              padding: 1rem 0;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <div id="error-display"></div>
          
          <script type="text/babel">
            // Create the VaBreadcrumbs component
            function VaBreadcrumbs(props) {
              // Simple breadcrumbs component to mimic the VA component library
              return React.createElement('va-breadcrumbs', {
                'breadcrumb-list': JSON.stringify(props.breadcrumbList),
                'label': props.label || 'Breadcrumb'
              });
            }
            
            // Create the VaContentSandbox component that mimics the one in your app
            function VaContentSandbox(props) {
              const breadcrumbs = props.breadcrumbs || [
                { href: "/", label: "VA.gov home" },
                { href: "#", label: "Current page" },
              ];
              
              return (
                <div className="va-sandbox" style={{ minHeight: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div className="vads-l-grid-container">
                    <div className="vads-l-row">
                      <div className="vads-l-col">
                        <VaBreadcrumbs breadcrumbList={breadcrumbs} label="Breadcrumb" />
                      </div>
                    </div>
                  </div>

                  <div className="vads-l-grid-container" style={{ flex: "1" }}>
                    <div className="vads-l-row">
                      <div className="vads-l-col--12 medium-screen:vads-l-col--8">
                        {props.title && <h1 className="vads-u-font-size--h1 vads-u-margin-bottom--2">{props.title}</h1>}
                        {props.children}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            // Initialize VA components
            function initVAComponents() {
              if (typeof customElements !== 'undefined' && customElements.get) {
                if (!customElements.get('va-breadcrumbs')) {
                  console.log('VA components initializing...');
                }
              }
            }
            
            initVAComponents();
            
            // The actual code to render
            ${processedCode}
            
            // Render the content inside a VaContentSandbox
            function renderContent() {
              try {
                const container = document.getElementById('root');
                
                // Add styles to the container
                if (container) {
                  container.style.height = '100%';
                  container.style.minHeight = '600px';
                  container.style.display = 'flex';
                  container.style.flexDirection = 'column';
                }
                
                // First check for a custom component in the code
                if (typeof App !== 'undefined') {
                  ReactDOM.createRoot(container).render(
                    <div style={{ height: '100%', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                      <App />
                    </div>
                  );
                } else if (typeof SingleColumnLayout !== 'undefined') {
                  ReactDOM.createRoot(container).render(
                    <div style={{ height: '100%', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                      <SingleColumnLayout />
                    </div>
                  );
                } else if (typeof default_1 !== 'undefined') {
                  ReactDOM.createRoot(container).render(
                    <div style={{ height: '100%', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                      <default_1 />
                    </div>
                  );
                } else {
                  // If no component found, wrap the content in a VaContentSandbox
                  const directContent = (
                    <VaContentSandbox title="VA Prototype">
                      <div dangerouslySetInnerHTML={{ __html: \`${code.replace(/`/g, '\\`')}\` }} />
                    </VaContentSandbox>
                  );
                  ReactDOM.createRoot(container).render(directContent);
                }
              } catch (error) {
                console.error("Rendering error:", error);
                document.getElementById('error-display').style.display = 'block';
                document.getElementById('error-display').innerHTML = 
                  '<h2>Error rendering component</h2><pre>' + error.toString() + '</pre>';
              }
            }
            
            // Render with a delay to ensure components are registered
            setTimeout(renderContent, 250);
          </script>
        </body>
      </html>
    `;
  }

  // Force refresh when switching to preview tab
  useEffect(() => {
    if (activeTab === "preview") {
      // Force iframe refresh when switching to preview tab
      setIframeKey((prev) => prev + 1)
    }
  }, [activeTab])

  return (
    <div className="flex flex-col min-h-screen">
      <VAHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Section - 40% width */}
        <div className="w-2/5 flex flex-col border-r">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {displayMessages.map((message, index) => (
              <div
                key={message.id || `message-${index}`}
                className={`p-4 rounded-lg ${message.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}
              >
                <div className="whitespace-pre-wrap break-words">
                  {typeof message.content === 'string' 
                    ? message.content 
                    : typeof message.content === 'object' && message.content !== null 
                      ? JSON.stringify(message.content) 
                      : String(message.content)
                  }
                </div>
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
                placeholder="Ask VA agent to build something..."
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
              <div className="bg-gray-100 flex-1 p-4 h-full" style={{ height: 'calc(100vh - 180px)', minHeight: '600px' }}>
                <div className="bg-white border rounded-md shadow-sm max-w-6xl mx-auto h-full" style={{ height: '100%' }}>
                  {code ? (
                    <iframe
                      key={iframeKey} // Add key to force refresh
                      srcDoc={createHtmlContent()}
                      className="w-full border-0 bg-white"
                      style={{ 
                        height: '100%',
                        width: '100%',
                        display: 'block'
                      }} 
                      title="VA Prototype Preview"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
                      loading="eager"
                      referrerPolicy="origin"
                      onLoad={() => {
                        console.log("iframe loaded")
                        try {
                          const iframe = document.querySelector('iframe');
                          if (iframe) {
                            // Set precise dimensions to match the container
                            iframe.style.height = '100%';
                            iframe.style.width = '100%';
                            iframe.style.display = 'block';
                            
                            // Try to access iframe content directly to apply styles
                            try {
                              const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
                              if (iframeDocument) {
                                // Ensure proper body styling
                                iframeDocument.body.style.margin = '0';
                                iframeDocument.body.style.padding = '0';
                                iframeDocument.body.style.backgroundColor = 'white';
                                iframeDocument.body.style.height = '100%';
                                
                                // Add specific VA classes to match the single layout page
                                iframeDocument.body.classList.add('vads-u-font-family--sans');
                                
                                // Ensure root container takes full height
                                const rootEl = iframeDocument.getElementById('root');
                                if (rootEl instanceof HTMLElement) {
                                  rootEl.style.height = '100%';
                                  rootEl.style.minHeight = '600px';
                                }
                                
                                // Force styles for containers if needed
                                const containers = iframeDocument.querySelectorAll('.vads-l-grid-container');
                                if (containers.length) {
                                  Array.from(containers).forEach((container: Element) => {
                                    if (container instanceof HTMLElement) {
                                      container.style.maxWidth = '1440px';
                                      container.style.marginLeft = 'auto';
                                      container.style.marginRight = 'auto';
                                      container.style.paddingLeft = '1rem';
                                      container.style.paddingRight = '1rem';
                                    }
                                  });
                                }
                              }
                            } catch (domError) {
                              console.warn("Could not access iframe DOM:", domError);
                            }
                          }
                        } catch (e) {
                          console.error("Error after iframe load:", e);
                        }
                      }}
                      onError={(e) => {
                        console.error("Iframe error:", e);
                        setTimeout(() => {
                          setIframeKey((prev) => prev + 1);
                        }, 1000);
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-[600px] text-gray-500">
                      No preview available yet. Ask VA agent to build something!
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

