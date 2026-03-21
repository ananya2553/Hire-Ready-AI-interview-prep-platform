import React, { useEffect, useRef, useState } from 'react';

export default function AntigravityBackground() {
  const canvasRef = useRef(null);
  const gravityRef = useRef(-0.03); // Default to drifting up
  const [isAntigravity, setIsAntigravity] = useState(true);

  const toggleGravity = (e) => {
    e.stopPropagation();
    const newAnti = !isAntigravity;
    setIsAntigravity(newAnti);
    gravityRef.current = newAnti ? -0.03 : 0.15;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const bubbles = [];

    class Bubble {
      constructor(x, y) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
        this.r = Math.random() * 50 + 20; 
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        
        // Deep, rich 3D colors
        const colors = [
          'rgba(99, 102, 241, 0.5)', // Indigo
          'rgba(52, 211, 153, 0.5)', // Emerald
          'rgba(167, 139, 250, 0.5)',// Purple
          'rgba(56, 189, 248, 0.5)'  // Sky
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.bounciness = 0.65;
      }
      
      update() {
        this.vy += gravityRef.current;
        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.998;
        this.vy *= 0.998;

        if (this.x + this.r > width) { 
          this.x = width - this.r; 
          this.vx *= -this.bounciness; 
        }
        if (this.x - this.r < 0) { 
          this.x = this.r; 
          this.vx *= -this.bounciness; 
        }
        
        if (this.y + this.r > height) { 
           this.y = height - this.r; 
           this.vy *= -this.bounciness; 
           this.vx *= 0.95;
        }
        if (this.y - this.r < 0) { 
           this.y = this.r; 
           this.vy *= -this.bounciness; 
           this.vx *= 0.95;
        }
      }
      
      draw() {
        // 3D Spherical Radial Gradient
        const gradient = ctx.createRadialGradient(
          this.x - this.r * 0.3, 
          this.y - this.r * 0.3,
          this.r * 0.1,
          this.x,
          this.y,
          this.r
        );
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)'); // Bright highlight
        gradient.addColorStop(0.4, this.color); // Core color
        gradient.addColorStop(1, this.color.replace('0.5)', '0.05)')); // Transparent shadow edge

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        
        // 3D Drop Shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 10;

        ctx.fill();
        ctx.closePath();

        // Reset shadow to prevent bleeding
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
    }

    for(let i=0; i<35; i++) {
       bubbles.push(new Bubble());
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleClick = (e) => {
       for(let i=0; i<3; i++) {
         bubbles.push(new Bubble(e.clientX, e.clientY));
       }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);

    const render = () => {
      // Clear exact rect for better optical clarity over drawing transparent layers
      ctx.clearRect(0, 0, width, height);
      
      bubbles.forEach(b => {
        b.update();
        b.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0"
        style={{ pointerEvents: 'none' }} 
      />
      <button 
        onClick={toggleGravity}
        className="fixed bottom-6 left-6 z-50 px-5 py-3 bg-white/90 hover:bg-white border border-indigo-200 text-indigo-700 text-[11px] uppercase tracking-widest font-black rounded-2xl shadow-xl backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-indigo-300/50"
      >
        <span className="flex items-center gap-2">
          {isAntigravity ? '☁️ Antigravity: ACTIVE' : '🌍 Gravity: ACTIVE'}
        </span>
      </button>
    </>
  );
}
