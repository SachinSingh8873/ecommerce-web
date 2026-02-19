
export default function AdminDashboard() {
    // In a real app, fetch stats here.
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700">
                    <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                    <p className="text-3xl font-bold mt-2">$0.00</p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700">
                    <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700">
                    <h3 className="text-gray-500 text-sm font-medium">Products In Stock</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
            </div>
        </div>
    )
}
