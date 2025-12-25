'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface ImageSlideshowProps {
    images: string[];
    autoSlideInterval?: number; // ms, default 4000
}

export default function ImageSlideshow({ images, autoSlideInterval = 4000 }: ImageSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [[page, direction], setPage] = useState([0, 0]);

    const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
        newDirection === 1 ? handleNext() : handlePrev();
    };

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isFullScreen) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setIsFullScreen(false);
        },
        [handleNext, handlePrev, isFullScreen]
    );

    useEffect(() => {
        if (isFullScreen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullScreen, handleKeyDown]);

    // -----------------------------
    // AUTO SLIDE HANDLER
    // -----------------------------
    useEffect(() => {
        if (isFullScreen || dragging) return;

        autoSlideRef.current = setTimeout(() => {
            paginate(1);
        }, autoSlideInterval);

        return () => {
            if (autoSlideRef.current) clearTimeout(autoSlideRef.current);
        };
    }, [currentIndex, isFullScreen, dragging, autoSlideInterval]);

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 500 : -500, opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 500 : -500, opacity: 0 }),
    };

    const renderImage = (isFull: boolean) => (
        <div
            className={`relative rounded-md ${isFull
                ? 'h-screen w-screen bg-black'
                : 'h-[400px] md:h-[500px] w-full bg-slate-100 border-2 border-slate-100'
                } overflow-hidden`}
        >
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={page}
                    src={`https://v1apinffk.svc.nextflat.in/api${images[currentIndex]}`}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragStart={() => setDragging(true)}
                    onDragEnd={(e, { offset, velocity }) => {
                        setDragging(false);
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) paginate(1);
                        else if (swipe > swipeConfidenceThreshold) paginate(-1);
                    }}
                    className={`absolute w-full h-full ${isFull ? 'object-contain' : 'object-cover'}`}
                    alt={`Slide ${currentIndex + 1}`}
                />
            </AnimatePresence>

            {/* ALWAYS VISIBLE ARROWS */}
            <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none z-10">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        paginate(-1);
                    }}
                    className="pointer-events-auto p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        paginate(1);
                    }}
                    className="pointer-events-auto p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* TOP RIGHT FULLSCREEN TOGGLE */}
            <div className="absolute top-4 right-4 z-10">
                {!isFull ? (
                    <button
                        onClick={() => setIsFullScreen(true)}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                    >
                        <Maximize2 size={20} />
                    </button>
                ) : (
                    <button
                        onClick={() => setIsFullScreen(false)}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* ALWAYS VISIBLE COUNTER */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm z-10">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );

    if (images.length === 0) return null;

    return (
        <div className="m-2 rounded-md overflow-hidden">
            {renderImage(false)}

            <AnimatePresence>
                {isFullScreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black"
                    >
                        {renderImage(true)}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
