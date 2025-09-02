import React from "react";
import UrlForm from "../components/UrlForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccountRedirect from "../components/AccountRedirect";

import { useState } from "react";
import { Link, QrCode, Crown, Copy, Check, ExternalLink } from "lucide-react";
import { useSelector } from "react-redux";

export default function ShortlyHomepage() {
  const { user } = useSelector((state) => state.auth);
  // console.log("isAuth", isAuthenticated);
  const isPremium = user?.user?.isPremiumUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Pattern */}

      <Navbar />
      <div className="relative z-10">
        {/* Main Content */}
        <main className="px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Section */}
            <div className="mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Shorten URLs &<br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Generate QR Codes
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Transform long URLs into short, shareable links and create
                stunning QR codes with our premium features.
              </p>
              {!isPremium && (
                <h1 className="text-white font-semibold text-2xl">
                  {" "}
                  Buy Premium for powerful Analytics like click counts, Custom
                  URLs, Geolocation, QR generator, etc.{" "}
                </h1>
              )}
            </div>

            <UrlForm />

            {/* Main Tool Card */}

            {/* Features Grid */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Link className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  URL Shortening
                </h3>
                <p className="text-gray-300">
                  Create short links. Perfect for social
                  media and marketing campaigns.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  QR Codes
                </h3>
                <p className="text-gray-300">
                  Generate  QR codes for your links with premium features.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-red-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Premium Benefits
                </h3>
                <p className="text-gray-300">
                  Unlock advanced features, analytics, custom slug
                  QR code generation, geo location, etc.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
