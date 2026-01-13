'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Linkedin, Github } from "lucide-react";

// UPDATE THESE LINKS AND FILENAMES
const teamMembers = [
    {
        id: 1,
        name: "Dineth Kaluarachchi",
        role: "Project Manager & Analyst",
        image: "/team/dineth.jpg", // Make sure you save the photo as dineth.jpg in public/team folder
        quote: "Identified key user groups and planned resources. Analyzed features for scope definition.",
        linkedin: "https://www.linkedin.com/in/dineth-kaluarachchi",
        github: "https://github.com/Dineth-San"
    },
    {
        id: 2,
        name: "Dinura Munasinghe",
        role: "UI/UX Lead & Planner",
        image: "/team/dinura.png",
        quote: "Led UI architecture and high-fidelity prototyping. Developed the WBS and conducted competitor analysis.",
        linkedin: "https://www.linkedin.com/in/dinura-munasinghe",
        github: "https://github.com/dinura-munasinghe"
    },
    {
        id: 3,
        name: "Senura Damhiru",
        role: "Risk and Market Researcher",
        image: "/team/senura.jpg",
        quote: "Created the Risk Mitigation Matrix and validated the 'Trust Dilemma' through literature review.",
        linkedin: "https://www.linkedin.com/in/senura-damhiru",
        github: "https://github.com/Senura730"
    },
    {
        id: 4,
        name: "Banuka Senadheera",
        role: "System Architect",
        image: "/team/banuka.jpg",
        quote: "Justified Agile Scrum & OOAD methodologies. Refined technical specifications and integrated design systems.",
        linkedin: "https://www.linkedin.com/in/banuka-senadheera-578b61312",
        github: "https://github.com/banuka04"
    },
    {
        id: 5,
        name: "Senuja Ranmith",
        role: "Requirements and Business Analyst",
        image: "/team/senuja.png",
        quote: "Developed the Business Model Canvas and led requirement gathering. Ensured visual consistency.",
        linkedin: "https://www.linkedin.com/in/senuja-ranmith-047a05369",
        github: "https://github.com/senuja-cell"
    },
    {
        id: 6,
        name: "Sehandu Abeyratne",
        role: "Systems Analyst",
        image: "/team/sehandu.jpeg",
        quote: "Created the Rich Picture Diagram and prioritized requirements. Collaborated on risk mitigation strategies.",
        linkedin: "https://www.linkedin.com/in/your-profile",
        github: "https://github.com/your-username"
    }
];

const OurTeam = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-cycle the active team member
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % teamMembers.length);
        }, 4000); // Change every 4 seconds
        return () => clearInterval(interval);
    }, []);

    // Calculate position styles based on index relative to active
    const getPositionStyles = (index: number) => {
        const total = teamMembers.length;
        // Calculate relative position (0 is active, 1 is next, etc.)
        const relativePos = (index - activeIndex + total) % total;

        // Define positions in the "Cloud" for 6 items
        const positions = [
            { x: 0, y: 0, scale: 1.3, zIndex: 20, opacity: 1, blur: 0 },           // Center (Active)
            { x: 160, y: -80, scale: 0.8, zIndex: 10, opacity: 0.7, blur: 2 },     // Top Right
            { x: 180, y: 60, scale: 0.6, zIndex: 5, opacity: 0.5, blur: 4 },       // Right
            { x: 0, y: 120, scale: 0.5, zIndex: 4, opacity: 0.4, blur: 5 },        // Bottom
            { x: -180, y: 60, scale: 0.6, zIndex: 5, opacity: 0.5, blur: 4 },      // Left
            { x: -160, y: -80, scale: 0.8, zIndex: 10, opacity: 0.7, blur: 2 },    // Top Left
        ];

        return positions[relativePos] || positions[0];
    };

    return (
        <section id={"our-team"} className="w-full py-24 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* LEFT SIDE: Text Description */}
                <div className="space-y-8 relative z-10">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0C2B4E]">Our Team</h2>
                    </div>

                    <p className="text-[#0C2B4E]/70 text-lg leading-relaxed max-w-md">
                        We are Group CS 76—a collective of tech enthusiasts and problem solvers working to modernize how daily services are accessed across Sri Lanka. Guided by the expertise of our supervisor, Mr. Jiehfeng Hsu, we’ve embarked on a journey to create a platform that prioritizes trust, efficiency, and seamless connectivity. From rigorous system architecture to intuitive UX design, we are building the future of the local gig economy.
                    </p>

                    {/* Dynamic details of the active member */}
                    <div className="pt-4 h-48">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4 }}
                                className="bg-[#F5EFED] p-6 rounded-2xl border-l-4 border-[#D96C06]"
                            >
                                <h3 className="text-xl font-bold text-[#0C2B4E]">{teamMembers[activeIndex].name}</h3>
                                <p className="text-[#19579F] font-medium text-sm mb-4">{teamMembers[activeIndex].role}</p>

                                {/* Social Links */}
                                <div className="flex gap-3 opacity-60">
                                    <a
                                        href={teamMembers[activeIndex].linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-[#0C2B4E] transition-colors"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={teamMembers[activeIndex].github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-[#0C2B4E] transition-colors"
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* RIGHT SIDE: The "Cloud" Animation */}
                <div className="relative h-[500px] flex items-center justify-center">

                    {/* The Cloud Blob Background */}
                    <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-[#19579F]/5 to-[#2B7FDE]/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute w-[400px] h-[400px] bg-[#F5EFED] rounded-[40%] blur-2xl opacity-80"></div>

                    {/* Floating Images Cycle */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {teamMembers.map((member, index) => {
                            const style = getPositionStyles(index);
                            const isActive = index === activeIndex;

                            return (
                                <motion.div
                                    key={member.id}
                                    className="absolute rounded-full shadow-xl overflow-hidden border-4 border-white cursor-pointer bg-white"
                                    animate={{
                                        x: style.x,
                                        y: style.y,
                                        scale: style.scale,
                                        zIndex: style.zIndex,
                                        opacity: style.opacity,
                                        filter: `blur(${style.blur}px)`
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeInOut"
                                    }}
                                    onClick={() => setActiveIndex(index)} // Allow clicking to select
                                >
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-32 h-32 object-cover"
                                    />

                                    {/* Ring animation for active user */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeRing"
                                            className="absolute inset-0 border-4 border-[#D96C06] rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurTeam;