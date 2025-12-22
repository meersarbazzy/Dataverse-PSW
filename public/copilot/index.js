export { }; // Ensure this is treated as a module

const script = document.createElement('script');
script.type = 'module';
script.crossOrigin = 'anonymous';
// Point to the asset we found in the ID 224 output HTML
script.src = 'http://localhost:8001/assets/index-BBD03a_V.js';
script.onload = () => {
  console.log('Chainlit main bundle loaded successfully');
};
script.onerror = (e) => {
  console.error('Failed to load Chainlit main bundle', e);
};
document.body.appendChild(script);

// CSS injection
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'http://localhost:8001/assets/index-D0StyyNy.css';
link.crossOrigin = 'anonymous';
document.head.appendChild(link);
