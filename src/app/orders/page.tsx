import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prismadb";
import { Metadata } from "next";
import { ArrowRight, Package, Calendar } from "lucide-react";

export const metadata: Metadata = {
    title: "My Orders | YesDeal",
    description: "View and track your orders",
};

export default async function OrdersPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

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

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-2">My Orders</h1>
                    <p className="text-muted-foreground">View and track all your orders</p>
                </div>

                {/* Orders List */}
                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h2 className="text-2xl font-semibold text-foreground mb-2">No orders yet</h2>
                        <p className="text-muted-foreground mb-6">Start shopping to place your first order</p>
                        <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition-all duration-300">
                            Shop Now <ArrowRight size={18} />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const shippingDetails = typeof order.shippingDetails === 'string' 
                                ? JSON.parse(order.shippingDetails) 
                                : order.shippingDetails;
                            const products = typeof order.products === 'string' 
                                ? JSON.parse(order.products) 
                                : order.products;
                            
                            const orderNumber = `ORD-${new Date(order.createdAt).getFullYear()}${String(new Date(order.createdAt).getMonth() + 1).padStart(2, '0')}${String(new Date(order.createdAt).getDate()).padStart(2, '0')}${order.id.slice(-6).toUpperCase()}`;

                            return (
                                <Link
                                    key={order.id}
                                    href={`/orders/${order.id}`}
                                    className="block"
                                >
                                    <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-foreground mb-1">Order #{orderNumber}</h3>
                                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                                    <Calendar size={16} />
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                            <div className={`px-4 py-1 rounded-full text-sm font-semibold w-fit ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </div>
                                        </div>

                                        <div className="border-t border-border pt-4 mb-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Items: {(Array.isArray(products) ? products : []).length}</p>
                                                    <p className="text-sm text-muted-foreground">Shipping to: {shippingDetails?.city || 'N/A'}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-accent">${order.totalAmount.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
                                            View Details
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
