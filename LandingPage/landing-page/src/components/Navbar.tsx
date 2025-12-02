'use client';

import React, { useState } from 'react';
import { Menu, X, QrCode, Zap } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Helper for the animated link
    const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <a
            href={href}
            className="relative group py-1 text-sm font-medium text-navy/80 transition-colors hover:text-[#D96C06] cursor-pointer"
        >
            {children}
            {/* The animated underline */}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D96C06] transition-all duration-300 ease-out group-hover:w-full"></span>
        </a>
    );

    return (
        <nav className="top-0 w-full py-4 px-6 flex justify-between items-center max-w-full mx-auto z-50 bg-[#F5EFED]/95 backdrop-blur-sm">

            {/* Brand & Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 bg-[#D96C06] rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-5 h-5 fill-current" />
                </div>
                <span className="font-bold text-xl text-[#0C2B4E] tracking-tight group-hover:text-[#19579F] transition-colors">Provider+</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-8">
                <NavLink href="#">Home</NavLink>
                <NavLink href="#how-it-works">How it Works</NavLink>
                <NavLink href="#features">Services</NavLink>
                <NavLink href="#">Contact Us</NavLink>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 md:gap-4">
                {/* REMOVED 'hidden' class here. Added responsive padding (px-3 on mobile, px-5 on desktop) */}
                <a href="/download" className="flex items-center gap-2 bg-[#D96C06] text-white px-3 py-2 md:px-5 md:py-2.5 rounded-full text-xs font-bold hover:bg-[#19579F] transition shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                    <QrCode className="w-4 h-4" />
                    <span>Get the App</span>
                </a>
                <button className="md:hidden p-2 text-[#0C2B4E]" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-[#F5EFED] z-[100] shadow-2xl border-t border-[#0C2B4E]/10 flex flex-col gap-0 md:hidden animate-in slide-in-from-top-2 duration-200 z-index-1000">
                    <a href="#home" className="text-[#0C2B4E] px-6 py-4 border-b border-[#0C2B4E]/5 hover:bg-[#19579F]/5 hover:text-[#D96C06] font-medium">Home</a>
                    <a href="#how-it-works" className="text-[#0C2B4E] px-6 py-4 border-b border-[#0C2B4E]/5 hover:bg-[#19579F]/5 hover:text-[#D96C06] font-medium">How it Works</a>
                    <a href="#features" className="text-[#0C2B4E] px-6 py-4 border-b border-[#0C2B4E]/5 hover:bg-[#19579F]/5 hover:text-[#D96C06] font-medium">Services</a>
                    <a href="#" className="text-[#0C2B4E] px-6 py-4 hover:bg-[#19579F]/5 hover:text-[#D96C06] font-medium">Contact Us</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;