import Link from "next/link"
import { LayoutIcon, DollarSign, Layers } from "lucide-react"

const templates = [
  {
    title: "Single Column Layout",
    description: "A simple single column layout for content-focused pages",
    href: "/single-column",
    icon: LayoutIcon,
  },
  {
    title: "Current Copay Balances",
    description: "View and manage VA health care and prescription charges",
    href: "/copay-balances",
    icon: DollarSign,
  },
  {
    title: "VA Components Showcase",
    description: "Explore official VA Design System components",
    href: "/va-components-showcase",
    icon: Layers,
  },
]

export function TemplateGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {templates.map((template) => (
        <Link key={template.href} href={template.href}>
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
              <template.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
            <p className="text-gray-600 text-sm flex-grow">{template.description}</p>
            <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
              View template
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
                className="h-4 w-4 ml-1"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

