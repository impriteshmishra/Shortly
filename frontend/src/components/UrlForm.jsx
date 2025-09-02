import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api.js";
import { useSelector } from "react-redux";
import { Check, Copy, Crown, ExternalLink, Link, QrCode } from "lucide-react";
import QrCodeGenerator from "./qrCodeGenerator";
import { toast } from "react-toastify";

function UrlForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [description, setDescription] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [activeTab, setActiveTab] = useState("shorten");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log("isAuth", isAuthenticated);
  const isPremium = user?.user?.isPremiumUser;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleShortUrl = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // console.log(description);

    if(new Date(expireDate) <= new Date()){
      toast.error("Expiry date must be in future.")
      return;
    }

    if(isPremium) {
      if(!description) {
        toast.error("Description required.")
        return;
      }
    }

    try {
      const response = await createShortUrl(longUrl, customSlug, description, expireDate);
      // console.log("short url", response.data);
      // console.log(response.data.shortUrl);

      setShortUrl(response?.data?.shortUrl);
      setLongUrl("");
      setDescription("");
      setCustomSlug("");
      setExpireDate("");
    } catch (err) {
      // console.log(err.response.data);
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    setLoading(false);
  };

  // console.log("test base url", import.meta.env.VITE_BASE_URL);

  return (
    <div className="w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
      <div className="flex items-center text-xs sm:text-md bg-white/5 rounded-lg p-1 mb-8 ">
        <button
          onClick={() => setActiveTab("shorten")}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
            activeTab === "shorten"
              ? "bg-white text-purple-900 sm:font-semibold"
              : "text-white hover:bg-white/10"
          }`}
        >
          <Link className="w-5 h-5" />
          <span>Shorten URL</span>
        </button>
        <button
          onClick={() => setActiveTab("qr")}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all relative ${
            activeTab === "qr"
              ? "bg-white text-purple-900 sm:font-semibold"
              : "text-white hover:bg-white/10"
          }`}
        >
          <QrCode className="w-5 h-5" />
          <span>QR Generator</span>
          {!isPremium && (
            <Crown className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
          )}
        </button>
      </div>
      {activeTab === "shorten" && (
        <div className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2 text-left">
              Enter your long URL
            </label>
            <div className="flex space-x-3">
              <input
                type="url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://example.com/long-url"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
              <button
                onClick={handleShortUrl}
                disabled={!longUrl}
                className="px-1 text-xs sm:text-base sm:px-8 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white sm:font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Shorten
              </button>
            </div>
          </div>
          {isAuthenticated && isPremium &&(
            <>
              <div className="mt-4">
                <label className="block text-white text-sm font-medium mb-2 text-left">
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Recognize this URL (e.g., Resume Page, Portfolio, College Link)"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  required
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="customSlug"
                  className="block text-white text-sm font-medium mb-2 text-left"
                >
                  Custom URL: (optional)
                </label>
                <input
                  type="text"
                  id="customSlug"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="Enter Custom Slug"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
              </div>
                <div className="mt-4">
                <label
                  htmlFor="customSlug"
                  className="block text-white text-sm font-medium mb-2 text-left"
                >
                  URL Expire by: (optional)
                </label>
                <input
                  type="datetime-local"
                  id="expireDate"
                  value={expireDate}
                  onChange={(e) => setExpireDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
              </div>
            </>
          )}
          {shortUrl && (
            <div className="bg-white/5 rounded-lg p-2 sm:p-6 border border-green-400/30">
              <label className="block text-white text-sm font-medium mb-2 text-left">
                Your shortened URL
              </label>
              <div className="flex flex-col sm:items-center space-x-3 gap-2">
                <div className="flex-1 px-4 py-3 bg-white/10 rounded-lg text-cyan-300 sm:font-mono ">
                  {shortUrl}
                </div>
                <button
                  onClick={handleCopy}
                  className="px-4 py-3 sm:bg-green-500 sm:hover:bg-green-600 text-white rounded-lg transition-all flex items-center space-x-2 cursor-pointer"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
                <a
                  href={`${shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 sm:bg-blue-500 sm:hover:bg-blue-600 text-white rounded-lg transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
      {/* 
      qr code */}
      {activeTab === "qr" && <QrCodeGenerator/>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

export default UrlForm;
