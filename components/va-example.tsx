"use client"
import { VAContentContainer } from "@/components/va-content-container"
import {
  VaAccordion,
  VaAccordionItem,
  VaAlert,
} from "@department-of-veterans-affairs/component-library/dist/react-bindings"

export function VAExample() {
  return (
    <VAContentContainer>
      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <div className="vads-l-col--12">
            <h1 className="vads-u-font-size--h1">VA Components Example</h1>

            <VaAlert status="info" headline="This is an example alert" visible>
              <p>This demonstrates how to use VA components from the design system.</p>
            </VaAlert>

            <VaAccordion uswds>
              <VaAccordionItem header="Example Accordion Item" uswds>
                <p>This is the content inside the accordion item.</p>
                <p>You can put any content here.</p>
              </VaAccordionItem>
              <VaAccordionItem header="Another Accordion Item" uswds>
                <p>This is another accordion item.</p>
              </VaAccordionItem>
            </VaAccordion>

            <div className="vads-u-margin-y--4">
              <h2 className="vads-u-font-size--h2 vads-u-margin-bottom--2">VA Maintenance Banner</h2>
              <va-maintenance-banner
                banner-id="maintenance-banner"
                is-error
                maintenance-end-date-time="Sun Jun 21 2099 04:30:00 GMT-0700 (Pacific Daylight Time)"
                maintenance-start-date-time="Sun Jun 21 2099 00:00:00 GMT-0700 (Pacific Daylight Time)"
                maintenance-title="Site maintenance"
                upcoming-warn-start-date-time="Sun Mar 30 2025 19:38:11 GMT-0700 (Pacific Daylight Time)"
                upcoming-warn-title="Upcoming site maintenance"
              >
                <div slot="warn-content">
                  <span>
                    We'll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won't
                    be able to sign in or use tools.
                  </span>
                </div>
                <div slot="maintenance-content">
                  We're working on VA.gov right now. If you have trouble signing in or using tools, check back after
                  we're finished. Thank you for your patience.
                </div>
              </va-maintenance-banner>
            </div>
          </div>
        </div>
      </div>
    </VAContentContainer>
  )
}

