import React, { useState } from "react";
import {
  loginUser,
  resetPasswordSubmit,
  resetSendOtp,
  resetVerifyOtp,
} from "../api/user.api.js";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/authSlice.js";
import { useNavigate } from "@tanstack/react-router";
import WelcomeBack from "./WelcomeBack.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const LoginForm = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth);
  // console.log("auth",auth);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      dispatch(login(data?.user));
      // console.log("redux update", data);
      navigate({ to: "/" });
      setLoading(false);
      // console.log("signin success");
    } catch (err) {
      setLoading(false);
      // console.log(err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  // forget password

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!email) return setError("Please enter your email.");

    try {
      setLoading(true);
      const res = await resetSendOtp(email);
      setMessage(res?.message || "OTP sent to your email.");
      setStep(2);
    } catch (err) {
      setError(
        err?.response?.data?.error || err?.response?.data?.error || err?.message || "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!otp) return setError("Please enter the OTP.");

    try {
      setLoading(true);
      const res = await resetVerifyOtp(email, otp);
      setMessage(res?.message || "Email verified!");
      setStep(3);
    } catch (err) {
      setError(
        err?.response?.data?.error || err?.message || "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password) return setError("Please enter your password.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");

    try {
      setLoading(true);
      const res = await resetPasswordSubmit(email, password);
      setMessage(res.message || "Password reset successfully!");
      if (res?.user) {
        dispatch(login(res.user));
      }
      navigate({ to: "/auth" });
    } catch (err) {
      // console.log(err);

      setError(
        err?.response?.data?.message || err?.message || "Reset password failed."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-10 h-screen w-full">
        <div className=" bg-white shadow-md  max-w-2xl mb-18 w-full">
          <div className="bg-white  px-8 pt-6 pb-8 border border-blue-500 rounded-xl ">
            {forgotPassword ? (
              <h1 className="text-blue-500 text-2xl font-bold text-center">
                Reset password
              </h1>
            ) : (
              <h1 className="text-blue-500 text-2xl font-bold text-center">
                Login
              </h1>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                {message}
              </div>
            )}

            {!forgotPassword ? (
              <div>
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
                <div className="text-right text-blue-600 font-medium">
                  <button
                    className="mb-4 cursor-pointer"
                    onClick={() => setForgotPassword(true)}
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {step === 1 && (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                      Enter registered email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring mb-4"
                      required
                    />

                   <div className="text-right text-blue-600 font-medium">
                  <button
                    className="mb-4 cursor-pointer"
                    onClick={() => setForgotPassword(false)}
                  >
                    Back to login
                  </button>
                </div>

                    
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 ${
                        loading ? "opacity-60 cursor-not-allowed" : ""
                      } cursor-pointer`}
                    >
                      {loading ? "Sending OTP to verifying..." : "Send OTP"}
                    </button>
                  </div>
                )}

                {/* STEP 2: OTP */}
                {step === 2 && (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Enter OTP to verify
                    </label>
                    <input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter 6 digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring mb-4 tracking-widest"
                      required
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={loading}
                        className={`flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 ${
                          loading ? "opacity-60 cursor-not-allowed" : ""
                        } cursor-pointer`}
                      >
                        {loading ? "Verifying..." : "Verify OTP"}
                      </button>
                      <button
                        type="button"
                        onClick={handleSendOtp} // resend
                        disabled={loading}
                        className={`px-4 py-2 border rounded-lg ${
                          loading
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:bg-gray-50"
                        } cursor-pointer`}
                      >
                        {loading ? "sending..." : "Resend"}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Password */}
                {step === 3 && (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      New Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Minimum 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring mb-4"
                      required
                      minLength={8}
                    />

                    <button
                      type="button"
                      onClick={handleCreateNewPassword}
                      disabled={loading}
                      className={`w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 ${
                        loading ? "opacity-60 cursor-not-allowed" : ""
                      } cursor-pointer`}
                    >
                      {loading ? "Submitting..." : "Submit & Sign in"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {!forgotPassword && (
              <div className="flex items-center justify-between">
                <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
                    loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            )}

            <div className="text-center mt-4">
              <p className="cursor-pointer text-lg text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setLogin(false)}
                  className="text-blue-500 hover:text-blue-700 font-semibold text-xl cursor-pointer"
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
        <WelcomeBack />
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
