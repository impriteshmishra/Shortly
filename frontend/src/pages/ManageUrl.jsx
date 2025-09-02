import React from "react";
import UserUrl from "../components/UserUrl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ManageUrl() {
  return (
    <>
      <Navbar />
      <div className="md:mx-92">
        <UserUrl />
      </div>
      <Footer />
    </>
  );
}

export default ManageUrl;
