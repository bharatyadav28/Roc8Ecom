import sendEmail from "./sendEmail";

interface verifyEmailData {
  name: string;
  email: string;
  otp: string;
}

const sendVerificationEmail = async ({ name, email, otp }: verifyEmailData) => {
  const message = `<h4>Hello ${name},</h4>
                <p>Thank you for registering with our platform.
                 To confirm your account, please use the following one-time password (OTP):</p>
                <h2> ${otp} </h2>
                <p>Please enter this OTP on our website to complete the account confirmation process.</p> 
                
                <p>If you did not request this OTP, please disregard this email.</p>
                </p>
                Thank you,<br>
                Ecommerce`;

  return sendEmail({
    to: email,
    subject: "Verify Email",
    html: message,
  });
};

export default sendVerificationEmail;
