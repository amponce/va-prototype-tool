import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const layouts = [
  {
    id: "landing",
    name: "Landing Page",
    description: "A standard landing page with hero section, features, and call to action.",
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "form",
    name: "Form Page",
    description: "A page with a multi-step form for collecting user information.",
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "An administrative dashboard with sidebar navigation and content area.",
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "profile",
    name: "Profile Page",
    description: "A user profile page with personal information and settings.",
    image: "/placeholder.svg?height=120&width=200",
  },
]

export function LayoutSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {layouts.map((layout) => (
        <Card key={layout.id} className="overflow-hidden border-2 hover:border-blue-500 cursor-pointer transition-all">
          <div className="p-4">
            <img
              src={layout.image || "/placeholder.svg"}
              alt={layout.name}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="font-bold text-lg mb-1">{layout.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{layout.description}</p>
            <Button className="w-full bg-[#0071bc] hover:bg-[#205493]">Select Layout</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

