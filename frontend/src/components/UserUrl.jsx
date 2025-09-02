import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteUrl as deleteApi } from "../api/shortUrl.api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { getAllUserUrls } from "../api/user.api";
import { Check, Copy, Link, MousePointerClick, Trash2 } from "lucide-react";
import { deleteUrlState, setUrlList } from "../store/slice/urlSlice";

function UserUrl() {
  const auth = useSelector((state) => state.auth);
  // console.log(auth);
  // console.log(auth.user.user.name);

  const isPremium = auth?.user?.user?.isPremiumUser;

  const urlData = useSelector((state) => state?.url?.urlList);
  // const [urlData, setUrlData] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const response = await getAllUserUrls();
        // console.log(response);

        dispatch(setUrlList(response?.urls || []));
      } catch (error) {
        toast.error(error?.message);
      }
    };
    fetchQr();
  }, []);

  // console.log("all url", urlData);

  const handleCopyUrl = (shortUrl, urlId) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short Url Copied!", {
      position: "bottom-right",
    });
    setCopiedId(urlId);
    setTimeout(() => setCopiedId(null), 1000);
  };

  const handleDeleteUrl = async (urlId) => {
    // console.log(urlId);
    try {
      const response = await deleteApi(urlId);
      // console.log(response.message);

      dispatch(deleteUrlState(urlId));
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

  const totalClicks = urlData?.reduce((sum, url) => sum + url?.click, 0);

  const isExpired = (expireDate) => {
    if (expireDate) {
      return new Date(expireDate) < new Date();
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-8 bg-gray-50">
        <div className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">All URLs</h1>
            </div>
          </div>
          <p className="text-gray-600 mt-2">Manage and monitor your URLs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
          <div className="rounded-lg shadow-md p-6">
            <div className="text-2xl font-bold text-blue-600">
              {urlData.length}
            </div>
            <div className="text-gray-600">Total URLs</div>
          </div>
          {isPremium ? (
            <div className="rounded-lg shadow-md p-6">
              <div className="text-2xl font-bold text-blue-600">
                {totalClicks}
              </div>
              <div className="text-gray-600">Total Clicks</div>
            </div>
          ) : (
            <div className="rounded-lg shadow-md p-6">
              <div className="text-xl font-bold text-blue-600">
                Only for premium user
              </div>
              <div className="text-gray-600">Total Clicks</div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-200 rounded-xl h-screen mb-16">
        <div className="flex flex-col gap-4 w-full h-full p-10  overflow-y-auto">
          {urlData?.length === 0 ? (
            <div className="p-8 text-center text-gray-500 flex flex-col justify-center  min-h-screen">
              <Link className="h-12 w-12 mx-auto text-gray-300 mb-4" />

              <p className="text-lg font-medium">Your URLs will appear here</p>
              <p>No URLs created yet.</p>
            </div>
          ) : (
            urlData
              ?.slice()
              .reverse()
              .map((url) => (
                <div
                  key={url?._id}
                  className="p-6 bg-white rounded-lg gap-5 transition duration-300 hover:scale-105 hover:bg-cyan-100"
                >
                  <div className="flex items-start ">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2 gap-4">
                        <h4 className="sm:text-xl font-semibold text-gray-600">
                          {url.description}
                        </h4>
                        {url?.expireAt ? (
                          <span
                            className={`text-white font-medium px-3 p-1 rounded-full  ${
                              isExpired(url?.expireAt)
                                ? "bg-red-500"
                                : "bg-green-400"
                            }`}
                          >
                            {isExpired(url?.expireAt) ? "Expired" : "Active"}
                          </span>
                        ) : (
                          <span className="bg-teal-400 text-white font-medium px-3 p-1 rounded-full">
                            Non-Expiring
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="sm:text-xl text-gray-500 font-semibold">
                            Original:{" "}
                            <span className="font-normal text-green-500">
                              {url.full_url}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="sm:text-xl text-gray-500 font-semibold">
                            Short Url:
                          </span>
                          <a
                            href={`${import.meta.env.VITE_BASE_URL}${
                              url?.short_url
                            }`}
                            target="_blank"
                            className="text-xl text-blue-600 hover:text-blue-800 truncat"
                          >
                            {`${import.meta.env.VITE_BASE_URL}${
                              url?.short_url
                            }`}
                          </a>
                        </div>
                      </div>
                      {isPremium ? (
                        <div className="flex flex-col space-x-4 mt-2 text-lg text-cyan-900">
                          <span className="flex items-center sm:text-xl font-semibold gap-2">
                            <span className="text-gray-500">Click's:</span>
                            <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
                              {url.click}
                            </div>
                          </span>
                          {url?.expireAt && (
                            <span className="font-semibold text-gray-500 sm:text-xl">
                              Expires:{" "}
                              <span className="font-normal sm:text-lg text-red-900">
                                {new Date(url?.expireAt).toLocaleString([], {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })}
                              </span>
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4 mt-3 text-sm text-cyan-900">
                          <span className="sm:text-lg font-semibold">
                            To track Clicks & set an Expiry date of your
                            URL,upgrade to a Premium plan.
                          </span>
                        </div>
                      )}

                      <span className="text-gray-500 font-semibold sm:text-xl">
                        Created:{" "}
                        <span className="sm:text-lg font-normal text-blue-900">
                          {new Date(url.createdAt).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() =>
                          handleCopyUrl(
                            `${import.meta.env.VITE_BASE_URL}${url?.short_url}`,
                            url._id
                          )
                        }
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                        title="Copy URL"
                      >
                        {copiedId === url._id ? (
                          <Check className="text-green-500" />
                        ) : (
                          <Copy />
                        )}
                      </button>

                      <button
                        onClick={() => handleDeleteUrl(url._id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Delete URL"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserUrl;
