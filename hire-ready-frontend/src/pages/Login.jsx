import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import api from '../api/axios';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setApiError(null);
    try {
      const response = await api.post('/auth/login', { email: data.email, password: data.password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.jwt || response.data.token);
        if (response.data.name) {
          localStorage.setItem('name', response.data.name);
        }
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.status === 401) {
        setApiError('Invalid email or password! Check your credentials.');
      } else {
        setApiError('Backend unreachable! Make sure Spring Boot is running.');
      }
    }
  };

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-slate-50 to-emerald-50/30">
      
      {/* Decorative Blob */}
      <div className="hidden md:block absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="hidden md:block absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="glass-card w-full max-w-md p-10 md:p-12 relative z-10 mx-4">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-xl shadow-indigo-200 text-white flex items-center justify-center text-3xl font-black mx-auto mb-6">H</div>
          <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 text-sm font-medium">Access your high-end interview suite.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" autoComplete="off">
          
          {apiError && (
            <motion.div animate={shakeAnimation} className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold text-center">
              {apiError}
            </motion.div>
          )}

          <motion.div className="flex flex-col gap-2" animate={errors.email ? shakeAnimation : false}>
            <label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase ml-1">Email Address</label>
            <input 
              type="text" 
              className={`w-full rounded-xl px-4 py-3.5 text-slate-800 bg-white/50 border focus:outline-none focus:ring-2 transition-all shadow-sm font-medium ${errors.email ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/50 focus:border-indigo-500'}`}
              placeholder="name@company.com"
              {...register("email")}
              autoComplete="off"
            />
            {errors.email && <span className="text-red-500 text-[10px] uppercase tracking-wider font-bold ml-1">{errors.email.message}</span>}
          </motion.div>

          <motion.div className="flex flex-col gap-2" animate={errors.password ? shakeAnimation : false}>
            <div className="flex justify-between items-center ml-1">
              <label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Password</label>
            </div>
            <input 
              type="password" 
              className={`w-full rounded-xl px-4 py-3.5 text-slate-800 bg-white/50 border focus:outline-none focus:ring-2 transition-all shadow-sm font-medium ${errors.password ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/50 focus:border-indigo-500'}`}
              placeholder="••••••••"
              {...register("password")}
              autoComplete="off"
            />
            {errors.password && <span className="text-red-500 text-[10px] uppercase tracking-wider font-bold ml-1">{errors.password.message}</span>}
          </motion.div>

          <button 
            type="submit" 
            className="w-full py-4 rounded-xl mt-2 font-bold tracking-wide transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-1 bg-indigo-600 hover:bg-indigo-700 text-white flex justify-center items-center gap-2"
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
