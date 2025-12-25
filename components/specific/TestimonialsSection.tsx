
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        content: "NextFlat made it incredibly easy to find a compatible flatmate. Within 2 days I had 3 great viewing options.",
        author: "Sarah J.",
        role: "Tenant in Mumbai",
        avatar: "S"
    },
    {
        content: "I was tired of brokers. NextFlat connected me directly with the owner. Smooth process and zero brokerage!",
        author: "Rahul M.",
        role: "Moved to Bangalore",
        avatar: "R"
    },
    {
        content: "Listing my spare room was a breeze. The verified profiles feature gave me peace of mind about who I was letting in.",
        author: "Priya D.",
        role: "Host in Delhi",
        avatar: "P"
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-slate-900 sm:text-4xl mb-12">
                    Feedback from people
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                            <div className="flex space-x-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-slate-600 mb-6 flex-grow italic">"{item.content}"</p>

                            <div className="flex items-center mt-auto">
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold mr-3">
                                    {item.avatar}
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900">{item.author}</div>
                                    <div className="text-sm text-slate-500">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
