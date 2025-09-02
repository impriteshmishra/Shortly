import React, { useState, useEffect } from "react";
import {
  QrCode,
  Plus,
  Eye,
  Download,
  Trash2,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { getAllUserQr } from "../api/user.api";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { deleteQR } from "../api/qr.api";
import { useDispatch, useSelector } from "react-redux";
import { deleteQr, setQrList } from "../store/slice/qrSlice";

const ManageQRCode = () => {
  const qrData = useSelector((state) => state?.qr?.qrList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const response = await getAllUserQr();
        dispatch(setQrList(response?.qr));
      } catch (error) {
        toast.error(error?.message);
      }
    };
    fetchQr();
  }, []);

  // console.log("all qr", qrData);

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

  const handleDeleteQr = async (qrId) => {
    // console.log(qrId);
    try {
      const response = await deleteQR(qrId);
      dispatch(deleteQr(qrId));
      toast.success(response?.message, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error?.message, {
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header - Responsive */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  All QR Code
                </h1>
              </div>
            </div>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Manage and monitor your QR codes
            </p>
          </div>

          {/* Stats Overview - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {qrData?.length || 0}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">Total QR Codes</div>
            </div>
            {/* You can add more stat cards here if needed */}
          </div>

          {/* QR Codes Grid - Fully Responsive */}
          <div className="bg-gray-200 rounded-xl p-3 sm:p-4 md:p-6 min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
            {qrData?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-8">
                <QrCode className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-4" />
                <p className="text-base sm:text-lg font-medium text-gray-500 mb-2">
                  Your QR Code will appear here
                </p>
                <p className="text-sm sm:text-base text-gray-400">
                  No QR Code created yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 sm:gap-4 md:gap-6">
                {qrData?.map((qrCode) => (
                  <div
                    key={qrCode?.id}
                    className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:bg-cyan-50 transition-all duration-300 hover:scale-105 flex flex-col h-fit"
                  >
                    {/* QR Code Header - Responsive */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base flex-1 min-w-0">
                        {qrCode?.description}
                      </h3>
                      <span className="px-2 py-1 rounded-full text-xs sm:text-sm font-medium text-blue-500 bg-blue-50 truncate max-w-full sm:max-w-[120px]">
                        {qrCode?.url}
                      </span>
                    </div>

                    {/* QR Code Image - Responsive */}
                    <div className="flex justify-center mb-4">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
                        <img
                          src={qrCode?.qrCode}
                          alt="QR Code"
                          className="w-full h-full object-contain border border-blue-500 rounded"
                        />
                      </div>
                    </div>

                    {/* Analytics - Responsive Text */}
                    <div className="mb-4 text-xs sm:text-sm text-gray-600 text-center">
                      <span>
                        Created:{" "}
                        {new Date(qrCode?.createdAt).toLocaleDateString([], {
                          dateStyle: "short",
                        })}
                        <span className="hidden sm:inline">
                          {" "}
                          {new Date(qrCode?.createdAt).toLocaleTimeString([], {
                            timeStyle: "short",
                          })}
                        </span>
                      </span>
                    </div>

                    {/* Action Buttons - Responsive Stack */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                      <button
                        onClick={() =>
                          downloadQRCode(qrCode.qrCode, qrCode.description)
                        }
                        className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-xs sm:text-sm flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span>Download</span>
                        {/* <span className="xs:hidden">DL</span> */}
                      </button>
                      <button
                        onClick={() => handleDeleteQr(qrCode._id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-xs sm:text-sm flex items-center justify-center cursor-pointer transition-colors sm:flex-none"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="ml-1 sm:hidden">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageQRCode;