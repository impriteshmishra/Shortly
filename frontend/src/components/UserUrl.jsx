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
    <div className="bg-gray-200 rounded-xl min-h-screen mb-16">
      <div className="p-6 sm:p-8 bg-gray-50">
        <div className="flex items-center gap-3">
          <Link className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              All URLs
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Manage and monitor your URLs
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6">
          {/* Total URLs */}
          <div className="rounded-lg bg-white shadow-md p-4 sm:p-6">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {urlData?.length ?? 0}
            </div>
            <div className="text-gray-600 text-sm sm:text-base">Total URLs</div>
          </div>

          {/* Total Clicks */}
          {isPremium ? (
            <div className="rounded-lg bg-white shadow-md p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {totalClicks ?? 0}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">
                Total Clicks
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-white shadow-md p-4 sm:p-6">
              <div className="text-sm sm:text-base font-semibold text-blue-600">
                Premium only
              </div>
              <div className="text-gray-600 text-sm sm:text-base">
                Total Clicks
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full h-full p-4 sm:p-10 overflow-y-auto">
        {urlData?.length === 0 ? (
          <div className="p-8 text-center text-gray-500 flex flex-col justify-center min-h-[60vh]">
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
                className="p-4 sm:p-6 bg-white rounded-lg gap-5 transition duration-300 hover:scale-[1.01] hover:bg-cyan-100"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  {/* Left content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="text-base sm:text-xl font-semibold text-gray-600 break-all">
                        {url?.description}
                      </h4>
                      {url?.expireAt ? (
                        <span
                          className={`text-white font-medium px-2 py-0.5 rounded-full text-sm ${
                            isExpired(url?.expireAt)
                              ? "bg-red-500"
                              : "bg-green-400"
                          }`}
                        >
                          {isExpired(url?.expireAt) ? "Expired" : "Active"}
                        </span>
                      ) : (
                        <span className="bg-teal-400 text-white font-medium px-2 py-0.5 rounded-full text-sm">
                          Non-Expiring
                        </span>
                      )}
                    </div>

                    {/* URLs */}
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <span className="text-sm sm:text-xl text-gray-500 font-semibold">
                          Original:{" "}
                        </span>
                        <span className="text-green-500 break-all text-sm sm:text-base">
                          {url?.full_url}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <span className="text-sm sm:text-xl text-gray-500 font-semibold">
                          Short Url:
                        </span>
                        <a
                          href={`${import.meta.env.VITE_BASE_URL}s/${
                            url?.short_url
                          }`}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800 truncate max-w-[200px] sm:max-w-none"
                        >
                          {`${import.meta.env.VITE_BASE_URL}s/${
                            url?.short_url
                          }`}
                        </a>
                      </div>
                    </div>

                    {/* Premium / Free features */}
                    {isPremium ? (
                      <div className="mt-2 text-sm sm:text-lg text-cyan-900 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Clicks:</span>
                          <div className="flex items-center gap-1 bg-blue-100 px-2 py-0.5 rounded-full">
                            {url?.click}
                          </div>
                        </div>
                        {url?.expireAt && (
                          <div className="text-gray-500">
                            Expires:{" "}
                            <span className="text-red-900">
                              {new Date(url?.expireAt).toLocaleString([], {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="mt-2 text-gray-600 text-sm sm:text-lg">
                        Upgrade to Premium to track clicks & set expiry.
                      </p>
                    )}

                    <div className="text-gray-500 text-sm sm:text-xl mt-1">
                      Created:{" "}
                      <span className="text-blue-900 text-sm sm:text-lg">
                        {new Date(url?.createdAt).toLocaleString([], {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex mt-3 sm:mt-0 items-center gap-2">
                    <button
                      onClick={() =>
                        handleCopyUrl(
                          `${import.meta.env.VITE_BASE_URL}s/${url?.short_url}`,
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
  );
}

export default UserUrl;
