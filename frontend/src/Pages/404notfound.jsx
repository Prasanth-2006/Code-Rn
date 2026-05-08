import React from "react";
import nigga from "../assets/nigga.png";

const NotFound = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <img
        src={nigga}
        alt="Page Not Found"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default NotFound;