"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function Toast({
  message,
  type = "success",
  duration = 4000,
  onClose,
  action,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const styles = {
    success: "bg-green-50 border border-green-200 text-green-800",
    error: "bg-red-50 border border-red-200 text-red-800",
    info: "bg-blue-50 border border-blue-200 text-blue-800",
  };

  const iconColors = {
    success: "text-green-600",
    error: "text-red-600",
    info: "text-blue-600",
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed top-6 right-6 p-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-slide-down max-w-md",
        styles[type]
      )}
    >
      <span className={iconColors[type]}>{icons[type]}</span>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="text-xs font-semibold underline hover:opacity-80 transition-opacity"
        >
          {action.label}
        </button>
      )}
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="text-lg hover:opacity-60 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
