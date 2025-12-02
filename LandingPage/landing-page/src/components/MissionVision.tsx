'use client';

import { motion } from "framer-motion";

const MissionVision = () => {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 mt-10 mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[32px] p-10 shadow-sm border border-primary/10 text-center flex flex-col items-center min-h-[340px]">
                    <h2 className="text-2xl font-bold mb-8 text-navy">Our Mission</h2>
                    <div className="w-12 h-1 bg-orange mb-8 rounded-full"></div>
                    <p className="text-sm text-navy/70 leading-loose max-w-xs">To simplify daily life by connecting people with reliable, verified services instantly.</p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[32px] p-10 shadow-sm border border-primary/10 text-center flex flex-col items-center min-h-[340px]">
                    <h2 className="text-2xl font-bold mb-8 text-navy">Our Vision</h2>
                    <div className="w-12 h-1 bg-orange mb-8 rounded-full"></div>
                    <p className="text-sm text-navy/70 leading-loose max-w-xs">To become the world's most trusted all-in-one platform where any service is just one click away.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default MissionVision;