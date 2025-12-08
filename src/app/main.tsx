import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

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
    <App />
  );
}

start();