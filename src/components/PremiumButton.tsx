"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function PremiumButton({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  className,
  disabled,
  ...props
}: PremiumButtonProps) {
  const baseStyles =
    "font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden";

  const variants = {
    primary:
      "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:scale-105 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:scale-105 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
    outline:
      "border-2 border-accent text-accent hover:bg-accent/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="inline-block animate-spin">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </span>
      )}
      {children}
    </button>
  );
}
