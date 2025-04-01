"use client"

import { useState } from "react"
import { VAHeader } from "@/components/va-header"
import { VAFooter } from "@/components/va-footer"
import { Button } from "@/components/ui/button"
import { Eye, Code, Save, Undo, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { DisabilityCompensationRatesContent } from "@/components/disability-compensation-rates-content"
import { ImprovedCodeEditor } from "@/components/improved-code-editor"

export default function DisabilityCompensationRatesPage() {
  // Initial code for the disability compensation rates
  const [code, setCode] = useState(`import React from "react";
import { VaBreadcrumbs, VaAccordion, VaAccordionItem, VaTable, VaTableRow } from "@department-of-veterans-affairs/component-library/dist/react-bindings";
import "@department-of-veterans-affairs/component-library/dist/main.css";
import { VAContentContainer } from "@/components/va-content-container";

export default function DisabilityCompensationRates() {
  return (
    <VAContentContainer>
      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <div className="vads-l-col">
            <VaBreadcrumbs
              breadcrumbList={[
                { href: "/", label: "VA.gov home" },
                { href: "#", label: "Disability benefits" },
                { href: "#", label: "Disability compensation rates" },
                { href: "#", label: "Current Veterans disability compensation rates" },
              ]}
              label="Breadcrumb"
            />
          </div>
        </div>
      </div>

      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          {/* Left sidebar navigation */}
          <div className="vads-l-col--3">
            <div className="left-side-nav">
              <div className="sidenav-header">
                <div className="va-api-logo-wrapper">
                  <div className="va-api-logo">
                    <img src="/placeholder.svg?height=40&width=40" alt="" role="presentation" />
                  </div>
                  <h2 id="disability-benefits-header" className="vads-u-margin-y--0 vads-u-font-size--lg">
                    <a href="#" className="vads-u-text-decoration--none vads-u-color--link-default">
                      Disability benefits
                    </a>
                  </h2>
                </div>
              </div>

              <ul className="usa-sidenav-list">
                <li>
                  <a href="#" className="usa-current">
                    Disability compensation rates
                  </a>
                  <ul className="usa-sidenav-sub_list">
                    <li className="active-page">
                      <a href="#" className="vads-u-font-weight--bold">
                        Veterans disability compensation rates
                      </a>
                    </li>
                    <li>
                      <a href="#">Past rates: 2024</a>
                    </li>
                    <li>
                      <a href="#">Past rates: 2023</a>
                    </li>
                    <li>
                      <a href="#">Past rates: 2022</a>
                    </li>
                    <li>
                      <a href="#">Special monthly compensation rates</a>
                    </li>
                    <li>
                      <a href="#">Special benefit allowances rates</a>
                    </li>
                    <li>
                      <a href="#">Birth defect compensation rates</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Main content area */}
          <div className="vads-l-col--9">
            <h1 className="vads-u-font-size--h1">
              Current Veterans disability compensation rates
            </h1>
            <p className="va-introtext">
              Review 2025 Veterans disability compensation rates. Use our compensation benefits rate tables to find your monthly payment amount. We base your monthly payment amount on your disability rating and details about your dependent family members.
            </p>

            <h2 className="vads-u-font-size--h2">
              Compensation rates for Veterans with a 10% to 20% disability rating
            </h2>
            <p className="vads-u-font-weight--bold">Effective December 1, 2024</p>

            <p className="vads-u-font-style--italic">
              <strong>Note:</strong> If you have a 10% to 20% disability rating, you won't receive a higher rate even if you have a dependent spouse, child, or parent.
            </p>

            <VaTable tableTitle="Disability ratings for 10% to 20%" tableType="bordered">
              <VaTableRow>
                <span slot="va-table-slot-0">Disability rating</span>
                <span slot="va-table-slot-1">Monthly payment (in U.S. $)</span>
              </VaTableRow>
              <VaTableRow>
                <span slot="va-table-slot-2">10%</span>
                <span slot="va-table-slot-3">175.51</span>
              </VaTableRow>
              <VaTableRow>
                <span slot="va-table-slot-4">20%</span>
                <span slot="va-table-slot-5">346.95</span>
              </VaTableRow>
            </VaTable>

            <h2 className="vads-u-font-size--h2">
              Compensation rates for Veterans with a 30% to 100% disability rating
            </h2>
            <p className="vads-u-font-weight--bold">Effective December 1, 2024</p>

            <h3 className="vads-u-font-size--h3">With a dependent spouse or parent, but no children</h3>
            
            <VaAccordion uswds>
              <VaAccordionItem>
                <h4 slot="headline">Compensation rates for 30% to 60% disability rating</h4>
                <div>
                  <p>Find the dependent status in the left column that best describes you. Then look for your disability rating in the top row. Your basic monthly rate is where your dependent status and disability rating meet.</p>
                  
                  <p>If your spouse receives Aid and Attendance benefits, be sure to also look at the <strong>Added amounts</strong> table, and add it to your amount from the <strong>Basic monthly rates</strong> table.</p>
                  
                  <p><a href="#">Learn more about Aid and Attendance benefits</a></p>
                  
                  {/* Table content would go here */}
                </div>
              </VaAccordionItem>
            </VaAccordion>

            {/* Additional content would go here */}
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
              <h1 className="text-xl font-semibold">Disability Compensation Rates</h1>
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
              <DisabilityCompensationRatesContent />
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

