import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AuthPage() {
  const [login, setLogin] = useState(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div className="w-full ">
          {login ? (
            <LoginForm state={setLogin} />
          ) : (
            <RegisterForm state={setLogin} />
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default AuthPage;
