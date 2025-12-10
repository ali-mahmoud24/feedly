import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';

async function start() {
  const shouldUseMock = import.meta.env.DEV || import.meta.env.PROD;

  if (shouldUseMock) {
    const { worker } = await import('../mocks/browser');
    await worker.start({
      serviceWorker: {
        url: './mockServiceWorker.js',
      },
    });
  }

  createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="feedly-ui-theme">
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

start();