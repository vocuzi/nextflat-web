import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FlatCardGrid from "@/components/specific/FlatCardGrid";
import HomeMasthead from "@/components/specific/HomeMasthead";
import AppFeatures from "@/components/specific/AppFeatures";
import StatsMinimal from "@/components/specific/StatsMinimal";
import AppDownloadCta from "@/components/specific/AppDownloadCta";
import FindFasterSection from "@/components/specific/FindFasterSection";
import AlertsSection from "@/components/specific/AlertsSection";
import TestimonialsSection from "@/components/specific/TestimonialsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex flex-col gap-0 pb-12">
        <HomeMasthead />

        <StatsMinimal />

        <FindFasterSection />

        <div className="max-w-7xl mx-auto w-full px-4 py-16">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Explore Cities</h2>
            <a href="/cities" className="text-slate-500 font-medium hover:text-slate-900 text-sm">View all</a>
          </div>
          <FlatCardGrid />
        </div>

        <AppFeatures />

        <AlertsSection />

        <TestimonialsSection />

        <AppDownloadCta />
      </main>
      <Footer />
    </div>
  );
}
