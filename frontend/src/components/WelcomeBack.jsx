import React from "react";

function WelcomeBack() {
  return (
    <div className="flex flex-col  p-6 gap-6">
      <div className="mb-8">
        <h2 className="text-6xl font-bold text-gray-800">
          Welcome back to <span className="text-blue-500 italic">Shortly</span>{" "}
          👋
        </h2>
        <p className="mt-2 text-gray-600 font-medium">
          Shorten, manage, and track your URLs in one simple dashboard. Fast,
          secure, and reliable.
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
