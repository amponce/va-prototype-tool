"use client"

import type React from "react"
import { VaBreadcrumbs } from "@department-of-veterans-affairs/component-library/dist/react-bindings"
import "@department-of-veterans-affairs/component-library/dist/main.css"

interface VASandboxProps {
  children: React.ReactNode
  breadcrumbs?: Array<{ href: string; label: string }>
  title?: string
}

export function VASandbox({
  children,
  breadcrumbs = [
    { href: "/", label: "VA.gov home" },
    { href: "#", label: "Current page" },
  ],
  title,
}: VASandboxProps) {
  return (
    <div className="va-sandbox">
      {/* VA Breadcrumbs */}
      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <div className="vads-l-col">
            <VaBreadcrumbs breadcrumbList={breadcrumbs} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <div className="vads-l-col--12 medium-screen:vads-l-col--8">
            {title && <h1 className="vads-u-font-size--h1 vads-u-margin-bottom--2">{title}</h1>}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

