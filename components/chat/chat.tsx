"use client"

import type React from "react"

import { useChat } from "ai/react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Send, PaperclipIcon, Code, Eye, Save, Undo, ArrowDown } from "lucide-react"
import { getLatestAppState, type ExtendedMessage, type AppState } from "@/lib/chat-store"
import { VAHeader } from "@/components/va-specific/va-header"
import { VAFooter } from "@/components/va-specific/va-footer"
import { ImprovedCodeEditor } from "@/components/editors/improved-code-editor"
import { extractCodeFromMessage } from "@/lib/code-extractor"
import { DynamicComponentPreview } from "@/components/editors/dynamic-component-preview"

// Function to generate unique IDs for messages
function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

interface ChatProps {
  id: string
  initialMessages?: ExtendedMessage[]
  initialPrompt?: string
  promptId?: string
}

export default function Chat({ id, initialMessages = [], initialPrompt, promptId }: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const initialPromptSentRef = useRef(false)
  const promptRetrievalAttemptedRef = useRef(false)
  const [activeTab, setActiveTab] = useState<"preview" | "code">("code")
  const [hasChanges, setHasChanges] = useState(false)
  const [originalCode, setOriginalCode] = useState("")
  const [displayMessages, setDisplayMessages] = useState<ExtendedMessage[]>([])
  const [iframeKey, setIframeKey] = useState(0) // Add key to force iframe refresh
  const [isGeneratingCode, setIsGeneratingCode] = useState(false) // Track if code is being generated
  const [justCompletedGeneration, setJustCompletedGeneration] = useState(false) // Track if we just completed a generation
  const scrollContainerRef = useRef<HTMLDivElement>(null) // Ref for the scrollable chat container
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false); // Show suggested prompts
  const [autoScrollDisabled, setAutoScrollDisabled] = useState(false); // Enable auto-scroll by default for AI messages
  const [codeAlreadyProcessed, setCodeAlreadyProcessed] = useState(false); // Track if we've already processed code from this message
  const [apiErrorCount, setApiErrorCount] = useState(0);
  const maxApiErrors = 3; // Max number of API errors before stopping attempts
  const previousMessageRef = useRef<string | null>(null);

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
      // Skip code processing if there are API errors
      if (apiErrorCount >= maxApiErrors || error) {
        console.log("Skipping code processing due to API errors");
        setIsGeneratingCode(false);
        return;
      }
      
      // Skip if we're already processing or have processed this message
      if (codeAlreadyProcessed) {
        // Reset for next messages
        setCodeAlreadyProcessed(false);
        setIsGeneratingCode(false);
        return;
      }
      
      // Handle object content
      const messageContent = typeof message.content === 'string' 
        ? message.content 
        : typeof message.content === 'object' && message.content !== null
          ? JSON.stringify(message.content)
          : String(message.content);
      
      // Check if we've already seen this message content
      if (previousMessageRef.current === messageContent) {
        console.log("Skipping duplicate message content");
        setIsGeneratingCode(false);
        return;
      }
      
      // Store message content to avoid reprocessing
      previousMessageRef.current = messageContent;
      
      // Extract code from the message
      const extractedCode = extractCodeFromMessage(messageContent);

      if (extractedCode !== null) {
        try {
          // Mark that we've processed code from this message
          setCodeAlreadyProcessed(true);
          
          // Update code state
          setCode(extractedCode);
          setOriginalCode(extractedCode);
          setHasChanges(false);

          // Update appState
          const newAppState = {
            ...appState,
            code: extractedCode,
          };
          setAppState(newAppState);

          // Save to server
          saveAppState(newAppState).catch(err => {
            console.error("Error in saveAppState:", err);
            // Don't throw here - continue execution even if save fails
          });

          // Stay in code view and don't automatically switch to preview
          setActiveTab("code");
          
          // Create a unique ID for the summary message to ensure it doesn't get filtered
          const summaryMessageId = `summary_${Date.now()}`;
          
          // Add summary message after code generation
          const summaryMessage = generateSummary(extractedCode);
          console.log("Adding summary message:", summaryMessage);
          
          // Use timeout to separate the code message from the summary message
          setTimeout(() => {
            // Use direct append without error handling to add the summary
            append({
              id: summaryMessageId,
              content: summaryMessage,
              role: "assistant",
            });
            
            // Show suggestions after code is generated
            setShowSuggestions(true);
            
            // Mark as just completed for scrolling
            setJustCompletedGeneration(true);
          }, 1000);
        } catch (err) {
          console.error("Error processing code:", err);
        }
      } else {
        // No code was found, but still show suggestions after any assistant response completes
        setShowSuggestions(true);
      }
      
      // Always mark that we're no longer generating code
      setIsGeneratingCode(false);
    },
  })

  // Set activeTab to code when loading starts
  useEffect(() => {
    if (isLoading) {
      setActiveTab("code");
    }
  }, [isLoading]);

  // Function to remove code blocks from message content - memoized to prevent dependency changes
  const removeCodeBlocks = useCallback((content: any): string => {
    // Handle non-string content
    if (typeof content !== 'string') {
      return "I'm generating code based on your request. Please wait a moment...";
    }
    
    // Check if this is a generating or completed code message
    const hasCodeBlock = content.includes("```");
    const isGenerating = !content.trim().endsWith("```") && hasCodeBlock;
    
    // Keep the initial message visible before showing the generating message
    if (hasCodeBlock) {
      // If the message has other content before the code block, preserve it
      const textBeforeCodeBlock = content.split("```")[0].trim();
      if (textBeforeCodeBlock && textBeforeCodeBlock.length > 10) {
        if (isGenerating) {
          return textBeforeCodeBlock + "\n\nI'm generating code based on your request. You can watch the progress in the code panel...";
        } else {
          return textBeforeCodeBlock + "\n\nI've generated code for you! Check the code panel to view and edit it.";
        }
      }
      
      // Default messages if no meaningful text before code block
      return isGenerating 
        ? "I'm generating code based on your request. You can watch the progress in the code panel..." 
        : "I've generated code for you! Check the code panel to view and edit it.";
    }
    
    // If no code blocks, return the original content
    return content;
  }, []); // No dependencies means this function won't change

  // Memoized function to format messages for display
  const formatDisplayMessages = useCallback((messages: ExtendedMessage[]) => {
    return messages.map((message: ExtendedMessage) => {
      // Ensure each message has an id
      const messageWithId = {
        ...message,
        id: message.id || `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      };
      
      // Process assistant messages to remove code blocks
      if (messageWithId.role === "assistant") {
        return {
          ...messageWithId,
          content: removeCodeBlocks(messageWithId.content),
        };
      }
      
      return messageWithId;
    });
  }, [removeCodeBlocks]);

  // Update displayMessages when messages change - complete rewrite
  useEffect(() => {
    // Skip if we're in certain states to prevent loops
    if (apiErrorCount >= maxApiErrors) {
      return;
    }
    
    // Get processed messages
    const processedMessages = formatDisplayMessages(messages);
    
    // Handle duplicate generating messages
    let finalMessages = processedMessages;
    if (isGeneratingCode) {
      const generatingMessages = processedMessages.filter(
        (msg: ExtendedMessage) => msg.role === 'assistant' && 
        typeof msg.content === 'string' && 
        msg.content.includes("I'm generating code based on your request")
      );
      
      // Keep the first generating message, not just the last one
      if (generatingMessages.length > 1) {
        // Keep all non-generating messages
        const nonGeneratingMessages = processedMessages.filter(
          (msg: ExtendedMessage) => !(msg.role === 'assistant' && 
          typeof msg.content === 'string' && 
          msg.content.includes("I'm generating code based on your request"))
        );
        
        // Keep the first generating message instead of the last
        finalMessages = [
          ...nonGeneratingMessages,
          generatingMessages[0]
        ];
      }
    }
    
    // Check for summary messages in the processed messages
    const hasSummaryMessage = finalMessages.some(
      (msg: ExtendedMessage) => 
        msg.role === 'assistant' && 
        typeof msg.content === 'string' && 
        msg.content.includes("I've created a component based on your requirements")
    );
    
    // If we have a summary message, ensure suggestions are shown
    if (hasSummaryMessage && !showSuggestions) {
      setShowSuggestions(true);
    }
    
    setDisplayMessages(finalMessages);
  }, [messages, isGeneratingCode, isLoading, apiErrorCount, formatDisplayMessages, showSuggestions]);
  
  // Handle the initial prompt if provided
  useEffect(() => {
    if (initialPrompt && !initialPromptSentRef.current && !isLoading) {
      initialPromptSentRef.current = true
      append({
        id: generateUniqueId(),
        content: initialPrompt,
        role: "user",
      })
    }
  }, [initialPrompt, isLoading, append])
  
  // Save app state to server
  const saveAppState = async (updatedAppState: AppState) => {
    try {
      const response = await fetch(`/api/chat/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appState: updatedAppState,
        }),
      });
      
      if (!response.ok) {
        console.error(`Error saving app state: ${response.status} ${response.statusText}`);
        // Don't throw here - just log the error
      }
      
      return true;
    } catch (error) {
      console.error("Error saving app state:", error);
      // Don't throw - return false to indicate failure
      return false;
    }
  }
  
  // Fetch promptId from localStorage or sessionStorage if provided
  useEffect(() => {
    // Only run on client-side and if we haven't already sent or attempted to retrieve the prompt
    if (typeof window === 'undefined' || !promptId || initialPromptSentRef.current || promptRetrievalAttemptedRef.current) return;
    
    // Mark that we've attempted to retrieve the prompt
    promptRetrievalAttemptedRef.current = true;
    
    try {
      console.log(`Attempting to retrieve prompt with ID: ${promptId}`);
      
      // Check various storage options
      const storageOptions = [
        { type: 'localStorage with prefix', getItem: () => localStorage.getItem(`va_prompt_${promptId}`) },
        { type: 'sessionStorage with prefix', getItem: () => sessionStorage.getItem(`va_prompt_${promptId}`) },
        { type: 'localStorage direct', getItem: () => localStorage.getItem(promptId) },
        { type: 'sessionStorage direct', getItem: () => sessionStorage.getItem(promptId) }
      ];
      
      // Try each storage option
      for (const option of storageOptions) {
        try {
          const storedPromptJSON = option.getItem();
          
          if (storedPromptJSON) {
            console.log(`Found prompt in ${option.type}`);
            const storedPrompt = JSON.parse(storedPromptJSON);
            
            // Check if prompt has expired
            const now = Date.now();
            if (storedPrompt.expires && now > storedPrompt.expires) {
              console.log(`Prompt in ${option.type} has expired`);
              continue; // Try next storage option
            }
            
            // Use the prompt
            initialPromptSentRef.current = true;
            append({
              id: generateUniqueId(),
              content: storedPrompt.prompt,
              role: "user",
            });
            
            // Clean up all storage options
            try { localStorage.removeItem(`va_prompt_${promptId}`); } catch (e) {}
            try { sessionStorage.removeItem(`va_prompt_${promptId}`); } catch (e) {}
            try { localStorage.removeItem(promptId); } catch (e) {}
            try { sessionStorage.removeItem(promptId); } catch (e) {}
            
            console.log(`Successfully used prompt from ${option.type}`);
            return; // Exit the function after successfully using a prompt
          }
        } catch (error) {
          console.error(`Error with ${option.type}:`, error);
        }
      }
      
      // If we reach here, no valid prompt was found
      console.log(`No stored prompt found for ID: ${promptId}`);
      
    } catch (error) {
      console.error('Error retrieving prompt:', error);
    }
  }, [promptId, append]);

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

  // Enhanced scroll event handler to only show/hide scroll button
  const handleScroll = () => {
    // Only check if we need to show the scroll to bottom button
    const container = scrollContainerRef.current;
    if (container) {
      // If we're more than 300px from the bottom, show the button
      const distanceFromBottom = container.scrollHeight - container.clientHeight - container.scrollTop;
      setShowScrollToBottom(distanceFromBottom > 200);
    }
  };

  // Function to manually scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      
      // Initial check for the scroll button
      handleScroll();
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // Scroll to AI response when messages change
  useEffect(() => {
    // Only auto-scroll when not manually disabled and we have messages
    if (!autoScrollDisabled && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length, autoScrollDisabled]);

  // Auto-scroll when generation completes
  useEffect(() => {
    if (justCompletedGeneration) {
      scrollToBottom();
      setJustCompletedGeneration(false);
    }
  }, [justCompletedGeneration]);

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
      const saveResult = await saveAppState(updatedAppState);
      
      // Only update local state if save was successful or if we're in development mode
      // This ensures UI stays responsive even if server save fails
      setAppState(updatedAppState);
      setOriginalCode(code);
      setHasChanges(false);

      // Only force iframe refresh if we're in preview tab
      if (activeTab === "preview") {
        setIframeKey((prev) => prev + 1);
      }
      
      return saveResult;
    } catch (error) {
      console.error("Error saving changes:", error);
      // Don't throw - just return false
      return false;
    }
  }

  // Revert changes
  const handleRevert = () => {
    setCode(originalCode)
    setHasChanges(false)
  }

  // Force refresh when switching to preview tab
  useEffect(() => {
    if (activeTab === "preview") {
      // Only update iframeKey if it's the first time switching to preview
      // or if code has changed since last preview
      const codeChanged = hasChanges || code !== originalCode;
      if (codeChanged) {
        setIframeKey((prev) => prev + 1);
      }
    }
  }, [activeTab, code, hasChanges, originalCode]);

  // Function to generate a summary of what was created
  const generateSummary = (code: string) => {
    // Detect component types and structure from the code
    const hasVAAlert = code.includes('VaAlert') || code.includes('va-alert');
    const hasForm = code.includes('VaTextInput') || code.includes('va-text-input') || 
                    code.includes('VaSelect') || code.includes('va-select') ||
                    code.includes('VaCheckbox') || code.includes('va-checkbox');
    const hasButton = code.includes('VaButton') || code.includes('va-button');
    const hasStructure = code.includes('VAContentContainer') || code.includes('va-content-container');
    
    // Detect the component name if possible
    let componentName = "component";
    const componentMatch = code.match(/function\s+([A-Z][A-Za-z0-9_]*)/);
    if (componentMatch && componentMatch[1]) {
      componentName = componentMatch[1];
    }
    
    let summary = `I've created the ${componentName} based on your requirements. `;
    
    // Add specific details about what was implemented
    let details = [];
    
    if (hasStructure) {
      details.push("VA's content container for proper layout structure");
    }
    
    if (hasVAAlert) {
      details.push("alert components for displaying important information");
    }
    
    if (hasForm) {
      details.push("form elements for user input");
    }
    
    if (hasButton) {
      details.push("interactive buttons for user actions");
    }
    
    if (details.length > 0) {
      summary += "The implementation includes " + details.join(", ") + ". ";
    }
    
    summary += "You can see and edit the code in the Code panel, or switch to the Preview panel to see how it looks. ";
    summary += "Would you like me to enhance any aspect of this component?";
    
    return summary;
  }

  // Function to handle clicking a suggested prompt
  const handleSuggestedPrompt = (prompt: string) => {
    // Set the input field to the suggested prompt
    if (textareaRef.current) {
      textareaRef.current.value = prompt;
      
      // Trigger the onChange event handler
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
      
      // Update the input state directly
      handleInputChange({ target: { value: prompt } } as React.ChangeEvent<HTMLTextAreaElement>);
    }
    
    // Focus the textarea
    textareaRef.current?.focus();
  }

  // Update code as the stream progresses
  useEffect(() => {
    // Skip processing if we've hit max errors
    if (apiErrorCount >= maxApiErrors) {
      return;
    }
    
    if (isLoading && messages.length > 0) {
      // Get the latest message which should be the one being streamed
      const latestMessage = messages[messages.length - 1];
      
      if (latestMessage && latestMessage.role === 'assistant') {
        // Extract code blocks in progress
        const messageContent = typeof latestMessage.content === 'string'
          ? latestMessage.content
          : typeof latestMessage.content === 'object' && latestMessage.content !== null
            ? JSON.stringify(latestMessage.content)
            : String(latestMessage.content);
        
        // Prevent processing the same message content repeatedly
        if (previousMessageRef.current === messageContent) {
          return;
        }
        
        // Update previous message ref
        previousMessageRef.current = messageContent;
        
        // Check if message contains code block indicators
        if (messageContent.includes("```")) {
          // Set flag that we're generating code, but only if not already set
          if (!isGeneratingCode) {
            setIsGeneratingCode(true);
            // Reset the processed flag when starting a new code generation
            setCodeAlreadyProcessed(false);
          }
          
          // Try to extract partial code
          const partialCode = extractCodeFromMessage(messageContent);
          if (partialCode !== null) {
            // Update code in real-time as it streams
            setCode(partialCode);
            
            // Show code tab while generating
            if (activeTab !== "code") {
              setActiveTab("code");
            }
          }
        }
      }
    } else if (!isLoading && isGeneratingCode) {
      // Only reset the flag when loading completes
      setIsGeneratingCode(false);
      // Clear previous message ref 
      previousMessageRef.current = null;
    }
  }, [messages, isLoading, activeTab, isGeneratingCode, apiErrorCount]);

  useEffect(() => {
    // Clear API error count on successful completion
    if (!isLoading && !error) {
      setApiErrorCount(0);
    }
    
    // Increment error count if there's an error
    if (error && isLoading) {
      setApiErrorCount(prev => Math.min(prev + 1, maxApiErrors));
      console.log(`API error detected (${apiErrorCount + 1}/${maxApiErrors}): ${error.message}`);
      
      // If max errors reached, stop generation
      if (apiErrorCount >= maxApiErrors - 1) {
        setIsGeneratingCode(false);
        setCodeAlreadyProcessed(false);
        console.log("Max API errors reached, stopping generation attempts");
      }
    }
  }, [error, isLoading]);

  // Check for summary messages when loading completes
  useEffect(() => {
    // Only run this when loading just completed
    if (!isLoading && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      // Check if the last message contains a summary
      if (lastMessage.role === 'assistant' && 
          typeof lastMessage.content === 'string' && 
          lastMessage.content.includes("I've created a component based on your requirements")) {
        setShowSuggestions(true);
      }
      
      // If this was the last message in a code generation sequence
      if (lastMessage.role === 'assistant' && 
          typeof lastMessage.content === 'string' && 
          lastMessage.content.includes("```") && 
          lastMessage.content.endsWith("```")) {
        // There should be a summary message coming
        console.log("Code generation completed, summary message should follow");
        
        // Force a scroll to bottom
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 1200); // Slightly longer than the timeout for the summary message (1000ms)
      }
    }
  }, [isLoading, messages]);

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Minimized header with home navigation */}
      <div className="flex-shrink-0 h-12 min-h-12 bg-[#112e51] flex items-center px-4 justify-between">
        <div className="flex items-center">
          <a href="/" className="text-white font-semibold text-lg mr-6">VA Prototyping Tool</a>
          <a href="/" className="text-white hover:text-blue-200 text-sm mx-2">Home</a>
          <a href="/components" className="text-white hover:text-blue-200 text-sm mx-2">Components</a>
          <a href="/docs" className="text-white hover:text-blue-200 text-sm mx-2">Documentation</a>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Section - Scrollable */}
        <div className="w-[35%] flex flex-col border-r relative">
          <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollContainerRef}>
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
                <span>{isGeneratingCode ? "Generating code... Check the code panel to see progress." : "Generating response..."}</span>
              </div>
            )}
            {error && (
              <div className="bg-red-100 p-4 rounded-lg text-red-600">
                <p>Error: {error.message || "Something went wrong. Please try again."}</p>
              </div>
            )}
            
            {/* Suggested prompts */}
            {showSuggestions && !isLoading && messages.length > 0 && (
              <div className="border rounded-lg p-3 bg-white">
                <p className="text-sm font-medium mb-2 text-gray-700">Try asking:</p>
                <div className="flex flex-col gap-2">
                  <button 
                    className="text-left px-3 py-2 bg-gray-50 hover:bg-blue-50 rounded-md text-sm transition-colors text-gray-700"
                    onClick={() => handleSuggestedPrompt("Can you add a search filter to this component?")}
                  >
                    Can you add a search filter to this component?
                  </button>
                  <button 
                    className="text-left px-3 py-2 bg-gray-50 hover:bg-blue-50 rounded-md text-sm transition-colors text-gray-700"
                    onClick={() => handleSuggestedPrompt("Make the design more accessible by improving color contrast.")}
                  >
                    Make the design more accessible by improving color contrast.
                  </button>
                  <button 
                    className="text-left px-3 py-2 bg-gray-50 hover:bg-blue-50 rounded-md text-sm transition-colors text-gray-700"
                    onClick={() => handleSuggestedPrompt("Can you add responsive behavior for mobile devices?")}
                  >
                    Can you add responsive behavior for mobile devices?
                  </button>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Scroll to bottom button */}
          {showScrollToBottom && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-20 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg z-10 transition-all"
              aria-label="Scroll to bottom"
            >
              <ArrowDown className="h-5 w-5" />
            </button>
          )}

          <form onSubmit={onSubmit} className="border-t p-4 flex items-center gap-2 flex-shrink-0">
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

        {/* Preview/Code Section - Fixed */}
        <div className="w-[65%] flex flex-col h-full">
          {/* Header - Fixed */}
          <div className="bg-gray-100 border-b flex-shrink-0 py-1">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">VA Prototyping</h2>
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

          {/* Custom Tab Navigation - Fixed */}
          <div className="bg-gray-100 border-b flex-shrink-0">
            <div className="container mx-auto px-4">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-2 px-6 py-2 font-medium text-sm ${
                    activeTab === "preview" ? "bg-white text-gray-900" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  disabled={isGeneratingCode} // Disable preview tab while generating code
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-2 px-6 py-2 font-medium text-sm ${
                    activeTab === "code" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Code className="h-4 w-4" />
                  Code {isGeneratingCode && <span className="ml-1 animate-pulse">•</span>}
                </button>
              </div>
            </div>
          </div>

          {/* Content Area - Using full viewport calculation */}
          <div className="flex-1 h-full" style={{ height: "calc(100vh - 84px)" }}>
            {activeTab === "preview" && (
              <div className="h-full w-full bg-white overflow-auto">
                <DynamicComponentPreview code={code} />
              </div>
            )}

            {activeTab === "code" && (
              <div className="h-full w-full overflow-hidden">
                {/* Render the ImprovedCodeEditor here */}
                <ImprovedCodeEditor code={code} onChange={handleCodeChange} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Minimized footer - just 1 line instead of the full component */}
      <div className="flex-shrink-0 h-6 min-h-6 bg-[#112e51] text-white text-xs py-1 px-4 text-center">
        Official VA Prototyping Tool. For authorized use only.
      </div>
    </div>
  )
}
