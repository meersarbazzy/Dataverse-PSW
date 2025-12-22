// This is a shim loader because the backend is not serving /copilot/index.js natively
// We load the assets via the Next.js proxy

const script = document.createElement('script');
script.type = 'module';
script.crossOrigin = 'anonymous';
// Use scoped path so it goes through Next.js proxy -> Chainlit Backend (/assets)
// We use /chainlit/assets prefix which we rewrite in next.config.js
script.src = '/chainlit/assets/index-BBD03a_V.js';
script.onload = () => {
  console.log('Chainlit main bundle loaded successfully via scoped proxy');
};
script.onerror = (e) => {
  console.error('Failed to load Chainlit main bundle', e);
};
document.body.appendChild(script);

// CSS injection
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/chainlit/assets/index-D0StyyNy.css';
link.crossOrigin = 'anonymous';
document.head.appendChild(link);
