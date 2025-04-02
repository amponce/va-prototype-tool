"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { VAContentContainer } from "@/components/va-specific/va-content-container"
import { VaAlert, VaButton, VaTextInput } from "@department-of-veterans-affairs/component-library/dist/react-bindings"

// Add TypeScript declarations for VA custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'VaAlert': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        status?: string;
        visible?: boolean;
        uswds?: boolean;
        headline?: string;
      }, HTMLElement>;
      'VaTextInput': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        label?: string;
        name?: string;
        value?: string;
        onInput?: (event: any) => void; // Use a more specific type if available
        uswds?: boolean;
      }, HTMLElement>;
      'VaButton': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        text?: string;
        onClick?: (event: any) => void; // Use a more specific type if available
        disabled?: boolean;
        uswds?: boolean;
      }, HTMLElement>;
    }
  }
}

export function ApiKeySetup() {
  const [apiKey, setApiKey] = useState("")
  const [isKeySet, setIsKeySet] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Check if API key is already set
  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const response = await fetch("/api/check-api-key")
        const data = await response.json()
        setIsKeySet(data.isSet)
      } catch (error) {
        console.error("Error checking API key:", error)
      }
    }

    checkApiKey()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!apiKey.trim()) {
      setError("API key is required")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/set-api-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      })

      if (!response.ok) {
        throw new Error("Failed to set API key")
      }

      setIsKeySet(true)
      setApiKey("")
    } catch (error) {
      console.error("Error:", error)
      setError("Failed to set API key. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isKeySet) {
    return (
      <VaAlert status="success" visible>
        <h3 slot="headline" className="vads-u-margin-top--0">OpenAI API Key is set</h3>
        <p>Your OpenAI API key is configured. You can now use the AI code generator.</p>
      </VaAlert>
    )
  }

  return (
    <VAContentContainer>
      <div className="vads-u-padding--3 vads-u-background-color--gray-lightest vads-u-margin-bottom--3">
        <h3 className="vads-u-font-size--h3 vads-u-margin-top--0">Set up your OpenAI API Key</h3>
        <p>
          To use the AI code generator, you need to provide your OpenAI API key. This key will be stored securely in
          your environment variables.
        </p>

        <form onSubmit={handleSubmit}>
          <VaTextInput
            label="OpenAI API Key"
            name="apiKey"
            value={apiKey}
            onInput={(e: any) => setApiKey(e.target.value)}
          ></VaTextInput>

          {error && (
            <div className="vads-u-margin-top--2">
              <VaAlert status="error" visible>
                 <h3 slot="headline" className="vads-u-margin-top--0">Error</h3>
                <p>{error}</p>
              </VaAlert>
            </div>
          )}

          <div className="vads-u-margin-top--3">
            <VaButton
              text={isSubmitting ? "Saving..." : "Save API Key"}
              onClick={handleSubmit}
              disabled={isSubmitting || !apiKey.trim()}
            ></VaButton>
          </div>
        </form>
      </div>
    </VAContentContainer>
  )
}

