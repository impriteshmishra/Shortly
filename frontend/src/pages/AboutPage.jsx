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
            user-friendly URL shortening/QR Code generation tool that allows you to quickly
            generate shortened links/QR Code with ease. It’s designed to be fast,
            secure, and packed with powerful features for both personal and
            professional use.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-4">
            ✨ Key Features
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>🔗 Shorten long URLs instantly</li>
            <li>🎨 Create <span className="font-semibold">custom URLs</span> with your own slugs</li>
            <li>⏳ Set <span className="font-semibold">expiry dates</span> for your links</li>
            <li>📊 Track <span className="font-semibold">click counts</span> for every shortened URL</li>
            <li>🧾 Generate <span className="font-semibold">QR codes</span> for easy sharing</li>
            <li>🔐 Best-in-class <span className="font-semibold">authentication & security</span></li>
            <li>💳 <span className="font-semibold">Stripe integration</span> for premium features</li>
            <li>💾 Save and manage all your URLs in one place</li>
          </ul>

          <p className="text-gray-700">
            Whether you're sharing links on social media, through email, or in
            your business workflows, <span className="font-semibold">ShortLy</span> helps keep your URLs clean,
            professional, and powerful.
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
