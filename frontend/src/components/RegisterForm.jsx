import React, { useState } from "react";
import { sendOtp, verifyOtp, registerUser } from "../api/user.api.js";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice.js";
import { useNavigate } from "@tanstack/react-router";
import Testimonial from "./Testimonial.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const RegisterForm = ({ setLogin }) => {
  const [step, setStep] = useState(1); // 1: email -> send otp, 2: otp -> verify, 3: name+password -> register
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STEP 1: Send OTP
  const handleSendOtp = async (e) => {
    // console.log(email);

    e.preventDefault();
    setError("");
    setMessage("");
    if (!email) return setError("Please enter your email.");

    try {
      setLoading(true);
      const res = await sendOtp(email); // POST /send-otp
      setMessage(res.message || "OTP sent to your email.");
      setStep(2);
    } catch (err) {
      setError(
        err?.response?.data?.error || err.message || "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!otp) return setError("Please enter the OTP.");

    try {
      setLoading(true);
      const res = await verifyOtp(email, otp); // POST /verify-otp
      setMessage(res.message || "Email verified!");
      setStep(3);
    } catch (err) {
      setError(
        err?.response?.data?.error || err.message || "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Complete Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!name) return setError("Please enter your full name.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");

    try {
      setLoading(true);
      const res = await registerUser(name, email, password); // POST /register
      setMessage(res.message || "Account created!");
      if (res.user) {
        dispatch(login(res.user));
      }
      navigate({ to: "/dashboard" });
    } catch (err) {
      // console.log(err);

      setError(
        err?.response?.data?.message || err?.message || "Registraion failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50 py-8 px-4">
        <div className="w-full max-w-2xl">
          {/* prevent default submit on Enter so clicks control the flow */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white rounded-xl px-8 pt-6 pb-8 mb-4 border border-blue-500"
          >
            <h1 className="text-blue-600 text-2xl font-bold text-center pb-6 pt-4">
              Create Account
            </h1>

            {/* status */}
            {error && (
              <div className="mt-4 mb-2 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            {message && (
              <div className="mt-4 mb-2 p-3 bg-green-100 text-green-700 rounded-md">
                {message}
              </div>
            )}

          
            {/* STEP 1: Email */}
            {step === 1 && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
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
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  } cursor-pointer`}
                >
                  {loading ? "Sending OTP to verifying..." : "Create account"}
                </button>
              </div>
            )}

            {/* STEP 2: OTP */}
            {step === 2 && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Enter OTP
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
                    Resend
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Name + Password */}
            {step === 3 && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Cena"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring mb-4"
                  required
                />

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
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
                  onClick={handleRegister}
                  disabled={loading}
                  className={`w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  } cursor-pointer`}
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>
            )}
            <div className="text-center mt-3">
              <p className="cursor-pointer text-lg text-gray-600">
                Already have an account?{" "}
                <button
                type="button"
                  onClick={()=>setLogin(true)}
                  className="text-blue-500 hover:text-blue-700 font-semibold text-xl cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
        <Testimonial />
      </div>
      <Footer/>
    </>
  );
};

export default RegisterForm;
