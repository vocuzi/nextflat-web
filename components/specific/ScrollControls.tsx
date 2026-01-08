'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ScrollControls() {
    const scrollByAmount = (direction: 'left' | 'right') => {
        const el = document.getElementById('see-more-scroll')
        if (!el) return

        const scrollAmount = 240
        el.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        })
    }

    return (
        <div className="hidden md:flex gap-2">
            <button
                onClick={() => scrollByAmount('left')}
                className="p-2 rounded-full border hover:bg-slate-100"
                aria-label="Scroll left"
            >
                <ChevronLeft size={20} />
            </button>

            <button
                onClick={() => scrollByAmount('right')}
                className="p-2 rounded-full border hover:bg-slate-100"
                aria-label="Scroll right"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    )
}
