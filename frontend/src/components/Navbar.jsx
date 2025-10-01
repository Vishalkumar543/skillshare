import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange shadow-sm fixed w-full z-20 font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="text-2xl font-bold text-white text-shadow-2xs">SKiLL SWAPPER</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <button className="px-4 py-2 text-lg rounded-2xl hover:bg-lightgrey transition cursor-pointer">
              Home
            </button>
            <button className="px-4 py-2 text-lg rounded-2xl hover:bg-lightgrey transition cursor-pointer">
              Signup/Login
            </button>
            <button className="px-4 py-2 text-lg rounded-2xl hover:bg-lightgrey transition cursor-pointer">
              Profile
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-2">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-100 transition">
              Home
            </button>
            <button className="px-4 py-2 rounded-lg hover:bg-blue-100 transition">
              Sign/Login
            </button>
            <button className="px-4 py-2 rounded-lg hover:bg-blue-100 transition">
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
