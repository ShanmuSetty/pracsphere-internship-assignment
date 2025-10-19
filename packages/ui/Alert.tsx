import React from "react";

interface AlertProps {
  children: React.ReactNode;
  variant?: "error" | "success" | "info";
}

const Alert: React.FC<AlertProps> = ({ children, variant = "error" }) => {
  const variants = {
    error: "bg-red-50 border-red-200 text-red-600",
    success: "bg-green-50 border-green-200 text-green-600",
    info: "bg-blue-50 border-blue-200 text-blue-600",
  };

  return (
    <div className={`border px-4 py-3 rounded-lg text-sm ${variants[variant]}`}>
      {children}
    </div>
  );
};

export default Alert;