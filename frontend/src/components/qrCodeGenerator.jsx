import { useNavigate } from "@tanstack/react-router";
import { Crown, Download, QrCode } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { generateQr } from "../api/qr.api";

function QrCodeGenerator() {
  const [url, setUrl] = useState("");
  const { user } = useSelector((state) => state.auth);
  // console.log("isAuth", isAuthenticated);
  const [qrData, setQrData] = useState("");
  const [description, setDescription] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const isPremium = user?.user?.isPremiumUser;
  const navigate = useNavigate();

  const handleQrGenerate = async () => {
    if (isPremium) {
      try {
        if (!description) {
          toast.error("Description required");
          return;
        }
        const response = await generateQr(url, description, expireDate);

        setQrData(response?.data);
        setDescription("");
        setUrl("");
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };

  // console.log("qr data", qrData);

  const downloadQRCode = (qrCode, description) => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${description}_Qr_Shortly.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${description}_Qr_Shortly.png download successfull.`, {
      position: "bottom-right",
    });
  };

  return (
    <div className="space-y-6">
      {!isPremium ? (
        <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 rounded-lg p-6 text-center">
          <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">
            Premium Feature
          </h3>
          <p className="text-gray-300 mb-4">
            QR Code generation is available with our Premium plan. Upgrade now
            to unlock unlimited QR codes!
          </p>
          <button
            onClick={() => navigate({ to: "/premium" })}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all cursor-pointer"
          >
            Upgrade to Premium
          </button>
        </div>
      ) : (
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
              className={`px-8 py-3 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed  flex items-center space-x-2 ${
                isPremium
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
                  : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600"
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>{isPremium ? "Generate QR" : "Upgrade to Generate"}</span>
            </button>
          </div>
          <div className="mt-4">
            <label className="block text-white text-sm font-medium mb-2 text-left">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Recognize this QR Code (e.g., Resume Page, Portfolio, College Link)"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              required
            />
          </div>
          {qrData && (
            <div className="flex flex-col justify-center p-6 gap-3 items-center">
              <img
                src={qrData.qrCode}
                alt="QR Code"
                className="border-4 border-blue-400 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain rounded-lg "
              />
              <button
                onClick={() =>
                  downloadQRCode(qrData.qrCode, qrData.description)
                }
                className="w-full sm:w-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm flex items-center justify-center cursor-pointer"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QrCodeGenerator;
