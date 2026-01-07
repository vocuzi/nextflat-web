
const stats = [
    { label: "Active Users", value: "4,000+" },
    { label: "Cities", value: "5+" },
    { label: "New Listings every week", value: "1,000+" },
    { label: "Brokerage", value: "0%" },
];

export default function StatsMinimal() {
    return (
        <section className="py-8 border-y border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
                            <div className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wide mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
