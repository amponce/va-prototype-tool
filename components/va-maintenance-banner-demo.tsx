"use client"
import { VAContentContainer } from "@/components/va-content-container"

export function VAMaintenanceBannerDemo() {
  return (
    <VAContentContainer>
      <div className="vads-u-margin-y--4">
        <h2 className="vads-u-font-size--h2 vads-u-margin-bottom--2">VA Maintenance Banner Example</h2>
        <p className="vads-u-margin-bottom--2">
          This demonstrates how to use the va-maintenance-banner component from the VA component library.
        </p>
        <div className="vads-u-background-color--gray-lightest vads-u-padding--3 vads-u-margin-bottom--3">
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
                We'll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won't be
                able to sign in or use tools.
              </span>
            </div>
            <div slot="maintenance-content">
              We're working on VA.gov right now. If you have trouble signing in or using tools, check back after we're
              finished. Thank you for your patience.
            </div>
          </va-maintenance-banner>
        </div>
      </div>
    </VAContentContainer>
  )
}

