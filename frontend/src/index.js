import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Include Tailwind CSS if set up locally

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700 text-center">
            <h2 className="text-2xl font-bold text-pink-500 mb-4">Something Went Wrong</h2>
            <p className="text-gray-300 mb-4">Error: {this.state.error?.message || 'Unknown error'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);