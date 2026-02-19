"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, AlertCircle, CheckCircle } from "lucide-react";
import { validateEmail, validatePassword } from "@/lib/validation";

function SignupForm() {
    const router = useRouter();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!data.name || data.name.trim().length < 2) {
            errors.name = "Name must be at least 2 characters";
        }

        if (!validateEmail(data.email)) {
            errors.email = "Please enter a valid email address";
        }

        const passwordValidation = validatePassword(data.password);
        if (!passwordValidation.valid) {
            errors.password = passwordValidation.message;
        }

        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = "Passwords don't match";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                setError(errorText || "Failed to create account. Email might already be in use.");
                return;
            }

            setSuccess(true);
            setData({ name: "", email: "", password: "", confirmPassword: "" });
            setFieldErrors({});

            setTimeout(() => {
                router.push("/login?success=Account created successfully! Please sign in.");
            }, 2000);
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border p-8 rounded-2xl shadow-xl max-w-md w-full"
        >
            {success ? (
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="bg-green-100 p-6 rounded-full">
                            <CheckCircle size={48} className="text-green-500" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Welcome to YesDeal!</h2>
                    <p className="text-muted-foreground">Your account has been created successfully. Redirecting you to login...</p>
                </div>
            ) : (
                <>
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-foreground mb-2">Create Account</h1>
                        <p className="text-muted-foreground">Join YesDeal and start shopping</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm mb-6 flex items-start gap-2">
                            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                className={`w-full px-4 py-3 rounded-lg bg-background border ${fieldErrors.name ? "border-red-500" : "border-border"} text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition`}
                                placeholder="John Doe"
                                value={data.name}
                                onChange={(e) => {
                                    setData({ ...data, name: e.target.value });
                                    setFieldErrors({ ...fieldErrors, name: "" });
                                }}
                            />
                            {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                className={`w-full px-4 py-3 rounded-lg bg-background border ${fieldErrors.email ? "border-red-500" : "border-border"} text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition`}
                                placeholder="you@example.com"
                                value={data.email}
                                onChange={(e) => {
                                    setData({ ...data, email: e.target.value });
                                    setFieldErrors({ ...fieldErrors, email: "" });
                                }}
                            />
                            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
                            <input
                                type="password"
                                required
                                className={`w-full px-4 py-3 rounded-lg bg-background border ${fieldErrors.password ? "border-red-500" : "border-border"} text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition`}
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) => {
                                    setData({ ...data, password: e.target.value });
                                    setFieldErrors({ ...fieldErrors, password: "" });
                                }}
                            />
                            {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
                            <p className="text-xs text-muted-foreground mt-1">At least 8 characters, 1 uppercase, 1 number</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Confirm Password</label>
                            <input
                                type="password"
                                required
                                className={`w-full px-4 py-3 rounded-lg bg-background border ${fieldErrors.confirmPassword ? "border-red-500" : "border-border"} text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition`}
                                placeholder="••••••••"
                                value={data.confirmPassword}
                                onChange={(e) => {
                                    setData({ ...data, confirmPassword: e.target.value });
                                    setFieldErrors({ ...fieldErrors, confirmPassword: "" });
                                }}
                            />
                            {fieldErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-bold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 mt-6"
                        >
                            <UserPlus size={20} />
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-accent font-semibold hover:text-accent/80 transition-colors">
                            Sign in here
                        </Link>
                    </div>
                </>
            )}
        </motion.div>
    );
}

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <Suspense fallback={<div className="text-foreground">Loading...</div>}>
                <SignupForm />
            </Suspense>
        </div>
    );
}
