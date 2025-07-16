import React from "react";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

function AccountRedirect() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="bg-white p-6 shadow-md rounded-xl mt-6 text-center text-gray-700 w-3xl">
      <p className="mb-4 text-xl text-gray-600 font-bold">
        🔐 Want more features like:
      </p>
      <ul className="text-lg font-semibold text-gray-600 mb-4 list-disc list-inside">
        <li>✨ Custom URL creation</li>
        <li>💾 Saved URL history</li>
        <li>📊 Click Count</li>
      </ul>

      {!isAuthenticated ? (
        <>
          <p className="text-xl">
            <span className="font-semibold">Create an account</span>{" "}to unlock full features.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Link
              to="/auth"
              className="bg-blue-500 text-xl font-semibold text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Create Account
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="text-xl font-semibold">
            You’re logged in! Access all premium features now.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Link
              to="/dashboard"
              className="bg-green-500 text-xl font-semibold text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default AccountRedirect;
