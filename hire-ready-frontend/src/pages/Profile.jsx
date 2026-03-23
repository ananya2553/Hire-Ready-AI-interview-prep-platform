import React, { useState, useEffect } from 'react';
import { User, Award, CheckCircle2, LayoutDashboard, Clock } from 'lucide-react';
import api from '../api/axios';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fallback to userId 1 for demo purposes
  const userId = localStorage.getItem('userId') || 1;
  const name = localStorage.getItem('name') || "Candidate";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile/${userId}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="w-full p-12 flex justify-center">
        <div className="w-full max-w-4xl"><SkeletonLoader type="profile" /></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="w-full flex justify-center p-8 md:p-12">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        {/* Header */}
        <div className="glass-card p-8 flex items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-indigo-500 to-violet-500"></div>
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 border-4 border-white shadow-lg flex items-center justify-center text-indigo-700">
            <User size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800">{name}</h1>
            <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm mt-1">Hire Ready Candidate</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Quizzes" value={profile.totalQuizzesTaken} icon={LayoutDashboard} color="indigo" />
          <StatCard title="Avg OS Score" value={profile.avgOsScore + "%"} icon={Award} color="emerald" />
          <StatCard title="Avg DBMS Score" value={profile.avgDbmsScore + "%"} icon={Award} color="blue" />
          <StatCard title="DSA Solved" value={profile.solvedDsaCount} icon={CheckCircle2} color="violet" />
        </div>

        {/* Recent Activity Table */}
        <div className="glass-card p-8 mt-4">
          <h2 className="text-2xl font-black text-slate-800 mb-6 tracking-tight flex items-center gap-2">
            <Clock className="text-indigo-500" /> Recent Activity
          </h2>
          {profile.recentAttempts && profile.recentAttempts.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
              <table className="w-full text-left bg-white">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest">
                    <th className="px-6 py-4 font-bold">Subject</th>
                    <th className="px-6 py-4 font-bold">Score</th>
                    <th className="px-6 py-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {profile.recentAttempts.map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">{attempt.subject}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600">{attempt.totalScore}%</td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                        {new Date(attempt.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-100 text-slate-500 font-medium">
              No recent activity found. Start a quiz!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colorMap = {
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    blue: 'text-blue-600 bg-blue-50 border-blue-100',
    violet: 'text-violet-600 bg-violet-50 border-violet-100',
  };
  
  return (
    <div className={`p-6 rounded-2xl border ${colorMap[color]} shadow-sm flex flex-col justify-between items-start gap-4 hover:-translate-y-1 transition-transform`}>
      <Icon size={24} className="opacity-80" />
      <div>
        <h3 className="text-xs font-bold tracking-widest uppercase opacity-70 mb-1">{title}</h3>
        <p className="text-3xl font-black">{value}</p>
      </div>
    </div>
  );
}
