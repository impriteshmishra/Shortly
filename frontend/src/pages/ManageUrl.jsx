import React from "react";
import UserUrl from "../components/UserUrl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ManageUrl() {
  return (
    <>
      <Navbar />
      <div className="xl:mx-91">
        <UserUrl />
      </div>
      <Footer />
    </>
  );
}

export default ManageUrl;
