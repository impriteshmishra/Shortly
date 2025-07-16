import React from "react";
import UrlForm from "../components/UrlForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccountRedirect from "../components/AccountRedirect";

function Homepage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-gray-100 space-y-4 p-8 gap-8">
        <h1 className="text-blue-500 text-6xl font-bold text-center">Welcome to <span className="text-7xl italic">Shortly!</span></h1>
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md space-y-4 p-6">
          <p className="text-gray-600 text-4xl font-bold text-center">
            Make your URL Lite!
          </p>
          <UrlForm />
          <p className="text-gray-600 text-xl font-semibold px-4">
            Shortly is a free tool to make URL Lite and generate short links URL.
          </p>
        </div>
        <AccountRedirect/>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
