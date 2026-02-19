import Link from "next/link"
import { LayoutDashboard, Package, Settings, LogOut } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-900">
            <aside className="w-64 bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-700 hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin</h1>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-md">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-md">
                        <Package size={20} />
                        Products
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-md">
                        <Settings size={20} />
                        Settings
                    </Link>
                </nav>
                <div className="absolute bottom-4 left-4 right-4">
                    <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md w-full">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
