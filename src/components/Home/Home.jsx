import React from "react";
import { Link } from "react-router-dom"; // Import de Link pour la navigation
import HomeLogo from "../../assets/home-logo.png";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

      <h1 className="text-white text-3xl font-bold font-pixel text-center">
        Quiz Géographie
      </h1>
      <h2 className="text-white text-2xl font-bold font-pixel mt-4 mb-12 text-center">
        Viens tester tes connaissances !
      </h2>

      <div className="flex flex-col items-center justify-center border-8 border-white rounded-2xl p-10 shadow-2xl shadow-white w-auto min-w-[150px] max-w-[300px]">
        <img src={HomeLogo} alt="Home Logo" className="w-32 h-32" />
      </div>

      <div className="flex flex-col items-center gap-4 mt-6">
        <Link
          to="/solo"
          className="border-4 border-white text-white text-xl font-bold font-pixel px-6 py-2 rounded-lg transition-transform hover:scale-105 border-white rounded-2xl p-10 shadow-2xl shadow-white w-auto min-w-[150px] max-w-[300px]"
        >
          Solo
        </Link>
        <Link
          to="/multijoueur"
          className="border-4 border-white text-white text-xl font-bold font-pixel px-6 py-2 rounded-lg transition-transform hover:scale-105 border-white rounded-2xl p-10 shadow-2xl shadow-white w-auto min-w-[150px] max-w-[300px]"
        >
          Multijoueur
        </Link>
      </div>
    </div>
  );
}
