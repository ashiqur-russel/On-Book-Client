import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-6">
        {/* Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-gray-900">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Vacancy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Company
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Subscription Instructions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Problem with the site
                </a>
              </li>
            </ul>
          </div>

          {/* User Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">User</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Registration
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Basket
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Wish List
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter email here"
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                Send Email
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div className="mt-10 text-center">
          <h3 className="text-xl text-black font-semibold">On.Book</h3>
          <p className="text-sm text-gray-600 mt-2">
            &copy; 2025. All rights reserved.{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
