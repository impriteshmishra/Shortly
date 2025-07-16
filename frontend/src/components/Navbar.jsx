import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, logoutUser } from "../api/user.api";
import { login, logout } from "../store/slice/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

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

  const handleLogout = async () => {
    await logoutUser(); // API call to remove cookie
    // console.log("Logout success")
    dispatch(logout()); // Reset Redux state thats make false your auth
    navigate({ to: "/auth" });
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-around items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold italic text-blue-600">
        Shortly
      </Link>

      <div className="flex gap-4 items-center">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="text-blue-500 hover:bg-blue-500 hover:text-white text-lg font-medium border border-blue-500 px-2 py-1 rounded">
              Login
            </Link>
            <Link to="/signup" className="hover:text-blue-500  bg-blue-500 text-white text-lg font-medium border hover:border-blue-500 hover:bg-white px-2 py-1 rounded">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-700 font-medium">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 font-medium text-lg cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
