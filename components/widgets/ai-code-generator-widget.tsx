"use client"

import { useState } from "react"
import { VAContentContainer } from "@/components/va-content-container"
import { ImprovedCodeEditor } from "@/components/improved-code-editor"
import { CodePreview } from "@/components/code-preview"
import { Code, Eye } from "lucide-react"

export function AICodeGeneratorWidget() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code")

  const generateCode = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setError("")

    try {
      const response = await fetch("/api/generate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate code")
      }

      const data = await response.json()
      setGeneratedCode(data.code)
    } catch (error) {
      console.error("Error:", error)
      setError("Failed to generate code. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-xl font-semibold">AI Code Generator</h2>
        <p className="text-gray-600 text-sm">Generate VA Design System components with AI</p>
      </div>

      <VAContentContainer>
        <div className="p-4">
          <va-text-input
            label="Describe what you want to build"
            name="prompt"
            value={prompt}
            onInput={(e: any) => setPrompt(e.target.value)}
            uswds
          ></va-text-input>

          <p className="vads-u-font-style--italic vads-u-margin-top--1 vads-u-margin-bottom--2 vads-u-color--gray-medium">
            Example: Create a form with name and email fields and a submit button
          </p>

          <div className="vads-u-display--flex vads-u-margin-top--2 vads-u-margin-bottom--4">
            <va-button
              text={isGenerating ? "Generating..." : "Generate Code"}
              onClick={generateCode}
              disabled={isGenerating || !prompt.trim()}
              uswds
            ></va-button>

            {generatedCode && (
              <div className="vads-u-margin-left--2">
                <va-button
                  text={copied ? "Copied!" : "Copy Code"}
                  onClick={copyToClipboard}
                  secondary
                  uswds
                ></va-button>
              </div>
            )}
          </div>

          {error && (
            <va-alert status="error" visible uswds headline="Error">
              <p>{error}</p>
            </va-alert>
          )}

          {generatedCode && (
            <div className="vads-u-margin-top--2">
              <div className="vads-u-display--flex vads-u-justify-content--between vads-u-align-items--center vads-u-margin-bottom--2">
                <h3 className="vads-u-font-size--h4 vads-u-margin--0">Generated Component</h3>

                <div className="vads-u-display--flex">
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`vads-u-padding-x--2 vads-u-padding-y--1 vads-u-margin-right--2 vads-u-font-weight--bold vads-u-display--flex vads-u-align-items--center ${
                      activeTab === "code"
                        ? "vads-u-background-color--primary vads-u-color--white"
                        : "vads-u-background-color--gray-light-alt vads-u-color--gray-dark"
                    }`}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Code
                  </button>
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`vads-u-padding-x--2 vads-u-padding-y--1 vads-u-font-weight--bold vads-u-display--flex vads-u-align-items--center ${
                      activeTab === "preview"
                        ? "vads-u-background-color--primary vads-u-color--white"
                        : "vads-u-background-color--gray-light-alt vads-u-color--gray-dark"
                    }`}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </button>
                </div>
              </div>

              {activeTab === "code" ? (
                <div className="code-editor-container" style={{ maxHeight: "400px", overflow: "auto" }}>
                  <ImprovedCodeEditor code={generatedCode} onChange={setGeneratedCode} />
                </div>
              ) : (
                <div style={{ maxHeight: "400px", overflow: "auto" }}>
                  <CodePreview code={generatedCode} />
                </div>
              )}
            </div>
          )}

          <div className="vads-u-margin-top--2 vads-u-text-align--right">
            <a href="/ai-code-generator" className="vads-u-color--primary vads-u-text-decoration--none">
              Advanced options →
            </a>
          </div>
        </div>
      </VAContentContainer>
    </div>
  )
}

