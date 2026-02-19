import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FadeIn from "@/components/ui/fade-in";
import Link from "next/link";

export default async function ProfilePage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    const user = session.user;

    // Mock Orders for now
    const orders = [
        { id: "ORD-1234", date: "2024-02-15", total: 299.99, status: "Delivered", items: ["Premium Leather Jacket"] },
        { id: "ORD-5678", date: "2024-01-20", total: 89.99, status: "Processing", items: ["Silk Scarf"] },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <FadeIn>
                <h1 className="text-3xl font-bold mb-8">My Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Info */}
                    <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg h-fit">
                        <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{user.name}</p>

                            <p className="text-sm text-gray-500 mt-4">Email</p>
                            <p className="font-medium">{user.email}</p>

                            <p className="text-sm text-gray-500 mt-4">Role</p>
                            <p className="font-medium capitalize">{user.role?.toLowerCase() || 'User'}</p>
                        </div>
                    </div>

                    {/* Order History */}
                    <div className="md:col-span-2">
                        <h2 className="text-xl font-bold mb-4">Order History</h2>
                        <div className="space-y-4">
                            {orders.map((order, i) => (
                                <div key={order.id} className="border border-gray-100 dark:border-neutral-800 rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="font-bold">{order.id}</p>
                                            <p className="text-sm text-gray-500">{order.date}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="space-y-1 mb-4">
                                        {order.items.map(item => (
                                            <p key={item} className="text-sm">{item}</p>
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-100 dark:border-neutral-800 pt-4 flex justify-between items-center">
                                        <p className="font-bold">${order.total}</p>
                                        <button className="text-sm underline">View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
