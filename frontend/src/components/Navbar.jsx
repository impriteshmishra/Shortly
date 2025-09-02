import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/user.api";
import { login, logout } from "../store/slice/authSlice";
import { CrownIcon, LayoutDashboard, CircleUser, Menu, X } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state?.auth);

  const userName = user?.user?.name;
  const isPremium = user?.user?.isPremiumUser;

  // Mobile menu state
  const [isOpen, setIsOpen] = useState(false);

  // React Query: fetch user if logged in
  useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: isAuthenticated,
    onSuccess: (data) => dispatch(login(data.user)),
    onError: () => dispatch(logout()),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold italic bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        >
          Shortly
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links (hidden on mobile, flex on desktop) */}
        <div className="hidden sm:flex gap-4 items-center">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-blue-500 hover:bg-blue-500 hover:text-white text-lg font-medium border border-blue-500 px-3 py-1 rounded transition-all duration-200 transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-blue-500 bg-blue-500 text-white text-lg font-medium border hover:border-blue-500 hover:bg-white px-3 py-1 rounded transition-all duration-200 transform hover:scale-105"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-1 cursor-pointer text-gray-600 font-medium hover:text-blue-800 transition-all duration-100 transform hover:scale-105"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-1 cursor-pointer text-gray-600 font-medium hover:text-blue-800 transition-all duration-100 transform hover:scale-105"
              >
                <CircleUser className="w-5 h-5" />
                <span>{userName?.split(" ")[0] || "User"}</span>
              </Link>

              {isPremium ? (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-full px-3 py-1">
                  Premium
                </span>
              ) : (
                <Link
                  to="/premium"
                  className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  <CrownIcon className="w-4 h-4" />
                  <span>Buy Premium</span>
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="sm:hidden mt-3 flex flex-col gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="block text-blue-500 border border-blue-500 px-3 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block bg-blue-500 text-white px-3 py-2 rounded"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-2 text-gray-700"
              >
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 text-gray-700"
              >
                <CircleUser className="w-5 h-5" />{" "}
                {userName?.split(" ")[0] || "User"}
              </Link>

              {isPremium ? (
                <span className="block px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded text-center">
                  Premium
                </span>
              ) : (
                <Link
                  to="/premium"
                  className="flex items-center gap-2 justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded"
                >
                  <CrownIcon className="w-4 h-4" /> Buy Premium
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
