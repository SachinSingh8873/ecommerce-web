'use client'

import Link from "next/link";
import { CheckCircle, Mail, ArrowRight, Home } from "lucide-react";
import { useEffect, useState } from "react";

export default function SuccessPage() {
    const [orderNumber, setOrderNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        // Get order details from sessionStorage (set during checkout)
        const storedOrderNumber = sessionStorage.getItem("lastOrderNumber");
        const storedEmail = sessionStorage.getItem("lastOrderEmail");
        
        if (storedOrderNumber) setOrderNumber(storedOrderNumber);
        if (storedEmail) setEmail(storedEmail);
        
        // Clear after reading
        sessionStorage.removeItem("lastOrderNumber");
        sessionStorage.removeItem("lastOrderEmail");
    }, []);

    return (
        <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full">
                {/* Success Icon */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gradient-to-br from-green-100 to-accent/20 p-8 rounded-full shadow-lg">
                        <CheckCircle size={80} className="text-green-500" />
                    </div>
                </div>

                {/* Main Message */}
                <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
                    Order Confirmed!
                </h1>
                
                <p className="text-xl text-center text-muted-foreground mb-12">
                    Thank you for your purchase. We're excited to get your order ready!
                </p>

                {/* Order Details Card */}
                <div className="bg-card border border-border rounded-2xl p-8 mb-8">
                    {orderNumber && (
                        <div className="mb-6 pb-6 border-b border-border">
                            <p className="text-muted-foreground text-sm mb-2">Order Number</p>
                            <p className="text-3xl font-bold text-accent">{orderNumber}</p>
                        </div>
                    )}

                    {email && (
                        <div className="flex items-start gap-4 mb-6">
                            <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Confirmation Email Sent</p>
                                <p className="text-foreground font-medium">{email}</p>
                                <p className="text-muted-foreground text-sm mt-2">Check your email for order details and tracking information.</p>
                            </div>
                        </div>
                    )}

                    {!email && (
                        <div className="flex items-start gap-4 mb-6">
                            <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">What Happens Next?</p>
                                <ul className="text-foreground space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
                                        You'll receive a confirmation email shortly
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
                                        We'll process your order within 24 hours
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
                                        You'll get a shipping notification with tracking info
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href="/orders"
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-lg"
                    >
                        View My Orders
                        <ArrowRight size={18} />
                    </Link>
                    <Link 
                        href="/"
                        className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-border text-foreground rounded-full font-semibold hover:bg-muted transition-all duration-300"
                    >
                        <Home size={18} />
                        Continue Shopping
                    </Link>
                </div>

                {/* Help Text */}
                <p className="text-center text-muted-foreground text-sm mt-12">
                    Have questions? <a href="mailto:support@yesdeal.com" className="text-accent hover:text-accent/80 font-semibold">Contact our support team</a>
                </p>
            </div>
        </div>
    )
}
