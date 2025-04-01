"use client"

import type React from "react"

import { useEffect } from "react"
import "@department-of-veterans-affairs/component-library/dist/main.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

export function VAStylesProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load VA web components
    const script = document.createElement("script")
    script.src = "https://unpkg.com/@department-of-veterans-affairs/component-library@46.2.3/dist/component-library.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return <>{children}</>
}

