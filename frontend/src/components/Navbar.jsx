import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, logoutUser } from "../api/user.api";
import { login, logout } from "../store/slice/authSlice";
import { CrownIcon, LogOut } from 'lucide-react';
import { CircleUser } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';


const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log(user.user.name);
  const userName = user?.user?.name;

  // Fetch current user from API
  useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    onSuccess: (data) => {
      dispatch(login(data));
    },
    onError: () => {
      dispatch(logout());
    },
    staleTime: 1000 * 60 * 5, // cache for 5 min
  });

 

  return (
    <nav className="bg-white shadow-md p-4 flex justify-around items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold italic text-blue-600">
        Shortly
      </Link>

      <div className="flex gap-4 items-center">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="text-blue-500 hover:bg-blue-500 hover:text-white text-lg font-medium border border-blue-500 px-2 py-1 rounded transition-all duration-200 transform hover:scale-105">
              Login
            </Link>
            <Link to="/signup" className="hover:text-blue-500  bg-blue-500 text-white text-lg font-medium border hover:border-blue-500 hover:bg-white px-2 py-1 rounded transition-all duration-200 transform hover:scale-105">
              Signup
            </Link>
          </>
        ) : (
          <>
         
          <Link to="/dashboard" className="flex items-center gap-1 cursor-pointer text-gray-600 font-medium text-lg hover:text-blue-800 transition-all duration-100 transform hover:scale-105">
            <LayoutDashboard/>
            <span>Dashboard</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-1 cursor-pointer text-gray-600 font-medium text-lg hover:text-blue-800 transition-all duration-100 transform hover:scale-105">
            <CircleUser/>
            <span className=" mt-1">{userName.split(" ")[0]}</span>
          </Link>
            <Link to="/premium" className="flex items-center gap-1  bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
          <CrownIcon/>
          <span>Buy Premium</span>
          </Link>
          </>

        )}
      </div>
    </nav>
  );
};

export default Navbar;
