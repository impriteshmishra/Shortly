import React from "react";

function WelcomeBack() {
  return (
    <div className="flex flex-col max-w-[700px] p-6 gap-2">
      <div className="mb-8">
        <h2 className="text-4xl sm:text-6xl font-bold text-gray-800">
          Welcome back to <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent italic">Shortly</span>{" "}
          👋
        </h2>
        <p className="mt-2 text-gray-600 font-medium text-1xl sm:text-2xl">
          Shorten URLs, generate QR codes, manage and track them with ease. Set expiration dates and unlock premium features—all in one simple, fast, secure, and reliable dashboard
        </p>
      </div>

      <h2 className="text-xl italic text-gray-800">
        "Efficiency is doing things right. Shortly is making links efficient."
      </h2>
      <p className="mt-4 text-sm text-gray-500">– The Shortly Team</p>
    </div>
  );
}

export default WelcomeBack;
