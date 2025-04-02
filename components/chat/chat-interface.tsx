"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send, Maximize, PaperclipIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { createChat } from "@/lib/chat-store"

export function ChatInterface() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isApiKeySet, setIsApiKeySet] = useState(false)
  const [isCheckingApiKey, setIsCheckingApiKey] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  // Check if API key is set
  useEffect(() => {
    const checkApiKey = async () => {
      try {
        setIsCheckingApiKey(true)

        // Simple check if API key is set
        const response = await fetch("/api/check-api-key")
        const data = await response.json()

        setIsApiKeySet(data.isSet && data.isValidFormat)
      } catch (error) {
        console.error("Error checking API key:", error)
        setIsApiKeySet(false)
      } finally {
        setIsCheckingApiKey(false)
      }
    }

    checkApiKey()
  }, [])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto"

      // Set the height to scrollHeight to fit the content
      const newHeight = Math.min(textareaRef.current.scrollHeight, 150) // Max height of 150px
      textareaRef.current.style.height = `${newHeight}px`

      // Add overflow if content exceeds max height
      if (textareaRef.current.scrollHeight > 150) {
        textareaRef.current.style.overflowY = "auto"
      } else {
        textareaRef.current.style.overflowY = "hidden"
      }
    }
  }, [input])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!input.trim() || isLoading || !isApiKeySet) return

    setIsLoading(true)

    try {
      // Create a new chat
      const chatId = await createChat()
      console.log(`Created new chat with ID: ${chatId}`);

      // For large prompts, store directly in localStorage instead of server
      const MAX_URL_PROMPT_LENGTH = 500 // Conservative limit for URL params
      
      if (input.length > MAX_URL_PROMPT_LENGTH) {
        // Generate a unique ID for the prompt
        const promptId = Date.now().toString(36) + Math.random().toString(36).substring(2)
        
        // Store prompt data
        const promptData = {
          prompt: input,
          timestamp: Date.now(),
          expires: Date.now() + (5 * 60 * 1000) // 5 minutes from now
        };
        
        let localStorageSuccess = false;
        let sessionStorageSuccess = false;
        
        // Store in both localStorage and sessionStorage for redundancy
        try {
          localStorage.setItem(`va_prompt_${promptId}`, JSON.stringify(promptData));
          localStorageSuccess = true;
        } catch (e) {
          console.error("Failed to store in localStorage:", e);
        }
        
        try {
          // Also store in sessionStorage as a backup
          sessionStorage.setItem(`va_prompt_${promptId}`, JSON.stringify(promptData));
          sessionStorageSuccess = true;
        } catch (e) {
          console.error("Failed to store in sessionStorage:", e);
        }
        
        // Add a debug message to console
        console.log(`Stored prompt with ID: ${promptId}`, {
          keyUsed: `va_prompt_${promptId}`,
          promptLength: input.length,
          localStorageSuccess,
          sessionStorageSuccess,
          navigatingTo: `/chat/${chatId}?promptId=${promptId}`
        });
        
        // Navigate to chat with prompt ID reference only
        router.push(`/chat/${chatId}?promptId=${promptId}`)
      } else {
        console.log(`Using URL parameter for smaller prompt (${input.length} chars)`);
        // Use URL parameter for smaller prompts
        router.push(`/chat/${chatId}?message=${encodeURIComponent(input)}`)
      }
    } catch (error) {
      console.error("Error creating chat:", error)
      setError("Failed to create chat. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <form onSubmit={handleSubmit} className="p-4 flex items-center gap-2">
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isApiKeySet ? "Ask VA agent to build something..." : "Please set up your API key first"}
              className="w-full border rounded-md py-3 px-4 pr-10 resize-none min-h-[50px] overflow-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              disabled={!isApiKeySet || isLoading || isCheckingApiKey}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={!isApiKeySet || isLoading || isCheckingApiKey}
            >
              <PaperclipIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={!isApiKeySet || isLoading || isCheckingApiKey}
              title="Expand chat"
            >
              <Maximize className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              disabled={!input.trim() || !isApiKeySet || isLoading || isCheckingApiKey}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>

        {error && (
          <div className="px-4 pb-4">
            <div className="bg-red-100 text-red-700 p-2 rounded-md text-sm">{error}</div>
          </div>
        )}

        {!isApiKeySet && !isCheckingApiKey && (
          <div className="px-4 pb-4">
            <div className="bg-yellow-100 text-yellow-700 p-2 rounded-md text-sm">
              Please set up your API key to use the chat interface.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

