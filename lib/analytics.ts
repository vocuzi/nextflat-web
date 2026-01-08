import { sendGAEvent } from '@next/third-parties/google';

export const trackEvent = (action: string, category: string, label: string, value?: number) => {
    sendGAEvent({
        event: 'action_click',
        value: {
            action,
            category,
            label,
            value
        }
    });
};
