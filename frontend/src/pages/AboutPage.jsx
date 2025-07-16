// src/pages/About.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12 px-4 flex items-start justify-center">
        <div className="max-w-3xl bg-white p-8 rounded-xl shadow-md space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">About Shortly</h1>

          <p className="text-gray-700 text-lg">
            <span className="font-semibold">ShortLy</span> is a modern and
            user-friendly URL shortening tool that allows you to quickly
            generate shortened links with ease.
          </p>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>🔗 Shorten long URLs instantly</li>
            <li>🔐 Create custom slugs when logged in</li>
            <li>💾 Save and manage your URLs securely</li>
            <li>📊 Track click counts for each shortened URL</li>
          </ul>

          <p className="text-gray-700">
            Whether you're sharing links on social media, email, or anywhere
            else, ShortLy helps keep your URLs clean and professional.
          </p>

          <p className="text-gray-600 text-sm">
            Built with ❤️ by{" "}
            <a
              href="https://github.com/impriteshmishra"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pritesh Mishra
            </a>
            .
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
