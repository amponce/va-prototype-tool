"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#112e51]"
            >
              <path
                d="M32.3519 7.648C29.0359 4.332 24.6799 2.5 20.0039 2.5C15.3279 2.5 10.9719 4.332 7.65594 7.648C4.33994 10.964 2.50794 15.32 2.50794 19.996C2.50794 24.672 4.33994 29.028 7.65594 32.344C10.9719 35.66 15.3279 37.492 20.0039 37.492C24.6799 37.492 29.0359 35.66 32.3519 32.344C35.6679 29.028 37.4999 24.672 37.4999 19.996C37.4999 15.32 35.6679 10.964 32.3519 7.648ZM20.0039 22.5C18.6199 22.5 17.5039 21.384 17.5039 20C17.5039 18.616 18.6199 17.5 20.0039 17.5C21.3879 17.5 22.5039 18.616 22.5039 20C22.5039 21.384 21.3879 22.5 20.0039 22.5ZM25.0039 10H15.0039V15H25.0039V10ZM25.0039 25H15.0039V30H25.0039V25Z"
                fill="currentColor"
              />
            </svg>
            <span className="font-bold text-xl text-[#112e51]">VA Prototyping</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 shrink-0">
            <div className="bg-white border rounded-lg p-4 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Documentation</h2>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveSection("overview")}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === "overview" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"
                      }`}
                    >
                      Overview
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection("getting-started")}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === "getting-started"
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      Getting Started
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection("va-components")}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === "va-components"
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      VA Components
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection("api-key-setup")}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === "api-key-setup"
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      API Key Setup
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection("troubleshooting")}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === "troubleshooting"
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      Troubleshooting
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white border rounded-lg p-6">
              {/* Overview Section */}
              {activeSection === "overview" && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">VA Prototyping Tool</h1>
                  <p className="text-gray-700 mb-4">
                    A rapid prototyping tool for building VA applications using the official VA Design System.
                  </p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">What is the VA Prototyping Tool?</h2>
                  <p className="text-gray-700 mb-4">
                    The VA Prototyping Tool is a comprehensive solution for quickly creating prototypes that follow the
                    VA Design System guidelines. It provides pre-built templates, components, and tools to help you
                    build accessible, consistent, and user-friendly VA applications.
                  </p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Key Features</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Official VA Design System components and patterns</li>
                    <li>Pre-built templates for common VA page layouts</li>
                    <li>AI-powered code generation for VA components</li>
                    <li>Interactive code editor with preview functionality</li>
                    <li>Accessibility compliance built-in</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Getting Started</h2>
                  <p className="text-gray-700 mb-4">
                    To get started with the VA Prototyping Tool, explore the documentation sections in the sidebar. You
                    can learn about VA components, layouts, and how to use the AI code generator to speed up your
                    development process.
                  </p>
                  <p className="text-gray-700">
                    If you want to use the AI code generator, you'll need to set up your OpenAI API key. See the API Key
                    Setup section for instructions.
                  </p>
                </div>
              )}

              {/* Getting Started Section */}
              {activeSection === "getting-started" && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">Getting Started</h1>
                  <p className="text-gray-700 mb-4">
                    Learn how to use the VA Prototyping Tool to create VA-compliant applications quickly.
                  </p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Creating Your First Prototype</h2>
                  <ol className="list-decimal pl-6 space-y-4 text-gray-700">
                    <li>
                      <strong>Choose a template:</strong> Start by selecting a template from the homepage that best
                      matches your needs.
                    </li>
                    <li>
                      <strong>Customize the template:</strong> Use the code editor to modify the template to fit your
                      specific requirements.
                    </li>
                    <li>
                      <strong>Add VA components:</strong> Incorporate additional VA components as needed from the VA
                      Components Showcase.
                    </li>
                    <li>
                      <strong>Use the AI code generator:</strong> For complex components, use the AI code generator to
                      create custom VA components based on your descriptions.
                    </li>
                    <li>
                      <strong>Preview and iterate:</strong> Use the preview functionality to see your changes in
                      real-time and iterate until you're satisfied with the result.
                    </li>
                  </ol>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Best Practices</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Always use official VA components when available</li>
                    <li>Follow VA design guidelines for spacing, typography, and color</li>
                    <li>Ensure your prototypes are accessible by using proper semantic HTML and ARIA attributes</li>
                    <li>Test your prototypes with screen readers and keyboard navigation</li>
                    <li>Use the "uswds" attribute on VA components that support it for consistent styling</li>
                  </ul>
                </div>
              )}

              {/* VA Components Section */}
              {activeSection === "va-components" && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">VA Components</h1>
                  <p className="text-gray-700 mb-4">
                    Learn about the official VA Design System components available in the prototyping tool.
                  </p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">What are VA Components?</h2>
                  <p className="text-gray-700 mb-4">
                    VA components are web components that implement the VA Design System. They are custom HTML elements
                    that encapsulate VA design patterns and functionality, making it easy to create consistent,
                    accessible interfaces that follow VA design guidelines.
                  </p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Core Components</h2>
                  <p className="text-gray-700 mb-4">
                    Here are some of the core VA components available in the prototyping tool:
                  </p>

                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-semibold mb-2">va-button</h3>
                      <p className="text-gray-700 mb-2">Standard button component</p>
                      <pre className="bg-gray-100 p-2 rounded-md text-sm overflow-x-auto">
                        <code>{`<va-button text="Primary Button" uswds></va-button>
