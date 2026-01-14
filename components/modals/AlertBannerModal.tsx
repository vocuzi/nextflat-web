'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function AlertBannerModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const cookieExists = document.cookie
            .split('; ')
            .find((row) => row.startsWith('AlertBannerShown='));

        if (!cookieExists) {
            setIsOpen(true);

            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 8);
            document.cookie = `AlertBannerShown=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
        }
    }, []);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setIsOpen(false)} // ✅ close on backdrop click
        >
            <div
                className="relative aspect-square w-96 rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()} // ✅ prevent closing on content click
            >
                {/* Close Icon */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black text-white rounded-full p-1 transition"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                <a
                    href="/alerts/create"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/illustrations/alerts-banner.png"
                        alt="Join our WhatsApp Alerts"
                        className="object-cover w-full h-full"
                        priority
                        width={384}
                        height={384}
                    />
                </a>
            </div>
        </div>
    );
}
