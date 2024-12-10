'use client'

import Link from "next/link";
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/books' },
  { name: 'Add Books', href: '/add-book' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const handleLogout = () => {
    localStorage.removeItem('access_token'); 
    window.location.href = '/login'; 
  };

  const isLoggedIn = !!localStorage.getItem('access_token');
  
    return (
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Bells E-Library</span>
              <img
                alt="logo"
                src="images/logo.png"
                className="w-auto h-14"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="font-semibold text-gray-900 text-sm/6">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <Link href="#" onClick={handleLogout} className="font-semibold text-gray-900 text-sm/6">
              Logout 
            </Link>
            ) : (
              <>
            <Link href="/login" className="font-semibold text-gray-900 text-sm/6">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/signup" className="ml-6 font-semibold text-gray-900 text-sm/6">
              Sign Up
            </Link>
              
              </>
            )}
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Bells E-library</span>
                <img
                  alt="logo"
                  src="/images/logo.png"
                  className="w-auto h-8"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="flow-root mt-6">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6 space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                {isLoggedIn ? (
              <Link href="#" onClick={handleLogout} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
              Logout 
            </Link>
            ) : (
              <>
            <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/signup" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
              Sign Up
            </Link>
              
              </>
            )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

    );
}
