import React, { useState } from "react";
import axios from "axios";


function UrlForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/shorten", { longUrl });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">CLICK TO MAKE YOUR URL LITE!</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="url"
          placeholder="Enter your URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Cutting the fat..." : "Make it Lite!"} 
        </button>
      </form>

      {shortUrl && (
        <div className="mt-4">
          <p className="text-green-600">Lite URL:</p>
          <a href={shortUrl} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}
    </div>
  )
}

export default UrlForm

