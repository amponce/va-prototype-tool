export function VAFooter() {
  return (
    <footer className="bg-[#112e51] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About VA Prototyping</h3>
            <p className="text-gray-300">
              A rapid prototyping tool for the Department of Veterans Affairs (VA) design system.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="text-gray-300 hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/components" className="text-gray-300 hover:text-white">
                  Component Library
                </a>
              </li>
              <li>
                <a href="/templates" className="text-gray-300 hover:text-white">
                  Templates
                </a>
              </li>
              <li>
                <a href="/accessibility" className="text-gray-300 hover:text-white">
                  Accessibility Guidelines
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="text-gray-300 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-300 hover:text-white">
                  Support
                </a>
              </li>
              <li>
                <a href="/feedback" className="text-gray-300 hover:text-white">
                  Feedback
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/accessibility-statement" className="text-gray-300 hover:text-white">
                  Accessibility Statement
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>Official VA Prototyping Tool. For authorized use only.</p>
          <p className="mt-2">© {new Date().getFullYear()} Department of Veterans Affairs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

