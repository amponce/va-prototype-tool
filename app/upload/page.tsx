import { VAHeader } from "@/components/va-header"
import { VAFooter } from "@/components/va-footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, Layout } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <VAHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mt-8 mb-16">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-4">
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
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Upload Design</h1>
            <p className="text-gray-600">Upload your Figma design or screenshot to generate a VA-compliant prototype</p>
          </div>

          <Tabs defaultValue="figma" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="figma" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Figma Import</span>
              </TabsTrigger>
              <TabsTrigger value="screenshot" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Screenshot</span>
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                <span>Select Layout</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="figma" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Import from Figma</h2>
                <p className="mb-6 text-gray-600">
                  Paste your Figma file URL or upload a Figma export to generate a VA-compliant prototype.
                </p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Figma URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://www.figma.com/file/..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button>Import</Button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-500 mb-4">Or upload a Figma export file</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600 mb-2">Drag and drop your Figma export file here</p>
                    <p className="text-sm text-gray-500 mb-4">Supports .fig and .figma files</p>
                    <Button variant="outline">Browse Files</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="screenshot" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Upload Screenshot</h2>
                <p className="mb-6 text-gray-600">
                  Upload a screenshot of your design to generate a VA-compliant prototype.
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 mb-2">Drag and drop your screenshot here</p>
                  <p className="text-sm text-gray-500 mb-4">Supports PNG, JPG, and WEBP files</p>
                  <Button variant="outline">Browse Files</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Select a Layout</h2>
                <p className="mb-6 text-gray-600">
                  Choose from pre-designed VA-compliant layouts to start your prototype.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "landing", name: "Landing Page", image: "/placeholder.svg?height=120&width=200" },
                    { id: "form", name: "Form Page", image: "/placeholder.svg?height=120&width=200" },
                    { id: "dashboard", name: "Dashboard", image: "/placeholder.svg?height=120&width=200" },
                    { id: "profile", name: "Profile Page", image: "/placeholder.svg?height=120&width=200" },
                  ].map((layout) => (
                    <div key={layout.id} className="border rounded-md p-4 hover:border-blue-500 cursor-pointer">
                      <img
                        src={layout.image || "/placeholder.svg"}
                        alt={layout.name}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      <h3 className="font-medium">{layout.name}</h3>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button className="bg-[#0071bc] hover:bg-[#205493]">Generate Prototype</Button>
          </div>
        </div>
      </main>
      <VAFooter />
    </div>
  )
}

