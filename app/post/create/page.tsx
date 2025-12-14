import CreateListingPage from '@/components/specific/CreateListingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Post Your Flat Listing - NextFlat | Find Tenants Fast',
    description: 'List your flat for free on NextFlat. Join 10,000+ property owners who find tenants in just 7 days. Track views, connect with verified tenants, and post unlimited listings.',
    keywords: 'post flat, list property, find tenants, rental listing, property owners, no brokerage',
    openGraph: {
        title: 'Post Your Flat Listing - NextFlat',
        description: 'Find quality tenants in just 7 days. Post your flat listing for free on NextFlat.',
        type: 'website',
    },
};

export default function Page() {
    return <CreateListingPage />;
}
