import React, { useState } from "react";
import { loginUser } from "../api/user.api.js";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/authSlice.js";
import { useNavigate } from "@tanstack/react-router";
import WelcomeBack from "./WelcomeBack.jsx";
import Navbar from "./Navbar.jsx";

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // console.log(auth);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      dispatch(login(data.user));
      // console.log("data", data.user);
      navigate({ to: "/dashboard" });
      setLoading(false);
      // console.log("signin success");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Navbar/>
       <div className="flex items-center p-10 h-screen w-full">
      <div className=" bg-white shadow-md w-full max-w-2xl m-auto">
        <div className="bg-white  px-8 pt-6 pb-8 border border-blue-500 rounded-xl">
          <h1 className="text-blue-500 text-2xl font-bold text-center">
            Login
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="cursor-pointer text-lg text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => state(false)}
                className="text-blue-500 hover:text-blue-700 font-semibold text-xl"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
      <WelcomeBack/>
    </div>
    </>
   
  );
};

export default LoginForm;
