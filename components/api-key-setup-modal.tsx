"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ApiKeySetupModalProps {
  isOpen: boolean
  onClose: () => void
  onApiKeySet: (isValid: boolean) => void
}

export function ApiKeySetupModal({ isOpen, onClose, onApiKeySet }: ApiKeySetupModalProps) {
  const [apiKey, setApiKey] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "validating" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setApiKey("")
      setError("")
      setStatus("idle")
      setStatusMessage("")
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!apiKey || !apiKey.trim()) {
      setError("API key is required")
      return
    }

    // Basic client-side validation
    if (!apiKey.startsWith("sk-") || apiKey.length < 20) {
      setError("Invalid API key format. OpenAI API keys should start with 'sk-' and be at least 20 characters long.")
      return
    }

    setIsSubmitting(true)
    setError("")
    setStatus("submitting")
    setStatusMessage("Setting API key...")

    try {
      // Set the API key
      const response = await fetch("/api/set-api-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "Failed to parse response" }))
        throw new Error(data.error || `Failed to set API key: ${response.status}`)
      }

      setStatus("validating")
      setStatusMessage("Validating API key with OpenAI...")

      // Validate the API key
      const validationResponse = await fetch("/api/validate-api-key")

      if (!validationResponse.ok) {
        const data = await validationResponse.json().catch(() => ({ error: "Failed to parse response" }))
        throw new Error(data.error || `Failed to validate API key: ${validationResponse.status}`)
      }

      const validationData = await validationResponse.json()

      if (validationData.valid) {
        setStatus("success")
        setStatusMessage("API key is valid and working correctly with OpenAI.")
        onApiKeySet(true)

        // Close the modal after a short delay
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        setStatus("error")
        const errorMsg = validationData.error || "Unknown validation error"
        setStatusMessage(`API key validation failed: ${errorMsg}`)
        setError(`API key validation failed: ${errorMsg}`)
        onApiKeySet(false)
      }
    } catch (error) {
      console.error("Error:", error)
      setStatus("error")
      const errorMsg = error instanceof Error ? error.message : String(error)
      setStatusMessage(`Error: ${errorMsg}`)
      setError(`Error: ${errorMsg}`)
      onApiKeySet(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set up your OpenAI API Key</DialogTitle>
          <DialogDescription>
            To use the AI code generator, you need to provide your OpenAI API key. This key will be stored securely in
            your environment variables.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              OpenAI API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="sk-..."
              disabled={isSubmitting}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          {status !== "idle" && (
            <div
              className={`p-3 rounded-md ${
                status === "success"
                  ? "bg-green-50 text-green-700"
                  : status === "error"
                    ? "bg-red-50 text-red-700"
                    : "bg-blue-50 text-blue-700"
              }`}
            >
              <p className="text-sm">{statusMessage}</p>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!apiKey || !apiKey.trim() || isSubmitting}
              className={isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
            >
              {isSubmitting ? "Processing..." : "Save API Key"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

