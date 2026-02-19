"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
    const router = useRouter();
    const [data, setData] = useState({
        name: "",
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
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/login?success=Account created! Please log in.");
            } else {
                const msg = await res.text();
                setError(msg || "Something went wrong");
            }
        } catch (err) {
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
                <h1 className="text-3xl font-bold">Create Account</h1>
                <p className="text-gray-500 mt-2">Join our exclusive community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full p-3 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
                        placeholder="John Doe"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                </div>
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
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-black dark:text-white font-medium hover:underline">
                    Log in
                </Link>
            </div>
        </motion.div>
    );
}
