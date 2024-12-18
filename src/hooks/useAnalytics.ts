import { useEffect } from 'react';
import { trackPageView, trackEvent } from '../services/analytics';

export function useAnalytics() {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return {
    trackEvent,
    trackPageView
  };
}