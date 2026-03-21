import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Database, Network, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  const subjects = [
    { id: 'OS', name: 'Operating Systems', icon: Monitor },
    { id: 'DBMS', name: 'Database Management Systems', icon: Database },
    { id: 'CN', name: 'Computer Networks', icon: Network },
    { id: 'DSA', name: 'Data Structures & Algorithms', icon: Code },
  ];

  return (
    <div className="flex flex-col flex-1 items-center justify-start w-full py-20 px-8 gap-20">
      
      {/* Hero Section */}
      <div className="text-center flex flex-col items-center mt-6">
        <h1 className="text-6xl md:text-[5rem] font-black mb-6 text-slate-800 tracking-tighter leading-tight drop-shadow-sm">
          HIRE READY <span className="text-indigo-600">DASHBOARD</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 font-medium tracking-wide">
          The standard for premium interview excellence.
        </p>
      </div>

      {/* Subject Selection (Glassmorphism Cards) */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {subjects.map((subject) => (
            <motion.div 
              key={subject.id} 
              onClick={() => navigate(`/quiz/${subject.id}`)}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="glass-card cursor-pointer p-8 flex flex-col items-center justify-center min-h-[260px] group relative overflow-hidden transition-shadow hover:shadow-2xl hover:shadow-indigo-200"
            >
              {/* Soft background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 to-emerald-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex flex-col items-center gap-6 z-10 transform group-hover:-translate-y-4 transition-transform duration-500">
                <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                  <subject.icon 
                    size={40} 
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-xl font-bold tracking-wide text-slate-800 text-center group-hover:text-indigo-900 transition-colors">
                  {subject.name}
                </span>
              </div>
              
              <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10">
                <button className="px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest text-indigo-700 uppercase bg-indigo-100/80 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                  Start Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
