import React from "react";
import notfound from "../assets/notfound.jpg";

export default function NotFound() {
  return (
    <div>
      <img src={notfound} alt="" className="w-full object-cover h-[100vh]" />
    </div>
  );
}
