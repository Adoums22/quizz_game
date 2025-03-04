import React from "react";

export default function FlagDisplay({ flag }) {
  return (
    <img 
  src={flag} 
  alt="Drapeau du pays" 
  className="rounded-lg shadow-lg w-full max-h-48 object-contain"
/>

  );
}
