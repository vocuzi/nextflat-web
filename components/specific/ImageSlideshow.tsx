'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface ImageSlideshowProps {
    images: string[];
    autoSlideInterval?: number; // ms, default 4000
}

export default function ImageSlideshow({
    images,
    autoSlideInterval = 4000,
}: ImageSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

    const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setPage(([p]) => [p + 1, 1]);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setPage(([p]) => [p - 1, -1]);
    }, [images.length]);

    const goToIndex = (index: number) => {
        if (index === currentIndex) return;
        const dir = index > currentIndex ? 1 : -1;
        setCurrentIndex(index);
        setPage(([p]) => [p + dir, dir]);
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

    // AUTO SLIDE
    useEffect(() => {
        if (isFullScreen || dragging) return;

        autoSlideRef.current = setTimeout(handleNext, autoSlideInterval);

        return () => {
            if (autoSlideRef.current) clearTimeout(autoSlideRef.current);
        };
    }, [currentIndex, isFullScreen, dragging, autoSlideInterval, handleNext]);

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) =>
        Math.abs(offset) * velocity;

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
        }),
        center: { x: 0, opacity: 1, zIndex: 1 },
        exit: (direction: number) => ({
            x: direction < 0 ? 500 : -500,
            opacity: 0,
            zIndex: 0,
        }),
    };

    const renderImage = (isFull: boolean) => (
        <div
            className={`relative rounded-md overflow-hidden ${isFull
                ? 'h-screen w-screen bg-black'
                : 'h-[400px] md:h-[500px] bg-slate-100 border'
                }`}
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
                        if (swipe < -swipeConfidenceThreshold) handleNext();
                        else if (swipe > swipeConfidenceThreshold) handlePrev();
                    }}
                    className={`absolute w-full h-full ${isFull ? 'object-contain' : 'object-cover'
                        }`}
                    alt={`Slide ${currentIndex + 1}`}
                />
            </AnimatePresence>

            {/* ARROWS */}
            <div className="absolute inset-0 flex items-center justify-between p-4 z-10 pointer-events-none">
                <button
                    onClick={handlePrev}
                    className="pointer-events-auto p-2 rounded-full bg-black/50 text-white"
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={handleNext}
                    className="pointer-events-auto p-2 rounded-full bg-black/50 text-white"
                >
                    <ChevronRight />
                </button>
            </div>

            {/* FULLSCREEN TOGGLE */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={() => setIsFullScreen((v) => !v)}
                    className="p-2 rounded-full bg-black/50 text-white"
                >
                    {isFull ? <X /> : <Maximize2 />}
                </button>
            </div>

            {/* COUNTER */}
            <div className="absolute bottom-4 right-4 px-3 py-1 text-sm rounded-full bg-black/50 text-white z-10">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );

    if (!images.length) return null;

    return (
        <div className="m-2 space-y-3 md:space-y-0 md:grid md:grid-cols-12 md:gap-4 md:max-w-6xl mx-auto">
            <div className="md:col-span-8">
                {renderImage(false)}
            </div>

            {/* DESKTOP THUMBNAIL GRID */}
            <div className="hidden md:grid md:col-span-4 grid-cols-2 gap-2 h-[500px] overflow-y-auto content-start pr-1">
                {images.map((img, idx) => (
                    <button
                        key={img}
                        onClick={() => goToIndex(idx)}
                        className={`relative aspect-4/3 w-full overflow-hidden rounded-md border-2 transition ${idx === currentIndex
                            ? 'border-blue-500'
                            : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                    >
                        <img
                            src={`https://v1apinffk.svc.nextflat.in/api${img}`}
                            className="w-full h-full object-cover"
                            alt={`Thumbnail ${idx + 1}`}
                        />
                    </button>
                ))}
            </div>

            {/* FULLSCREEN */}
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
