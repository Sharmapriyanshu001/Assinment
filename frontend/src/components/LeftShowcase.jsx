import React from 'react';
import { Infinity } from 'lucide-react';

const LeftShowcase = () => {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#e6f0fa] via-[#e2ebf6] to-[#fce4e4] p-8 flex flex-col items-center justify-center">
      {/* Abstract background elements (CSS approximation) */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-200/40 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-pink-200/40 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
      <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] pointer-events-none"></div>

      {/* Logo */}
      <div className="absolute top-8 left-8 flex items-center z-20">
        <span className="text-[#0D1B7E] font-bold text-2xl tracking-tight">Productr</span>
        <Infinity className="w-6 h-6 ml-1 text-[#f97316]" strokeWidth={3} />
      </div>

      {/* Runner Card */}
      <div className="relative z-10 w-[240px] h-[360px] sm:w-[280px] sm:h-[400px] rounded-[30px] overflow-hidden shadow-2xl shadow-orange-900/20 bg-gradient-to-b from-[#ffb05c] via-[#f97316] to-[#431407]">
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-[30px] border border-white/20 pointer-events-none"></div>
        
        {/* Silhouette placeholder (using a generic CSS shape or just the gradient since we lack the image) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-80 mix-blend-overlay">
           {/* Replace this with an actual img tag if the asset becomes available */}
           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-black">
              <path d="M13.5 5.5C13.5 6.32843 12.8284 7 12 7C11.1716 7 10.5 6.32843 10.5 5.5C10.5 4.67157 11.1716 4 12 4C12.8284 4 13.5 4.67157 13.5 5.5Z" fill="currentColor"/>
              <path d="M15.4243 10.0384C15.8647 10.4284 16.538 10.3877 16.928 9.94723L18.428 8.24723C18.818 7.80678 18.7773 7.13346 18.3368 6.74341C17.8964 6.35337 17.223 6.39405 16.833 6.83451L15.698 8.12053L13.8824 6.51268C13.1492 5.86333 12.0195 5.92211 11.3655 6.6401L8.68164 9.58784L6.68537 9.08877C6.1491 8.9547 5.6027 9.27787 5.46863 9.81414C5.33457 10.3504 5.65774 10.8968 6.19401 11.0309L8.8541 11.6959C9.28479 11.8036 9.73685 11.6669 10.0366 11.3378L11.5303 9.69708L12.5694 10.617C12.5539 10.7423 12.5501 10.8711 12.5613 11.0028L12.9818 15.9351C13.0039 16.1944 13.0076 16.4556 12.993 16.7153L12.7844 20.4239C12.7533 20.9768 13.1769 21.45 13.7298 21.4811C14.2827 21.5122 14.7559 21.0886 14.787 20.5357L15.0064 16.6346C15.0253 16.2996 15.0205 15.963 14.9918 15.6272L14.6186 11.25L15.4243 10.0384Z" fill="currentColor"/>
           </svg>
        </div>

        <div className="absolute bottom-10 left-0 w-full flex flex-col items-center">
          <p className="text-white text-[18px] sm:text-[20px] font-semibold text-center leading-tight tracking-wide drop-shadow-md">
            Uplist your<br />product to market
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftShowcase;
