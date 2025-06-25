import transporter from "./mailer.js";

export const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: `"Xchange App 👋" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your OTP Code',
        html: `
      <h2>Email Verification Code</h2>
      <p>Your OTP code is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 5 minutes.</p>
    `
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ OTP sent to ${email}`);
    } catch (err) {
        console.error('❌ Failed to send OTP:', err);
        throw new Error('Failed to send OTP email');
    }
}

