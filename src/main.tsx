
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Main.tsx loaded successfully');

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  console.error('Error details:', event.filename, event.lineno, event.colno);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Check if root element exists
const rootElement = document.getElementById("root");
console.log('Root element found:', !!rootElement);

if (!rootElement) {
  console.error('Root element with id "root" not found in DOM!');
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1>Error: Root element not found</h1>
      <p>The application could not start because the root element was not found.</p>
    </div>
  `;
} else {
  try {
    console.log('Creating React root...');
    const root = createRoot(rootElement);
    console.log('React root created successfully');
    
    console.log('Rendering App component...');
    root.render(<App />);
    console.log('App component rendered successfully');
  } catch (error) {
    console.error('Error during React app initialization:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif; color: red;">
        <h1>Application Error</h1>
        <p>Failed to initialize the React application.</p>
        <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <p>Check the console for more details.</p>
      </div>
    `;
  }
}
