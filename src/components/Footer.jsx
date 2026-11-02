import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-6 mt-10 border-t border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} VIGNESH S. All rights reserved.
        </p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a
            href="https://github.com/vigneshs372003"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vignesh-s-2003-vp37"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:vignesh.s372003@gmail.com"
            className="hover:text-white transition-colors"
          >
            Email
          </a>
          <a
            href="/edit"
            className="hover:text-cyan-400 text-gray-500 transition-colors text-xs self-center"
            title="Admin Login"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
