"use client"

import { useState, useEffect } from "react"
import { VAHeader } from "@/components/va-header"
import { VAFooter } from "@/components/va-footer"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { VAContentContainer } from "@/components/va-content-container"

export default function VAComponentsShowcasePage() {
  const [activeTab, setActiveTab] = useState("buttons")

  // Ensure web components are loaded
  useEffect(() => {
    // This script is already loaded in VAComponentsProvider, but we're adding it here as a safeguard
    const script = document.createElement("script")
    script.src = "https://unpkg.com/@department-of-veterans-affairs/component-library@46.2.3/dist/component-library.js"
    script.async = true

    if (!document.querySelector('script[src*="component-library.js"]')) {
      document.body.appendChild(script)
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <VAHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto mt-4">
            <div className="mb-8">
              <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-4">
                <ChevronLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">VA Components Showcase</h1>
              <p className="text-gray-600">
                This page showcases various components from the official VA Design System that you can use in your prototypes.
              </p>
            </div>

            <div className="bg-white border rounded-md shadow-sm p-6">
              <VAContentContainer>
                <div className="vads-l-grid-container">
                  <div className="vads-l-row">
                    <div className="vads-l-col--12">
                      {/* Component Navigation */}
                      <div className="vads-u-display--flex vads-u-flex-wrap--wrap vads-u-margin-y--4">
                        {["buttons", "alerts", "accordions", "forms", "cards"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`vads-u-padding-x--2 vads-u-padding-y--1 vads-u-margin-right--2 vads-u-margin-bottom--2 vads-u-font-weight--bold vads-u-text-transform--capitalize ${
                              activeTab === tab
                                ? "vads-u-background-color--primary vads-u-color--white"
                                : "vads-u-background-color--gray-light-alt vads-u-color--gray-dark"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* Buttons Section */}
                      {activeTab === "buttons" && (
                        <div className="component-section">
                          <h2 className="vads-u-font-size--h2 vads-u-margin-bottom--2">Buttons</h2>
                          <p className="vads-u-margin-bottom--3">
                            Buttons are used for actions, like submitting a form or confirming a choice.
                          </p>

                          <div className="vads-u-display--flex vads-u-flex-wrap--wrap vads-u-align-items--center vads-u-margin-bottom--4">
                            <va-button text="Primary Button" uswds></va-button>
                            <div className="vads-u-margin-x--2">
                              <va-button text="Secondary Button" secondary uswds></va-button>
                            </div>
                            <va-button text="Disabled Button" disabled uswds></va-button>
                          </div>

                          <div className="vads-u-margin-top--4">
                            <h3 className="vads-u-font-size--h3 vads-u-margin-bottom--2">Button with Icon</h3>
                            <div className="vads-u-display--flex vads-u-flex-wrap--wrap vads-u-align-items--center vads-u-margin-bottom--4">
                              <va-button text="Download" icon="download" uswds></va-button>
                              <div className="vads-u-margin-x--2">
                                <va-button text="Print" icon="print" secondary uswds></va-button>
                              </div>
                            </div>
                          </div>

                          <div className="vads-u-background-color--gray-lightest vads-u-padding--3 vads-u-margin-bottom--4">
                            <h3 className="vads-u-font-size--h3 vads-u-margin-top--0">Usage</h3>
                            <p className="vads-u-margin-bottom--2">
                              Use the primary button for the main action and secondary buttons for alternative actions.
                            </p>
                            <pre className="vads-u-background-color--gray-dark vads-u-color--white vads-u-padding--2">
                              <code>{`<va-button text="Primary Button" uswds></va-button>
<va-button text="Secondary Button" secondary uswds></va-button>
<va-button text="Disabled Button" disabled uswds></va-button>
<va-button text="Download" icon="download" uswds></va-button>`}</code>
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* Alerts Section */}
                      {activeTab === "alerts" && (
                        <div className="component-section">
                          <h2 className="vads-u-font-size--h2 vads-u-margin-bottom--2">Alerts</h2>
                          <p className="vads-u-margin-bottom--3">
                            Alerts keep users informed of important and sometimes time-sensitive changes.
                          </p>

                          <div className="vads-u-margin-bottom--4">
                            <va-alert status="success" visible uswds headline="Success status">
                              <p>Your application has been successfully submitted.</p>
                            </va-alert>

                            <div className="vads-u-margin-top--3">
                              <va-alert status="warning" visible uswds headline="Warning status">
                                <p>You have unsaved changes that will be lost if you continue.</p>
                              </va-alert>
                            </div>

                            <div className="vads-u-margin-top--3">
                              <va-alert status="error" visible uswds headline="Error status">
                                <p>There was a problem with your submission.</p>
                              </va-alert>
                            </div>

                            <div className="vads-u-margin-top--3">
                              <va-alert status="info" visible uswds headline="Information status">
                                <p>This service will be unavailable on Saturday from 8:00 PM to 12:00 AM.</p>
                              </va-alert>
                            </div>
                          </div>

                          <div className="vads-u-background-color--gray-lightest vads-u-padding--3 vads-u-margin-bottom--4">
                            <h3 className="vads-u-font-size--h3 vads-u-margin-top--0">Usage</h3>
                            <p className="vads-u-margin-bottom--2">
                              Use alerts to notify users about the status of their actions, system status, or important
                              information.
                            </p>
                            <pre className="vads-u-background-color--gray-dark vads-u-color--white vads-u-padding--2">
                              <code>{`<va-alert
  status="success"
  visible
  uswds
  headline="Success status"
>
  <p>Your application has been successfully submitted.</p>
</va-alert>`}</code>
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* Accordions Section */}
                      {activeTab === "accordions" && (
                        <div className="component-section">
                          <h2 className="vads-u-font-size--h2 vads-u-margin-bottom--2">Accordions</h2>
                          <p className="vads-u-margin-bottom--3">
                            Accordions are expandable and collapsible content sections that display one section of content
                            at a time.
                          </p>

                          <div className="vads-u-margin-bottom--4">
                            <va-accordion uswds>
                              <va-accordion-item header="First Amendment" uswds>
                                <p>
                                  Congress shall make no law respecting an establishment of religion, or prohibiting the
                                  free exercise thereof; or abridging the freedom of speech, or of the press; or the right
                                  of the people peaceably to assemble, and to petition the Government for a redress of
                                  grievances.
                                </p>
                              </va-accordion-item>
                              <va-accordion-item header="Second Amendment" uswds>
                                <p>
                                  A well regulated Militia, being necessary to the security of a free State, the right of
                                  the people to keep and bear Arms, shall not be infringed.
                                </p>
                              </va-accordion-item>
                              <va-accordion-item header="Third Amendment" uswds>
                                <p>
                                  No Soldier shall, in time of peace be quartered in any house, without the consent of the
                                  Owner, nor in time of war, but in a manner to be prescribed by law.
                                </p>
                              </va-accordion-item>
                            </va-accordion>
                          </div>

                          <div className="vads-u-background-color--gray-lightest vads-u-padding--3 vads-u-margin-bottom--4">
                            <h3 className="vads-u-font-size--h3 vads-u-margin-top--0">Usage</h3>
                            <p className="vads-u-margin-bottom--2">
                              Use accordions to organize content into collapsible sections, making it easier for users to
                              scan and find relevant information.
                            </p>
                            <pre className="vads-u-background-color--gray-dark vads-u-color--white vads-u-padding--2">
                              <code>{`<va-accordion uswds>
  <va-accordion-item header="First Amendment" uswds>
    <p>Content here...</p>
  </va-accordion-item>
  <va-accordion-item header="Second Amendment" uswds>
    <p>Content here...</p>
  </va-accordion-item>
</va-accordion>`}</code>
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* Forms Section */}
                      {activeTab === "forms" && (
                        <div className="component-section">
                          <h2 className="vads-u-font-size--h2 vads-u-margin-bottom--2">Form Elements</h2>
                          <p className="vads-u-margin-bottom--3">
                            Form elements allow users to enter information and make selections.
                          </p>

                          <div className="vads-u-margin-bottom--4">
                            <div className="vads-u-margin-bottom--3">
                              <va-text-input label="Text input" name="text-input-example" uswds></va-text-input>
                            </div>

                            <div className="vads-u-margin-bottom--3">
                              <va-textarea label="Text area" name="textarea-example" uswds></va-textarea>
                            </div>

                            <div className="vads-u-margin-bottom--3">
                              <va-checkbox label="Option 1" name="checkbox-example-1" uswds></va-checkbox>
                              <va-checkbox label="Option 2" name="checkbox-example-2" uswds></va-checkbox>
                            </div>

                            <div className="vads-u-margin-bottom--3">
                              <va-radio label="Option 1" name="radio-example" value="option1" uswds></va-radio>
                              <va-radio label="Option 2" name="radio-example" value="option2" uswds></va-radio>
                            </div>

                            <div className="vads-u-margin-bottom--3">
                              <va-select label="Select" name="select-example" uswds>
                                <option value="">- Select -</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                              </va-select>
                            </div>

                            <div className="vads-u-margin-bottom--3">
                              <va-date-input label="Date input" name="date-input-example" uswds></va-date-input>
                            </div>

                            <va-button text="Submit" uswds></va-button>
                          </div>

                          <div className="vads-u-background-color--gray-lightest vads-u-padding--3 vads-u-margin-bottom--4">
                            <h3 className="vads-u-font-size--h3 vads-u-margin-top--0">Usage</h3>
                            <p className="vads-u-margin-bottom--2">
                              Use form elements to collect information from users. Always include labels and help text
                              when necessary.
                            </p>
                            <pre className="vads-u-background-color--gray-dark vads-u-color--white vads-u-padding--2">
                              <code>{`<va-text-input
  label="Text input"
  name="text-input-example"
  uswds
></va-text-input>

<va-checkbox
  label="Option 1"
  name="checkbox-example"
  uswds
></va-checkbox>

<va-radio
  label="Option 1"
  name="radio-example"
  value="option1"
  uswds
></va-radio>

<va-select
  label="Select"
  name="select-example"
  uswds
>
  <option value="">- Select -</option>
  <option value="1">Option 1</option>
</va-select>

<va-date-input
  label="Date input"
  name="date-input-example"
  uswds
></va-date-input>`}</code>
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* Cards Section */}
                      {activeTab === "cards" && (
                        <div className="component-section">
                          <h2 className="vads-u-font-size--h2 vads-u-margin-bottom--2">Cards</h2>
                          <p className="vads-u-margin-bottom--3">Cards are used to group related content and actions.</p>

                          <div className="vads-u-margin-bottom--4">
                            <va-card show-shadow="true">
                              <h3 slot="headline">Card with headline</h3>
                              <p>This is a basic card with a headline and content.</p>
                              <va-button slot="actions" text="Learn more" uswds></va-button>
                            </va-card>

                            <div className="vads-u-margin-top--4">
                              <va-card show-shadow="true">
                                <img slot="media" src="/placeholder.svg?height=200&width=400" alt="Placeholder" />
                                <h3 slot="headline">Card with media</h3>
                                <p>This card includes an image and a headline.</p>
                                <div slot="actions">
                                  <va-button text="Primary action" uswds></va-button>
                                  <va-button
                                    text="Secondary action"
                                    secondary
                                    uswds
                                    class="vads-u-margin-left--2"
                                  ></va-button>
                                </div>
                              </va-card>
                            </div>
                          </div>

                          <div className="vads-u-background-color--gray-lightest vads-u-padding--3 vads-u-margin-bottom--4">
                            <h3 className="vads-u-font-size--h3 vads-u-margin-top--0">Usage</h3>
                            <p className="vads-u-margin-bottom--2">
                              Use cards to group related content and actions in a visually distinct container.
                            </p>
                            <pre className="vads-u-background-color--gray-dark vads-u-color--white vads-u-padding--2">
                              <code>{`<va-card show-shadow="true">
  <h3 slot="headline">Card with headline</h3>
  <p>This is a basic card with a headline and content.</p>
  <va-button slot="actions" text="Learn more" uswds></va-button>
</va-card>

<va-card show-shadow="true">
  <img
    slot="media"
    src="/placeholder.svg?height=200&width=400"
    alt="Placeholder"
  />
  <h3 slot="headline">Card with media</h3>
  <p>This card includes an image and a headline.</p>
  <div slot="actions">
    <va-button text="Primary action" uswds></va-button>
    <va-button
      text="Secondary action"
      secondary
      uswds
      class="vads-u-margin-left--2"
    ></va-button>
  </div>
</va-card>`}</code>
                            </pre>
                          </div>
                        </div>
                      )}

                      <div className="vads-u-margin-top--6">
                        <va-additional-info trigger="View more VA components">
                          <p>
                            The VA Design System includes many more components than what's shown here. Visit the{" "}
                            <a
                              href="https://design.va.gov/storybook/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="vads-u-color--primary"
                            >
                              VA Design System Storybook
                            </a>{" "}
                            to explore the full range of components.
                          </p>
                          <p>
                            You can also view the{" "}
                            <a
                              href="https://github.com/department-of-veterans-affairs/component-library/tree/main/packages/web-components/src/components"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="vads-u-color--primary"
                            >
                              source code on GitHub
                            </a>{" "}
                            to understand how these components are implemented.
                          </p>
                        </va-additional-info>
                      </div>
                    </div>
                  </div>
                </div>
              </VAContentContainer>
            </div>
          </div>
        </div>
      </main>
      <VAFooter />
    </div>
  )
}

