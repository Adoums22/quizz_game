import React from "react";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavigationButtons() {
  const navigate = useNavigate();
  const location = useLocation();
  const hiddenHomePaths = ["/", "/solo"];

  return (
    <div className="absolute top-4 left-4 flex gap-4">
      <button
        onClick={() => navigate(-1)}
        className="text-white text-2xl hover:text-gray-400 transition"
      >
        <FaArrowLeft />
      </button>

      {!hiddenHomePaths.includes(location.pathname) && (
        <button
          onClick={() => navigate("/")}
          className="text-white text-2xl hover:text-gray-400 transition"
        >
          <FaHome />
        </button>
      )}
    </div>
  );
}
