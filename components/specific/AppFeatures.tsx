
import { Shield, Sparkles, UserCheck } from "lucide-react";

const features = [
    {
        icon: <Sparkles className="w-6 h-6 text-slate-900" />,
        title: "AI-Powered Matches",
        desc: "Find flatmates who truly match your vibe and lifestyle preferences.",
    },
    {
        icon: <Shield className="w-6 h-6 text-slate-900" />,
        title: "100% Verified",
        desc: "Zero scams. Every listing and user profile is manually verified.",
    },
    {
        icon: <UserCheck className="w-6 h-6 text-slate-900" />,
        title: "Direct Connection",
        desc: "Connect directly with owners or seekers. No brokers, no hidden fees.",
    },
];

export default function AppFeatures() {
    return (
        <section className="py-12 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="flex flex-col gap-3 p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-slate-200 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-2 shadow-sm">
                                {f.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
