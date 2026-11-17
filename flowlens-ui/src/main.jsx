import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getPublicPathname } from './publicConfig.js'

const publicPath = getPublicPathname(window.location.pathname);
if (window.location.pathname !== publicPath || window.location.search || window.location.hash) {
  window.history.replaceState(null, '', publicPath);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => Promise.all(
    registrations.filter(registration => {
      const worker = registration.active || registration.waiting || registration.installing;
      return worker && new URL(worker.scriptURL).pathname === '/sw.js'
        && registration.scope === `${window.location.origin}/`;
    }).map(registration => registration.update().catch(() => registration.unregister()))
  )).catch(() => { /* */ });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
