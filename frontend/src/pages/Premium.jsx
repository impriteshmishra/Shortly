import React from "react";
import {
  Check,
  MapPin,
  Calendar,
  Link2,
  Zap,
  QrCode,
  MousePointerClick,
  Lock,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { makePremiumUser } from "../api/user.api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Premium = () => {

  const price = {
    USD: "$5",
  };

  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Custom Expiry Dates",
    },
    {
      icon: <Link2 className="w-6 h-6" />,
      title: "Custom URLs",
    },
    {
      icon: <MousePointerClick className="w-6 h-6" />,
      title: "Click Count",
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR Code Generator",
    },
  ];

  const isAuthenticated = useSelector((store) => store.auth);
  const userId = isAuthenticated?.user?.user?._id;
  // console.log(userId);

  const handlePayment = async (gateway, userId) => {
    try {
      const response = await makePremiumUser(userId, gateway);
      if (response?.data?.success) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Premium Plan</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Unlock Premium Features
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Take your URL management to the next level with powerful
                Analytics, Custom URLs, Custom Expiry Date, QR generator, etc.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    
          <div className="bg-white rounded-3xl shadow-xl p-8  max-w-2xl mx-auto">
            <h1 className="text-center pb-4 text-2xl font-semibold text-gray-600">Grab This Bundle</h1>
            <div className="flex flex-col gap-2 mb-16 ">
              {features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-purple-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white  group-hover:scale-110 transition-transform duration-300">
                    {feature?.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature?.title}
                  </h3>
                </div>
              ))}
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Buy Now</h3>
          
              <div className="text-6xl font-bold text-gray-900 mb-2">
                {price?.USD}
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => handlePayment("Stripe", userId)}
                className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center group"
              >
                Pay with Stripe
              </button>

            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
              <Lock /> <span className="mt-2">Secure payment processing.</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div> 
  );
};

export default Premium;
