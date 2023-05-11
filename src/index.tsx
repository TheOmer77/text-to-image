import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import '@fontsource/rubik/400.css';
import '@fontsource/rubik/700.css';
import './styles/index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
