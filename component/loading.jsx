'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loading() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 400);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-95 backdrop-blur-sm">
            <motion.div
                className="flex flex-col items-center p-8 rounded-lg shadow-lg bg-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Brand text */}
                <motion.h2
                    className="text-2xl font-bold mb-6"
                    animate={{
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                >
                    3 A r a b y
                </motion.h2>

                {/* Elegant spinner */}
                <div className="relative w-16 h-16">
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-gray-100"
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-black border-t-transparent"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1.2,
                            ease: "linear",
                            repeat: Infinity
                        }}
                    />
                </div>

                {/* Loading text with animated dots */}
                <p className="mt-4 text-sm text-gray-600 min-w-[80px] text-center">
                    Loading{dots}
                </p>
            </motion.div>
        </div>
    );
}
