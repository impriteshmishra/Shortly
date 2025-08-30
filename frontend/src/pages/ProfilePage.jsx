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
  console.log("urls", Urls?.urls);

  const totalClicks = Urls?.urls?.reduce((sum, url) => sum + url?.click, 0);
  // console.log("totalclick", totalClicks);

  // const [editingProfile, setEditingProfile] = useState(false);
  // const [editedUser, setEditedUser] = useState({ ...user });

  const handleCopyUrl = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short Url Copied!", {
      position: "bottom-right",
    });
  };

  const handleDeleteUrl = async (urlId) => {
    // console.log(urlId);
    try {
      const response = await deleteUrl(urlId);
      toast.success(response?.message, {
        position: "bottom-right",
      });
      // console.log(response);
    } catch (error) {
      toast.error(error?.message, {
        position: "bottom-right",
      });
    }
  };

  // const handleSaveProfile = () => {

  // };

  const handleLogout = async () => {
    await logoutUser(); // API call to remove cookie
    // console.log("Logout success")
    dispatch(logout()); // Reset Redux state thats make false your auth
    navigate({ to: "/auth" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="text-center">
                  {/* Profile picture */}
                  {/* <div className="relative inline-block">
                  <img
                    src={user.avatar}
                    alt="CN"
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700">
                    <Edit className="h-3 w-3" />
                  </button>
                </div> */}

                  <div className="mt-4 mb-2">
                    <h2 className="text-xl font-bold text-gray-900">
                      {auth?.user?.user?.name}{" "}
                      
                    </h2>
                    <p className="text-gray-600">{auth?.user?.user?.email}</p>

                    {/* Updating profile later i will do it */}
                    {/* <button
                        onClick={() => setEditingProfile(true)}
                        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center mx-auto"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Manage Profile
                      </button> */}
                  </div>
                  {isPremium ? (
                        <span className=" text-yellow-600 font-medium rounded-full px-1 text-sm border-1 border-yellow-600">
                          Premium
                        </span>
                      ) : (
                        <span className="text-blue-600 rounded-full px-1 medium text-sm border-1 border-blue-600">
                          Free
                        </span>
                      )}
                </div>

                {/* Stats */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Joined</span>
                    </div>
                    <span className="text-sm font-medium">
                      {new Date(auth?.user?.user?.createdAt).toLocaleDateString(
                        [],
                        { dateStyle: "medium" }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <Link className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Total URLs</span>
                    </div>
                    <span className="text-sm font-medium">
                      {Urls?.urls?.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        Total Clicks
                      </span>
                    </div>
                    <span className="text-sm font-medium">{totalClicks}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-500  py-6 rounded hover:text-red-700 font-medium text-lg cursor-pointer flex items-center gap-1 transition-all duration-200 transform hover:scale-105"
                >
                  <LogOut /> Logout
                </button>
              </div>
            </div>

            {/* URLs Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b flex justify-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    Manage URLs
                  </h3>
                </div>

                <div className="divide-y">
                  {Urls?.urls?.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <Link className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <p>No URLs created yet.</p>
                    </div>
                  ) : (
                    Urls?.urls?.reverse().map((url) => (
                      <div key={url?._id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-xl font-semibold text-gray-900 truncate">
                                {url.description}
                              </h4>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">
                                  Original
                                </span>
                                <a
                                  href={url.full_url}
                                  target="_blank"
                                  className="text-sm text-blue-600 hover:text-blue-800 truncate"
                                >
                                  {url.full_url}
                                </a>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">
                                  Short Url
                                </span>
                                <span className="text-sm font-mono text-gray-700">
                                  {`${import.meta.env.VITE_BASE_URL}${
                                    url?.short_url
                                  }`}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                              <span>{url.click} clicks</span>
                              <span>
                                Created:{" "}
                                {new Date(url.createdAt).toLocaleString([], {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() =>
                                handleCopyUrl(
                                  `${import.meta.env.VITE_BASE_URL}${
                                    url?.short_url
                                  }`
                                )
                              }
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                              title="Copy URL"
                            >
                              <Copy className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteUrl(url._id)}
                              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete URL"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
