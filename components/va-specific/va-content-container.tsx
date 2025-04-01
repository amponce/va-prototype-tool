"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface VAContentContainerProps {
  children: React.ReactNode
}

export function VAContentContainer({ children }: VAContentContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only load styles when this component is mounted
    const loadCSS = (url: string) => {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = url
      link.setAttribute("data-va-styles", "true")
      document.head.appendChild(link)
      return link
    }

    // Load all required CSS files
    const links = [
      loadCSS("https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/component-library/dist/main.css"),
      loadCSS("https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/formation/dist/formation.min.css"),
      loadCSS(
        "https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/css-library/dist/stylesheets/utilities.css",
      ),
      loadCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css"),
      loadCSS("https://cdn.jsdelivr.net/npm/uswds@3.0.0-beta.3/dist/css/uswds.min.css"),
      loadCSS("https://staging-va-gov-assets.s3-us-gov-west-1.amazonaws.com/generated/combined-debt-portal.css"),
    ]

    return () => {
      // Clean up CSS links when component unmounts
      links.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="va-content-container">
      {children}
    </div>
  )
}

