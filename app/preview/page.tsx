import { VAHeader } from "@/components/va-header"
import { VAFooter } from "@/components/va-footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Code, Download, Share2 } from "lucide-react"
import Link from "next/link"

export default function PreviewPage() {
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
              <h1 className="text-xl font-semibold">Benefits Application Preview</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
              <Button size="sm" className="bg-[#0071bc] hover:bg-[#205493]">
                Deploy
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="preview" className="flex-1">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <TabsList className="border-b-0">
              <TabsTrigger value="preview" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                <span>Code</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="preview" className="flex-1 m-0 p-0">
          <div className="bg-gray-100 flex-1 p-4">
            <div className="bg-white border rounded-md shadow-sm max-w-6xl mx-auto">
              {/* VA Header (simplified version for the preview) */}
              <header className="bg-[#112e51] text-white p-4">
                <div className="flex items-center space-x-2">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M32.3519 7.648C29.0359 4.332 24.6799 2.5 20.0039 2.5C15.3279 2.5 10.9719 4.332 7.65594 7.648C4.33994 10.964 2.50794 15.32 2.50794 19.996C2.50794 24.672 4.33994 29.028 7.65594 32.344C10.9719 35.66 15.3279 37.492 20.0039 37.492C24.6799 37.492 29.0359 35.66 32.3519 32.344C35.6679 29.028 37.4999 24.672 37.4999 19.996C37.4999 15.32 35.6679 10.964 32.3519 7.648ZM20.0039 22.5C18.6199 22.5 17.5039 21.384 17.5039 20C17.5039 18.616 18.6199 17.5 20.0039 17.5C21.3879 17.5 22.5039 18.616 22.5039 20C22.5039 21.384 21.3879 22.5 20.0039 22.5ZM25.0039 10H15.0039V15H25.0039V10ZM25.0039 25H15.0039V30H25.0039V25Z"
                      fill="white"
                    />
                  </svg>
                  <span className="font-bold">U.S. Department of Veterans Affairs</span>
                </div>
                <div className="bg-[#0071bc] mt-2 py-2">
                  <nav className="flex space-x-4">
                    <a href="#" className="text-white hover:underline text-sm">
                      Home
                    </a>
                    <a href="#" className="text-white hover:underline text-sm">
                      Benefits
                    </a>
                    <a href="#" className="text-white hover:underline text-sm">
                      Health Care
                    </a>
                    <a href="#" className="text-white hover:underline text-sm">
                      Contact Us
                    </a>
                  </nav>
                </div>
              </header>

              {/* Sample Benefits Application Form */}
              <div className="p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold mb-2">Apply for VA Benefits</h1>
                  <p className="text-gray-600">Complete this form to apply for VA benefits and services.</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#0071bc] text-white flex items-center justify-center font-bold mr-2">
                      1
                    </div>
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Social Security Number</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#0071bc] text-white flex items-center justify-center font-bold mr-2">
                      2
                    </div>
                    <h2 className="text-xl font-semibold">Service Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Branch of Service</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option>Select branch</option>
                        <option>Army</option>
                        <option>Navy</option>
                        <option>Air Force</option>
                        <option>Marines</option>
                        <option>Coast Guard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option>Select status</option>
                        <option>Active Duty</option>
                        <option>Veteran</option>
                        <option>Retired</option>
                        <option>Reserve</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Start Date</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service End Date</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline">Save Draft</Button>
                  <Button className="bg-[#0071bc] hover:bg-[#205493]">Continue to Next Step</Button>
                </div>
              </div>

              {/* VA Footer (simplified version for the preview) */}
              <footer className="bg-[#112e51] text-white p-4 text-center text-sm">
                <p>U.S. Department of Veterans Affairs | 810 Vermont Avenue, NW Washington DC 20420</p>
                <p className="mt-2">
                  © {new Date().getFullYear()} Department of Veterans Affairs. All rights reserved.
                </p>
              </footer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="flex-1 m-0 p-0">
          <div className="bg-gray-100 flex-1 p-4">
            <div className="bg-white border rounded-md shadow-sm max-w-6xl mx-auto p-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Generated Code</h2>
                <p className="text-gray-600 text-sm">This code was generated using the VA Design System components.</p>
              </div>

              <div className="bg-gray-900 text-gray-100 rounded-md p-4 overflow-auto">
                <pre className="text-sm">
                  <code>{`import React from 'react';
import { VAHeader, VAFooter } from '@va/components';
import { 
  TextField, 
  DateField, 
  Select, 
  Button 
} from '@va/form-elements';

export default function BenefitsApplication() {
  return (
    <div className="va-application">
      <VAHeader />
      
      <main className="va-content">
        <div className="va-container">
          <h1 className="va-heading-1">Apply for VA Benefits</h1>
          <p className="va-text">Complete this form to apply for VA benefits and services.</p>
          
          <section className="va-section">
            <h2 className="va-heading-2">
              <span className="va-step-indicator">1</span>
              Personal Information
            </h2>
            
            <div className="va-form-grid">
              <TextField 
                label="First Name" 
                required={true} 
              />
              <TextField 
                label="Last Name" 
                required={true} 
              />
              <DateField 
                label="Date of Birth" 
                required={true} 
              />
              <TextField 
                label="Social Security Number" 
                required={true} 
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"
              />
            </div>
          </section>
          
          <section className="va-section">
            <h2 className="va-heading-2">
              <span className="va-step-indicator">2</span>
              Service Information
            </h2>
            
            <div className="va-form-grid">
              <Select
                label="Branch of Service"
                required={true}
                options={[
                  { value: "", label: "Select branch" },
                  { value: "army", label: "Army" },
                  { value: "navy", label: "Navy" },
                  { value: "airforce", label: "Air Force" },
                  { value: "marines", label: "Marines" },
                  { value: "coastguard", label: "Coast Guard" }
                ]}
              />
              <Select
                label="Service Status"
                required={true}
                options={[
                  { value: "", label: "Select status" },
                  { value: "active", label: "Active Duty" },
                  { value: "veteran", label: "Veteran" },
                  { value: "retired", label: "Retired" },
                  { value: "reserve", label: "Reserve" }
                ]}
              />
              <DateField 
                label="Service Start Date" 
                required={true} 
              />
              <DateField 
                label="Service End Date" 
                required={true} 
              />
            </div>
          </section>
          
          <div className="va-form-actions">
            <Button variant="secondary">Save Draft</Button>
            <Button variant="primary">Continue to Next Step</Button>
          </div>
        </div>
      </main>
      
      <VAFooter />
    </div>
  );
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <VAFooter />
    </div>
  )
}

