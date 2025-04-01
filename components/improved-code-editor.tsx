"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"

interface ImprovedCodeEditorProps {
  code: string
  onChange: (code: string) => void
}

export function ImprovedCodeEditor({ code, onChange }: ImprovedCodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [lineCount, setLineCount] = useState(code.split("\n").length)

  // Auto-resize the textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
    setLineCount(code.split("\n").length)
  }, [code])

  // Handle code changes
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
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
      onChange(newValue)
    }
  }

  return (
    <div className="code-editor-container">
      <div className="mb-4 text-sm text-gray-500">Edit the code below to modify the component:</div>
      <div className="relative border rounded-md overflow-hidden">
        <div className="absolute top-0 left-0 w-12 h-full bg-gray-100 border-r flex flex-col items-end">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="text-right pr-2 text-gray-500 text-xs" style={{ lineHeight: 1.5, height: "1.5em" }}>
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          className="w-full min-h-[600px] p-4 pl-16 font-mono text-sm bg-gray-900 text-gray-100 resize-none"
          spellCheck="false"
          style={{ lineHeight: 1.5, tabSize: 2 }}
        />
      </div>
      <div className="mt-2 text-sm text-gray-500 flex justify-between">
        <span>Use Tab key to indent code</span>
        <span>Line count: {lineCount}</span>
      </div>
    </div>
  )
}

