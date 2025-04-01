"use client"

import React, { useEffect } from 'react'

interface PreviewWrapperProps {
  children: React.ReactNode
}

export function PreviewWrapper({ children }: PreviewWrapperProps) {
  useEffect(() => {
    // Load the web components script if it doesn't exist
    if (!document.querySelector('script[src*="component-library.js"]')) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/@department-of-veterans-affairs/component-library/dist/component-library.js"
      script.async = true
      document.body.appendChild(script)
      
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }
  }, [])
  
  return (
    <div className="va-component-preview">
      {children}
    </div>
  )
} 