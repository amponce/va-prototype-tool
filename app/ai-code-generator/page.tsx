"use client"

import { useState } from "react"
import { VAHeader } from "@/components/va-specific/va-header"
import { VAFooter } from "@/components/va-specific/va-footer"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { VAContentContainer } from "@/components/va-specific/va-content-container"
import { ImprovedCodeEditor } from "@/components/editors/improved-code-editor"
import {
  VaAlert,
  VaTextInput,
  VaButton,
  VaAccordion,
  VaAccordionItem,
  VaTable
} from "@department-of-veterans-affairs/component-library/dist/react-bindings"

export default function AICodeGeneratorPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [copied, setCopied] = useState(false)

  // This is a mock function to simulate code generation
  // In a real implementation, this would call an API endpoint
  const generateCode = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock response - in a real implementation, this would come from the API
    const mockResponse = `// Generated VA component based on prompt: "${prompt}"
import React from "react";
import { VAContentContainer } from "@/components/va-content-container";

export default function GeneratedComponent() {
  return (
    <VAContentContainer>
      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <div className="vads-l-col--12">
            <h1 className="vads-u-font-size--h1 vads-u-margin-bottom--2">
              Generated VA Component
            </h1>
            <p className="va-introtext">
              This component was generated based on your prompt.
            </p>
            
            <VaAlert status="info" visible>
              <h3 slot="headline" className="vads-u-margin-top--0">About VA Web Components</h3>
              <p>
                This tool generates code using the official VA web components from the{" "}
                <a
                  href="https://design.va.gov/storybook/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vads-u-color--primary"
                >
                  VA Design System
                </a>
                . These components ensure your prototypes follow VA design guidelines and accessibility
                standards.
              </p>
            </VaAlert>
            
            <div className="vads-u-margin-top--4">
              <VaButton
                text="Primary Button"
                onClick={() => console.log("Button clicked")}
              ></VaButton>
            </div>
          </div>
        </div>
      </div>
    </VAContentContainer>
  );
}`

    setGeneratedCode(mockResponse)
    setIsGenerating(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
              <h1 className="text-xl font-semibold">VA AI Code Generator</h1>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 bg-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white border rounded-md shadow-sm">
            <VAContentContainer>
              <div className="vads-l-grid-container">
                <div className="vads-l-row">
                  <div className="vads-l-col--12">
                    <h1 className="vads-u-font-size--h1 vads-u-margin-bottom--2">VA AI Code Generator</h1>
                    <p className="va-introtext">
                      Generate VA Design System components using AI. Describe what you want, and the AI will generate
                      the code for you using official VA web components.
                    </p>

                    <VaAlert status="info" visible>
                      <h3 slot="headline" className="vads-u-margin-top--0">About VA Web Components</h3>
                      <p>
                        This tool generates code using the official VA web components from the{" "}
                        <a
                          href="https://design.va.gov/storybook/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="vads-u-color--primary"
                        >
                          VA Design System
                        </a>
                        . These components ensure your prototypes follow VA design guidelines and accessibility
                        standards.
                      </p>
                    </VaAlert>

                    <div className="vads-u-margin-top--4 vads-u-margin-bottom--4">
                      <VaTextInput
                        label="Describe the VA component you want to create:"
                        name="prompt"
                        value={prompt}
                        onInput={(e: any) => setPrompt(e.target.value)}
                      ></VaTextInput>
                      <p className="vads-u-font-style--italic vads-u-margin-top--1 vads-u-margin-bottom--2 vads-u-color--gray-medium">
                        Example: Create a form with name, email, and phone number fields, and a submit button. Include
                        validation and error messages.
                      </p>
                      <div className="vads-u-margin-top--2">
                        <VaButton
                          text={isGenerating ? "Generating..." : "Generate Code"}
                          onClick={generateCode}
                          disabled={isGenerating || !prompt.trim()}
                        ></VaButton>
                      </div>
                    </div>

                    {generatedCode && (
                      <div className="vads-u-margin-bottom--4">
                        <div className="vads-u-display--flex vads-u-justify-content--between vads-u-align-items--center vads-u-margin-bottom--2">
                          <h2 className="vads-u-font-size--h3 vads-u-margin--0">Generated Code</h2>
                          <VaButton
                            text={copied ? "Copied!" : "Copy Code"}
                            onClick={copyToClipboard}
                            secondary
                          ></VaButton>
                        </div>
                        <div className="code-editor-container">
                          <ImprovedCodeEditor code={generatedCode} onChange={setGeneratedCode} />
                        </div>
                      </div>
                    )}

                    <VaAccordion>
                      <VaAccordionItem header="Implementation Guide">
                        <h3 className="vads-u-font-size--h3 vads-u-margin-top--0">
                          How to Implement This AI Code Generator
                        </h3>
                        <p className="vads-u-margin-bottom--2">
                          To implement this AI code generator in your application, you'll need to:
                        </p>
                        <ol className="vads-u-padding-left--4">
                          <li className="vads-u-margin-bottom--1">
                            Set up an API endpoint that communicates with an AI model (like OpenAI's GPT-4)
                          </li>
                          <li className="vads-u-margin-bottom--1">
                            Create a prompt template that includes context about VA Design System components
                          </li>
                          <li className="vads-u-margin-bottom--1">
                            Implement a code editor for displaying and editing the generated code
                          </li>
                          <li className="vads-u-margin-bottom--1">
                            Add functionality to copy the code to the clipboard
                          </li>
                          <li>Optionally, add a preview feature to see the generated component in action</li>
                        </ol>

                        <h3 className="vads-u-font-size--h3 vads-u-margin-top--4">API Implementation Example</h3>
                        <p className="vads-u-margin-bottom--2">
                          Here's an example of how to implement the API endpoint using Next.js:
                        </p>
                        <pre className="vads-u-background-color--gray-dark vads-u-color--white vads-u-padding--2">
                          <code>{`// app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    // Create a system prompt that includes context about VA Design System
    const systemPrompt = \`You are an AI assistant that generates React components 
    using the VA Design System. Use web components from the VA component library 
    like va-button, va-alert, va-accordion, etc. Always import the VAContentContainer 
    component and follow VA design guidelines.\`;
    
    // Call the OpenAI API
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    
    // Extract the generated code
    const generatedCode = response.data.choices[0].message?.content || '';
    
    return NextResponse.json({ code: generatedCode });
  } catch (error) {
    console.error('Error generating code:', error);
    return NextResponse.json(
      { error: 'Failed to generate code' },
      { status: 500 }
    );
  }
}`}</code>
                        </pre>

                        <h3 className="vads-u-font-size--h3 vads-u-margin-top--4">Frontend Implementation</h3>
                        <p className="vads-u-margin-bottom--2">
                          Here's how to implement the frontend code to call the API:
                        </p>
                        <pre className="vads-u-background-color--gray-dark vads-u-color--white vads-u-padding--2">
                          <code>{`// Function to call the API
const generateCode = async () => {
  if (!prompt.trim()) return;

  setIsGenerating(true);
  
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate code');
    }
    
    const data = await response.json();
    setGeneratedCode(data.code);
  } catch (error) {
    console.error('Error:', error);
    // Handle error state
  } finally {
    setIsGenerating(false);
  }
}`}</code>
                        </pre>
                      </VaAccordionItem>

                      <VaAccordionItem header="Best Practices">
                        <h3 className="vads-u-font-size--h3 vads-u-margin-top--0">
                          Best Practices for VA Component Generation
                        </h3>
                        <ul className="vads-u-padding-left--4">
                          <li className="vads-u-margin-bottom--1">
                            Include detailed context about VA Design System in your prompts
                          </li>
                          <li className="vads-u-margin-bottom--1">
                            Implement rate limiting to prevent abuse of the API
                          </li>
                          <li className="vads-u-margin-bottom--1">
                            Add validation to ensure the generated code follows VA guidelines
                          </li>
                          <li className="vads-u-margin-bottom--1">
                            Provide examples and templates to help users write effective prompts
                          </li>
                          <li>Consider adding a feedback mechanism to improve the AI over time</li>
                        </ul>

                        <h3 className="vads-u-font-size--h3 vads-u-margin-top--4">VA Component Guidelines</h3>
                        <p>When generating VA components, ensure they follow these guidelines:</p>
                        <ul className="vads-u-padding-left--4">
                          <li className="vads-u-margin-bottom--1">
                            Use official VA web components (va-button, va-alert, etc.)
                          </li>
                          <li className="vads-u-margin-bottom--1">
                            Include the "uswds" attribute on components that support it
                          </li>
                          <li className="vads-u-margin-bottom--1">Follow VA spacing and typography guidelines</li>
                          <li className="vads-u-margin-bottom--1">Ensure all components are accessible</li>
                          <li>Use VA color palette and design tokens</li>
                        </ul>
                      </VaAccordionItem>

                      <VaAccordionItem header="VA Component Reference">
                        <h3 className="vads-u-font-size--h3 vads-u-margin-top--0">Common VA Web Components</h3>
                        <p>Here's a reference of commonly used VA web components:</p>

                        <VaTable>
                          <thead slot="headers">
                            <tr>
                              <th>Component</th>
                              <th>Description</th>
                              <th>Example</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>va-button</td>
                              <td>Standard button component</td>
                              <td>
                                <code>{`<va-button text="Button text" uswds></va-button>`}</code>
                              </td>
                            </tr>
                            <tr>
                              <td>va-alert</td>
                              <td>Alert messages</td>
                              <td>
                                <code>{`<va-alert status="info" visible uswds headline="Info"></va-alert>`}</code>
                              </td>
                            </tr>
                            <tr>
                              <td>va-accordion</td>
                              <td>Expandable content sections</td>
                              <td>
                                <code>{`<va-accordion uswds><va-accordion-item header="Title" uswds></va-accordion-item></va-accordion>`}</code>
                              </td>
                            </tr>
                            <tr>
                              <td>va-text-input</td>
                              <td>Text input field</td>
                              <td>
                                <code>{`<va-text-input label="Label" name="name" uswds></va-text-input>`}</code>
                              </td>
                            </tr>
                            <tr>
                              <td>va-checkbox</td>
                              <td>Checkbox input</td>
                              <td>
                                <code>{`<va-checkbox label="Label" name="name" uswds></va-checkbox>`}</code>
                              </td>
                            </tr>
                            <tr>
                              <td>va-radio</td>
                              <td>Radio button input</td>
                              <td>
                                <code>{`<va-radio label="Label" name="name" value="value" uswds></va-radio>`}</code>
                              </td>
                            </tr>
                            <tr>
                              <td>va-select</td>
                              <td>Dropdown select</td>
                              <td>
                                <code>{`<va-select label="Label" name="name" uswds></va-select>`}</code>
                              </td>
                            </tr>
                            <tr>
                              <td>va-card</td>
                              <td>Content card</td>
                              <td>
                                <code>{`<va-card><h3 slot="headline">Title</h3></va-card>`}</code>
                              </td>
                            </tr>
                          </tbody>
                        </VaTable>

                        <p className="vads-u-margin-top--4">
                          For a complete reference, visit the{" "}
                          <a
                            href="https://design.va.gov/storybook/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="vads-u-color--primary"
                          >
                            VA Design System Storybook
                          </a>
                          .
                        </p>
                      </VaAccordionItem>
                    </VaAccordion>
                  </div>
                </div>
              </div>
            </VAContentContainer>
          </div>
        </div>
      </main>
      <VAFooter />
    </div>
  )
}

