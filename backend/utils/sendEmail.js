import nodemailer from "nodemailer";

//async await is not allowed in global scope,must use a wrapper
const sendEmail = async function (email, subject, message) {
  try {
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER_EMAIL ||
      !process.env.SMTP_PASS
    ) {
      throw new Error("SMTP environment variables are missing");
    }

    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), // important fix
      secure: false,
      auth: {
        user: process.env.SMTP_USER_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER_EMAIL,
      to: email,
      subject,
      html: message,
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error; // important so controller can catch it
  }
};

export default sendEmail;
