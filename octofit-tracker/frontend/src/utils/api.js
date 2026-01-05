// Determine API base URL based on environment
const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('github.dev')) {
    // Extract codespace name from hostname (e.g., 'mycode-3000.app.github.dev' -> 'mycode')
    const codespaceName = hostname.split('-')[0];
    return `https://${codespaceName}-8000.app.github.dev/api/`;
  } else {
    // Local development
    return 'http://localhost:8000/api/';
  }
};

export const API_BASE_URL = getApiBaseUrl();