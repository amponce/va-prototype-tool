export function VAHeader() {
  return (
    <>
      <style jsx global>{`
        /* Simple fix for header links */
        header a, header a:visited, header a:active {
          color: white !important;
          text-decoration: none !important;
        }
        header a:hover {
          text-decoration: none !important;
        }
      `}</style>
      <header className="bg-[#112e51] text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <a 
                href="/" 
                className="flex items-center space-x-2 text-white no-underline"
              >
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#112e51]"
                  >
                    <path
                      d="M32.3519 7.648C29.0359 4.332 24.6799 2.5 20.0039 2.5C15.3279 2.5 10.9719 4.332 7.65594 7.648C4.33994 10.964 2.50794 15.32 2.50794 19.996C2.50794 24.672 4.33994 29.028 7.65594 32.344C10.9719 35.66 15.3279 37.492 20.0039 37.492C24.6799 37.492 29.0359 35.66 32.3519 32.344C35.6679 29.028 37.4999 24.672 37.4999 19.996C37.4999 15.32 35.6679 10.964 32.3519 7.648ZM20.0039 22.5C18.6199 22.5 17.5039 21.384 17.5039 20C17.5039 18.616 18.6199 17.5 20.0039 17.5C21.3879 17.5 22.5039 18.616 22.5039 20C22.5039 21.384 21.3879 22.5 20.0039 22.5ZM25.0039 10H15.0039V15H25.0039V10ZM25.0039 25H15.0039V30H25.0039V25Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="font-bold text-xl">VA Prototyping</span>
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-white hover:bg-[#1a4480] px-3 py-2 rounded">Sign In</button>
              <button className="bg-[#0071bc] hover:bg-[#205493] text-white px-3 py-2 rounded">Sign Up</button>
            </div>
          </div>
        </div>
        <div className="bg-[#0071bc] py-2">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-6">
              <a href="/" className="text-white no-underline">
                Home
              </a>
              <a href="/components" className="text-white no-underline">
                Components
              </a>
              <a href="/docs" className="text-white no-underline">
                Documentation
              </a>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

