import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#0D1B7E] hover:bg-[#0A1560] text-white font-medium py-3 px-4 rounded-lg w-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0D1B7E] focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
