'use client';

import { Bot, MapPin, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
    const features = [
        {
            icon: <Bot className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />,
            title: "AI Bot",
            desc: "Smart assistance tailored to your specific needs anytime."
        },
        {
            icon: <MapPin className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-300" />,
            title: "Geo Location",
            desc: "Real-time tracking to find services near you instantly."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-navy group-hover:text-white transition-colors duration-300" />,
            title: "Verified Providers",
            desc: "100% vetted professionals for your peace of mind."
        },
        {
            icon: <Star className="w-8 h-8 text-orange group-hover:text-white transition-colors duration-300" />,
            title: "Rating System",
            desc: "Community-driven reviews to ensure top quality."
        },
    ];

    return (
        <section id="features" className="w-full max-w-6xl mx-auto px-4 mt-40 mb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <br/>
                <br/>
                <h1 className="text-4xl md:text-5xl font-bold text-[#0C2B4E] w-full text-center md:text-center mx-auto">
                    What We Offer
                </h1>
                <br/>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                            y: -10,
                            boxShadow: "0 25px 50px -12px rgba(217, 108, 6, 0.25)", // Stronger orange shadow
                            borderColor: "rgba(217, 108, 6, 0.4)" // Orange border on hover
                        }}
                        className="group bg-white rounded-[32px] p-8 shadow-sm border border-transparent hover:border-orange/20 flex flex-col items-center text-center gap-6 cursor-default transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Hover Gradient Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        <div className="p-5 bg-offwhite rounded-2xl group-hover:bg-orange transition-colors duration-300 shadow-inner relative z-10">
                            {item.icon}
                        </div>

                        <div className="space-y-2 relative z-10">
                            <h3 className="font-bold text-lg text-navy group-hover:text-orange transition-colors duration-300">
                                {item.title}
                            </h3>
                            <p className="text-s text-navy/60 leading-relaxed px-2">
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Features;