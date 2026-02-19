"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                ...data,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid credentials");
            } else {
                router.refresh();
                router.push("/admin"); // Redirect to admin or home based on role later
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-black p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800"
        >
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-gray-500 mt-2">Sign in to your account</p>
            </div>

            {successMsg && (
                <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm text-center">
                    {successMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full p-3 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
                        placeholder="john@example.com"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full p-3 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
                        placeholder="••••••••"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Log In"}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href="/signup" className="text-black dark:text-white font-medium hover:underline">
                    Sign up
                </Link>
            </div>
        </motion.div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
