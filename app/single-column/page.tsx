"use client"

import { useState } from "react"
import { VAHeader } from "@/components/va-header"
import { VAFooter } from "@/components/va-footer"
import { Button } from "@/components/ui/button"
import { Eye, Code, Save, Undo } from "lucide-react"
import Link from "next/link"
import { VaContentSandbox } from "@/components/va-content-sandbox"
import { ImprovedCodeEditor } from "@/components/improved-code-editor"
import { VAMaintenanceBannerDemo } from "@/components/va-maintenance-banner-demo"

export default function SingleColumnPage() {
  // Initial code for the single column layout
  const [code, setCode] = useState(`import React from "react";
import { VaBreadcrumbs } from "@department-of-veterans-affairs/component-library/dist/react-bindings";
import "@department-of-veterans-affairs/component-library/dist/main.css";

export default function SingleColumnLayout() {
  const exampleFunction = () => { return "Hello, World!" };

  return (
    <div className="App">
      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <div className="vads-l-col">
            <VaBreadcrumbs
              breadcrumbList={[
                { href: "/", label: "VA.gov home" },
                { href: "#", label: "Current page" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <div className="vads-l-col--12 medium-screen:vads-l-col--8">
            <h1 className="vads-u-font-size--h1 vads-u-margin-bottom--2">
              Single Column Layout
            </h1>
            <p className="va-introtext">
              This is an example of a single column layout using the VA Design System.
              It provides a clean, focused reading experience for users.
            </p>
            
            <h2 className="vads-u-font-size--h2 vads-u-margin-bottom--2 vads-u-margin-top--4">
              Key Features
            </h2>
            
            <ul className="vads-u-margin-bottom--4">
              <li className="vads-u-margin-bottom--2">
                Responsive design that works on all devices
              </li>
              <li className="vads-u-margin-bottom--2">
                Accessible navigation with breadcrumbs
              </li>
              <li className="vads-u-margin-bottom--2">
                Clear typography with proper hierarchy
              </li>
              <li className="vads-u-margin-bottom--2">
                Consistent spacing and alignment
              </li>
            </ul>
            
            <div className="usa-alert usa-alert--info vads-u-margin-bottom--4">
              <div className="usa-alert__body">
                <h3 className="usa-alert__heading">Important information</h3>
                <p className="usa-alert__text">
                  This layout follows the VA Design System guidelines for content pages.
                  It ensures that Veterans can easily read and navigate through information.
                </p>
              </div>
            </div>
            
            <h2 className="vads-u-font-size--h2 vads-u-margin-bottom--2 vads-u-margin-top--4">
              When to use this layout
            </h2>
            
            <p>
              Use the single column layout for content-focused pages where you want
              users to read through information in a linear fashion. This is ideal for:
            </p>
            
            <ul className="vads-u-margin-bottom--4">
              <li className="vads-u-margin-bottom--2">
                Informational pages about benefits or services
              </li>
              <li className="vads-u-margin-bottom--2">
                Step-by-step instructions or guides
              </li>
              <li className="vads-u-margin-bottom--2">
                News articles or announcements
              </li>
              <li className="vads-u-margin-bottom--2">
                Frequently asked questions
              </li>
            </ul>
            
            <button className="usa-button vads-u-margin-top--2">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
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

  return (
    <div className="flex flex-col min-h-screen">
      <VAHeader />
      <div className="bg-gray-100 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Back to Home
              </Link>
              <h1 className="text-xl font-semibold">Single Column Layout</h1>
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
              <VaContentSandbox title="Single Column Layout">
                <p className="va-introtext">
                  This is an example of a single column layout using the VA Design System. It provides a clean, focused
                  reading experience for users.
                </p>

                <h2 className="vads-u-font-size--h2 vads-u-margin-bottom--2 vads-u-margin-top--4">Key Features</h2>

                <ul className="vads-u-margin-bottom--4">
                  <li className="vads-u-margin-bottom--2">Responsive design that works on all devices</li>
                  <li className="vads-u-margin-bottom--2">Accessible navigation with breadcrumbs</li>
                  <li className="vads-u-margin-bottom--2">Clear typography with proper hierarchy</li>
                  <li className="vads-u-margin-bottom--2">Consistent spacing and alignment</li>
                </ul>

                <div className="usa-alert usa-alert--info vads-u-margin-bottom--4">
                  <div className="usa-alert__body">
                    <h3 className="usa-alert__heading">Important information</h3>
                    <p className="usa-alert__text">
                      This layout follows the VA Design System guidelines for content pages. It ensures that Veterans
                      can easily read and navigate through information.
                    </p>
                  </div>
                </div>

                <h2 className="vads-u-font-size--h2 vads-u-margin-bottom--2 vads-u-margin-top--4">
                  When to use this layout
                </h2>

                <p>
                  Use the single column layout for content-focused pages where you want users to read through
                  information in a linear fashion. This is ideal for:
                </p>

                <ul className="vads-u-margin-bottom--4">
                  <li className="vads-u-margin-bottom--2">Informational pages about benefits or services</li>
                  <li className="vads-u-margin-bottom--2">Step-by-step instructions or guides</li>
                  <li className="vads-u-margin-bottom--2">News articles or announcements</li>
                  <li className="vads-u-margin-bottom--2">Frequently asked questions</li>
                </ul>

                <button className="usa-button vads-u-margin-top--2">Learn More</button>

                <VAMaintenanceBannerDemo />
              </VaContentSandbox>
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

