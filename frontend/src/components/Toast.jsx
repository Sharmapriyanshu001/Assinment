import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';

const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center space-x-3 min-w-[300px]">
        <div className="w-6 h-6 rounded-md bg-[#10b981] flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
        <p className="text-sm font-semibold text-gray-800 flex-1">{message}</p>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 focus:outline-none shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
