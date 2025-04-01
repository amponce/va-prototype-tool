"use client"

import type React from "react"
import { useEffect } from "react"
import Script from "next/script"

// Import the VA Design System styles directly in the component
export function VAComponentsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load the web components script
    const script = document.createElement("script")
    script.src = "https://unpkg.com/@department-of-veterans-affairs/component-library@46.2.3/dist/component-library.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <>
      {/* Load the VA web components */}
      <Script
        src="https://unpkg.com/@department-of-veterans-affairs/component-library@46.2.3/dist/component-library.js"
        strategy="beforeInteractive"
      />
      {children}
    </>
  )
}

