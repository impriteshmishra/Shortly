import React from "react";
import UrlForm from "../components/UrlForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccountRedirect from "../components/AccountRedirect";

// function Homepage() {
//   return (
//     <>
//       <div className="min-h-screen flex flex-col items-center bg-gray-100 space-y-4 p-8 gap-8">
//         <h1 className="text-blue-500 text-6xl font-bold text-center">Welcome to <span className="text-7xl italic">Shortly!</span></h1>
//         <div className="w-full max-w-3xl bg-white rounded-xl shadow-md space-y-4 p-6">
//           <p className="text-gray-600 text-4xl font-bold text-center">
//             Make your URL Lite!
//           </p>
//           <UrlForm />
//           <p className="text-gray-600 text-xl font-semibold px-4">
//             Shortly is a free tool to make URL Lite and generate short links URL.
//           </p>
//         </div>
//         <AccountRedirect/>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Homepage;

import { useState } from 'react';
import { Link, QrCode, Crown, Copy, Check, ExternalLink } from 'lucide-react';

export default function ShortlyHomepage() {
  const [isPremium, setIsPremium] = useState(false);
  const [activeTab, setActiveTab] = useState('shorten');
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleShortenUrl = () => {
    if (!url) return;
    // Simulate URL shortening
    const shortId = Math.random().toString(36).substring(2, 8);
    setShortenedUrl(`https://short.ly/${shortId}`);
  };

  const handleQrGenerate = () => {
    if (!isPremium) {
      setShowPremiumModal(true);
      return;
    }
    // QR generation would happen here for premium users
    alert('QR Code generated! (Premium feature)');
  };

  const copyToClipboard = async () => {
    if (shortenedUrl) {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Link className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Shortly</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPremium(!isPremium)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isPremium
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                <Crown className="w-4 h-4" />
                <span>{isPremium ? 'Premium' : 'Free'}</span>
              </button>
            </div>
          </div>
        </header>

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
                Transform long URLs into short, shareable links and create stunning QR codes with our premium features.
              </p>
            </div>

            {/* Main Tool Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              {/* Tab Navigation */}
              <div className="flex bg-white/5 rounded-lg p-1 mb-8">
                <button
                  onClick={() => setActiveTab('shorten')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
                    activeTab === 'shorten'
                      ? 'bg-white text-purple-900 font-semibold'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Link className="w-5 h-5" />
                  <span>Shorten URL</span>
                </button>
                <button
                  onClick={() => setActiveTab('qr')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all relative ${
                    activeTab === 'qr'
                      ? 'bg-white text-purple-900 font-semibold'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span>QR Generator</span>
                  {!isPremium && (
                    <Crown className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
                  )}
                </button>
              </div>

              {/* URL Shortener Tab */}
              {activeTab === 'shorten' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2 text-left">
                      Enter your long URL
                    </label>
                    <div className="flex space-x-3">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/very-long-url-that-needs-shortening"
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                      <button
                        onClick={handleShortenUrl}
                        disabled={!url}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Shorten
                      </button>
                    </div>
                  </div>

                  {shortenedUrl && (
                    <div className="bg-white/5 rounded-lg p-6 border border-green-400/30">
                      <label className="block text-white text-sm font-medium mb-2 text-left">
                        Your shortened URL
                      </label>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 px-4 py-3 bg-white/10 rounded-lg text-cyan-300 font-mono">
                          {shortenedUrl}
                        </div>
                        <button
                          onClick={copyToClipboard}
                          className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all flex items-center space-x-2"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                        <a
                          href={shortenedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* QR Generator Tab */}
              {activeTab === 'qr' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2 text-left">
                      Enter URL to generate QR Code
                    </label>
                    <div className="flex space-x-3">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                      <button
                        onClick={handleQrGenerate}
                        disabled={!url}
                        className={`px-8 py-3 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 ${
                          isPremium
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700'
                            : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600'
                        }`}
                      >
                        <QrCode className="w-4 h-4" />
                        <span>{isPremium ? 'Generate QR' : 'Upgrade to Generate'}</span>
                      </button>
                    </div>
                  </div>

                  {!isPremium && (
                    <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 rounded-lg p-6 text-center">
                      <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-white font-semibold text-lg mb-2">Premium Feature</h3>
                      <p className="text-gray-300 mb-4">
                        QR Code generation is available with our Premium plan. Upgrade now to unlock unlimited QR codes!
                      </p>
                      <button
                        onClick={() => setShowPremiumModal(true)}
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all"
                      >
                        Upgrade to Premium
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Features Grid */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Link className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Fast URL Shortening</h3>
                <p className="text-gray-300">Create short, memorable links in seconds. Perfect for social media and marketing campaigns.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Premium QR Codes</h3>
                <p className="text-gray-300">Generate high-quality QR codes for your links. Premium feature with unlimited generations.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-red-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Premium Benefits</h3>
                <p className="text-gray-300">Unlock advanced features, analytics, custom domains, and unlimited QR code generation.</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Upgrade to Premium</h3>
              <p className="text-gray-600 mb-6">
                Unlock QR code generation, advanced analytics, custom domains, and unlimited link creation.
              </p>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">$9.99<span className="text-lg font-normal text-gray-600">/month</span></div>
                <div className="text-sm text-gray-600">Everything you need to grow</div>
              </div>

              <div className="space-y-3 mb-6 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Unlimited QR code generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Custom short domains</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Advanced analytics dashboard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Priority support</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPremiumModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    setIsPremium(true);
                    setShowPremiumModal(false);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all font-semibold"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-400 mb-4">
            Made with ❤️ for the modern web
          </div>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
