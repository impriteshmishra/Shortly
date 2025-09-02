// src/components/Footer.jsx
import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (
    <footer className=" bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col justify-between items-center flex-wrap gap-6">
        <div className="text-lg font-semibold">
          © {new Date().getFullYear()} ShortLy. All rights reserved.
        </div>
        <div className="text-sm">
          Built with ❤️ by{" "}
          <a
            href="https://github.com/impriteshmishra"
            className="hover:underline font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pritesh Mishra
          </a>
        </div>
        <div className="flex gap-6 text-md text-blue-700">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
