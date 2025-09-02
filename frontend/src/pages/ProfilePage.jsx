import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  User,
  Link,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  BarChart3,
  Calendar,
  Globe,
  LogOut,
  CrownIcon,
  Crown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserUrls, logoutUser } from "../api/user.api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteUrl } from "../api/shortUrl.api";
import { persistor } from "../store/store";
import { useNavigate } from "@tanstack/react-router";
import { logout } from "../store/slice/authSlice";

function ProfilePage() {
  const auth = useSelector((state) => state.auth);
  // console.log(auth);
  // console.log(auth.user.user.name);

  const isPremium = auth?.user?.user?.isPremiumUser;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: Urls,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  });
  // console.log("urls", Urls?.urls);

  const totalClicks = Urls?.urls?.reduce((sum, url) => sum + url?.click, 0);
  // console.log("totalclick", totalClicks);

  // const [editingProfile, setEditingProfile] = useState(false);
  // const [editedUser, setEditedUser] = useState({ ...user });

  // const handleSaveProfile = () => {

  // };

  const handleLogout = async () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(logout()); // Reset Redux state thats make false your auth
    await logoutUser(); // API call to remove cookie
    // console.log("Logout success")
    window.location.href = "/auth";
    // navigate({to: "/login"})
  };

  return (
   <div className="min-h-screen bg-gray-100">
  <Navbar />

  <div className="flex justify-center px-4 py-10">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
      {/* Profile Section */}
      <div className="text-center">
        {/* Profile Picture */}
        {/* Uncomment if you want to use avatar later */}
        {/* <div className="relative inline-block">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-white shadow-md"
          />
          <button className="absolute bottom-1 right-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 shadow">
            <Edit className="h-4 w-4" />
          </button>
        </div> */}

        {/* Name & Email */}
        <div className="mt-4 mb-3">
          <h2 className="text-2xl font-bold text-gray-900">
            {auth?.user?.user?.name}
          </h2>
          <p className="text-gray-600">{auth?.user?.user?.email}</p>
        </div>

        {/* Badge */}
        {isPremium ? (
          <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full px-4 py-1 text-sm shadow">
            Premium User
          </span>
        ) : (
          <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full px-4 py-1 text-sm shadow">
            Free User
          </span>
        )}
      </div>

      {/* Stats Section */}
      <div className="mt-8 divide-y divide-gray-200">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">Joined</span>
          </div>
          <span className="text-sm font-medium">
            {new Date(auth?.user?.user?.createdAt).toLocaleDateString([], {
              dateStyle: "medium",
            })}
          </span>
        </div>

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">Total URLs</span>
          </div>
          <span className="text-sm font-medium">{Urls?.urls?.length}</span>
        </div>

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">Total Clicks</span>
          </div>
          <span className="text-sm font-medium">{totalClicks}</span>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 font-semibold px-5 py-2 rounded-lg hover:bg-red-50 transition transform hover:scale-105"
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </div>
    </div>
  </div>
</div>

  );
}

export default ProfilePage;
