'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { IoClose } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'
import { FlatMapResponse } from '@/lib/types'

type Props = {
    flats: FlatMapResponse[]
    onClose?: () => void
}

const MapLeaflet = dynamic(
    () =>
        import('./MapLeaflet') as Promise<{
            default: React.ComponentType<{ flats: FlatMapResponse[] }>
        }>,
    {
        ssr: false,
    }
)

export default function FlatMapModal({ flats, onClose }: Props) {
    const [visible, setVisible] = useState(true)

    const handleClose = () => {
        setVisible(false)
        setTimeout(() => {
            onClose && onClose()
        }, 250) // allow animation to complete
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-8"
                >
                    {/* Modal Card */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                        className="w-full md:w-[90%] lg:w-[80%] h-[90vh] md:h-[80vh] bg-white rounded-t-xl md:rounded-xl shadow-xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="relative flex items-center justify-between px-4 py-3 border-b shadow-sm bg-white">
                            <p className="text-sm font-semibold text-slate-800">
                                Showing {flats.length} flats with accurate location
                            </p>

                            <button
                                onClick={handleClose}
                                className="rounded-full bg-slate-800 p-2 text-white hover:bg-slate-700 transition"
                            >
                                <IoClose className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Optional Info Banner */}
                        <div className="px-4 py-2 bg-amber-50 text-amber-800 text-xs md:text-sm border-b border-amber-100">
                            Some listings may not have coordinates or may have approximate location.
                        </div>

                        {/* Map */}
                        <div className="flex-1 w-full relative">
                            <MapLeaflet flats={flats} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
