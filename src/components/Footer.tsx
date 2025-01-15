import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-600">© 2024 Kirim.ke. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-[#1EAEDB] transition-colors">Terms</a>
            <a href="#" className="text-gray-600 hover:text-[#1EAEDB] transition-colors">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-[#1EAEDB] transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};