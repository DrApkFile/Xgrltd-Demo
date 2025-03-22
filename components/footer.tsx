import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Image
                src="/images/xgrltd-logo.png"
                alt="XGRLTD Logo"
                width={150}
                height={50}
                className="brightness-200 contrast-200 invert"
              />
            </div>
            <p className="text-purple-200">
              Your ultimate shopping destination for quality products at affordable prices.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-purple-300 hover:text-amber-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-purple-300 hover:text-amber-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-purple-300 hover:text-amber-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-purple-200 hover:text-amber-400">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-purple-200 hover:text-amber-400">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-purple-200 hover:text-amber-400">
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-purple-200 hover:text-amber-400">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-purple-200 hover:text-amber-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-purple-200 hover:text-amber-400">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-purple-200 hover:text-amber-400">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-purple-200 hover:text-amber-400">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-purple-200 hover:text-amber-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-purple-200 hover:text-amber-400">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-purple-200 hover:text-amber-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-purple-200 hover:text-amber-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-purple-800 mt-12 pt-8 text-center text-purple-300">
          <p>&copy; {new Date().getFullYear()} XGRLTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

