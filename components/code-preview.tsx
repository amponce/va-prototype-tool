"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodePreviewProps {
  code: string
}

export function CodePreview({ code }: CodePreviewProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
        <code>{code || "// No code generated yet"}</code>
      </pre>
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-gray-800 text-white border-gray-700"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </>
        )}
      </Button>
    </div>
  )
}

