import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10 font-poppins">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side - Logo/Name */}
        <div className="text-lg font-semibold text-white">
          SkillShare
        </div>

        {/* Center - Links */}
        <div className="flex gap-6 my-4 md:my-0">
          <a href="/about" className="hover:text-white transition">About Us</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
          <a href="/privacy" className="hover:text-white transition">Privacy</a>
        </div>

        {/* Right Side - Copy */}
        <div className="text-sm">
          © {new Date().getFullYear()} SkillShare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
