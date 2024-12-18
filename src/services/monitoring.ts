import * as Sentry from '@sentry/react';

export function initializeMonitoring() {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay(),
      ],
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
}

export function trackError(error: Error, context?: Record<string, any>) {
  console.error(error);
  if (import.meta.env.PROD) {
    Sentry.captureException(error, { extra: context });
  }
}

export function trackEvent(name: string, data?: Record<string, any>) {
  if (import.meta.env.PROD) {
    Sentry.captureMessage(name, {
      level: 'info',
      extra: data,
    });
  }
}