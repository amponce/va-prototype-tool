"use client"

import { useState } from "react"
import { VAHeader } from "@/components/va-header"
import { VAFooter } from "@/components/va-footer"
import { Button } from "@/components/ui/button"
import { Eye, Code, Save, Undo, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { CopayBalancesContent } from "@/components/copay-balances-content"
import { ImprovedCodeEditor } from "@/components/improved-code-editor"
import { VABreadcrumbs } from "@/components/va-breadcrumbs"

export default function CopayBalancesPage() {
  // Initial code from the example.jsx file
  const [code, setCode] = useState(`import React from "react";
import { VaBreadcrumbs } from "@department-of-veterans-affairs/component-library/dist/react-bindings";
import "@department-of-veterans-affairs/component-library/dist/main.css";
import { VAContentContainer } from "@/components/va-content-container";

export default function CopayBalances() {
return (
  <VAContentContainer>
    <div className="vads-l-grid-container">
      <div className="vads-l-row">
        <div className="vads-l-col">
          <VaBreadcrumbs
            breadcrumbList={[
              { href: "/", label: "VA.gov home" },
              { href: "#", label: "Manage your VA debt" },
              { href: "#", label: "Dispute your VA debt" },
            ]}
            label="Breadcrumb"
          />
        </div>
      </div>
    </div>

    <div className="vads-l-grid-container">
      <div className="vads-l-row">
        <div className="vads-l-col--12 medium-screen:vads-l-col--8">
          <div className="vads-u-margin-bottom--6">
            <h1 className="vads-u-margin-bottom--0 vads-u-font-size--h1">
              Current copay balances
            </h1>
            <p className="va-introtext">
              Check the balance of VA health care and prescription charges
              from each of your facilities. Find out how to make payments or
              request financial help.
            </p>
          </div>
          
          <h2 className="vads-u-margin-bottom--0">
            Your most recent statement balances for the last six months
          </h2>
          
          <ul className="vads-u-margin-top--3 vads-u-padding-left--0" style={{ listStyle: "none" }}>
            <li>
              <div className="usa-card vads-u-margin-bottom--3">
                <div className="usa-card__container vads-u-padding-x--3 vads-u-padding-y--2">
                  <h3 className="vads-u-margin-top--0 vads-u-margin-bottom--1p5 vads-u-font-size--h3">
                    James A. Haley Veterans' Hospital - Tampa
                  </h3>
                  <h4 className="vads-u-margin-top--0 vads-u-margin-bottom--1p5 vads-u-font-size--md">
                    <span className="vads-u-font-weight--normal">
                      Current balance:
                    </span>
                    <strong> $50.00</strong>
                  </h4>
                  <div className="vads-u-display--flex vads-u-align-items--top vads-u-margin-bottom--1p5">
                    <i
                      aria-hidden="true"
                      className="fas fa-exclamation-triangle fa-md vads-u-margin-top--0p25 vads-u-margin-right--0p5 vads-u-color--warning-dark"
                    ></i>
                    <span className="sr-only">Warning</span>
                    <p className="vads-u-margin-y--0 vads-u-font-size--md">
                      Pay your balance now or request help by{" "}
                      <strong>October 30, 2024</strong>.
                    </p>
                  </div>
                  <p className="vads-u-margin-y--0 vads-u-font-size--md">
                    <a
                      className="vads-u-font-weight--bold"
                      href="#"
                    >
                      Review details
                      <i
                        aria-hidden="true"
                        className="fas fa-angle-right fa-md vads-u-margin-left--1"
                      ></i>
                    </a>
                  </p>
                  <p className="vads-u-margin-y--0 vads-u-margin-top--1p5 vads-u-font-size--md">
                    <a
                      className="vads-u-font-weight--bold"
                      href="#"
                    >
                      Resolve this bill
                      <i
                        aria-hidden="true"
                        className="fas fa-angle-right fa-md vads-u-margin-left--1"
                      ></i>
                    </a>
                  </p>
                </div>
              </div>
            </li>

            <!-- More list items would go here -->
          </ul>

          <!-- More content would go here -->
        </div>
      </div>
    </div>
  </VAContentContainer>
);
}`)

  // State to track if there are unsaved changes
  const [hasChanges, setHasChanges] = useState(false)
  // State to store the original code for reverting changes
  const [originalCode, setOriginalCode] = useState(code)
  // State to track active tab
  const [activeTab, setActiveTab] = useState("preview")

  // Handle code changes
  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    setHasChanges(true)
  }

  // Save changes
  const handleSave = () => {
    setOriginalCode(code)
    setHasChanges(false)
    // In a real app, this would save to a database or API
    alert("Changes saved!")
  }

  // Revert changes
  const handleRevert = () => {
    setCode(originalCode)
    setHasChanges(false)
  }

  const breadcrumbs = [
    { href: "/", label: "VA.gov home" },
    { href: "#", label: "Manage your VA debt" },
    { href: "#", label: "Current copay balances", current: true },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <VAHeader />
      <div className="bg-gray-100 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-xl font-semibold">Current Copay Balances</h1>
            </div>
            <div className="flex items-center space-x-2">
              {hasChanges && (
                <>
                  <Button variant="outline" size="sm" onClick={handleRevert} className="flex items-center gap-1">
                    <Undo className="h-4 w-4" />
                    <span>Revert</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="bg-[#0071bc] hover:bg-[#205493] flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Tab Navigation */}
      <div className="bg-gray-100 border-b">
        <div className="container mx-auto">
          <div className="flex">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm ${
                activeTab === "preview" ? "bg-white text-gray-900" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm ${
                activeTab === "code" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Code className="h-4 w-4" />
              Code
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {activeTab === "preview" && (
          <div className="bg-gray-100 flex-1 p-4">
            <div className="bg-white border rounded-md shadow-sm max-w-6xl mx-auto">
              <div className="p-4">
                <VABreadcrumbs items={breadcrumbs} />
              </div>
              <CopayBalancesContent />
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div className="bg-gray-100 flex-1 p-4">
            <div className="bg-white border rounded-md shadow-sm max-w-7xl mx-auto p-6">
              <ImprovedCodeEditor code={code} onChange={handleCodeChange} />
            </div>
          </div>
        )}
      </div>
      <VAFooter />
    </div>
  )
}

