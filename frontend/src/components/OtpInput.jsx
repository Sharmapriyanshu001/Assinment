import React, { useRef } from 'react';

const OtpInput = ({ otp, setOtp, isError, disabled }) => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      // Move to previous input on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (isNaN(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
    
    // Focus the last filled input
    const focusIndex = Math.min(pastedData.length, 5);
    if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
    }
  };

  return (
    <div className="flex justify-between space-x-2 sm:space-x-4 mb-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          disabled={disabled}
          ref={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={`w-10 h-12 sm:w-12 sm:h-14 border rounded-lg text-center text-lg font-semibold outline-none transition-all disabled:opacity-50 disabled:bg-gray-100 ${
            isError
              ? 'border-red-500 text-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-gray-300 text-gray-900 focus:border-[#0D1B7E] focus:ring-1 focus:ring-[#0D1B7E]'
          }`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
