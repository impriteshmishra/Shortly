import "./App.css";


import { Outlet } from "@tanstack/react-router";
import { ToastContainer } from 'react-toastify';

function RootLayout() {
  return (
    <>
      <Outlet/>
      <ToastContainer/>
    </>
  );
}

export default RootLayout;
