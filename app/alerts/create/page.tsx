import SetupAlertsPage from '@/components/specific/SetupAlertsPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Setup WhatsApp Alerts - NextFlat | Never Miss a Listing',
    description: 'Get instant WhatsApp notifications when new flats matching your preferences are posted. Setup custom alerts for your dream flat on NextFlat.',
    keywords: 'whatsapp alerts, flat notifications, property alerts, rental alerts, instant notifications',
    openGraph: {
        title: 'Setup WhatsApp Alerts - NextFlat',
        description: 'Get instant WhatsApp notifications for new flat listings matching your preferences.',
        type: 'website',
    },
};

export default function Page() {
    return <SetupAlertsPage />;
}
