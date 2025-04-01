"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Figma, Upload, LayoutIcon, UserPlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ApiKeySetupModal } from "@/components/api-key-setup-modal"
import { ChatInterface } from "@/components/chat-interface"

export default function Home() {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false)
  const [isApiKeySet, setIsApiKeySet] = useState(false)
  const [isApiKeyValid, setIsApiKeyValid] = useState(false)
  const [isCheckingApiKey, setIsCheckingApiKey] = useState(true)
  const [apiKeyError, setApiKeyError] = useState<string | null>(null)
  const router = useRouter()

  // Check if API key is already set
  useEffect(() => {
    const checkApiKey = async () => {
      try {
        setIsCheckingApiKey(true)
        setApiKeyError(null)

        const response = await fetch("/api/check-api-key")

        if (!response.ok) {
          throw new Error("Failed to check API key status")
        }

        const data = await response.json()
        setIsApiKeySet(data.isSet)

        // If key is set, validate it
        if (data.isSet) {
          if (!data.isValidFormat) {
            setIsApiKeyValid(false)
            setApiKeyError("API key has an invalid format")
            setIsCheckingApiKey(false)
            return
          }

          await validateApiKey()
        } else {
          setIsApiKeyValid(false)
          setApiKeyError("API key is not set")
          setIsCheckingApiKey(false)
        }
      } catch (error) {
        console.error("Error checking API key:", error)
        setIsApiKeyValid(false)
        setApiKeyError("Error checking API key")
        setIsCheckingApiKey(false)
      }
    }

    checkApiKey()
  }, [])

  const validateApiKey = async () => {
    try {
      const response = await fetch("/api/validate-api-key")

      if (!response.ok) {
        throw new Error("Failed to validate API key")
      }

      const data = await response.json()
      setIsApiKeyValid(data.valid)

      if (!data.valid) {
        setApiKeyError(data.error || "API key validation failed")
      } else {
        setApiKeyError(null)
      }

      setIsCheckingApiKey(false)
      return data.valid
    } catch (error) {
      console.error("Error validating API key:", error)
      setIsApiKeyValid(false)
      setApiKeyError(error instanceof Error ? error.message : "Unknown error validating API key")
      setIsCheckingApiKey(false)
      return false
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#112e51]"
            >
              <path
                d="M32.3519 7.648C29.0359 4.332 24.6799 2.5 20.0039 2.5C15.3279 2.5 10.9719 4.332 7.65594 7.648C4.33994 10.964 2.50794 15.32 2.50794 19.996C2.50794 24.672 4.33994 29.028 7.65594 32.344C10.9719 35.66 15.3279 37.492 20.0039 37.492C24.6799 37.492 29.0359 35.66 32.3519 32.344C35.6679 29.028 37.4999 24.672 37.4999 19.996C37.4999 15.32 35.6679 10.964 32.3519 7.648ZM20.0039 22.5C18.6199 22.5 17.5039 21.384 17.5039 20C17.5039 18.616 18.6199 17.5 20.0039 17.5C21.3879 17.5 22.5039 18.616 22.5039 20C22.5039 21.384 21.3879 22.5 20.0039 22.5ZM25.0039 10H15.0039V15H25.0039V10ZM25.0039 25H15.0039V30H25.0039V25Z"
                fill="currentColor"
              />
            </svg>
            <span className="font-bold text-xl text-[#112e51]">VA Prototyping</span>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsApiKeyModalOpen(true)}
              className="flex items-center gap-2"
              disabled={isCheckingApiKey}
            >
              {isCheckingApiKey ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                  <span>Checking...</span>
                </div>
              ) : (
                <>
                  <span className={isApiKeySet && isApiKeyValid ? "text-green-500" : "text-red-500"}>●</span>
                  {isApiKeySet && isApiKeyValid ? "API Key Set" : isApiKeySet ? "API Key Invalid" : "Set API Key"}
                </>
              )}
            </Button>
            <Link href="/docs">
              <Button variant="outline">Documentation</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mt-8 md:mt-12 mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16">What can I help you ship?</h1>

          {/* Centered chat interface */}
          <div className="flex justify-center w-full max-w-3xl mx-auto">
            <ChatInterface />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button variant="outline" className="flex items-center gap-2 px-4 py-6 h-auto">
              <Camera className="h-5 w-5" />
              <span>Clone a Screenshot</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 px-4 py-6 h-auto">
              <Figma className="h-5 w-5" />
              <span>Import from Figma</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 px-4 py-6 h-auto">
              <Upload className="h-5 w-5" />
              <span>Upload a Project</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 px-4 py-6 h-auto">
              <LayoutIcon className="h-5 w-5" />
              <span>Landing Page</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 px-4 py-6 h-auto">
              <UserPlus className="h-5 w-5" />
              <span>Sign Up Form</span>
            </Button>
          </div>
        </div>

        {/* Templates Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">VA Layout Templates</h2>
            <Link href="/templates" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>

          {/* Template gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/single-column">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  <LayoutIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Single Column Layout</h3>
                <p className="text-gray-600 text-sm flex-grow">
                  A simple single column layout for content-focused pages
                </p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                  View template
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 ml-1"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/copay-balances">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Current Copay Balances</h3>
                <p className="text-gray-600 text-sm flex-grow">
                  View and manage VA health care and prescription charges
                </p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                  View template
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 ml-1"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/va-components-showcase">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">VA Components Showcase</h3>
                <p className="text-gray-600 text-sm flex-grow">Explore official VA Design System components</p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                  View template
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 ml-1"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 text-sm">
            VA Rapid Prototyping Tool | © {new Date().getFullYear()} Department of Veterans Affairs
          </p>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeySetupModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onApiKeySet={async (isValid) => {
          setIsApiKeySet(true)
          setIsApiKeyValid(isValid)
          if (isValid) {
            setApiKeyError(null)
          }
          // Refresh the page to ensure all components update with the new API key
          window.location.reload()
        }}
      />
    </div>
  )
}

