'use client';

import { Search } from "lucide-react";
import { motion } from "framer-motion";

const AIChat = () => {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 text-center mb-24 space-y-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl md:text-5xl font-medium text-navy tracking-tight">
                    NO IDEA? <br />
                    <span className="font-bold text-orange">HAVE A CHAT!</span>
                </h2>
            </motion.div>
            <div className="relative max-w-2xl mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <input type="text" placeholder="Eg: I need to Organize a Science Day" className="relative w-full py-5 pl-8 pr-14 rounded-full bg-white/90 backdrop-blur border border-primary/20 focus:outline-none focus:ring-2 focus:ring-orange shadow-lg text-navy placeholder:text-navy/40 transition-all" />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-navy/40 w-6 h-6" />
            </div>
        </section>
    );
};

export default AIChat;