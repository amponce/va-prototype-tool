"use client"

import type React from "react"
import { VaBreadcrumbs } from "@department-of-veterans-affairs/component-library/dist/react-bindings"

interface VaContentSandboxProps {
  children: React.ReactNode
  breadcrumbs?: Array<{ href: string; label: string }>
  title?: string
}

export function VaContentSandbox({
  children,
  breadcrumbs = [
    { href: "/", label: "VA.gov home" },
    { href: "#", label: "Current page" },
  ],
  title,
}: VaContentSandboxProps) {
  return (
    <div className="va-sandbox">
      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <div className="vads-l-col">
            <VaBreadcrumbs breadcrumbList={breadcrumbs} label="Breadcrumb" />
          </div>
        </div>
      </div>

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

