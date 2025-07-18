import "./App.css";

import Homepage from "./pages/Homepage";
import LoginForm from "./components/LoginForm";
import AuthPage from "./pages/AuthPage";
import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";

function RootLayout() {
  return (
    <>
    {/* <Navbar/> */}
      <Outlet/>
    </>
  );
}

export default RootLayout;
