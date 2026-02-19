
export default function Footer() {
    return (
        <footer className="bg-black text-white py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">LUXE.</h3>
                        <p className="text-gray-400">Premium apparel and accessories for the modern lifestyle.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Shop</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/products?category=clothing" className="hover:text-white">Clothing</a></li>
                            <li><a href="/products?category=accessories" className="hover:text-white">Accessories</a></li>
                            <li><a href="/products?category=shoes" className="hover:text-white">Shoes</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/about" className="hover:text-white">About Us</a></li>
                            <li><a href="/contact" className="hover:text-white">Contact</a></li>
                            <li><a href="/terms" className="hover:text-white">Terms</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Newsletter</h4>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Your email" className="bg-neutral-900 border border-neutral-700 px-4 py-2 rounded-md w-full focus:outline-none focus:border-white" />
                            <button className="bg-white text-black px-4 py-2 rounded-md font-medium">Subscribe</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} LUXE E-commerce. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
