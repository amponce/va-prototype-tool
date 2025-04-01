"use client"

import { VAHeader } from "@/components/va-header"
import { VAFooter } from "@/components/va-footer"
import { VAExample } from "@/components/va-example"
import Link from "next/link"

export default function VAComponentsExamplePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <VAHeader />
      <main className="flex-1">
        <div className="bg-gray-100 py-2">
          <div className="container mx-auto px-4">
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
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <VAExample />
        </div>
      </main>
      <VAFooter />
    </div>
  )
}

