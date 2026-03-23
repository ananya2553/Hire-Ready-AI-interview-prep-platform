import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, Sparkles } from 'lucide-react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const Typewriter = ({ text, delay = 25 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
}

export default function ResultAnalysis({ score, subject, aiFeedback }) {
  const printRef = useRef();
  
  // Use a ref to store static deterministic scores based on the score prop, 
  // so they don't jump around on re-renders.
  const metrics = useRef([
    Math.min(100, Math.max(0, score + 8)), // Technical Accuracy
    Math.min(100, Math.max(0, score - 5)), // Problem Solving
    Math.min(100, Math.max(0, score + 3)), // Communication
    Math.min(100, Math.max(0, score - 2))  // Code Efficiency
  ]);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;
    
    // Temporarily adjust styles for better PDF rendering
    element.style.padding = '20px';
    element.style.background = '#ffffff';

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    
    // Restore styles
    element.style.padding = '0px';
    element.style.background = 'transparent';

    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${subject}_AI_Analysis_Report.pdf`);
  };

  const data = {
    labels: ['Technical Accuracy', 'Problem Solving', 'Communication', 'Code Efficiency'],
    datasets: [
      {
        label: 'Candidate Performance',
        data: metrics.current,
        backgroundColor: 'rgba(99, 102, 241, 0.3)', // Indigo soft background
        borderColor: 'rgba(139, 92, 246, 1)', // Violet border
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)', // Indigo points
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(139, 92, 246, 1)',
        fill: true,
      }
    ]
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: 'rgba(99, 102, 241, 0.1)' },
        grid: { color: 'rgba(99, 102, 241, 0.1)' },
        pointLabels: { color: '#4f46e5', font: { size: 12, family: 'Inter', weight: 'bold' } },
        ticks: { backdropColor: 'transparent', color: '#6b7280', z: 1, stepSize: 20 },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: { legend: { display: false } },
    maintainAspectRatio: false
  };

  return (
    <div className="w-full flex flex-col gap-6" ref={printRef}>
      
      {/* Dynamic Summary Stats */}
      <div className="flex justify-between items-center px-6 py-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-violet-50/50"></div>
        <span className="text-indigo-800 font-bold tracking-wider text-sm relative z-10 flex items-center gap-2">
           <Sparkles size={16} className="text-violet-500" /> AI PERFORMANCE SCORE
        </span>
        <span className="text-4xl font-black text-indigo-600 drop-shadow-sm relative z-10">
          {score}%
        </span>
      </div>

      {/* Radar Chart Section */}
      <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 relative bg-white/50 backdrop-blur-md rounded-2xl p-2 sm:p-4 border border-indigo-50 shadow-inner">
        <Radar data={data} options={options} />
      </div>

      {/* Typewriter AI Feedback */}
      <div className="w-full flex flex-col p-6 rounded-2xl bg-indigo-50/70 border border-indigo-100 shadow-sm transition-all duration-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-indigo-100/20 pointer-events-none"></div>
        <h3 className="text-indigo-700 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2 relative z-10">
          <Sparkles size={16} className="text-violet-500" /> AI Interviewer Feedback
        </h3>
        <div className="text-slate-700 text-sm leading-relaxed flex flex-col gap-5 font-medium relative z-10">
          <div>
             <strong className="text-indigo-800 block mb-1">Strengths:</strong>
             <div className="min-h-[40px] text-indigo-950/80 italic font-serif leading-relaxed"><Typewriter text={aiFeedback.strengths} delay={30} /></div>
          </div>
          <div>
             <strong className="text-violet-800 block mb-1">Areas for Improvement:</strong>
             <div className="min-h-[40px] text-violet-950/80 italic font-serif leading-relaxed"><Typewriter text={aiFeedback.improvements} delay={35} /></div>
          </div>
        </div>
      </div>

      {/* Download Action */}
      <button 
        onClick={handleDownloadPdf} 
        data-html2canvas-ignore="true"
        className="mt-2 w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-white transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2">
        <Download size={20} /> Download Report as PDF
      </button>
    </div>
  );
}
