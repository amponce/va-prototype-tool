"use client"

import type React from "react"
import { VAHeader } from "@/components/va-header"
import { VAFooter } from "@/components/va-footer"
import { VaContentSandbox } from "@/components/va-content-sandbox"
import { VABreadcrumbs } from "@/components/va-breadcrumbs"

interface SingleColumnLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  breadcrumbs?: Array<{ href: string; label: string; current?: boolean }>
}

export function SingleColumnLayout({
  children,
  title = "VA Content Page",
  description,
  breadcrumbs = [
    { href: "/", label: "VA.gov home" },
    { href: "#", label: "Current page", current: true },
  ],
}: SingleColumnLayoutProps) {
  return (
    <div className="va-single-column-layout min-h-screen flex flex-col">
      <VAHeader />
      <main className="va-main-content flex-1">
        <VaContentSandbox>
          <div className="vads-l-grid-container">
            <div className="vads-l-row">
              <div className="vads-l-col--12">
                <VABreadcrumbs items={breadcrumbs} />
              </div>
            </div>
          </div>

          <div className="vads-l-grid-container">
            <div className="vads-l-row">
              <div className="vads-l-col--12 medium-screen:vads-l-col--8">
                {title && <h1 className="vads-u-font-size--h1 vads-u-margin-bottom--2">{title}</h1>}
                {description && <p className="va-introtext">{description}</p>}
                {children}
              </div>
            </div>
          </div>
        </VaContentSandbox>
      </main>
      <VAFooter />
    </div>
  )
}

