const transporter = require('../config/mail');

const axios = require('axios');

const sendEmailOtp = async (email, otp) => {
  // Development fallback for easy testing when credentials are not available
  if (process.env.NODE_ENV === 'development' && (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)) {
    console.log(`[DEV MODE] Email OTP for ${email}: ${otp}`);
    return true;
  }

  try {
    const text = `Your OTP is: ${otp}\nThis OTP is valid for 5 minutes.`;
    
    // Send via Vercel proxy to bypass Render SMTP block
    await axios.post('https://assinment-gamma.vercel.app/api/send-email', {
      to: email,
      subject: 'Productr Login OTP',
      text,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    });

    return true;
  } catch (error) {
    console.error(`Email sending failed: ${error.message}`);
    return false;
  }
};

module.exports = { sendEmailOtp };
