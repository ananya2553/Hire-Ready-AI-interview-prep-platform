import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Explicitly clear state on mount
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.jwt || response.data.token);
        if (response.data.name) {
          localStorage.setItem('name', response.data.name);
        }
        // Perform a hard redirect so App.jsx perfectly catches the new state!
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.status === 401) {
        alert('Invalid email or password! Check your credentials.');
      } else {
        alert('Backend unreachable! Make sure Spring Boot is running on port 8080.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-slate-50 to-emerald-50/30">
      
      {/* Decorative Blob */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="glass-card w-full max-w-md p-10 md:p-12 relative z-10 mx-4">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-xl shadow-indigo-200 text-white flex items-center justify-center text-3xl font-black mx-auto mb-6">H</div>
          <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 text-sm font-medium">Access your high-end interview suite.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5" autoComplete="off">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase ml-1">Email Address</label>
            <input 
              type="email" 
              className="w-full rounded-xl px-4 py-3.5 text-slate-800 bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm placeholder-slate-400 font-medium"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Password</label>
              <a href="#" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition">Forgot password?</a>
            </div>
            <input 
              type="password" 
              className="w-full rounded-xl px-4 py-3.5 text-slate-800 bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm placeholder-slate-400 font-medium"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 rounded-xl mt-4 font-bold tracking-wide transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-1 bg-indigo-600 hover:bg-indigo-700 text-white flex justify-center items-center gap-2"
          >
            Sign In to Dashboard
          </button>
        </form>

        <div className="mt-8 text-center text-slate-500 text-sm font-medium">
          Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold transition hover:text-indigo-800 hover:underline ml-1">Request access</Link>
        </div>
      </div>
    </div>
  );
}