<va-button text="Secondary Button" secondary uswds></va-button>`}</code>
                      </pre>
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="font-semibold mb-2">va-alert</h3>
                      <p className="text-gray-700 mb-2">Alert messages</p>
                      <pre className="bg-gray-100 p-2 rounded-md text-sm overflow-x-auto">
                        <code>{`<va-alert status="success" visible uswds headline="Success status">
  <p>Your application has been successfully submitted.</p>
</va-alert>`}</code>
                      </pre>
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="font-semibold mb-2">va-text-input</h3>
                      <p className="text-gray-700 mb-2">Text input field</p>
                      <pre className="bg-gray-100 p-2 rounded-md text-sm overflow-x-auto">
                        <code>{`<va-text-input label="Text input" name="text-input-example" uswds></va-text-input>`}</code>
                      </pre>
                    </div>
                  </div>

                  <p className="text-gray-700 mt-6">
                    For a complete reference of all available VA components, visit the{" "}
                    <Link href="/va-components-showcase" className="text-blue-600 hover:underline">
                      VA Components Showcase
                    </Link>
                    .
                  </p>
                </div>
              )}

              {/* API Key Setup Section */}
              {activeSection === "api-key-setup" && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">API Key Setup</h1>
                  <p className="text-gray-700 mb-4">Configure your OpenAI API key to use the AI code generator.</p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <h2 className="text-lg font-semibold text-blue-700">Important</h2>
                    <p className="text-gray-700">
                      The API key is stored securely in your environment variables and is never sent to our servers. It
                      is only used to make requests to the OpenAI API directly from your browser.
                    </p>
                  </div>

                  <h2 className="text-xl font-semibold mt-6 mb-3">How to Get an OpenAI API Key</h2>
                  <p className="text-gray-700 mb-4">
                    If you don't have an OpenAI API key, you can get one by following these steps:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>
                      Go to{" "}
                      <a
                        href="https://platform.openai.com/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        OpenAI's website
                      </a>{" "}
                      and sign up for an account
                    </li>
                    <li>Once logged in, navigate to the API section</li>
                    <li>Create a new API key</li>
                    <li>Copy the API key and paste it in the API Key Setup modal on the homepage</li>
                  </ol>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Setting Up Your API Key</h2>
                  <p className="text-gray-700 mb-4">To set up your OpenAI API key:</p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>Click on the "Set API Key" button in the header of the application</li>
                    <li>Paste your OpenAI API key in the input field</li>
                    <li>Click "Save API Key"</li>
                    <li>The system will validate your API key with OpenAI</li>
                    <li>If the key is valid, you'll see a success message and can start using the AI code generator</li>
                  </ol>

                  <h2 className="text-xl font-semibold mt-6 mb-3">API Key Requirements</h2>
                  <p className="text-gray-700 mb-4">Your OpenAI API key must meet the following requirements:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Start with "sk-"</li>
                    <li>Be at least 20 characters long</li>
                    <li>Have sufficient credits in your OpenAI account</li>
                    <li>Have access to the GPT-4 model (required for the AI code generator)</li>
                  </ul>
                </div>
              )}

              {/* Troubleshooting Section */}
              {activeSection === "troubleshooting" && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">Troubleshooting</h1>
                  <p className="text-gray-700 mb-4">Common issues and their solutions.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">API Key Issues</h2>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-semibold mb-2">API Key Not Recognized</h3>
                      <p className="text-gray-700 mb-2">If your API key is not being recognized:</p>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        <li>Ensure you've copied the entire API key without any extra spaces</li>
                        <li>Verify that the key starts with "sk-"</li>
                        <li>Check that the key is at least 20 characters long</li>
                        <li>Try generating a new API key from the OpenAI dashboard</li>
                        <li>Clear your browser cache and try again</li>
                      </ul>
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="font-semibold mb-2">API Key Validation Fails</h3>
                      <p className="text-gray-700 mb-2">If your API key validation fails:</p>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        <li>Check that your OpenAI account has sufficient credits</li>
                        <li>Verify that you have access to the GPT-4 model</li>
                        <li>Ensure your API key hasn't been revoked or expired</li>
                        <li>
                          Check if there are any service outages on the{" "}
                          <a
                            href="https://status.openai.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            OpenAI status page
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="font-semibold mb-2">API Key Works But No Response</h3>
                      <p className="text-gray-700 mb-2">If your API key is valid but you're not getting responses:</p>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        <li>Check your browser console for any error messages</li>
                        <li>Verify that your prompt is clear and specific</li>
                        <li>Try a simpler prompt to see if it works</li>
                        <li>Check if you've reached your API rate limits</li>
                        <li>Ensure your account has sufficient credits</li>
                      </ul>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Debugging Steps</h2>
                  <p className="text-gray-700 mb-4">
                    If you're experiencing issues with the application, try these debugging steps:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>Clear your browser cache and cookies</li>
                    <li>Try using a different browser</li>
                    <li>Check your browser console for error messages</li>
                    <li>Verify that your internet connection is stable</li>
                    <li>Try setting up your API key again</li>
                    <li>Restart your browser and try again</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 text-sm">
            VA Rapid Prototyping Tool | © {new Date().getFullYear()} Department of Veterans Affairs
          </p>
        </div>
      </footer>
    </div>
  )
}

