"use client";

import { useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

export default function IndustrialSwitch({
    initialValue = false,
    onToggle,
}: {
    initialValue?: boolean;
    onToggle?: (val: boolean) => void;
}) {
    const [isOn, setIsOn] = useState(initialValue);

    // 1. Configuration
    // Calculated to match height (h-56) minus handle height (h-32) minus padding
    // This ensures the button touches the bottom perfectly with zero gap.
    const MAX_TRAVEL = 80;

    const y = useMotionValue(initialValue ? MAX_TRAVEL : 0);

    // 2. Physics
    const springY = useSpring(y, {
        stiffness: 500,
        damping: 30,
        mass: 1.2
    });

    // 3. Transforms
    const ledColor = useTransform(springY, [0, MAX_TRAVEL], ["#2e1065", "#d946ef"]);
    const ledGlow = useTransform(springY, [0, MAX_TRAVEL], [
        "0px 0px 0px rgba(0,0,0,0)",
        "0px 0px 20px rgba(217, 70, 239, 0.5)",
    ]);
    const handleBg = useTransform(springY, [0, MAX_TRAVEL], [
        "linear-gradient(180deg, #404040 0%, #262626 100%)",
        "linear-gradient(180deg, #4c1d95 0%, #2e1065 100%)"
    ]);

    // Cross-fade text
    const textOpacityOff = useTransform(springY, [0, MAX_TRAVEL * 0.4], [1, 0]);
    const textOpacityOn = useTransform(springY, [MAX_TRAVEL * 0.4, MAX_TRAVEL], [0, 1]);

    // Slight shrink on press
    const handleScale = useTransform(springY, [MAX_TRAVEL - 10, MAX_TRAVEL], [1, 0.98]);

    const handleDragEnd = () => {
        const currentY = y.get();
        if (currentY > MAX_TRAVEL / 2) {
            setIsOn(true);
            y.set(MAX_TRAVEL);
            onToggle?.(true);
        } else {
            setIsOn(false);
            y.set(0);
            onToggle?.(false);
        }
    };

    const toggleClick = () => {
        const newState = !isOn;
        setIsOn(newState);
        y.set(newState ? MAX_TRAVEL : 0);
        onToggle?.(newState);
    };

    return (
        <div className="flex items-center justify-center p-8">
            {/* --- SWITCH COMPONENT --- */}
            <div className="relative z-10 scale-125"> {/* Scaled up for visibility */}

                {/* HOUSING */}
                <div className="relative w-32 h-56 rounded-3xl bg-neutral-900 border-2 border-neutral-800 shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(0,0,0,1)] flex justify-center p-2">

                    {/* Caution Stripes Background */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-10 pointer-events-none">
                        <div className="absolute bottom-0 w-full h-16 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]" />
                    </div>

                    {/* Rail Slot */}
                    <div className="absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-6 bg-black rounded-full shadow-[inset_0_2px_5px_rgba(0,0,0,1)] border-x border-neutral-800/50">
                        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-neutral-800/50" />
                    </div>

                    {/* Status LED */}
                    <motion.div
                        style={{ backgroundColor: ledColor, boxShadow: ledGlow }}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full border border-neutral-900 z-20"
                    />

                    {/* Draggable Handle */}
                    <motion.div
                        className="relative z-10 w-28 h-32 cursor-grab active:cursor-grabbing touch-none"
                        style={{ y: springY, scale: handleScale }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: MAX_TRAVEL }}
                        dragElastic={0.05}
                        dragMomentum={false}
                        onDragEnd={handleDragEnd}
                        onClick={toggleClick}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            style={{ background: handleBg }}
                            className="w-full h-full rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-neutral-700 flex flex-col items-center justify-center relative overflow-hidden"
                        >
                            {/* Grip Texture */}
                            <div className="absolute top-3 w-16 flex flex-col gap-1.5 opacity-30">
                                <div className="h-0.5 w-full bg-black rounded-full shadow-[0_1px_0_rgba(255,255,255,0.1)]" />
                                <div className="h-0.5 w-full bg-black rounded-full shadow-[0_1px_0_rgba(255,255,255,0.1)]" />
                            </div>

                            {/* Text Overlay */}
                            <div className="mt-4 relative w-full h-6 flex items-center justify-center">
                                <motion.span
                                    style={{ opacity: textOpacityOff }}
                                    className="absolute scale-125 text-[11px] font-black tracking-[0.2em] text-neutral-500"
                                >
                                    Contact me
                                </motion.span>
                                <motion.span
                                    style={{ opacity: textOpacityOn }}
                                    className="absolute scale-125 text-[11px] font-black tracking-[0.2em] text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]"
                                >
                                    success
                                </motion.span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Labels */}
                    <div className="absolute top-8 right-1 text-[8px] text-neutral-600 font-mono rotate-90 origin-left tracking-widest">OFF</div>
                    <div className="absolute bottom-8 right-1 text-[8px] text-neutral-600 font-mono rotate-90 origin-left tracking-widest">ON</div>
                </div>

                {/* Floor Reflection */}
                <div className="mt-8 mx-auto w-32 h-4 bg-black rounded-[100%] blur-xl opacity-50" />
            </div>
        </div>
    );
}
