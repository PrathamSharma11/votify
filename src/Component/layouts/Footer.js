import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-black text-white mt-40 my-30 py-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Logo and Description */}
          <div className="space-y-4">
            <img 
              src="/vote.svg" 
              alt="Company Logo" 
              className="w-32 h-32 bg-yellow-400 rounded-full"
            />
            <p className="text-gray-300 max-w-xl mt-4">Votify is a cutting-edge digital democracy platform revolutionizing online voting,Every vote cast is recorded on a decentralized ledger, making it impossible to alter or duplicate votes while maintaining voter anonymity.Whether it's national elections, corporate board decisions, or community polls, Votify provides a secure, transparent, and accessible platform for democratic participation in the digital age. </p>
          </div>

          {/* Right side - Contact Information */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">
              <span className="text-yellow-400">CONTACT</span> US
            </h2>

            {/* Address Section */}
            <div className="space-y-2">
              <h3 className="text-yellow-400 font-semibold">Address</h3>
              <p className="text-gray-300">B6/22, 1st Floor, White House Enclave, GWALIOR 474002, INDIA</p>
            </div>

            {/* HR Enquiry Section */}
            <div className="space-y-2">
              <h3 className="text-yellow-400 font-semibold">HR Enquiry</h3>
              <p className="text-gray-300">Mobile: <a href="tel:+919999796366" className="hover:text-yellow-400">+916261264410</a></p>
              <p className="text-gray-300">Email: <a href="mailto:careers@firstfiddle.in" className="text-yellow-400 hover:underline">careers@votify.in</a></p>
            </div>

            {/* Franchise Enquiry Section */}
            <div className="space-y-2">
              <h3 className="text-yellow-400 font-semibold">Franchise Enquiry</h3>
              <p className="text-gray-300">Mobile: <a href="tel:+919999796366" className="hover:text-yellow-400">+916261264410</a></p>
              <p className="text-gray-300">Email: <a href="mailto:careers@votify.in" className="text-yellow-400 hover:underline">careers@votify.in</a></p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <Link to="#" className="bg-yellow-400 p-2 rounded-sm hover:bg-yellow-500">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </Link>
              <Link to="#" className="bg-yellow-400 p-2 rounded-sm hover:bg-yellow-500">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </Link>
              <Link to="#" className="bg-yellow-400 p-2 rounded-sm hover:bg-yellow-500">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <div className="space-x-4">
            <Link to="#" className="hover:text-yellow-400">PRIVACY POLICY</Link>
            <span>|</span>
            <Link to="#" className="hover:text-yellow-400">TERMS AND CONDITIONS</Link>
            <span>|</span>
            <Link to="#" className="hover:text-yellow-400">BLOG</Link>
          </div>
          <p className="mt-4">COPYRIGHT © 2024 VOTIFY COMPANY PRIVATE LIMITED</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


// grid grid-cols-1 md:grid-cols-2 gap-8 //like col-md-6,col-md-6
// space-y-2 //space between rows