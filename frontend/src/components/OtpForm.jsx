import React, { useEffect } from 'react';
import Button from './Button';
import OtpInput from './OtpInput';
import Loader from './Loader';

const OtpForm = ({ otp, setOtp, timer, setTimer, onResend, onSubmit, loading, error }) => {
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, setTimer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      onSubmit(otpValue);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8 md:px-10 flex flex-col h-full min-h-[400px] animate-fade-in">
      <div className="flex-grow flex flex-col justify-center mb-10">
        <h2 className="text-2xl font-bold text-[#0D1B7E] mb-8 text-center sm:text-left">
          Login to your Productr Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <OtpInput otp={otp} setOtp={setOtp} isError={!!error} disabled={loading} />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <Button type="submit" className="mb-8" disabled={loading || otp.join('').length < 6}>
            {loading ? <Loader /> : 'Enter your OTP'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-gray-500 text-sm inline-block">
            Didn't receive OTP?{' '}
          </p>
          {timer > 0 ? (
            <span className="text-[#0D1B7E] font-bold text-sm ml-1">
              Resend in {timer}s
            </span>
          ) : (
            <button
              type="button"
              onClick={onResend}
              disabled={loading}
              className="text-[#0D1B7E] font-bold text-sm ml-1 hover:underline focus:outline-none disabled:opacity-50"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
