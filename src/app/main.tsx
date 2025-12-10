import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';

async function start() {
  if (import.meta.env.DEV) {
    const { worker } = await import('../mocks/browser');
    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
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