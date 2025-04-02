"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"

interface ImprovedCodeEditorProps {
  code: string
  onChange: (code: string) => void
}

export function ImprovedCodeEditor({ code, onChange }: ImprovedCodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [lineCount, setLineCount] = useState(code.split("\n").length)
  const [scrollPosition, setScrollPosition] = useState(0) // Track scroll position

  // Set textarea height to fill available space and monitor changes
  useEffect(() => {
    const resizeTextarea = () => {
      const container = containerRef.current;
      const textarea = textareaRef.current;
      if (!container || !textarea) return;
      
      // Use the full container height
      textarea.style.height = `${container.clientHeight}px`;
    };
    
    // Initial resize
    resizeTextarea();
    
    // Create a ResizeObserver to watch container size changes
    const resizeObserver = new ResizeObserver(() => {
      resizeTextarea();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    // Also resize on window resize
    window.addEventListener('resize', resizeTextarea);
    
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeTextarea);
    };
  }, []);

  // Update the line count when code changes
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      // Save current scroll position
      const savedScrollTop = textarea.scrollTop;
      
      // Update line count
      setLineCount(code.split("\n").length)
      
      // Restore scroll position
      textarea.scrollTop = savedScrollTop;
    }
  }, [code])

  // Handle code changes
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  // Save scroll position when user scrolls
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    setScrollPosition(e.currentTarget.scrollTop);
  }

  // Restore scroll position when needed
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && scrollPosition > 0) {
      textarea.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  // Handle tab key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      // Insert 2 spaces for tab
      const newValue = textarea.value.substring(0, start) + "  " + textarea.value.substring(end)
      
      // Remember scroll position
      const scrollTop = textarea.scrollTop;
      
      textarea.value = newValue

      // Move cursor position after the inserted tab
      textarea.selectionStart = textarea.selectionEnd = start + 2
      
      // Restore scroll position
      textarea.scrollTop = scrollTop;

      // Update the state
      onChange(newValue)
    }
  }

  return (
    <div ref={containerRef} className="code-editor-container h-full w-full flex flex-col">
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-12 h-full bg-gray-800 border-r border-gray-700 flex flex-col items-end z-10">
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
          onScroll={handleScroll}
          className="w-full h-full p-2 pl-16 font-mono text-sm bg-gray-900 text-gray-100 resize-none absolute inset-0"
          spellCheck="false"
          style={{ 
            lineHeight: 1.5, 
            tabSize: 2,
            boxSizing: 'border-box'
          }}
        />
      </div>
    </div>
  )
}

