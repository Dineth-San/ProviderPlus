import { Instagram, Linkedin, Twitter, Facebook, Zap } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-navy text-offwhite pt-16 flex flex-col">

            {/* Main Footer Content */}
            <div className="w-full px-6 pb-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-white text-lg flex items-center gap-2">
                            <div className="w-6 h-6 bg-orange rounded-full flex items-center justify-center">
                                <Zap className="w-3 h-3 text-white fill-current" />
                            </div>
                            BrandName
                        </h3>
                        <p className="text-xs leading-relaxed opacity-80 max-w-xs">
                            Connecting you with the best services in town. Reliable, fast, and secure.
                        </p>
                        <div className="flex gap-5 pt-2">
                            <a href="#" className="hover:text-orange transition"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-orange transition"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-orange transition"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-orange transition"><Facebook className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Links Columns with dummy hrefs */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Explore</h4>
                        <ul className="space-y-3 opacity-80">
                            <li><a href="#" className="hover:text-white transition">Home</a></li>
                            <li><a href="#features" className="hover:text-white transition">Services</a></li>
                            <li><a href="#" className="hover:text-white transition">About Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6">Resources</h4>
                        <ul className="space-y-3 opacity-80">
                            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6">Legal</h4>
                        <ul className="space-y-3 opacity-80">
                            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- BLACK BOTTOM BAR --- */}
            <div className="w-full bg-black py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 gap-4">
                    <span>© 2025 BrandName Inc. All rights reserved.</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition">Privacy</a>
                        <a href="#" className="hover:text-white transition">Terms</a>
                        <a href="#" className="hover:text-white transition">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;