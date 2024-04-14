import nodemailer from "nodemailer";
// import nodemailer from "@types/nodemailer";

interface emailData {
  to: string;
  subject: string;
  html: string;
}
const sendEmail = async ({ to, subject, html }: emailData) => {
  //  create tranporter(ethereal config) using nodemailer
  //   const transporter = nodemailer.createTransport({
  //     host: "smtp.ethereal.email",
  //     port: Number(process.env.ETHERIAL_PORT),
  //     auth: {
  //       user: process.env.ETHERIAL_USER,
  //       pass: process.env.ETHERIAL_PASS,
  //     },
  //   } as nodemailer.TransportOptions);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  //   send email using previously created transporter
  return transporter.sendMail({
    from: '"Ecommerce(Ro8 MERN TEST)" <intensify@intensify.com>',
    to,
    subject,
    html,
  });
};

export default sendEmail;
