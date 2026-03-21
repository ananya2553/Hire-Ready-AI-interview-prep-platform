import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Login from './pages/Login';
import Signup from './pages/Signup';

function Sidebar() {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.href = '/login';
  };

  return (
    <aside className="w-72 glass-sidebar h-screen sticky top-0 flex flex-col justify-between p-8 z-50 transition-all">
      <div>
        <Link to="/" className="text-2xl font-black tracking-tighter text-indigo-950 hover:text-indigo-600 transition flex items-center gap-3 mb-14 drop-shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-200 text-white flex items-center justify-center text-xl">H</div>
          HIRE READY
        </Link>
        <nav className="flex flex-col gap-3">
          <Link to="/" className="px-5 py-3.5 text-sm font-bold tracking-wide rounded-xl transition-all text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 hover:scale-[1.02] border border-indigo-100/50 shadow-sm">
            Dashboard
          </Link>
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        {token ? (
          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100/60 shadow-sm relative z-50">
            <span className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">Authenticated View</span>
            <span className="block text-sm font-black text-indigo-950 mb-5 truncate drop-shadow-sm">{name || 'Interviewer'}</span>
            <button onClick={handleLogout} className="w-full px-4 py-3 text-xs font-bold tracking-wider uppercase bg-white hover:bg-red-50 rounded-xl transition-all text-red-500 border border-red-100 shadow-sm hover:shadow hover:-translate-y-[1px] relative z-20">
              Secure Log Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Link to="/login" className="w-full text-center px-4 py-3.5 text-sm font-bold tracking-wider rounded-xl transition-all text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:-translate-y-[1px]">
              Sign In
            </Link>
            <Link to="/signup" className="w-full text-center px-4 py-3.5 text-sm font-bold tracking-wider rounded-xl transition-all text-indigo-600 bg-white border border-indigo-100 hover:bg-indigo-50 hover:-translate-y-[1px] shadow-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-slate-50 font-sans overflow-hidden pattern-bg">
        <Sidebar />
        <main className="flex-1 overflow-y-auto w-full relative z-10 scroll-smooth">
          <div className="w-full h-full relative">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Navigate to="/" replace />} />
                <Route path="/quiz" element={<Navigate to="/" replace />} />
                <Route path="/quiz/:subject" element={<Quiz />} />
                <Route path="/result" element={<Result />} />
              </Route>
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
