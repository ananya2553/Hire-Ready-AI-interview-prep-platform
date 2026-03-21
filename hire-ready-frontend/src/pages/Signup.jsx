import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Clear state on mount
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { name, email, password });
      if (response.status === 200) {
        alert('Registration successful! Please sign in.');
        navigate('/login');
      }
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.response && error.response.status === 400) {
        alert(error.response.data || 'Email is already in use!');
      } else {
        alert('Backend unreachable or error occurred.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-slate-50 to-emerald-50/30">
      
      {/* Decorative Blob */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="glass-card w-full max-w-md p-10 md:p-12 relative z-10 mx-4">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-xl shadow-emerald-200 text-white flex items-center justify-center text-3xl font-black mx-auto mb-6">H</div>
          <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Create Account</h2>
          <p className="text-slate-500 text-sm font-medium">Join the high-end interview suite.</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-5" autoComplete="off">
          
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase ml-1">Full Name</label>
            <input 
              type="text" 
              className="w-full rounded-xl px-4 py-3.5 text-slate-800 bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm placeholder-slate-400 font-medium"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase ml-1">Email Address</label>
            <input 
              type="email" 
              className="w-full rounded-xl px-4 py-3.5 text-slate-800 bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm placeholder-slate-400 font-medium"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase ml-1">Password</label>
            <input 
              type="password" 
              className="w-full rounded-xl px-4 py-3.5 text-slate-800 bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm placeholder-slate-400 font-medium"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 rounded-xl mt-4 font-bold tracking-wide transition-all shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-1 bg-emerald-600 hover:bg-emerald-700 text-white flex justify-center items-center gap-2"
          >
            Register Account
          </button>
        </form>

        <div className="mt-8 text-center text-slate-500 text-sm font-medium">
          Already have an account? <Link to="/login" className="text-emerald-600 font-bold transition hover:text-emerald-800 hover:underline ml-1">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
