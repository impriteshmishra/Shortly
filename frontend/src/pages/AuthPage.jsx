import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function AuthPage() {
  const [login, setLogin] = useState(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div className="w-full ">
          {login ? (
            <LoginForm setLogin={setLogin} />
          ) : (
            <RegisterForm setLogin={setLogin} />
          )}
        </div>
      </div>
      
    </>
  );
}

export default AuthPage;
