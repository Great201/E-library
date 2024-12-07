import Link from "next/link";

export default function Navbar() {
    return (

        <header className="absolute inset-x-0 top-0 z-50">
    <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Bells E-Library</span>
          <img className="h-12 w-auto" src="/images/logo.png" alt="logo"/>
        </a>
      </div>
      <div className="flex lg:hidden">
        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span className="sr-only">Open main menu</span>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
      <Link href="/" className="text-sm/6 font-semibold text-gray-900 hover:underline">
            Home
       </Link>
       <Link href="/books" className="text-sm/6 font-semibold text-gray-900 hover:underline">
        Dashboard
       </Link>
       <Link href="/add-book" className="text-sm/6 font-semibold text-gray-900 hover:underline">
        Add Books
       </Link>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <Link href="/login" className="text-sm/6 font-semibold text-gray-900 px-3">Log in <span aria-hidden="true">&rarr;</span></Link> 
        <span className="font-bold">|</span>
        <Link href="/signup" className="text-sm/6 font-semibold text-gray-900 px-3">Signup</Link>
      </div>
    </nav>
    {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
    <div className="lg:hidden" role="dialog" aria-modal="true">
      {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
      <div className="fixed inset-0 z-50"></div>
      <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Bels E=library</span>
            <img className="h-8 w-auto" src="/images/logo.png" alt="logo"/>
          </a>
          <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Close menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">

              <Link href="/" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Home</Link>
              <Link href="/books" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Dashboard</Link>
              <Link href="/add-book" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Add Books</Link>
            </div>
            <div className="py-6">
              <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
    );
}
