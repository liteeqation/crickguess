import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { RefreshCcw } from 'lucide-react';
import { trackError } from '../services/monitoring';

function ErrorFallback({ error, resetErrorBoundary }: { 
  error: Error; 
  resetErrorBoundary: () => void;
}) {
  React.useEffect(() => {
    trackError(error);
  }, [error]);

  return (
    <div className="min-h-screen cricket-stadium-bg">
      <div className="content-wrapper min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="glass-effect p-8 rounded-lg text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">Oops, something went wrong!</h2>
            <p className="text-gray-200">We've been notified and will fix this soon.</p>
            <button
              onClick={resetErrorBoundary}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 transition-colors mx-auto"
            >
              <RefreshCcw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary 
      FallbackComponent={ErrorFallback}
      onError={(error) => trackError(error)}
    >
      {children}
    </ReactErrorBoundary>
  );
}