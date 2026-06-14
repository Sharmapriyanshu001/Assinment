import api from './api';

export const authService = {
  sendOtp: async (email) => {
    try {
      const response = await api.post('/auth/send-otp', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send OTP');
    }
  },

  verifyOtp: async (email, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      // Store user info & token
      if (response.data.success) {
        localStorage.setItem('userInfo', JSON.stringify(response.data.data));
        if (response.data.token) {
           const existing = JSON.parse(localStorage.getItem('userInfo')) || {};
           localStorage.setItem('userInfo', JSON.stringify({...existing, token: response.data.token}));
        }
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to verify OTP');
    }
  },
  
  resendOtp: async (email) => {
    try {
      const response = await api.post('/auth/resend-otp', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to resend OTP');
    }
  },

  logout: () => {
    localStorage.removeItem('userInfo');
  },
  
  getUserInfo: () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
};
