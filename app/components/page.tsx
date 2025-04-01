import { VAHeader } from "@/components/va-specific/va-header"
import { VAFooter } from "@/components/va-specific/va-footer"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import Link from "next/link"

export default function ComponentsPage() {
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
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">VA Design System Components</h1>
            <p className="text-gray-600">Browse and use official VA Design System components in your prototypes</p>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search components..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: "button", name: "Button", category: "inputs", image: "/placeholder.svg?height=100&width=150" },
                  {
                    id: "text-input",
                    name: "Text Input",
                    category: "inputs",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                  {
                    id: "checkbox",
                    name: "Checkbox",
                    category: "inputs",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                  {
                    id: "radio",
                    name: "Radio Button",
                    category: "inputs",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                  { id: "select", name: "Select", category: "inputs", image: "/placeholder.svg?height=100&width=150" },
                  {
                    id: "date-picker",
                    name: "Date Picker",
                    category: "inputs",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                  {
                    id: "navigation",
                    name: "Navigation",
                    category: "navigation",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                  {
                    id: "breadcrumbs",
                    name: "Breadcrumbs",
                    category: "navigation",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                  {
                    id: "pagination",
                    name: "Pagination",
                    category: "navigation",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                  { id: "alert", name: "Alert", category: "feedback", image: "/placeholder.svg?height=100&width=150" },
                  { id: "modal", name: "Modal", category: "feedback", image: "/placeholder.svg?height=100&width=150" },
                  {
                    id: "progress",
                    name: "Progress Bar",
                    category: "feedback",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                  { id: "card", name: "Card", category: "layout", image: "/placeholder.svg?height=100&width=150" },
                  {
                    id: "accordion",
                    name: "Accordion",
                    category: "layout",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                  { id: "tabs", name: "Tabs", category: "layout", image: "/placeholder.svg?height=100&width=150" },
                ].map((component) => (
                  <Card key={component.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <div className="p-4">
                      <img
                        src={component.image || "/placeholder.svg"}
                        alt={component.name}
                        className="w-full h-24 object-cover rounded-md mb-4"
                      />
                      <h3 className="font-semibold text-lg">{component.name}</h3>
                      <p className="text-sm text-gray-500">{component.category}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Other tab contents would be similar but filtered by category */}
            <TabsContent value="inputs" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: "button", name: "Button", category: "inputs", image: "/placeholder.svg?height=100&width=150" },
                  {
                    id: "text-input",
                    name: "Text Input",
                    category: "inputs",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                  {
                    id: "checkbox",
                    name: "Checkbox",
                    category: "inputs",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                  {
                    id: "radio",
                    name: "Radio Button",
                    category: "inputs",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                  { id: "select", name: "Select", category: "inputs", image: "/placeholder.svg?height=100&width=150" },
                  {
                    id: "date-picker",
                    name: "Date Picker",
                    category: "inputs",
                    image: "/placeholder.svg?height=100&width=150",
                  },
                ].map((component) => (
                  <Card key={component.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <div className="p-4">
                      <img
                        src={component.image || "/placeholder.svg"}
                        alt={component.name}
                        className="w-full h-24 object-cover rounded-md mb-4"
                      />
                      <h3 className="font-semibold text-lg">{component.name}</h3>
                      <p className="text-sm text-gray-500">{component.category}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <VAFooter />
    </div>
  )
}

