import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Menu, X } from "lucide-react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sectionColors = {
    services: "text-blue-600",
    about: "text-teal-600",
    contact: "text-green-600"
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                FractionalC
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#services" className="text-gray-600 hover:text-blue-600">
                Services
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-blue-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="#services" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                Services
              </Link>
              <Link href="#about" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link href="#contact" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Fractional C-Suite Services for Startups and Scaleups</h1>
              <p className="text-xl mb-8">
                Elevate your business with experienced CTO, CEO, and CPO leadership without the full-time commitment.
              </p>
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-md font-semibold flex items-center justify-center">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section id="services" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["CTO", "CEO", "CPO"].map((role) => (
                <div key={role} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Fractional {role}</h3>
                  <p className="text-gray-600 mb-4">
                    Experienced {role} leadership to drive your {role === "CTO" ? "technology strategy" : role === "CEO" ? "business growth" : "product vision"}.
                  </p>
                  <Link href="#contact" className="text-blue-600 hover:underline">
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
              <p className="text-xl text-gray-600 mb-8">
                We bring decades of experience in technology, business, and product leadership to help your startup or scaleup thrive.
              </p>
              <ul className="text-left text-gray-600 space-y-4">
                <li className="flex items-center">
                  <ChevronRight className="text-blue-600 mr-2" />
                  Flexible engagement models tailored to your needs
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-blue-600 mr-2" />
                  Proven track record of success with startups and scaleups
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-blue-600 mr-2" />
                  Access to a network of industry experts and resources
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your Business?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Get in touch with us to discuss how our fractional C-suite services can help your startup or scaleup reach new heights.
              </p>
              <form className="space-y-4">
                <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md font-semibold">
                  Schedule a Consultation
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">FractionalC</h3>
              <p className="text-sm text-gray-400">Empowering startups and scaleups with fractional C-suite expertise</p>
            </div>
            <nav className="flex space-x-4">
              <Link href="#" className="hover:text-blue-400">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Terms of Service
              </Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} FractionalC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}