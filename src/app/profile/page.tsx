import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prismadb";
import { Metadata } from "next";
import { User, Package, ShoppingBag, Calendar, ArrowRight, Settings } from "lucide-react";

export const metadata: Metadata = {
    title: "My Profile | YesDeal",
    description: "Manage your profile and view orders",
};

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
    });

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
    });

    const totalOrders = await prisma.order.count({
        where: { userId: session.user.id },
    });

    const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

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

    const memberSince = new Date(dbUser?.createdAt || new Date()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    });

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
                            <p className="text-muted-foreground">Manage your account and view orders</p>
                        </div>
                        <Link 
                            href="/settings" 
                            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors"
                        >
                            <Settings size={20} />
                            <span className="hidden sm:inline">Settings</span>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Info Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-card border border-border rounded-2xl p-8 sticky top-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/50 rounded-full flex items-center justify-center">
                                    <User size={32} className="text-accent-foreground" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-foreground">{dbUser?.name || 'User'}</h2>
                                    <p className="text-sm text-muted-foreground">{dbUser?.role?.toLowerCase() || 'customer'}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="border-t border-border pt-6">
                                    <p className="text-sm text-muted-foreground mb-2">Email Address</p>
                                    <p className="font-medium text-foreground break-all">{dbUser?.email}</p>
                                </div>

                                <div className="border-t border-border pt-6">
                                    <p className="text-sm text-muted-foreground mb-2">Member Since</p>
                                    <p className="font-medium text-foreground">{memberSince}</p>
                                </div>

                                <div className="border-t border-border pt-6">
                                    <p className="text-sm text-muted-foreground mb-2">Account Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <p className="font-medium text-foreground">Active</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-8 px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-semibold">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="lg:col-span-2">
                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                            <div className="bg-card border border-border rounded-xl p-4 text-center">
                                <ShoppingBag size={24} className="text-accent mx-auto mb-2" />
                                <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
                                <p className="text-xs text-muted-foreground mt-1">Total Orders</p>
                            </div>
                            <div className="bg-card border border-border rounded-xl p-4 text-center">
                                <Package size={24} className="text-accent mx-auto mb-2" />
                                <p className="text-2xl font-bold text-foreground">{orders.filter(o => o.status === 'Delivered').length}</p>
                                <p className="text-xs text-muted-foreground mt-1">Delivered</p>
                            </div>
                            <div className="bg-card border border-border rounded-xl p-4 text-center">
                                <span className="text-2xl font-bold text-accent block">${totalSpent.toFixed(2)}</span>
                                <p className="text-xs text-muted-foreground mt-1">Total Spent</p>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-foreground">Recent Orders</h2>
                                {totalOrders > 5 && (
                                    <Link href="/orders" className="text-accent text-sm font-semibold hover:text-accent/80 transition-colors">
                                        View All
                                    </Link>
                                )}
                            </div>

                            {orders.length === 0 ? (
                                <div className="bg-card border border-border rounded-2xl p-12 text-center">
                                    <Package size={48} className="text-muted-foreground mx-auto mb-4 opacity-50" />
                                    <h3 className="text-lg font-semibold text-foreground mb-2">No orders yet</h3>
                                    <p className="text-muted-foreground mb-6">Start shopping to place your first order</p>
                                    <Link 
                                        href="/products" 
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                                    >
                                        Shop Now
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
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
                                                <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300">
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                                        <div>
                                                            <h3 className="font-semibold text-foreground mb-1">#{orderNumber}</h3>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Calendar size={14} />
                                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)} w-fit`}>
                                                            {order.status}
                                                        </div>
                                                    </div>

                                                    <div className="border-t border-border pt-4 flex justify-between items-end">
                                                        <div>
                                                            <p className="text-sm text-muted-foreground mb-1">{(Array.isArray(products) ? products : []).length} item(s)</p>
                                                            <p className="text-sm text-muted-foreground">To: {shippingDetails?.city || 'N/A'}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-bold text-accent">${order.totalAmount.toFixed(2)}</p>
                                                            <ArrowRight size={16} className="text-accent ml-auto mt-1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
