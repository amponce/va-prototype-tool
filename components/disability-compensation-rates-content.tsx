"use client"
import { VAContentContainer } from "@/components/va-content-container"
import {
  VaAccordion,
  VaAccordionItem,
  VaTable,
  VaTableRow,
  VaBreadcrumbs,
} from "@department-of-veterans-affairs/component-library/dist/react-bindings"
import "@department-of-veterans-affairs/component-library/dist/main.css"
import { AccordionScript } from "@/components/accordion-script"

export function DisabilityCompensationRatesContent() {
  return (
    <VAContentContainer>
      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <div className="vads-l-col--12">
            <VaBreadcrumbs
              breadcrumbList={[
                { href: "/", label: "VA.gov home" },
                { href: "#", label: "Disability benefits" },
                { href: "#", label: "Disability compensation rates" },
                { href: "#", label: "Current Veterans disability compensation rates" },
              ]}
              label="Breadcrumb"
            />
          </div>
        </div>
      </div>

      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          {/* Left sidebar navigation */}
          <div className="vads-l-col--3">
            <div className="left-side-nav">
              <div className="sidenav-header">
                <div className="va-api-logo-wrapper">
                  <div className="va-api-logo">
                    <img src="/placeholder.svg?height=40&width=40" alt="" role="presentation" />
                  </div>
                  <h2 id="disability-benefits-header" className="vads-u-margin-y--0 vads-u-font-size--lg">
                    <a href="#" className="vads-u-text-decoration--none vads-u-color--link-default">
                      Disability benefits
                    </a>
                  </h2>
                </div>
              </div>

              <ul className="usa-sidenav-list">
                <li>
                  <a href="#" className="usa-current">
                    Disability compensation rates
                  </a>
                  <ul className="usa-sidenav-sub_list">
                    <li className="active-page">
                      <a href="#" className="vads-u-font-weight--bold">
                        Veterans disability compensation rates
                      </a>
                    </li>
                    <li>
                      <a href="#">Past rates: 2024</a>
                    </li>
                    <li>
                      <a href="#">Past rates: 2023</a>
                    </li>
                    <li>
                      <a href="#">Past rates: 2022</a>
                    </li>
                    <li>
                      <a href="#">Special monthly compensation rates</a>
                    </li>
                    <li>
                      <a href="#">Special benefit allowances rates</a>
                    </li>
                    <li>
                      <a href="#">Birth defect compensation rates</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Main content area */}
          <div className="vads-l-col--9">
            <h1 className="vads-u-font-size--h1">Current Veterans disability compensation rates</h1>
            <p className="va-introtext">
              Review 2025 Veterans disability compensation rates. Use our compensation benefits rate tables to find your
              monthly payment amount. We base your monthly payment amount on your disability rating and details about
              your dependent family members.
            </p>

            <h2 className="vads-u-font-size--h2">
              Compensation rates for Veterans with a 10% to 20% disability rating
            </h2>
            <p className="vads-u-font-weight--bold">Effective December 1, 2024</p>

            <p className="vads-u-font-style--italic">
              <strong>Note:</strong> If you have a 10% to 20% disability rating, you won't receive a higher rate even if
              you have a dependent spouse, child, or parent.
            </p>

            <VaTable tableTitle="Disability ratings for 10% to 20%" tableType="bordered">
              <VaTableRow>
                <span slot="va-table-slot-0">Disability rating</span>
                <span slot="va-table-slot-1">Monthly payment (in U.S. $)</span>
              </VaTableRow>
              <VaTableRow>
                <span slot="va-table-slot-2">10%</span>
                <span slot="va-table-slot-3">175.51</span>
              </VaTableRow>
              <VaTableRow>
                <span slot="va-table-slot-4">20%</span>
                <span slot="va-table-slot-5">346.95</span>
              </VaTableRow>
            </VaTable>

            <h2 className="vads-u-font-size--h2">
              Compensation rates for Veterans with a 30% to 100% disability rating
            </h2>
            <p className="vads-u-font-weight--bold">Effective December 1, 2024</p>

            <h3 className="vads-u-font-size--h3">With a dependent spouse or parent, but no children</h3>

            <VaAccordion uswds>
              <VaAccordionItem>
                <h4 slot="headline">Compensation rates for 30% to 60% disability rating</h4>
                <div>
                  <p>
                    Find the dependent status in the left column that best describes you. Then look for your disability
                    rating in the top row. Your basic monthly rate is where your dependent status and disability rating
                    meet.
                  </p>

                  <p>
                    If your spouse receives Aid and Attendance benefits, be sure to also look at the{" "}
                    <strong>Added amounts</strong> table, and add it to your amount from the{" "}
                    <strong>Basic monthly rates</strong> table.
                  </p>

                  <p>
                    <a href="#">Learn more about Aid and Attendance benefits</a>
                  </p>

                  <VaTable tableTitle="Basic monthly rates for 30% to 60% disability rating" tableType="bordered">
                    <VaTableRow>
                      <span slot="va-table-slot-0">Dependent status</span>
                      <span slot="va-table-slot-1">30% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-2">40% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-3">50% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-4">60% disability rating (in U.S. $)</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-5">
                        <b>Veteran alone</b> (no dependents)
                      </span>
                      <span slot="va-table-slot-6">537.42</span>
                      <span slot="va-table-slot-7">774.16</span>
                      <span slot="va-table-slot-8">1,102.04</span>
                      <span slot="va-table-slot-9">1,395.93</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-10">
                        <b>With spouse</b> (no parents or children)
                      </span>
                      <span slot="va-table-slot-11">601.42</span>
                      <span slot="va-table-slot-12">859.16</span>
                      <span slot="va-table-slot-13">1,208.04</span>
                      <span slot="va-table-slot-14">1,523.93</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-15">
                        <b>With spouse and 1 parent</b> (no children)
                      </span>
                      <span slot="va-table-slot-16">652.42</span>
                      <span slot="va-table-slot-17">927.16</span>
                      <span slot="va-table-slot-18">1,293.04</span>
                      <span slot="va-table-slot-19">1,625.93</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-20">
                        <b>With spouse and 2 parents</b> (no children)
                      </span>
                      <span slot="va-table-slot-21">703.42</span>
                      <span slot="va-table-slot-22">995.16</span>
                      <span slot="va-table-slot-23">1,378.04</span>
                      <span slot="va-table-slot-24">1,727.93</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-25">
                        <b>With 1 parent</b> (no spouse or children)
                      </span>
                      <span slot="va-table-slot-26">588.42</span>
                      <span slot="va-table-slot-27">842.16</span>
                      <span slot="va-table-slot-28">1,187.04</span>
                      <span slot="va-table-slot-29">1,497.93</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-30">
                        <b>With 2 parents</b> (no spouse or children)
                      </span>
                      <span slot="va-table-slot-31">639.42</span>
                      <span slot="va-table-slot-32">910.16</span>
                      <span slot="va-table-slot-33">1,272.04</span>
                      <span slot="va-table-slot-34">1,599.93</span>
                    </VaTableRow>
                  </VaTable>

                  <VaTable tableTitle="Added amounts for 30% to 60% disability rating" tableType="bordered">
                    <VaTableRow>
                      <span slot="va-table-slot-0">Dependent status</span>
                      <span slot="va-table-slot-1">30% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-2">40% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-3">50% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-4">60% disability rating (in U.S. $)</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-5">
                        <b>Each additional child under age 18</b>
                      </span>
                      <span slot="va-table-slot-6">31.00</span>
                      <span slot="va-table-slot-7">42.00</span>
                      <span slot="va-table-slot-8">53.00</span>
                      <span slot="va-table-slot-9">63.00</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-10">
                        <b>Each additional child over age 18 in a qualifying school program</b>
                      </span>
                      <span slot="va-table-slot-11">102.00</span>
                      <span slot="va-table-slot-12">137.00</span>
                      <span slot="va-table-slot-13">171.00</span>
                      <span slot="va-table-slot-14">205.00</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-15">
                        <b>Spouse receiving Aid and Attendance</b>
                      </span>
                      <span slot="va-table-slot-16">58.00</span>
                      <span slot="va-table-slot-17">78.00</span>
                      <span slot="va-table-slot-18">98.00</span>
                      <span slot="va-table-slot-19">117.00</span>
                    </VaTableRow>
                  </VaTable>
                </div>
              </VaAccordionItem>

              <VaAccordionItem>
                <h4 slot="headline">Compensation rates for 70% to 100% disability rating</h4>
                <div>
                  <p>
                    Find the dependent status in the left column that best describes you. Then look for your disability
                    rating in the top row. Your basic monthly rate is where your dependent status and disability rating
                    meet.
                  </p>

                  <p>
                    If your spouse receives Aid and Attendance benefits, be sure to also look at the{" "}
                    <strong>Added amounts</strong> table, and add it to your amount from the{" "}
                    <strong>Basic monthly rates</strong> table.
                  </p>

                  <p>
                    <a href="#">Learn more about Aid and Attendance benefits</a>
                  </p>

                  <VaTable tableTitle="Basic monthly rates for 70% to 100% disability rating" tableType="bordered">
                    <VaTableRow>
                      <span slot="va-table-slot-0">Dependent status</span>
                      <span slot="va-table-slot-1">70% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-2">80% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-3">90% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-4">100% disability rating (in U.S. $)</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-5">
                        <b>Veteran alone</b> (no dependents)
                      </span>
                      <span slot="va-table-slot-6">1,759.19</span>
                      <span slot="va-table-slot-7">2,044.89</span>
                      <span slot="va-table-slot-8">2,297.96</span>
                      <span slot="va-table-slot-9">3,831.30</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-10">
                        <b>With spouse</b> (no parents or children)
                      </span>
                      <span slot="va-table-slot-11">1,908.19</span>
                      <span slot="va-table-slot-12">2,214.89</span>
                      <span slot="va-table-slot-13">2,489.96</span>
                      <span slot="va-table-slot-14">4,044.91</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-15">
                        <b>With spouse and 1 parent</b> (no children)
                      </span>
                      <span slot="va-table-slot-16">2,028.19</span>
                      <span slot="va-table-slot-17">2,351.89</span>
                      <span slot="va-table-slot-18">2,643.96</span>
                      <span slot="va-table-slot-19">4,216.35</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-20">
                        <b>With spouse and 2 parents</b> (no children)
                      </span>
                      <span slot="va-table-slot-21">2,148.19</span>
                      <span slot="va-table-slot-22">2,488.89</span>
                      <span slot="va-table-slot-23">2,797.96</span>
                      <span slot="va-table-slot-24">4,387.79</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-25">
                        <b>With 1 parent</b> (no spouse or children)
                      </span>
                      <span slot="va-table-slot-26">1,879.19</span>
                      <span slot="va-table-slot-27">2,181.89</span>
                      <span slot="va-table-slot-28">2,451.96</span>
                      <span slot="va-table-slot-29">4,002.74</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-30">
                        <b>With 2 parents</b> (no spouse or children)
                      </span>
                      <span slot="va-table-slot-31">1,999.19</span>
                      <span slot="va-table-slot-32">2,318.89</span>
                      <span slot="va-table-slot-33">2,605.96</span>
                      <span slot="va-table-slot-34">4,174.18</span>
                    </VaTableRow>
                  </VaTable>

                  <VaTable tableTitle="Added amounts for 70% to 100% disability rating" tableType="bordered">
                    <VaTableRow>
                      <span slot="va-table-slot-0">Dependent status</span>
                      <span slot="va-table-slot-1">70% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-2">80% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-3">90% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-4">100% disability rating (in U.S. $)</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-5">
                        <b>Each additional child under age 18</b>
                      </span>
                      <span slot="va-table-slot-6">74.00</span>
                      <span slot="va-table-slot-7">84.00</span>
                      <span slot="va-table-slot-8">95.00</span>
                      <span slot="va-table-slot-9">106.14</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-10">
                        <b>Each additional child over age 18 in a qualifying school program</b>
                      </span>
                      <span slot="va-table-slot-11">239.00</span>
                      <span slot="va-table-slot-12">274.00</span>
                      <span slot="va-table-slot-13">308.00</span>
                      <span slot="va-table-slot-14">342.85</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-15">
                        <b>Spouse receiving Aid and Attendance</b>
                      </span>
                      <span slot="va-table-slot-16">137.00</span>
                      <span slot="va-table-slot-17">157.00</span>
                      <span slot="va-table-slot-18">176.00</span>
                      <span slot="va-table-slot-19">195.92</span>
                    </VaTableRow>
                  </VaTable>
                </div>
              </VaAccordionItem>
            </VaAccordion>

            <h3 className="vads-u-font-size--h3 vads-u-margin-top--4">With dependents, including children</h3>

            <VaAccordion uswds>
              <VaAccordionItem>
                <h4 slot="headline">Compensation rates for 30% to 60% disability rating</h4>
                <div>
                  <p>
                    Find the dependent status in the left column that best describes you. Then look for your disability
                    rating in the top row. Your basic monthly rate is where your dependent status and disability rating
                    meet.
                  </p>

                  <VaTable
                    tableTitle="Basic monthly rates for 30% to 60% disability rating with children"
                    tableType="bordered"
                  >
                    <VaTableRow>
                      <span slot="va-table-slot-0">Dependent status</span>
                      <span slot="va-table-slot-1">30% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-2">40% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-3">50% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-4">60% disability rating (in U.S. $)</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-5">
                        <b>With child</b> (no spouse or parents)
                      </span>
                      <span slot="va-table-slot-6">568.42</span>
                      <span slot="va-table-slot-7">816.16</span>
                      <span slot="va-table-slot-8">1,155.04</span>
                      <span slot="va-table-slot-9">1,458.93</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-10">
                        <b>With spouse and child</b> (no parents)
                      </span>
                      <span slot="va-table-slot-11">632.42</span>
                      <span slot="va-table-slot-12">901.16</span>
                      <span slot="va-table-slot-13">1,261.04</span>
                      <span slot="va-table-slot-14">1,586.93</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-15">
                        <b>With spouse, 1 parent, and child</b>
                      </span>
                      <span slot="va-table-slot-16">683.42</span>
                      <span slot="va-table-slot-17">969.16</span>
                      <span slot="va-table-slot-18">1,346.04</span>
                      <span slot="va-table-slot-19">1,688.93</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-20">
                        <b>With spouse, 2 parents, and child</b>
                      </span>
                      <span slot="va-table-slot-21">734.42</span>
                      <span slot="va-table-slot-22">1,037.16</span>
                      <span slot="va-table-slot-23">1,431.04</span>
                      <span slot="va-table-slot-24">1,790.93</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-25">
                        <b>With 1 parent and child</b> (no spouse)
                      </span>
                      <span slot="va-table-slot-26">619.42</span>
                      <span slot="va-table-slot-27">884.16</span>
                      <span slot="va-table-slot-28">1,240.04</span>
                      <span slot="va-table-slot-29">1,560.93</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-30">
                        <b>With 2 parents and child</b> (no spouse)
                      </span>
                      <span slot="va-table-slot-31">670.42</span>
                      <span slot="va-table-slot-32">952.16</span>
                      <span slot="va-table-slot-33">1,325.04</span>
                      <span slot="va-table-slot-34">1,662.93</span>
                    </VaTableRow>
                  </VaTable>
                </div>
              </VaAccordionItem>

              <VaAccordionItem>
                <h4 slot="headline">Compensation rates for 70% to 100% disability rating</h4>
                <div>
                  <p>
                    Find the dependent status in the left column that best describes you. Then look for your disability
                    rating in the top row. Your basic monthly rate is where your dependent status and disability rating
                    meet.
                  </p>

                  <VaTable
                    tableTitle="Basic monthly rates for 70% to 100% disability rating with children"
                    tableType="bordered"
                  >
                    <VaTableRow>
                      <span slot="va-table-slot-0">Dependent status</span>
                      <span slot="va-table-slot-1">70% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-2">80% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-3">90% disability rating (in U.S. $)</span>
                      <span slot="va-table-slot-4">100% disability rating (in U.S. $)</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-5">
                        <b>With child</b> (no spouse or parents)
                      </span>
                      <span slot="va-table-slot-6">1,833.19</span>
                      <span slot="va-table-slot-7">2,128.89</span>
                      <span slot="va-table-slot-8">2,392.96</span>
                      <span slot="va-table-slot-9">3,937.44</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-10">
                        <b>With spouse and child</b> (no parents)
                      </span>
                      <span slot="va-table-slot-11">1,982.19</span>
                      <span slot="va-table-slot-12">2,298.89</span>
                      <span slot="va-table-slot-13">2,584.96</span>
                      <span slot="va-table-slot-14">4,151.05</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-15">
                        <b>With spouse, 1 parent, and child</b>
                      </span>
                      <span slot="va-table-slot-16">2,102.19</span>
                      <span slot="va-table-slot-17">2,435.89</span>
                      <span slot="va-table-slot-18">2,738.96</span>
                      <span slot="va-table-slot-19">4,322.49</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-20">
                        <b>With spouse, 2 parents, and child</b>
                      </span>
                      <span slot="va-table-slot-21">2,222.19</span>
                      <span slot="va-table-slot-22">2,572.89</span>
                      <span slot="va-table-slot-23">2,892.96</span>
                      <span slot="va-table-slot-24">4,493.93</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-25">
                        <b>With 1 parent and child</b> (no spouse)
                      </span>
                      <span slot="va-table-slot-26">1,953.19</span>
                      <span slot="va-table-slot-27">2,265.89</span>
                      <span slot="va-table-slot-28">2,546.96</span>
                      <span slot="va-table-slot-29">4,108.88</span>
                    </VaTableRow>
                    <VaTableRow>
                      <span slot="va-table-slot-30">
                        <b>With 2 parents and child</b> (no spouse)
                      </span>
                      <span slot="va-table-slot-31">2,073.19</span>
                      <span slot="va-table-slot-32">2,402.89</span>
                      <span slot="va-table-slot-33">2,700.96</span>
                      <span slot="va-table-slot-34">4,280.32</span>
                    </VaTableRow>
                  </VaTable>
                </div>
              </VaAccordionItem>
            </VaAccordion>

            <div className="va-address-block vads-u-background-color--gray-lightest vads-u-padding--3 vads-u-margin-bottom--4 vads-u-margin-top--4">
              <p className="vads-u-margin-top--0">
                <strong>Note:</strong> We're required by law to match the percentage of cost-of-living adjustments made
                to Social Security benefits. These adjustments help to make sure that the purchasing power of your
                benefits keeps up with inflation.
              </p>
              <p className="vads-u-margin-bottom--0">
                <a href="#">
                  Get the latest cost-of-living adjustment (COLA) information on the Social Security Administration's
                  (SSA) website
                </a>
              </p>
            </div>

            <h2 className="vads-u-font-size--h2">How to use the tables to find your monthly payment</h2>

            <h3 className="vads-u-font-size--h3">Find your basic rate</h3>
            <p>
              Go to the compensation rates for your disability rating. On the <strong>Basic monthly rates</strong>{" "}
              table, find the amount for your disability rating and dependent status. This is your basic monthly rate.
            </p>

            <div className="vads-u-background-color--primary-alt-lightest vads-u-padding--3 vads-u-border-left--7px vads-u-border-color--primary-alt">
              <h4 className="vads-u-margin-top--0 vads-u-font-size--h4">Example (Veteran with no children):</h4>
              <p>
                If you're a Veteran with a 30% disability rating, and you have a dependent spouse (or dependent parents
                or children), your basic monthly rate would be $601.42 each month.
              </p>
            </div>

            <h3 className="vads-u-font-size--h3 vads-u-margin-top--4">Find your added amounts, if any apply</h3>
            <p>
              If your spouse receives Aid and Attendance benefits or you have more than one child, you may qualify for
              additional monthly payment amounts as listed in the <strong>Added amounts</strong> table.
            </p>
            <p>
              <a href="#">Learn more about Aid and Attendance benefits</a>
            </p>

            <p>First, determine your basic rate.</p>

            <div className="vads-u-background-color--primary-alt-lightest vads-u-padding--3 vads-u-border-left--7px vads-u-border-color--primary-alt vads-u-margin-bottom--4">
              <h4 className="vads-u-margin-top--0 vads-u-font-size--h4">Example (Veteran with children):</h4>
              <p>
                If you're a Veteran with a 70% disability rating, and you have a spouse, plus 3 dependent children under
                the age of 18, you would start with the basic rate of $2,018.19 (for a Veteran with a spouse and 1
                child).
              </p>
            </div>

            <p>
              Next, look at the <strong>Added amounts</strong> table. Find the amount for children under age 18
              ($74.00).
            </p>

            <p>
              Since your basic rate already provides payment for 1 child, you would add the rate of $74.00 for each
              additional child (so $74 × 2).
            </p>

            <p>
              If your spouse receives Aid and Attendance, you would also add $117 (which is the added amount for a
              spouse receiving Aid and Attendance, for a Veteran with a 70% disability rating).
            </p>

            <p>In our example of a Veteran with 70% disability rating, your total monthly payment amount would be:</p>

            <div className="vads-u-background-color--gray-lightest vads-u-padding--3 vads-u-margin-bottom--4">
              <p className="vads-u-margin-y--0">
                <strong>$2,018.19</strong> basic rate (1 spouse, 1 child)
                <br />
                <strong>+$74</strong> (second child under 18)
                <br />
                <strong>+$74</strong> (third child under 18)
                <br />
                <strong>+$117</strong> (spouse who receives Aid and Attendance)
                <br />
                <strong>Total $2,283.19</strong>
              </p>
            </div>

            <h2 className="vads-u-font-size--h2">Past rates</h2>
            <p>Review Veterans disability compensation rates for past years.</p>

            <ul className="vads-u-padding-left--0" style={{ listStyle: "none" }}>
              <li>
                <a href="#">2024 rates</a> (effective December 1, 2023)
              </li>
              <li>
                <a href="#">2023 rates</a> (effective December 1, 2022)
              </li>
              <li>
                <a href="#">2022 rates</a> (effective December 1, 2021)
              </li>
              <li>
                <a href="#">2021 rates</a> (effective December 1, 2020)
              </li>
              <li>
                <a href="#">2020 rates</a> (effective December 1, 2019)
              </li>
              <li>
                <a href="#">2019 rates</a> (effective December 1, 2018)
              </li>
              <li>
                <a href="#">2018 rates</a> (effective December 1, 2017)
              </li>
            </ul>

            <div className="vads-u-margin-top--6 vads-u-margin-bottom--3 vads-u-display--flex vads-u-justify-content--flex-end">
              <p className="vads-u-margin-y--0 vads-u-font-size--sm">Last updated: December 2, 2024</p>
            </div>

            <div className="vads-u-display--flex vads-u-justify-content--flex-end vads-u-margin-bottom--4">
              <button className="usa-button">Feedback</button>
            </div>
          </div>
        </div>
      </div>
      <AccordionScript />
    </VAContentContainer>
  )
}

