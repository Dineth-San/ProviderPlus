'use client';

import { motion } from "framer-motion";
import { Star } from "lucide-react"; // Make sure to import Star if you haven't

const Hero = () => {
    return (
        <section id={"home"} className="w-full max-w-7xl mx-auto px-4 mt-8 mb-10">
            <div className="relative bg-white/40 backdrop-blur-sm border border-white/60 shadow-lg rounded-[40px] p-8 md:p-16 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 0 Q 50 100 100 0" stroke="#19579F" strokeWidth="2" fill="none" />
                        <path d="M0 100 Q 50 0 100 100" stroke="#D96C06" strokeWidth="2" fill="none" />
                    </svg>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4 max-w-lg text-center md:text-left"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-[#0C2B4E] leading-[1.1]">
                            PROVIDER+<br />
                        </h1>
                        <h1 className="text-5xl md:text-7xl font-light text-[#0C2B4E] leading-[1.1]">
                            AN ALL-IN-ONE <br />
                            <span className="font-medium text-[#19579F]">SERVICE</span> <br />
                            PLATFORM
                        </h1>
                        <div className="pt-4 space-y-2">
                            <p className="text-xl font-bold text-[#2B7FDE] tracking-wide">COMING SOON...</p>
                            <p className="text-sm text-[#0C2B4E]/60 max-w-xs mx-auto md:mx-0 font-medium">
                                Bringing the best services right to your doorstep.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Phone Bezel */}
                        <div className="w-[280px] h-[560px] bg-[#0C2B4E] rounded-[3rem] shadow-2xl border-[8px] border-[#0C2B4E] overflow-hidden relative z-10">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0C2B4E] rounded-b-xl z-20"></div>

                            {/* Screen Content */}
                            <div className="w-full h-full bg-[#F3F5F8] relative overflow-hidden">

                                {/* 1. Map Simulation Layer */}
                                <div className="absolute inset-0 opacity-40">
                                    {/* Vertical Roads */}
                                    <div className="absolute left-[20%] h-full w-4 bg-white border-x border-gray-300"></div>
                                    <div className="absolute left-[60%] h-full w-6 bg-white border-x border-gray-300"></div>
                                    <div className="absolute left-[85%] h-full w-2 bg-white border-x border-gray-300"></div>
                                    {/* Horizontal Roads */}
                                    <div className="absolute top-[30%] w-full h-5 bg-white border-y border-gray-300"></div>
                                    <div className="absolute top-[65%] w-full h-8 bg-white border-y border-gray-300"></div>
                                </div>

                                {/* 2. Route Path & Moving Marker */}
                                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                                    {/* Dotted Route Line */}
                                    <path
                                        d="M 60 560 L 60 380 Q 60 360 80 360 L 160 360 Q 180 360 180 340 L 180 200"
                                        stroke="#2B7FDE"
                                        strokeWidth="5"
                                        fill="none"
                                        strokeDasharray="8 6"
                                        strokeLinecap="round"
                                    />
                                    {/* Destination Pin */}
                                    <circle cx="180" cy="200" r="8" fill="#D96C06" className="animate-pulse" />
                                </svg>

                                {/* Moving Provider Dot (Simulating a car) */}
                                <motion.div
                                    className="absolute w-6 h-6 bg-[#0C2B4E] border-2 border-white rounded-full shadow-md z-10 flex items-center justify-center"
                                    initial={{ left: "21%", top: "110%" }} // Starting off screen
                                    animate={{
                                        left: ["19%", "19%", "64%", "64%"],
                                        top: ["110%", "64%", "64%", "35%"]
                                    }}
                                    transition={{
                                        duration: 8,
                                        ease: "linear",
                                        repeat: 0,
                                        repeatDelay: 1
                                    }}
                                >
                                    {/* Tiny arrow indicating direction */}
                                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-white"></div>
                                </motion.div>

                                {/* 3. Top Floating Search Bar (Uber style) */}
                                <div className="absolute top-10 left-4 right-4 bg-white rounded-lg shadow-sm p-3 flex items-center gap-3 z-20">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="h-1.5 w-20 bg-gray-200 rounded-full"></div>
                                </div>

                                {/* 4. Provider Detail Card (Bottom) */}
                                <div className="absolute bottom-6 left-4 right-4 bg-white rounded-xl shadow-xl p-4 z-20 border border-gray-100/50">
                                    <div className="flex items-center gap-3">
                                        {/* Default User Icon Silhouette */}
                                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-end justify-center shrink-0">
                                            <svg className="w-9 h-9 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>

                                        {/* Text Details */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-bold text-[#0C2B4E] text-sm">Shehan</h3>
                                                <div className="flex items-center gap-0.5 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-[#0C2B4E]">
                                                    <span>4.9</span>
                                                    <Star className="w-2.5 h-2.5 fill-[#D96C06] text-[#D96C06]" />
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 font-medium mt-0.5">Electrician</p>
                                            <p className="text-[10px] text-[#19579F] font-semibold mt-1">Arriving in 4 mins</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* Decorative background circles */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#2B7FDE]/20 rounded-full -z-10 opacity-50"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;