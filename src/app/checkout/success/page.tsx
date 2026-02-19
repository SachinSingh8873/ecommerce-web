import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="bg-green-100 dark:bg-green-900 p-6 rounded-full mb-6 text-green-600 dark:text-green-300">
                <CheckCircle size={64} />
            </div>
            <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                Thank you for your purchase. We have received your order and are processing it.
            </p>
            <Link href="/" className="bg-black text-white px-8 py-3 rounded-full hover:opacity-80 transition dark:bg-white dark:text-black">
                Continue Shopping
            </Link>
        </div>
    )
}
