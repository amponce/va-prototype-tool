"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-tsx"
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

interface EnhancedCodeEditorProps {
  code: string
  onChange: (code: string) => void
  language?: string
}

export function EnhancedCodeEditor({ code, onChange, language = "tsx" }: EnhancedCodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [editorCode, setEditorCode] = useState(code)

  // Update the highlighted code when the input changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = `<pre class="line-numbers language-${language}"><code class="language-${language}">${escapeHtml(
        editorCode,
      )}</code></pre>`
      Prism.highlightAllUnder(editorRef.current)
    }
  }, [editorCode, language])

  // Initialize Prism.js
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  // Handle code changes
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value
    setEditorCode(newCode)
    onChange(newCode)
  }

  // Escape HTML special characters
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  // Handle tab key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      // Insert 2 spaces for tab
      const newValue = textarea.value.substring(0, start) + "  " + textarea.value.substring(end)
      textarea.value = newValue

      // Move cursor position after the inserted tab
      textarea.selectionStart = textarea.selectionEnd = start + 2

      // Update the state
      setEditorCode(newValue)
      onChange(newValue)
    }
  }

  return (
    <div className="enhanced-code-editor">
      <div className="mb-4 text-sm text-gray-500">Edit the code below to modify the component:</div>
      <div className="relative border rounded-md overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div ref={editorRef} className="prism-editor" />
        </div>
        <textarea
          ref={textareaRef}
          value={editorCode}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          className="w-full min-h-[600px] p-4 font-mono text-base bg-transparent text-transparent caret-white resize-none relative z-10"
          spellCheck="false"
          style={{
            caretColor: "#fff",
            lineHeight: 1.5,
            tabSize: 2,
          }}
        />
      </div>
      <div className="mt-2 text-sm text-gray-500 flex justify-between">
        <span>Syntax highlighting enabled for better readability</span>
        <span>Line count: {editorCode.split("\n").length}</span>
      </div>
    </div>
  )
}

