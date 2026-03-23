import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockQuestions = [
  { id: 1, text: "What runs on top of the underlying hardware?", options: ["Application", "Operating System", "Compiler", "Assembler"] },
  { id: 2, text: "Which algorithm ensures mutual exclusion?", options: ["Dijkstra", "Peterson's", "A Star", "BFS"] },
  { id: 3, text: "What is the primary function of an OS?", options: ["Resource Management", "Compiling", "Database indexing", "Networking"] },
  { id: 4, text: "Thrashing occurs when...", options: ["CPU is 100%", "Excessive paging happens", "Memory is empty", "System halts"] },
  { id: 5, text: "What is a PCB?", options: ["Process Control Block", "Printed Circuit Board", "Primary Cache Block", "Program Counter Base"] },
];

export default function Quiz() {
  const { subject } = useParams();
  const navigate = useNavigate();
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (currentQIndex < mockQuestions.length - 1) {
            setCurrentQIndex(idx => idx + 1);
            return 30;
          } else {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQIndex]);

  const handleSelectOption = (opt) => setAnswers({ ...answers, [currentQIndex]: opt });
  const handleNext = () => { 
    if (currentQIndex < mockQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setTimeLeft(30);
    } 
  };
  const handlePrev = () => { 
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
      setTimeLeft(30);
    } 
  };

  const handleSubmit = () => {
    const scoreMap = Object.keys(answers).map(key => ({
      qId: mockQuestions[key].id,
      text: mockQuestions[key].text,
      selected: answers[key],
      correct: mockQuestions[key].options[1]
    }));
    navigate('/result', { state: { results: scoreMap, subject } });
  };

  const progressPercent = ((currentQIndex + 1) / mockQuestions.length) * 100;
  const question = mockQuestions[currentQIndex];

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 30) * circumference;
  const timerColor = timeLeft > 10 ? 'rgb(16 185 129)' : 'rgb(239 68 68)'; // emerald to red

  return (
    <div className="flex flex-col items-center justify-start w-full py-12 px-4 shadow-inner min-h-full">
      
      {/* Quiz Card */}
      <div className="glass-card w-full max-w-4xl p-10 md:p-14 flex flex-col min-h-[600px] relative overflow-hidden transition-shadow duration-500 hover:shadow-2xl hover:shadow-indigo-100/50">
        
        {/* Light subtle top accent */}
        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-indigo-500 to-emerald-400"></div>

        {/* Header Info */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h2 className="text-2xl font-black uppercase tracking-widest text-slate-800 drop-shadow-sm">
            {subject} INTERVIEW
          </h2>
          
          {/* Timer */}
          <div className="flex items-center gap-3 px-3 py-1 bg-white/50 backdrop-blur-sm rounded-2xl border border-indigo-50 shadow-sm relative">
            <span className="font-bold text-sm tracking-wider uppercase text-slate-500 mr-1">Time</span>
            <div className="relative flex items-center justify-center w-12 h-12">
              <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle cx="24" cy="24" r={radius} fill="none" stroke={timerColor} strokeWidth="4"
                  strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
                  className="transition-all duration-1000 ease-linear drop-shadow-sm" strokeLinecap="round" />
              </svg>
              <span className="relative z-10 font-bold" style={{ color: timerColor }}>{timeLeft}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full mb-12 overflow-hidden bg-slate-100 relative z-10">
          <div 
            className="h-full transition-all duration-300 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Question Platform */}
        <div className="flex-1 overflow-hidden relative w-full pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQIndex}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-col justify-start relative z-10 w-full h-full flex"
            >
              <h3 className="text-xs font-bold mb-3 tracking-widest uppercase text-indigo-400">
                Question {currentQIndex + 1} of {mockQuestions.length}
              </h3>
              <p className="text-3xl font-black mb-10 leading-snug text-slate-800 drop-shadow-sm">
                {question.text}
              </p>
              
              <div className="flex flex-col gap-4 mb-10">
                {question.options.map((opt, idx) => {
                  const isSelected = answers[currentQIndex] === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      className="p-5 rounded-2xl text-left font-bold transition-all text-lg border shadow-sm flex items-center gap-4 group hover:-translate-y-[2px]"
                      style={{
                        backgroundColor: isSelected ? 'rgba(238, 242, 255, 1)' : 'rgba(255, 255, 255, 0.6)',
                        color: isSelected ? '#3730a3' : '#334155',
                        borderColor: isSelected ? '#818cf8' : '#e2e8f0',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = '#c7d2fe';
                          e.currentTarget.style.backgroundColor = 'rgba(248, 250, 252, 0.9)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                        }
                      }}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'}`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span className="relative z-10">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Tools */}
        <div className="flex justify-between items-center mt-auto pt-10 border-t border-slate-100 relative z-10">
          <button 
            onClick={handlePrev} 
            disabled={currentQIndex === 0}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed border-2 border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300"
          >
            <ChevronLeft size={20} /> Previous
          </button>

          {currentQIndex === mockQuestions.length - 1 ? (
            <button 
              onClick={handleSubmit} 
              className="flex items-center gap-2 px-10 py-3.5 rounded-xl font-black tracking-wider uppercase transition-all bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-[2px] hover:bg-emerald-700"
            >
              Submit Interview <CheckCircle2 size={20} />
            </button>
          ) : (
            <button 
              onClick={handleNext} 
              className="flex items-center gap-2 px-10 py-3.5 rounded-xl font-black tracking-wider uppercase transition-all bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-[2px] hover:bg-indigo-700"
            >
              Next <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
