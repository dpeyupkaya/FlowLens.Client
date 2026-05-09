import React, { useState, useEffect, useRef } from 'react';

const InteractiveFace = ({ isButtonHovered }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const faceRef = useRef(null);

  useEffect(() => {
    if (isButtonHovered) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e) => {
      if (faceRef.current) {
        const rect = faceRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = 3; 
        
        setPosition({ 
          x: Math.cos(angle) * distance, 
          y: Math.sin(angle) * distance 
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isButtonHovered]);

  return (
    <div ref={faceRef} className="flex flex-col items-center gap-4 transition-all duration-500 select-none">
      
      <div className="flex gap-3">
        {[1, 2].map((i) => (
          <div 
            key={i} 
            className={`w-6 h-6 rounded-full relative transition-all duration-500 overflow-hidden border
              ${isButtonHovered 
                ? 'bg-white border-teal-500/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_0_15px_rgba(20,184,166,0.3)] scale-110' 
                : 'bg-slate-100 border-slate-300 shadow-[inset_0_2px_3px_rgba(0,0,0,0.1)]'}`}
          >
           
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-150 ease-out"
              style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            >
              <div className={`rounded-full transition-all duration-300 flex items-center justify-center
                ${isButtonHovered ? 'w-4 h-4 bg-teal-500/20' : 'w-3 h-3 bg-slate-200'}`}
              >
                <div className={`bg-slate-900 rounded-full transition-all duration-300 relative
                  ${isButtonHovered ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5'}`}
                >
                  <div className="absolute top-[15%] left-[15%] w-0.5 h-0.5 bg-white rounded-full opacity-80" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative h-2 w-10 flex items-center justify-center">
        <svg 
          width="32" 
          height="8" 
          viewBox="0 0 32 8" 
          className="transition-all duration-500"
        >
          <path 
            d={isButtonHovered ? "M4 1C10 6 22 6 28 1" : "M8 4H24"} 
            stroke={isButtonHovered ? "#14b8a6" : "#64748b"} 
            strokeWidth="2.5" 
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-500"
          />
        </svg>
      </div>
    </div>
  );
};

export default InteractiveFace;