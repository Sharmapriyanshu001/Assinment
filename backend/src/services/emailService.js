const transporter = require('../config/mail');

const sendEmailOtp = async (email, otp) => {
  // Development fallback for easy testing when credentials are not available
  if (process.env.NODE_ENV === 'development' && (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)) {
    console.log(`[DEV MODE] Email OTP for ${email}: ${otp}`);
    return true;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Productr Login OTP',
      text: `Your OTP is: ${otp}\nThis OTP is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(`Email sending failed: ${error.message}`);
    return false;
  }
};

module.exports = { sendEmailOtp };
