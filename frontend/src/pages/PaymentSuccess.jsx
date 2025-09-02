import React, { useState, useEffect } from "react";
import { CheckCircle, ArrowLeft, Download, Share2 } from "lucide-react";

import { useNavigate, useSearch } from "@tanstack/react-router";
import { transactionFetch } from "../api/user.api.js";

export default function PaymentSuccess() {
  const search = useSearch({ from: "/payment-success" });

  const [transactions, setTransactions] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.session_id) {
      const fetchTransaction = async () => {
        try {
          const response = await transactionFetch(search.session_id);
          console.log(response?.data?.transaction);
          
          setTransactions(response.data.transaction);
        } catch (error) {
          console.error("Error fetching transaction:", error);
        }
      };
      fetchTransaction();
    }
  }, [search.session_id]);

  const handleBackToDashboard = () => {
   navigate({to: "/dashboard"})
  };

//  console.log(transactions?.data?.transaction);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className={"relative max-w-md w-full  "}>
        <div className="bg-white rounded-2xl shadow-2xl border border-white p-10 text-center">
          {/* Success icon */}
          <div className="flex items-center justify-center m-10">
            <CheckCircle className="w-32 h-32 text-emerald-500" />
          </div>

          <div className="mb-8 ">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Payment Successful!
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              Thank you for your purchase
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="text-sm text-gray-900">
                  {transactions?.paymentIntentId}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-xl text-gray-800">
                  ${transactions?.amountTotal}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            {/* Primary button - Back to Dashboard */}
            <button
              onClick={handleBackToDashboard}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-3 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
