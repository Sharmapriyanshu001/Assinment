import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import LeftShowcase from '../components/LeftShowcase';
import LoginForm from '../components/LoginForm';
import OtpForm from '../components/OtpForm';
import { authService } from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('login');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(20);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await authService.sendOtp(email);
      setStep('otp');
      setTimer(20);
    } catch (err) {
      console.error(err);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (otpValue) => {
    setLoading(true);
    setError('');
    try {
      await authService.verifyOtp(email, otpValue);
      // If successful, navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      await authService.resendOtp(email);
      setTimer(20);
      setOtp(['', '', '', '', '', '']);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      leftPanel={<LeftShowcase />}
      rightPanel={
        step === 'login' ? (
          <LoginForm
            email={email}
            setEmail={setEmail}
            onNextStep={handleLoginSubmit}
            loading={loading}
          />
        ) : (
          <OtpForm
            otp={otp}
            setOtp={setOtp}
            timer={timer}
            setTimer={setTimer}
            onResend={handleResendOtp}
            onSubmit={handleOtpSubmit}
            loading={loading}
            error={error}
          />
        )
      }
    />
  );
};

export default LoginPage;
