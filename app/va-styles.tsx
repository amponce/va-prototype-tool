"use client"

import type React from "react"
import { useEffect } from "react"
import { applyPolyfills, defineCustomElements } from "@department-of-veterans-affairs/web-components/loader"

export function VAStylesProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize VA components with polyfills
    applyPolyfills().then(() => {
      defineCustomElements()
    })

    // Load VA web components script
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

