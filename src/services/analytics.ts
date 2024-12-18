import ReactGA from 'react-ga4';

const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 tracking ID

export function initializeAnalytics() {
  ReactGA.initialize(GA_TRACKING_ID);
}

export function trackEvent(category: string, action: string, label?: string) {
  ReactGA.event({
    category,
    action,
    label,
  });
}

export function trackPageView(path: string) {
  ReactGA.send({ hitType: "pageview", page: path });
}