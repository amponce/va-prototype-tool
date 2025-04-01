"use client"
import { VAContentContainer } from "@/components/va-specific/va-content-container"
import { VaMaintenanceBanner } from "@department-of-veterans-affairs/component-library/dist/react-bindings"
export function VAMaintenanceBannerDemo() {
  return (
    <VAContentContainer>
      <div className="vads-u-margin-y--4">
        <h2 className="vads-u-font-size--h2 vads-u-margin-bottom--2">VA Maintenance Banner Example</h2>
        <p className="vads-u-margin-bottom--2">
          This demonstrates how to use the va-maintenance-banner component from the VA component library.
        </p>
        <div className="vads-u-background-color--gray-lightest vads-u-padding--3 vads-u-margin-bottom--3">
          <VaMaintenanceBanner
            bannerId="maintenance-banner"
            isError
            maintenanceEndDateTime="Sun Jun 21 2099 04:30:00 GMT-0700 (Pacific Daylight Time)"
            maintenanceStartDateTime="Sun Jun 21 2099 00:00:00 GMT-0700 (Pacific Daylight Time)"
            maintenanceTitle="Site maintenance"
            upcomingWarnStartDateTime="Sun Mar 30 2025 19:38:11 GMT-0700 (Pacific Daylight Time)"
            upcomingWarnTitle="Upcoming site maintenance"
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
          </VaMaintenanceBanner>
        </div>
      </div>
    </VAContentContainer>
  )
}

