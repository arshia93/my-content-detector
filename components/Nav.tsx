import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-950">
              <span className="text-white">©</span>
            </div>
            AdlyDetector
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/signup"
            className="hidden px-4 py-2 text-green-700 border border-green-700 rounded-full hover:bg-green-50 md:block"
          >
            Sign up for unlimited access
          </Link>
          {/* <button className="p-2 rounded-md hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button> */}
        </div>
      </div>
    </header>
  );
}