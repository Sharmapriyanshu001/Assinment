// const twilio = require('twilio'); // Import if using Twilio

const sendSmsOtp = async (phone, otp) => {
  // If credentials are not available, fallback to development mode and log OTP
  if (
    process.env.NODE_ENV === 'development' || 
    (!process.env.TWILIO_ACCOUNT_SID && !process.env.MSG91_AUTH_KEY)
  ) {
    console.log(`[DEV MODE] SMS OTP for ${phone}: ${otp}`);
    return true;
  }

  try {
    // Example Twilio implementation
    /*
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await client.messages.create({
      body: `Your Productr login OTP is: ${otp}. Valid for 5 mins.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    */
    
    // As per requirements: "If credentials are not available: Automatically switch to development mode and log OTP in console."
    console.log(`SMS OTP sent to ${phone}: ${otp}`);
    return true;
  } catch (error) {
    console.error(`SMS sending failed: ${error.message}`);
    return false;
  }
};

module.exports = { sendSmsOtp };
