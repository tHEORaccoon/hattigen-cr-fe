import React, { useEffect, useState } from "react";

interface AlertProps {
  message: string;
  type: "success" | "error";
  duration?: number; // Optional timeout
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
 
     
  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Alert;
