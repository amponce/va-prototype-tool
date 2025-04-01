"use client"

import type React from "react"

import { useChat } from "ai/react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Send, PaperclipIcon, Code, Eye, Save, Undo } from "lucide-react"
import { getLatestAppState, type ExtendedMessage, type AppState } from "@/lib/chat-store"
import { VAHeader } from "@/components/va-specific/va-header"
import { VAFooter } from "@/components/va-specific/va-footer"
import { ImprovedCodeEditor } from "@/components/editors/improved-code-editor"
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
  const scrollContainerRef = useRef<HTMLDivElement>(null) // Ref for the scrollable chat container

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

  // Set activeTab to code when loading starts
  useEffect(() => {
    if (isLoading) {
      setActiveTab("code");
    }
  }, [isLoading]);

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

  // Scroll to bottom when messages change, conditionally
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      const isScrolledToBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 100 // 100px threshold
      if (isScrolledToBottom || messages.length <= 1) { // Scroll if near bottom or it's the first message
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [displayMessages, messages.length]) // Added messages.length dependency

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
    // Create a simplified version of the code that doesn't use imports/exports
    let processedCode = code;
    
    // Check if there's an existing import for the VA component library CSS 
    const hasVAImport = processedCode.includes("@department-of-veterans-affairs/component-library/dist/main.css");
    
    // Remove ALL import statements more aggressively
    processedCode = processedCode.replace(/^\s*import\s+.*?['"]\s*;?\s*$/gm, '');
    processedCode = processedCode.replace(/import\s+['"].*?['"]\s*;?\s*/g, '');
    
    // Remove export statements but keep the content
    processedCode = processedCode.replace(/^\s*export\s+default\s+/gm, '');
    processedCode = processedCode.replace(/^\s*export\s+/gm, '');
    
    // More thorough TypeScript type stripping
    processedCode = processedCode
      // Remove interface and type definitions
      .replace(/^\s*interface\s+[\w\s<>,]*\{[^}]*\}\s*$/gm, '')
      .replace(/^\s*type\s+[\w\s<>=,|&]*(?:=\s*\{[^}]*\})?;?\s*$/gm, '')
      // Remove type annotations in variable declarations (like React.FC, etc)
      .replace(/:\s*React\.FC(?:<[^>]*>)?\s*=/g, ' =')
      .replace(/:\s*React\.FC(?:<[^>]*>)?\s*\(/g, ' (')
      // More general TypeScript annotations replacements
      .replace(/:\s*[\w\[\].<>|&(),{}]+\s*(?==)/g, ' =')
      .replace(/:\s*[\w\[\].<>|&(),{}]+\s*(?=\()/g, ' ')
      .replace(/:\s*[\w\[\].<>|&(),{}]+\s*(?={)/g, ' ')
      // Remove generics in JSX and function calls
      .replace(/<([A-Z][A-Za-z0-9]*)<.*?>(?=[\s(])/g, '<$1')
      // Remove parameter type annotations
      .replace(/\(([^)]*)\)\s*:\s*[\w\[\].<>|&(),{}]+/g, '($1)')
      // Remove comments
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Look for React component pattern with improved regex
    const componentRegex = /(?:const|function|class|var|let)\s+([A-Z][A-Za-z0-9_]*)\s*(?:=\s*(?:\([^)]*\)\s*=>|\(\))|[({])/g;
    const matches = [...processedCode.matchAll(componentRegex)];
    let mainComponentName = 'App';
    
    if (matches.length > 0) {
      // Use the first capitalized component name found
      mainComponentName = matches[0][1];
      console.log(`Found component: ${mainComponentName}`);
    } else {
      // If no component is found, wrap the code in a component
      processedCode = `
function App() {
  return (
    <div className="va-app-container">
      ${processedCode}
    </div>
  );
}`;
      mainComponentName = 'App';
    }
    
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>VA Prototype Preview</title>
          
          <!-- React and ReactDOM -->
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          
          <!-- VA Components -->
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
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              background-color: white;
              color: red;
              padding: 20px;
              font-family: monospace;
              white-space: pre-wrap;
              z-index: 1000;
              overflow-y: auto;
              display: none;
            }
            
            /* VA components styling */
            va-button, va-alert, va-accordion, va-breadcrumbs {
              display: block;
            }
            
            /* VA Design System Utility Classes */
            .vads-u-margin-bottom--2 { margin-bottom: 16px !important; }
            .vads-u-margin-bottom--4 { margin-bottom: 32px !important; }
            .vads-u-margin-top--2 { margin-top: 16px !important; }
            .vads-u-margin-top--4 { margin-top: 32px !important; }
            .vads-u-font-size--h1 { font-size: 2.5rem !important; font-weight: 700 !important; }
            .vads-u-font-size--h2 { font-size: 1.93rem !important; font-weight: 700 !important; }
            
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
            
            .va-introtext {
              font-family: "Source Sans Pro", sans-serif;
              font-size: 1.25rem;
              font-weight: 400;
              line-height: 1.65;
              margin-top: 1rem;
              margin-bottom: 1rem;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <div id="error-display"></div>
          
          <script type="text/babel" data-presets="react,typescript">
            // Set up error handling
            window.onerror = function(message, source, lineno, colno, error) {
              console.error("Error in preview:", error);
              const errorDisplay = document.getElementById('error-display');
              if (errorDisplay) {
                errorDisplay.style.display = 'block';
                errorDisplay.innerHTML = '<h2>Error in preview</h2><pre>' + 
                  (error ? error.stack || error.toString() : message) + '</pre>';
              }
              return true;
            };

            // Make React and ReactDOM available globally in the script scope
            const { createElement, useState, useEffect, useRef, useCallback, useMemo } = React;

            // Predefine VA component references so they can be used in the code
            const VAHeader = (props) => createElement('va-header', props);
            const VAFooter = (props) => createElement('va-footer', props);
            const VAButton = (props) => createElement('va-button', props);
            const VAAlert = (props) => createElement('va-alert', props);
            const VAAccordion = (props) => createElement('va-accordion', props);
            const VAAccordionItem = (props) => createElement('va-accordion-item', props);
            const VATextInput = (props) => createElement('va-text-input', props);
            const VACheckbox = (props) => createElement('va-checkbox', props);
            const VARadio = (props) => createElement('va-radio', props);
            const VASelect = (props) => createElement('va-select', props);
            const VATextarea = (props) => createElement('va-textarea', props);
            
            // VAContentContainer component (commonly used)
            const VAContentContainer = (props) => {
              return createElement('div', { 
                className: 'vads-l-grid-container', 
                ...props 
              });
            };

            try {
              // Debug the processed code to see what we're trying to execute
              console.log("Executing code:", \`${processedCode}\`);
              
              // Execute the code from the editor
              ${processedCode}
              
              // Render the component (defensive check for existence)
              const container = document.getElementById('root');
              if (!container) throw new Error('Root container not found');
              
              // Check if the component actually exists
              if (typeof ${mainComponentName} === 'undefined') {
                throw new Error('Component ${mainComponentName} not found in the processed code');
              }
              
              ReactDOM.createRoot(container).render(
                React.createElement(${mainComponentName})
              );
            } catch (err) {
              console.error("Error rendering component:", err);
              const errorDisplay = document.getElementById('error-display');
              if (errorDisplay) {
                errorDisplay.style.display = 'block';
                errorDisplay.innerHTML = '<h2>Error rendering component</h2><pre>' + 
                  (err ? err.stack || err.toString() : 'Unknown error') + '</pre>';
              }
            }
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
            <div className="container mx-auto px-4">
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
          <div className="flex-1 overflow-y-auto">
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
              <div className="h-full p-1 bg-[#2563eb]">
                {/* Render the ImprovedCodeEditor here */}
                <ImprovedCodeEditor code={code} onChange={handleCodeChange} />
              </div>
            )}
          </div>
        </div>
      </div>

      <VAFooter />
    </div>
  )
}

