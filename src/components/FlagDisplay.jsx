import React from "react";

export default function FlagDisplay({ flag }) {
  return (
    <img src={flag} alt="Drapeau" className="w-64 h-40 mt-4" />
  );
}
