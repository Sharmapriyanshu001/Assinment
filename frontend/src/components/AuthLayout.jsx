import React from 'react';

const AuthLayout = ({ leftPanel, rightPanel }) => {
  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Main Container */}
      <div className="w-full max-w-[1300px] h-full min-h-[600px] md:h-[95vh] md:max-h-[950px] bg-white md:bg-transparent rounded-[32px] md:rounded-none overflow-hidden flex flex-col md:flex-row shadow-sm md:shadow-none justify-between items-center">
        
        {/* Left Section (Showcase) */}
        <div className="w-full md:w-[46%] h-[400px] md:h-full p-0 mb-8 md:mb-0 hidden sm:block mr-auto">
          {leftPanel}
        </div>

        {/* Left section for mobile - smaller */}
        <div className="w-full h-[300px] sm:hidden mb-6 p-2">
            {leftPanel}
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-[50%] flex flex-col h-full bg-white md:bg-transparent md:rounded-none md:p-8">
          {rightPanel}
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
