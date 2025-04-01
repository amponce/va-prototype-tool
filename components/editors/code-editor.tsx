"use client"

import { useRef, useEffect } from "react"

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize the textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [code])

  return (
    <div className="p-4">
      <div className="mb-2 text-sm text-gray-500">Edit the code below to modify the component:</div>
      <div className="relative border rounded-md overflow-hidden">
        <div className="absolute top-0 left-0 w-10 h-full bg-gray-100 border-r"></div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[500px] p-4 pl-12 font-mono text-sm bg-gray-900 text-gray-100 resize-none"
          spellCheck="false"
          style={{ lineHeight: 1.5, tabSize: 2 }}
        />
        <div className="absolute top-0 left-0 w-10 h-full pointer-events-none">
          {code.split("\n").map((_, i) => (
            <div key={i} className="text-right pr-2 text-gray-500 text-xs" style={{ lineHeight: 1.5, height: "1.5em" }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Note: This is a simplified code editor. In a production environment, you would use a more robust solution like
        Monaco Editor or CodeMirror.
      </div>
    </div>
  )
}

