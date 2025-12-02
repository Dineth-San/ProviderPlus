'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import MissionVision from "@/components/MissionVision";
import AIChat from "@/components/AIChat";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-offwhite text-navy font-sans selection:bg-accent/30">
            <Navbar />
            <Hero />
            <HowItWorks />
            <Features />
            <MissionVision />
            <AIChat />
            <Footer />
        </main>
    );
}