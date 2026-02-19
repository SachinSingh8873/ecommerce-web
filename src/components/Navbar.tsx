"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, User, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/cart-context";
import { signOut } from "next-auth/react";

export default function Navbar({ user }: { user?: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { totalItems } = useCart();

  const profileRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold tracking-tighter text-foreground hover:text-primary transition-colors"
          >
            LUXE<span className="text-primary">.</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm uppercase tracking-wider"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm uppercase tracking-wider"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm uppercase tracking-wider"
            >
              About
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search (optional, can be expanded later) */}
            <button className="p-2 hover:bg-muted rounded-full transition-colors text-foreground/80 hover:text-primary">
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-muted rounded-full transition-colors text-foreground/80 hover:text-primary"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User / Profile */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary/10 transition-colors border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold uppercase">
                    {user.name?.[0] || user.email?.[0] || "U"}
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-card border border-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold truncate text-card-foreground">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm hover:bg-muted transition-colors text-card-foreground"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm hover:bg-muted transition-colors text-card-foreground"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 hover:bg-muted rounded-full transition-colors text-foreground/80 hover:text-primary"
              >
                <User size={22} />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-full transition-colors text-foreground/80"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-full left-0 w-full bg-card border-b border-border shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col p-6 space-y-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium text-card-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium text-card-foreground hover:text-primary transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium text-card-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            {!user && (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-card-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}