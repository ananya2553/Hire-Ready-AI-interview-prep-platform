import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import ResultAnalysis from '../components/ResultAnalysis';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, subject } = location.state || { results: [], subject: 'Unknown' };

  if (!results.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl text-red-400 mb-4 font-bold">No Assessment Data Found</h2>
        <button onClick={() => navigate('/')} className="px-6 py-3 transition rounded-lg font-bold shadow-[0_0_15px_rgba(255,221,0,0.2)] hover:shadow-[0_0_20px_rgba(255,221,0,0.4)]" style={{ backgroundColor: '#FFDD00', color: '#0A0A0A' }}>Return to Dashboard</button>
      </div>
    );
  }

  const correctCount = results.filter(r => String(r.selected).trim().toLowerCase() === String(r.correct).trim().toLowerCase()).length;
  const incorrectCount = results.length - correctCount;
  const percentage = Math.round((correctCount/results.length)*100);

  useEffect(() => {
    if (percentage > 80) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#6366f1', '#8b5cf6', '#10b981'] // Indigo, Violet, Emerald
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#6366f1', '#8b5cf6', '#10b981']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [percentage]);

  // Mocking the AI Service response payload interpretation for the UI.
  // In a full integration, this would come securely via QuizResultDTO from the /api/quiz/submit endpoint logic.
  let aiFeedback = { strengths: "", improvements: "" };
  if (percentage >= 90) {
      aiFeedback = { strengths: "Flawless technical execution and deep understanding of the core architecture parameters.", improvements: "Challenge yourself with elite systemic design patterns next." };
  } else if (percentage >= 50) {
      aiFeedback = { strengths: "Solid foundational grasp of the material.", improvements: "Focus heavily on the questions you missed to bridge the intermediate knowledge gaps." };
  } else {
      aiFeedback = { strengths: "Attempted the test and established a baseline.", improvements: "Significant revision required. Please review the official documentation for these topics." };
  }

  const data = {
    labels: ['Correct Answers', 'Incorrect / Skipped'],
    datasets: [
      {
        data: [correctCount, incorrectCount],
        backgroundColor: ['rgba(16, 185, 129, 0.9)', 'rgba(239, 68, 68, 0.9)'],
        borderColor: ['rgba(16, 185, 129, 1)', 'rgba(239, 68, 68, 1)'],
        borderWidth: 2,
        hoverOffset: 6
      },
    ],
  };

  const options = {
    plugins: {
      legend: { labels: { color: '#f3f4f6', font: { size: 14, family: 'Inter' } } },
      tooltip: { titleFont: { size: 16 }, bodyFont: { size: 14 }, padding: 12 }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-stretch py-12 px-8">
      {/* Analytics Section */}
      <div className="glass-card w-full md:w-[35%] p-8 flex flex-col items-center relative overflow-hidden shadow-lg shadow-slate-200/50">
        <div className="absolute top-0 left-0 w-full h-[5px] bg-emerald-500"></div>
        <h2 className="text-2xl font-black mb-8 text-slate-800 tracking-wide uppercase">{subject} Analytics</h2>
        <ResultAnalysis score={percentage} subject={subject} aiFeedback={aiFeedback} />

        <button onClick={() => navigate('/')} className="mt-8 flex items-center justify-center gap-3 w-full py-4 bg-indigo-50 border border-indigo-100 hover:bg-indigo-600 rounded-xl font-bold text-indigo-700 hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-[2px]">
          <ArrowLeft size={20} /> Dashboard Returns
        </button>
      </div>

      {/* Review Section */}
      <div className="glass-card w-full md:w-[65%] p-8 flex flex-col shadow-lg shadow-slate-200/50">
        <h3 className="text-2xl font-black text-slate-800 mb-6 border-b border-slate-100 pb-4 tracking-wide">Detailed Review</h3>
        <div className="flex flex-col gap-5 overflow-y-auto pr-2 custom-scrollbar flex-1 max-h-[600px]">
          {results.map((res, i) => {
            const isCorrect = String(res.selected).trim().toLowerCase() === String(res.correct).trim().toLowerCase();
            return (
              <div key={i} className={`p-6 rounded-2xl border-l-[6px] shadow-sm transition-all hover:-translate-y-[2px] mb-2 ${isCorrect ? 'border-emerald-500 bg-white hover:shadow-md' : 'border-red-500 bg-white hover:shadow-md'}`}>
                <div className="flex items-start gap-4 mb-3">
                  <div className="mt-1">
                    {isCorrect ? <CheckCircle className="text-emerald-500 drop-shadow-sm" size={26} /> : <XCircle className="text-red-500 drop-shadow-sm" size={26} />}
                  </div>
                  <p className="font-bold text-slate-800 text-lg leading-snug">{res.text}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ml-10">
                  <div className="text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="block text-[11px] font-bold uppercase tracking-widest mb-1 text-slate-400">Your Answer</span>
                    <span className={`text-base font-semibold ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
                      {res.selected || <span className="text-slate-400 italic">Skipped</span>}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="text-sm bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
                      <span className="block text-[11px] font-bold uppercase tracking-widest mb-1 text-indigo-400">Correct Answer</span>
                      <span className="text-indigo-600 text-base font-bold">{res.correct}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
