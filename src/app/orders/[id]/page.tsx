import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prismadb";
import { Metadata } from "next";
import { ArrowLeft, Package, MapPin, Calendar, CreditCard, Truck } from "lucide-react";

interface OrderDetailPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: OrderDetailPageProps): Promise<Metadata> {
    return {
        title: "Order Details | YesDeal",
        description: "View your order details and track shipment",
    };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const { id } = await params;

    const order = await prisma.order.findFirst({
        where: {
            id,
            userId: session.user.id,
        },
    });

    if (!order) {
        notFound();
    }

    const shippingDetails = typeof order.shippingDetails === 'string'
        ? JSON.parse(order.shippingDetails)
        : order.shippingDetails;

    const products = typeof order.products === 'string'
        ? JSON.parse(order.products)
        : order.products;

    const orderNumber = `ORD-${new Date(order.createdAt).getFullYear()}${String(new Date(order.createdAt).getMonth() + 1).padStart(2, '0')}${String(new Date(order.createdAt).getDate()).padStart(2, '0')}${order.id.slice(-6).toUpperCase()}`;

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <Package className="w-8 h-8 text-yellow-500" />;
            case 'processing':
                return <Package className="w-8 h-8 text-blue-500" />;
            case 'shipped':
                return <Truck className="w-8 h-8 text-purple-500" />;
            case 'delivered':
                return <Package className="w-8 h-8 text-green-500" />;
            default:
                return <Package className="w-8 h-8 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusDescription = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'Your order is pending and will be processed soon';
            case 'processing':
                return 'We are preparing your order for shipment';
            case 'shipped':
                return 'Your order is on its way to you';
            case 'delivered':
                return 'Your order has been delivered';
            case 'cancelled':
                return 'Your order has been cancelled';
            default:
                return 'Your order status is being updated';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button */}
                <Link href="/orders" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8 font-semibold">
                    <ArrowLeft size={18} />
                    Back to Orders
                </Link>

                {/* Order Header */}
                <div className="bg-card border border-border rounded-2xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-foreground mb-2">Order #{orderNumber}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar size={18} />
                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                        <div className={`px-6 py-2 rounded-full text-lg font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                        </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            {getStatusIcon(order.status)}
                            <div>
                                <p className="font-semibold text-foreground">{order.status}</p>
                                <p className="text-muted-foreground text-sm">{getStatusDescription(order.status)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Items */}
                    <div className="bg-card border border-border rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-foreground mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {Array.isArray(products) && products.map((product: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-start pb-4 border-b border-border last:border-0">
                                    <div>
                                        <p className="font-medium text-foreground">{product.productId || product.name || 'Product'}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {product.quantity || 1}</p>
                                    </div>
                                    <p className="font-semibold text-foreground">${((product.price || 0) * (product.quantity || 1)).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-border flex justify-between">
                            <p className="text-lg font-bold text-foreground">Total</p>
                            <p className="text-2xl font-bold text-accent">${order.totalAmount.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Shipping & Payment */}
                    <div className="space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                <MapPin size={20} className="text-accent" />
                                Shipping Address
                            </h2>
                            <p className="text-foreground font-semibold mb-1">{shippingDetails?.name || 'N/A'}</p>
                            <p className="text-muted-foreground">{shippingDetails?.address || 'N/A'}</p>
                            <p className="text-muted-foreground">{shippingDetails?.city || 'N/A'}, {shippingDetails?.zip || 'N/A'}</p>
                        </div>

                        {/* Payment */}
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                <CreditCard size={20} className="text-accent" />
                                Payment
                            </h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="text-foreground">${order.totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-foreground">Free</span>
                                </div>
                                <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold">
                                    <span className="text-foreground">Total Paid</span>
                                    <span className="text-accent text-lg">${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-2xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Need Help?</h3>
                    <p className="text-muted-foreground mb-4">If you have any questions about your order, please contact our support team.</p>
                    <a href="mailto:support@yesdeal.com" className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition-colors">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
