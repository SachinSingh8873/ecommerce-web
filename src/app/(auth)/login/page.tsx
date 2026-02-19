"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, AlertCircle } from "lucide-react";
import { validateEmail } from "@/lib/validation";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const successMsg = searchParams.get("success");

    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});

        // Validate form data
        const errors: Record<string, string> = {};
        
        if (!validateEmail(data.email)) {
            errors.email = "Please enter a valid email address";
        }
        
        if (!data.password || data.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setError("Please correct the errors below before submitting.");
            return;
        }

        setLoading(true);

        try {
            const res = await signIn("credentials", {
                ...data,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid email or password");
            } else {
                router.refresh();
                router.push("/orders");
            }
        } catch (err) {
            console.error(err);
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
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in to your YesDeal account</p>
            </div>

            {successMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6 text-sm text-center font-medium">
                    {successMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                    <input
                        type="email"
                        required
                        className={`w-full px-4 py-3 rounded-lg bg-background border ${fieldErrors.email ? "border-red-500" : "border-border"} text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition`}
                        placeholder="you@example.com"
                        value={data.email}
                        onChange={(e) => {
                            setData({ ...data, email: e.target.value })
                            if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" })
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
                            setData({ ...data, password: e.target.value })
                            if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" })
                        }}
                    />
                    {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm flex items-start gap-2">
                        <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-bold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <LogIn size={20} />
                    {loading ? "Logging in..." : "Sign In"}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-accent font-semibold hover:text-accent/80 transition-colors">
                    Create one now
                </Link>
            </div>
        </motion.div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <Suspense fallback={<div className="text-foreground">Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
