"use client"
import { VaBreadcrumbs } from "@department-of-veterans-affairs/component-library/dist/react-bindings"
import { VAContentContainer } from "@/components/va-content-container"

export function CopayBalancesContent() {
  return (
    <VAContentContainer>
      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <div className="vads-l-col">
            <VaBreadcrumbs
              breadcrumbList={[
                { href: "/", label: "VA.gov home" },
                { href: "#", label: "Manage your VA debt" },
                { href: "#", label: "Dispute your VA debt" },
              ]}
              label="Breadcrumb"
            />
          </div>
        </div>
      </div>

      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <div className="vads-l-col--12 medium-screen:vads-l-col--8">
            <div className="vads-u-margin-bottom--6">
              <h1 data-testid="form-title" className="vads-u-margin-bottom--0 vads-u-font-size--h1">
                Current copay balances
              </h1>
              <p className="va-introtext">
                Check the balance of VA health care and prescription charges from each of your facilities. Find out how
                to make payments or request financial help.
              </p>
            </div>

            <h2 data-testid="form-title" className="vads-u-margin-bottom--0">
              Your most recent statement balances for the last six months
            </h2>

            <ul
              className="vads-u-margin-top--3 remove-bullets"
              data-testid="debt-list"
              aria-description="List of current debts"
            >
              <li>
                <va-card
                  show-shadow="true"
                  class="vads-u-padding-x--3 vads-u-padding-y--2 vads-u-margin-bottom--3"
                  data-testid="debt-summary-item"
                >
                  <h3 className="vads-u-margin-top--0 vads-u-margin-bottom--1p5 vads-u-font-size--h3">
                    James A. Haley Veterans' Hospital - Tampa
                  </h3>
                  <h4 className="vads-u-margin-top--0 vads-u-margin-bottom--1p5 vads-u-font-size--md">
                    <span className="vads-u-font-weight--normal">Current balance:</span>
                    <strong>$50.00</strong>
                  </h4>
                  <div className="vads-u-display--flex vads-u-align-items--top vads-u-margin-bottom--1p5">
                    <i
                      aria-hidden="true"
                      className="fas fa-exclamation-triangle fa-md vads-u-margin-top--0p25 vads-u-margin-right--0p5 vads-u-color--warning-dark"
                    ></i>
                    <span className="sr-only">Warning</span>
                    <p className="vads-u-margin-y--0 vads-u-font-size--md">
                      Pay your balance now or request help by <strong>October 30, 2024</strong>.
                    </p>
                  </div>
                  <p className="vads-u-margin-y--0 vads-u-font-size--md">
                    <a
                      className="vads-u-font-weight--bold"
                      data-testid="debt-details-button"
                      aria-label="Review details for James A. Haley Veterans' Hospital - Tampa"
                      href="#"
                    >
                      Review details
                      <i aria-hidden="true" className="fas fa-angle-right fa-md vads-u-margin-left--1"></i>
                    </a>
                  </p>
                  <p className="vads-u-margin-y--0 vads-u-margin-top--1p5 vads-u-font-size--md">
                    <a
                      className="vads-u-font-weight--bold"
                      data-testid="debt-details-button"
                      aria-label="Resolve this bill for James A. Haley Veterans' Hospital - Tampa"
                      href="#"
                    >
                      Resolve this bill
                      <i aria-hidden="true" className="fas fa-angle-right fa-md vads-u-margin-left--1"></i>
                    </a>
                  </p>
                </va-card>
              </li>

              <li>
                <va-card
                  show-shadow="true"
                  class="vads-u-padding-x--3 vads-u-padding-y--2 vads-u-margin-bottom--3"
                  data-testid="debt-summary-item"
                >
                  <h3 className="vads-u-margin-top--0 vads-u-margin-bottom--1p5 vads-u-font-size--h3">
                    Hidden River VA Clinic - Tampa
                  </h3>
                  <h4 className="vads-u-margin-top--0 vads-u-margin-bottom--1p5 vads-u-font-size--md">
                    <span className="vads-u-font-weight--normal">Current balance:</span>
                    <strong>$200.00</strong>
                  </h4>
                  <div className="vads-u-display--flex vads-u-align-items--top vads-u-margin-bottom--1p5">
                    <i
                      aria-hidden="true"
                      className="fas fa-exclamation-triangle fa-md vads-u-margin-top--0p25 vads-u-margin-right--0p5 vads-u-color--warning-dark"
                    ></i>
                    <span className="sr-only">Warning</span>
                    <p className="vads-u-margin-y--0 vads-u-font-size--md">
                      Contact the U.S. Department of the Treasury's Debt Management Services at{" "}
                      <va-telephone contact="8888263127"></va-telephone> to pay this debt.
                    </p>
                  </div>
                  <p className="vads-u-margin-y--0 vads-u-font-size--md">
                    <a
                      className="vads-u-font-weight--bold"
                      data-testid="debt-details-button"
                      aria-label="Review details for Hidden River VA Clinic - Tampa"
                      href="#"
                    >
                      Review details
                      <i aria-hidden="true" className="fas fa-angle-right fa-md vads-u-margin-left--1"></i>
                    </a>
                  </p>
                </va-card>
              </li>

              <li>
                <va-card
                  show-shadow="true"
                  class="vads-u-padding-x--3 vads-u-padding-y--2 vads-u-margin-bottom--3"
                  data-testid="debt-summary-item"
                >
                  <h3 className="vads-u-margin-top--0 vads-u-margin-bottom--1p5 vads-u-font-size--h3">
                    South Hillsborough VA Clinic - Riverview
                  </h3>
                  <h4 className="vads-u-margin-top--0 vads-u-margin-bottom--1p5 vads-u-font-size--md">
                    <span className="vads-u-font-weight--normal">Current balance:</span>
                    <strong>$0.00</strong>
                  </h4>
                  <div className="vads-u-display--flex vads-u-align-items--center vads-u-margin-bottom--1p5">
                    <i
                      aria-hidden="true"
                      className="fas fa-check-circle fa-lg vads-u-margin-right--0p5 vads-u-color--success"
                    ></i>
                    <span className="sr-only">Paid off</span>
                    <p className="vads-u-margin-y--0 vads-u-font-size--md">
                      Payment of <strong>$20.00</strong> received on <strong>July 12, 2024</strong>.
                    </p>
                  </div>
                  <p className="vads-u-margin-y--0 vads-u-font-size--md">
                    <a
                      className="vads-u-font-weight--bold"
                      data-testid="debt-details-button"
                      aria-label="Review details for South Hillsborough VA Clinic - Riverview"
                      href="#"
                    >
                      Review details
                      <i aria-hidden="true" className="fas fa-angle-right fa-md vads-u-margin-left--1"></i>
                    </a>
                  </p>
                </va-card>
              </li>
            </ul>

            <h2>Your other VA debt</h2>
            <p className="vads-u-margin-bottom--0">
              Our records show you have VA overpayment debt. You can check the details of your copay balance, find out
              how to pay your balance, and learn how to request financial assistance.
            </p>
            <p className="vads-u-font-size--md">
              <a href="#" className="vads-u-font-weight--bold">
                View your VA overpayments
                <i aria-hidden="true" className="fas fa-angle-right fa-md vads-u-margin-left--1"></i>
              </a>
            </p>

            <va-need-help className="vads-u-margin-top--4">
              <div slot="content">
                <p>
                  You can contact us online through <a href="https://ask.va.gov/">Ask VA</a> or call the VA Health
                  Resource Center at <va-telephone contact="866-400-1238"></va-telephone>. We're here Monday through
                  Friday, 8:00 a.m. to 8:00 p.m. ET.
                </p>
              </div>
            </va-need-help>

            <div className="vads-u-margin-top--4 vads-u-text-align--right">
              <button type="button" className="usa-button" id="mdFormButton" aria-label="give feedback">
                Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </VAContentContainer>
  )
}

