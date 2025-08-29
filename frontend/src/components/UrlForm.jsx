import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api.js";
import { useSelector } from "react-redux";

function UrlForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [description, setDescription] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  // console.log("isAuth", isAuthenticated);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log(description);
    try {
      const response = await createShortUrl(longUrl, customSlug, description);
      // console.log("short url", response.data);
      console.log(response.data.shortUrl);

      setShortUrl(response.data.shortUrl);
    } catch (err) {
      // console.log(err.response.data);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    setLoading(false);
  };

  // console.log("test base url", import.meta.env.VITE_BASE_URL);

  return (
    <div className="p-3 w-full ">
      <form onSubmit={handleSubmit} className="space-y-2 ">
        <input
          type="text"
          placeholder="Enter your URL here"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        {isAuthenticated && (
          <>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Recognize this URL (e.g., Resume Page, Portfolio, College Link)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                required
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="customSlug"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Custom URL (optional)
              </label>
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="Enter Custom URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 text-xl font-semibold cursor-pointer"
        >
          {loading ? "Cutting the fat..." : "Make URL Lite!"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-md font-medium mb-2">
            😅⚡ Your url just lost the weight:
          </h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
                copied
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

export default UrlForm;
