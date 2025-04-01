"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { createChat } from "@/lib/chat-store"

export function ModernChatInterface() {
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

      // Navigate to the chat page with the initial message as a query parameter
      router.push(`/chat/${chatId}?message=${encodeURIComponent(input)}`)
    } catch (error) {
      console.error("Error creating chat:", error)
      setError("Failed to create chat. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h2 className="font-medium">What would you like to build today?</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isApiKeySet ? "Describe what you want to build..." : "Please set up your API key first"}
              className="w-full border rounded-xl py-3 px-4 pr-24 resize-none min-h-[60px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              disabled={!isApiKeySet || isLoading || isCheckingApiKey}
            />
            <div className="absolute right-2 bottom-2">
              <Button
                type="submit"
                disabled={!input.trim() || !isApiKeySet || isLoading || isCheckingApiKey}
                className="bg-blue-600 hover:bg-blue-700 rounded-lg h-9"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    <span>Generate</span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          {error && <div className="mt-3 text-sm text-red-500">{error}</div>}

          {!isApiKeySet && !isCheckingApiKey && (
            <div className="mt-3 text-sm text-red-500">Please set up your API key to use the chat interface.</div>
          )}

          <div className="mt-3 text-xs text-gray-500">
            Try: "Create a VA form with name, email, and submit button" or "Build a dashboard for veterans"
          </div>
        </form>
      </div>
    </div>
  )
}

