import React from 'react';

export default function SkeletonLoader({ type = 'card' }) {
  if (type === 'table') {
    return (
      <div className="w-full flex flex-col gap-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-16 bg-slate-200/50 rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (type === 'profile') {
    return (
      <div className="w-full flex flex-col gap-6 animate-pulse">
        <div className="w-32 h-32 bg-slate-200/50 rounded-full mb-4 align-self-center mx-auto"></div>
        <div className="w-48 h-8 bg-slate-200/50 rounded-md mx-auto"></div>
        <div className="w-full flex justify-center gap-6 mt-4">
           <div className="w-32 h-24 bg-slate-200/50 rounded-xl"></div>
           <div className="w-32 h-24 bg-slate-200/50 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // default card
  return (
    <div className="w-full h-full min-h-[200px] bg-slate-200/50 rounded-2xl animate-pulse"></div>
  );
}
