import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50 pattern-bg p-8">
          <div className="glass-card flex flex-col items-center justify-center p-12 max-w-lg text-center shadow-xl shadow-slate-200">
            <div className="w-24 h-24 mb-6 rounded-3xl bg-indigo-100 flex items-center justify-center text-5xl shadow-inner animate-pulse">
              😴
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">AI is taking a nap!</h1>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              We encountered an unexpected issue rendering the interface. The AI architect needs a moment. 
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:-translate-y-[2px] hover:shadow-indigo-300 transition-all"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
