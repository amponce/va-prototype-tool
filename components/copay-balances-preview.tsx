import { AlertTriangle, CheckCircle, ChevronRight } from "lucide-react"

export function CopayBalancesPreview() {
  return (
    <div className="p-6">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6" aria-label="Breadcrumb">
        <ol className="flex">
          <li className="flex items-center">
            <a href="#" className="text-blue-600 hover:underline">
              VA.gov home
            </a>
            <svg className="h-4 w-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li className="flex items-center">
            <a href="#" className="text-blue-600 hover:underline">
              Manage your VA debt
            </a>
            <svg className="h-4 w-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li>
            <span className="text-gray-600">Dispute your VA debt</span>
          </li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Current copay balances</h1>
          <p className="text-xl text-gray-600">
            Check the balance of VA health care and prescription charges from each of your facilities. Find out how to
            make payments or request financial help.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Your most recent statement balances for the last six months</h2>

        <ul className="space-y-4 list-none pl-0 mb-8">
          <li>
            <div className="border rounded-md p-4 shadow-sm">
              <h3 className="text-xl font-bold mb-2">James A. Haley Veterans' Hospital - Tampa</h3>
              <h4 className="text-lg mb-3">
                <span>Current balance: </span>
                <strong>$50.00</strong>
              </h4>
              <div className="flex items-start mb-3">
                <AlertTriangle className="text-yellow-600 h-5 w-5 mt-1 mr-2" />
                <p className="m-0">
                  Pay your balance now or request help by <strong>October 30, 2024</strong>.
                </p>
              </div>
              <p className="mb-0">
                <a href="#" className="text-blue-600 hover:underline font-bold flex items-center">
                  Review details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </p>
              <p className="mt-3 mb-0">
                <a href="#" className="text-blue-600 hover:underline font-bold flex items-center">
                  Resolve this bill
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </p>
            </div>
          </li>

          <li>
            <div className="border rounded-md p-4 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Hidden River VA Clinic - Tampa</h3>
              <h4 className="text-lg mb-3">
                <span>Current balance: </span>
                <strong>$200.00</strong>
              </h4>
              <div className="flex items-start mb-3">
                <AlertTriangle className="text-yellow-600 h-5 w-5 mt-1 mr-2" />
                <p className="m-0">
                  Contact the U.S. Department of the Treasury's Debt Management Services at{" "}
                  <strong>888-826-3127</strong> to pay this debt.
                </p>
              </div>
              <p className="mb-0">
                <a href="#" className="text-blue-600 hover:underline font-bold flex items-center">
                  Review details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </p>
            </div>
          </li>

          <li>
            <div className="border rounded-md p-4 shadow-sm">
              <h3 className="text-xl font-bold mb-2">South Hillsborough VA Clinic - Riverview</h3>
              <h4 className="text-lg mb-3">
                <span>Current balance: </span>
                <strong>$0.00</strong>
              </h4>
              <div className="flex items-center mb-3">
                <CheckCircle className="text-green-600 h-5 w-5 mr-2" />
                <p className="m-0">
                  Payment of <strong>$20.00</strong> received on <strong>July 12, 2024</strong>.
                </p>
              </div>
              <p className="mb-0">
                <a href="#" className="text-blue-600 hover:underline font-bold flex items-center">
                  Review details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </p>
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-3">Your other VA debt</h2>
        <p className="mb-3">
          Our records show you have VA overpayment debt. You can check the details of your copay balance, find out how
          to pay your balance, and learn how to request financial assistance.
        </p>
        <p className="mb-8">
          <a href="#" className="text-blue-600 hover:underline font-bold flex items-center">
            View your VA overpayments
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </p>

        <div className="bg-gray-100 border-l-4 border-blue-500 p-4 mb-6">
          <h3 className="font-bold mb-2">Need help?</h3>
          <p className="mb-0">
            You can contact us online through{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Ask VA
            </a>{" "}
            or call the VA Health Resource Center at <strong>866-400-1238</strong>. We're here Monday through Friday,
            8:00 a.m. to 8:00 p.m. ET.
          </p>
        </div>
      </div>

      <div className="border-t mt-8 pt-4 text-right">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Feedback</button>
      </div>
    </div>
  )
}

