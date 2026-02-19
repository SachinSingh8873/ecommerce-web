
export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground py-16 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-3">
                        <h3 className="text-2xl font-bold">YesDeal<span className="text-accent">.</span></h3>
                        <p className="text-primary-foreground/80">Premium products and lifestyle essentials designed for excellence and everyday luxury.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Shop</h4>
                        <ul className="space-y-2 text-primary-foreground/80">
                            <li><a href="/products?category=clothing" className="hover:text-accent transition-colors duration-300">Clothing</a></li>
                            <li><a href="/products?category=accessories" className="hover:text-accent transition-colors duration-300">Accessories</a></li>
                            <li><a href="/products?category=shoes" className="hover:text-accent transition-colors duration-300">Shoes</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Company</h4>
                        <ul className="space-y-2 text-primary-foreground/80">
                            <li><a href="/about" className="hover:text-accent transition-colors duration-300">About Us</a></li>
                            <li><a href="/contact" className="hover:text-accent transition-colors duration-300">Contact</a></li>
                            <li><a href="/terms" className="hover:text-accent transition-colors duration-300">Terms</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Newsletter</h4>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Your email" className="bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-2 rounded-md w-full text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30" />
                            <button className="bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium hover:bg-accent/90 transition-colors duration-300">Subscribe</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/70 text-sm">
                    &copy; {new Date().getFullYear()} YesDeal. All rights reserved. | Crafted for excellence.
                </div>
            </div>
        </footer>
    )
}
