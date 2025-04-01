import { VAHeader } from "@/components/va-header"
import { VAFooter } from "@/components/va-footer"

export default function FullLayoutPreviewPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <VAHeader />
      <main className="flex-1">
        <div className="va-breadcrumbs bg-gray-100 py-2">
          <div className="container mx-auto px-4">
            <nav className="text-sm" aria-label="Breadcrumb">
              <ol className="flex">
                <li className="flex items-center">
                  <a href="/" className="text-blue-600 hover:underline">
                    VA.gov home
                  </a>
                  <svg className="h-4 w-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li>
                  <span className="text-gray-600">Manage your VA debt</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manage your VA debt for benefit overpayments and copay bills
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Review your current VA benefit debt or copay bill balances online. And find out how to make payments or
              request help now.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h2 className="font-bold">Need help with VA debt after a natural disaster?</h2>
              <p>Learn how to get temporary debt relief</p>
            </div>

            <h2 className="text-xl font-bold mb-2">On this page</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Need help with VA debt after a natural disaster?
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Review your benefit debt and copay bills online
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Make a payment now
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Request financial help or dispute charges
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  What to do if you have questions about your VA debt
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  More helpful information
                </a>
              </li>
            </ul>

            <h2 className="text-xl font-bold mb-2">Review your benefit debt and copay bills online</h2>
            <div className="border rounded-md p-4 shadow-sm mb-6">
              <h3 className="font-bold mb-2">Sign in with a verified account</h3>
              <p className="mb-4">
                You'll need to sign in with an identity-verified account through one of our account providers. Identity
                verification helps us protect all Veterans' information and prevent scammers from stealing your
                benefits.
              </p>
              <button className="bg-[#0071bc] text-white px-4 py-2 rounded">Sign in or create an account</button>
            </div>

            <h2 className="text-xl font-bold mb-2">Who can sign in to manage debt online</h2>
            <p className="mb-4">
              At this time, only Veterans and service members can use this tool to review their benefit overpayments and
              copay bills online.
            </p>

            <h2 className="text-xl font-bold mb-2">What you can do when you sign in</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>
                Check the amount and status of your VA debt related to disability compensation, pension, education
                benefits
              </li>
              <li>Check your copay and medical supply bills at each VA health facility where you receive care</li>
              <li>Find out how to make payments or request help</li>
              <li>Download copay billing statements</li>
            </ul>
          </div>
        </div>
      </main>
      <VAFooter />
    </div>
  )
}

