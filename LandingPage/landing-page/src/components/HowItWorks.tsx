'use client';
import {useRef, useState, useEffect} from "react";
import {Search, CalendarCheck, Smile, Bot, User, Star, MousePointer2, BadgeCheck, Check} from "lucide-react";
import {motion, useScroll, useMotionValueEvent, AnimatePresence} from "framer-motion";
// --- REUSABLE TYPING COMPONENT ---
const TypingText = ({text}: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(text.slice(0, currentIndex));
            currentIndex++;
            if (currentIndex > text.length) {
                clearInterval(intervalId);
            }
        }, 50);
        return () => clearInterval(intervalId);
    }, [text]);
    return (<p className="text-white text-sm font-medium text-left leading-snug">            {displayedText}
        <motion.span initial={{opacity: 0}} animate={{opacity: [0, 1, 0]}}
                     transition={{repeat: Infinity, duration: 0.8, ease: "linear"}}
                     className="inline-block w-0.5 h-4 bg-white align-middle ml-0.5 -translate-y-0.5"/>
    </p>);
};
// --- STEP 3 CONTENT (RESPONSIVE: provider card anchored to bottom; vehicle follows percent-based coordinates so it scales with phone) ---
const TrackAndRelaxContent = () => {
    const [status, setStatus] = useState<'tracking' | 'completed'>('tracking');
    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('completed');
        }, 2200);
        return () => clearTimeout(timer);
    }, []);
    return (<div
        className="w-full h-full relative overflow-hidden bg-[#F3F5F8]">            {/* Map Layer - Blurs when completed */}
        <motion.div className="absolute inset-0 w-full h-full"
                    animate={{filter: status === 'completed' ? "blur(4px)" : "blur(0px)"}}
                    transition={{duration: 0.5}}>                {/* 1. Map Background (COPIED FROM HERO) */}
            <div className="absolute inset-0 opacity-40">                    {/* Vertical Roads */}
                <div className="absolute left-[20%] h-full w-4 bg-white border-x border-gray-300"></div>
                <div className="absolute left-[60%] h-full w-6 bg-white border-x border-gray-300"></div>
                <div className="absolute left-[85%] h-full w-2 bg-white border-x border-gray-300"></div>
                {/* Horizontal Roads */}
                <div className="absolute top-[30%] w-full h-5 bg-white border-y border-gray-300"></div>
                <div className="absolute top-[65%] w-full h-8 bg-white border-y border-gray-300"></div>
            </div>
            {/* 2. Route Path (Matched to the roads above) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <path d="M 53 31 L 53 150 Q 55 160 75 160 L 140 160 Q 155 166 155 180 L 155 270" stroke="#2B7FDE"
                      strokeWidth="5" fill="none" strokeDasharray="8 6" strokeLinecap="round"/>
                {/* Start Point (Visible in Top Left) */}
                <circle cx="21.6%" cy="6.8%" r="5" fill="#19579F" stroke="white" strokeWidth="2"/>
                {/* Destination Pin */}
                <circle cx="63.5%" cy="54%" r="6" fill="#D96C06"/>
            </svg>
            {/* 3. Uber-like Vehicle (driver -> destination) - percent based positions so it scales */} {status === 'tracking' && (<>
                <motion.div className="absolute z-20 flex items-center justify-center"
                            initial={{left: '20%', top: '7%', rotate: 0}} animate={{
                    left: ['16.5%', '16.5%', '57.5%', '57.5%'],
                    top: ['6.8%', '29%', '29%', '52%'],
                    rotate: [0, 0, 10, 10]
                }} transition={{duration: 2.2, ease: 'linear'}}
                            style={{width: 28, height: 28}}>                            {/* Car body */}
                    <div
                        className="absolute w-6 h-6 bg-[#0C2B4E] border-2 border-white rounded-full shadow-md z-10 flex items-center justify-center">
                        <div
                            className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-white rotate-180"></div>
                    </div>
                </motion.div>
            </>)} {/* 4. Provider Detail Card - anchored to bottom inside phone area (responsive) */}
            <motion.div
                className="absolute left-4 right-4 bottom-6 bg-white rounded-xl shadow-xl p-4 z-20 border border-gray-100/50"
                initial={{y: 120, opacity: 0}} animate={{y: 0, opacity: 1}}
                transition={{duration: 0.6, ease: 'easeOut', delay: 0.1}}>
                <div className="flex items-center gap-3">                        {/* Default User Icon Silhouette */}
                    <div
                        className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-end justify-center shrink-0">
                        <svg className="w-9 h-9 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    {/* Text Details */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center"><h3
                            className="font-bold text-[#0C2B4E] text-sm">Shehan</h3>
                            <div
                                className="flex items-center gap-0.5 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-[#0C2B4E]">
                                <span>4.9</span> <Star className="w-2.5 h-2.5 fill-[#D96C06] text-[#D96C06]"/></div>
                        </div>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Electrician</p>
                        <div className="flex justify-between items-center mt-1"><p
                            className="text-[10px] text-[#19579F] font-semibold bg-blue-50 px-0 py-0.5 rounded-full">                                    {status === 'tracking' ? 'Arriving in 1 min' : 'Arrived!'}                                </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
        {/*Success Overlay (Green Tick) */} <AnimatePresence>                {status === 'completed' && (
            <motion.div initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}}
                        className="absolute inset-0 flex flex-col items-center justify-center z-30 mb-16">
                <div
                    className="w-24 h-24 bg-[#10B981] rounded-full flex items-center justify-center shadow-2xl mb-3">
                    <Check className="w-12 h-12 text-white stroke-[4]"/></div>
                <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.2}}
                            className="backdrop-blur px-8 py-3 rounded-2xl"><p
                    className="text-[#0C2B4E] font-bold text-lg">Job Completed!</p></motion.div>
            </motion.div>)}            </AnimatePresence></div>);
};
// --- MAIN COMPONENT ---
const HowItWorks = () => {
    const containerRef = useRef(null);
    const [activeStep, setActiveStep] = useState(0);
    const {scrollYProgress} = useScroll({target: containerRef, offset: ["start start", "end end"]});
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.15) setActiveStep(0); else if (latest < 0.6) setActiveStep(1); else setActiveStep(2);
    });
    const steps = [{
        id: 1,
        title: "Search Service",
        desc: "Find verified professionals near you instantly.",
        color: "bg-[#19579F]",
        hex: "#19579F",
        phoneContent: (<div className="flex flex-col items-center justify-center h-full gap-6 p-6 text-center">
            <div className="relative">
                <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full"></div>
                <Bot className="w-24 h-24 text-white relative z-10 drop-shadow-lg"/></div>
            <div
                className="w-full bg-white/10 rounded-2xl p-4 flex items-center gap-3 backdrop-blur-md border border-white/20 shadow-inner">
                <Search className="w-5 h-5 text-white/70 shrink-0"/> <TypingText
                text="I need an electrician that can fix my AC"/></div>
        </div>)
    },
        {
        id: 2,
        title: "Chat & Book",
        desc: "Discuss a time slot and book your service.",
        color: "bg-[#2B7FDE]",
        hex: "#2B7FDE",
        phoneContent: (<div className="w-full h-full flex flex-col relative overflow-hidden">
            <motion.div className="absolute z-50 drop-shadow-xl"
                        initial={{top: "15%", left: "50%", scale: 1, opacity: 0}} animate={{
                top: ["15%", "85%"],
                left: ["70%", "50%"],
                opacity: [0, 1, 1, 1],
                scale: [1, 1, 0.8, 1]
            }} transition={{duration: 2.2, ease: "easeInOut", times: [0, 0.7, 0.85, 1], repeatDelay: 1.5}}>
                <MousePointer2 className="w-8 h-8 text-black fill-white"/></motion.div>
            {/* Top Section - 35% Height */}
            <div className="h-[35%] w-full relative"></div>
            {/* Bottom Section - 65% Height (Profile Card) */}
            <div
                className="h-[65%] w-full bg-white rounded-t-[2rem] px-6 py-8 flex flex-col justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative z-10">
                <div className="flex flex-col items-center gap-4 mt-4">
                    <div
                        className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                        <User className="w-10 h-10 text-gray-400"/></div>
                    <div className="text-center">
                        <div className="flex justify-center gap-1.5 mb-1"><h4
                            className="text-[#0C2B4E] font-bold text-xl">Shehan</h4><BadgeCheck
                            style={{marginTop: '5px'}} className="w-5 h-5 fill-[#2B7FDE] text-[#2B7FDE] mt-1.5"/></div>
                        <p className="text-gray-500 text-sm font-medium">Electrician</p>
                        <div
                            className="flex items-center justify-center gap-1.5 mt-2 bg-gray-50 py-1 px-3 rounded-full mx-auto w-fit">
                            <Star className="w-3.5 h-3.5 text-[#D96C06] fill-[#D96C06]"/> <span
                            className="text-xs text-gray-700 font-bold">4.9 (120 Reviews)</span></div>
                    </div>
                </div>
                <motion.button
                    className="w-40 bg-[#10B981] text-white font-bold py-2.5 rounded-xl shadow-lg text-base mt-auto mb-4 mx-auto"
                    animate={{scale: [1, 1, 0.95, 1]}}
                    transition={{duration: 2.2, times: [0, 0.7, 0.85, 1], repeat: 5, repeatDelay: 1.5}}> Book Now
                </motion.button>
            </div>
        </div>)
    },
        {
        id: 3,
        title: "Track & Relax",
        desc: "Track your service provider and consider your job done!",
        color: "bg-[#D96C06]",
        hex: "#D96C06",
        phoneContent: <TrackAndRelaxContent/>
    }];
    return (
        <section ref={containerRef} id="how-it-works" className="relative h-[300vh] bg-[#F5EFED]">
            {/* CHANGED: Added h-[100dvh] for mobile full height, changed justify-center to justify-between to fit content */}
            <div className="sticky top-0 flex h-[100dvh] md:h-screen flex-col items-center justify-between md:justify-center overflow-hidden py-4">

                {/* CHANGED: w-28 -> w-full. Increased translate-x-15 -> translate-x-36. Reduced mobile margins (mt-10 -> mt-2) */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center w-full max-w-7xl px-6 relative h-auto translate-x-0 md:translate-x-36 mt-2 mb-6 md:mt-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0C2B4E] w-full text-center md:text-left mx-auto">
                        How It Works
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-items-center w-full max-w-7xl px-6 relative h-auto gap-y-2 md:gap-y-0 ">

                    <div className="hidden md:flex flex-col gap-4 items-end text-right pr-8 md:translate-x-25">
                        <AnimatePresence mode="wait">
                            <motion.div key={activeStep} initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}}
                                        exit={{opacity: 0, x: -20}} transition={{duration: 0.5}}
                                        className="space-y-2 flex flex-col items-end">
                                <div className="h-14 w-100 flex items-center justify-end">
                                    <h3 className="text-4xl md:text-5xl font-bold text- text-right whitespace-nowrap" style={{ color: steps[activeStep].hex }}>
                                        {steps[activeStep].title}
                                    </h3>
                                </div>
                                <div className="h-12 flex items-start justify-end w-full">
                                    <p className="text-lg text-[#0C2B4E]/70 max-w-xs text-right leading-relaxed">
                                        {steps[activeStep].desc}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex gap-1 mt-2 justify-end">{steps.map((_, idx) => (
                            <div key={idx}
                                 className={`h-2 rounded-full transition-all duration-500 ${idx === activeStep ? 'w-8 ' + steps[activeStep].color : 'w-2 bg-gray-300'}`}></div>))}                        </div>
                    </div>


                    {/* pretty sure its mobile content from hereon */}


                    <div className="relative z-30 translate-x-0 md:translate-x-30">
                        {/* STRICTLY KEPT ORIGINAL SIZE: w-[260px] h-[520px] */}
                        <div
                            className="w-[260px] h-[520px] bg-[#0C2B4E] rounded-[2.5rem] shadow-2xl border-[8px] border-[#0C2B4E] overflow-hidden relative mx-auto">
                            <motion.div className="w-full h-full relative"
                                        animate={{backgroundColor: steps[activeStep].hex}} transition={{duration: 0.5}}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeStep}
                                        initial={{opacity: 0, scale: 0.8}}
                                        animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}}
                                        transition={{duration: 0.4}}
                                        className="w-full h-full">
                                        {steps[activeStep].phoneContent}
                                    </motion.div>
                                </AnimatePresence></motion.div>
                        </div>
                    </div>

                    {/* CHANGED: Removed pt-2, reduced mt-4 to mt-2 to pull text up so it's visible */}
                    <div className="flex flex-col items-center md:hidden text-center px-2 w-full mt-2">
                        <AnimatePresence mode="wait">
                            <motion.div key={activeStep} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -10}} transition={{duration: 0.3}}
                                        className="flex flex-col items-center">
                                <div className="h-8 flex items-center"><h3
                                    className="text-2xl font-bold " style={{ color: steps[activeStep].hex }}>{steps[activeStep].title}</h3></div>
                                <div className="h-8 flex items-start "><p
                                    className="text-sm text-[#0C2B4E]/70 max-w-sm mx-auto leading-tight">{steps[activeStep].desc}</p></div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex gap-1 justify-center">
                            {steps.map((_, idx) => (
                            <div key={idx} className={`h-2 rounded-full transition-all duration-500 ${idx === activeStep ? 'w-8 ' + steps[activeStep].color : 'w-2 bg-gray-300'}`}>
                            </div>))}
                        </div>
                    </div>
                    <div className="hidden md:block"></div>
                </div>
            </div>
        </section>
    );
};
export default HowItWorks;
