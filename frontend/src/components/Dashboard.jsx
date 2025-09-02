import React from "react";
import UrlForm from "./UrlForm";
import UserUrl from "./UserUrl";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { Link, QrCode } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

function Dashboard() {
  const { user } = useSelector((state) => state.auth.user);
  // console.log("user",user);
  const isPremium = user?.isPremiumUser;
  const navigate = useNavigate();

  const navigateAllUrl = () => {
    navigate({ to: "/allUrls" });
  };
  const navigateAllQr = () => {
    navigate({ to: "/allQr" });
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen  flex flex-col items-center justify-center p-4  bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pb-10">
        <div className="mb-6 text-center">
          <h2 className="text-xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to Dashboard <br />
            <span className="bg-gradient-to-r from-cyan-300 to-purple-500 bg-clip-text text-transparent text-3xl">
             Generate URLs/QR Codes & Manage 
            </span>
          </h2>
          {!isPremium && (
            <h1 className="text-white font-medium text-2xl mb-6">
              {" "} 
              Buy Premium for powerful Analytics like click counts, Custom URLs,
              Custom Expiry Date, QR generator, etc.{" "}
            </h1>
          )}
        </div>
        <div className=" w-full max-w-4xl">
          <UrlForm />
          <div className="m-6 flex items-center justify-evenly gap-4">
            {/* Manage URL Button */}
            <div className="w-1/2 bg-white hover:bg-blue-50 border-2 border-blue-100 hover:border-blue-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer" onClick={navigateAllUrl}>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Link className="w-8 h-8 text-blue-600" />
                </div>
                <p>Click</p>
                <h2 className="text-sm sm:text-2xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                  Manage URL
                </h2>
               
              </div>
            </div>

            {/* Manage QR Code Button */}
            {isPremium && (
              <div className="w-1/2 bg-white hover:bg-purple-50 border-2 border-purple-100 hover:border-purple-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center space-y-4 cursor-pointer" onClick={navigateAllQr}>
                  <div className="w-16 h-16 bg-purple-100 group-hover:bg-purple-200 rounded-full flex items-center justify-center transition-colors duration-300">
                    <QrCode className="w-8 h-8 text-purple-600" />
                  </div>
                  <p>Click</p>
                  <h2 className="text-sm sm:text-2xl font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                    Manage QR
                  </h2>
                 
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
