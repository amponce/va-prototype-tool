"use client"

import { VAHeader } from "@/components/va-specific/va-header"
import { VAFooter } from "@/components/va-specific/va-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LayoutPreviewPage() {
  // Sample content based on the provided VA debt management page
  const contentTitle = "Manage your VA debt for benefit overpayments and copay bills"
  const contentDescription =
    "Review your current VA benefit debt or copay bill balances online. And find out how to make payments or request help now."

  return (
    <div className="flex flex-col min-h-screen">
      <VAHeader />
      <div className="bg-gray-100 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-xl font-semibold">Single-Column Layout Preview</h1>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Single-Column Layout with VA Header and Footer</h2>
          <p className="mb-6">
            This page demonstrates a single-column layout wrapped with the standard VA header and footer components.
            Below you can see a preview of the layout and the generated code.
          </p>

          <div className="border rounded-md overflow-hidden mb-8">
            <div className="bg-gray-100 border-b px-4 py-2">
              <div className="text-sm font-medium">Preview</div>
            </div>
            <div className="p-4 bg-white">
              <h1 className="text-2xl font-bold mb-2">{contentTitle}</h1>
              <p className="text-lg mb-6">{contentDescription}</p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <h2 className="font-bold">Need help with VA debt after a natural disaster?</h2>
                <p>Learn how to get temporary debt relief</p>
              </div>

              <h2 className="text-xl font-bold mb-2">On this page</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Need help with VA debt after a natural disaster?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Review your benefit debt and copay bills online
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Make a payment now
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden mb-8">
            <div className="bg-gray-100 border-b px-4 py-2">
              <div className="text-sm font-medium">Generated Code</div>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 overflow-auto max-h-[300px] text-sm">
              <code>{`import React from "react";
import { VAHeader } from "@va/components/header";
import { VAFooter } from "@va/components/footer";
import { VAAlert } from "@va/components/alert";

export default function ManageVADebtPage() {
  return (
    <>
      <VAHeader />
      
      <main className="va-main-content">
        <div className="va-breadcrumbs">
          <nav aria-label="Breadcrumb">
            <ol>
              <li><a href="/">VA.gov home</a></li>
              <li>Manage your VA debt</li>
            </ol>
          </nav>
        </div>
        
        <div className="va-container">
          <div className="va-row">
            <div className="va-col-md-8">
              <h1>${contentTitle}</h1>
              <p className="va-introtext">${contentDescription}</p>
              
              <VAAlert status="info" headline="Need help with VA debt after a natural disaster?">
                <p>Learn how to get temporary debt relief</p>
              </VAAlert>
              
              <h2>On this page</h2>
              <ul>
                <li><a href="#need-help">Need help with VA debt after a natural disaster?</a></li>
                <li><a href="#review">Review your benefit debt and copay bills online</a></li>
                <li><a href="#make-payment">Make a payment now</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <VAFooter />
    </>
  );
}`}</code>
            </pre>
          </div>

          <h3 className="text-xl font-bold mb-4">Full Page Preview</h3>
          <p className="mb-6">
            Click the button below to see a full-page preview of the single-column layout with the VA header and footer.
          </p>

          <div className="flex gap-4 mb-8">
            <Button
              className="bg-[#0071bc] hover:bg-[#205493]"
              onClick={() => window.open("/layout-preview/full", "_blank")}
            >
              Open Full Preview
            </Button>
            <Button variant="outline">Download Code</Button>
          </div>
        </div>
      </main>
      <VAFooter />
    </div>
  )
}

