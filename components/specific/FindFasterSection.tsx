
import React from 'react';
import { Rocket, ShieldCheck, Users } from 'lucide-react';

const features = [
    {
        icon: <Rocket className="w-6 h-6 text-slate-900" />,
        title: "Instant Connections",
        description: "Connect directly with verified flatmates and landlords without the middleman delays."
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-slate-900" />,
        title: "Verified Profiles",
        description: "Every user goes through a verification process so you can flat-hunt with confidence."
    },
    {
        icon: <Users className="w-6 h-6 text-slate-900" />,
        title: "Community First",
        description: "Join a community of like-minded people looking for shared spaces, not just properties."
    }
];

export default function FindFasterSection() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
                        Find Flatmates or Tenants faster with NextFlat
                    </h2>
                    <p className="text-lg text-slate-600">
                        Stop scrolling endlessly through social media groups. We bring the best matches directly to you with our smart matching technology.
                    </p>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:pb-0 -mx-4 px-4 md:grid md:grid-cols-3 md:gap-8 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {features.map((feature, index) => (
                        <div key={index} className="flex-none w-[85%] sm:w-[350px] md:w-auto snap-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
