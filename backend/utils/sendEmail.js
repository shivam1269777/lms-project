import nodemailer from "nodemailer";

const sendEmail = async function (email, subject, message) {
  try {
    // ✅ Environment variables check
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USERNAME ||
      !process.env.SMTP_PASSWORD ||
      !process.env.SMTP_FROM_EMAIL
    ) {
      throw new Error("SMTP environment variables are missing");
    }

    // ✅ Brevo SMTP Transporter
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, 
      auth: {
        user: process.env.SMTP_USERNAME,   
        pass: process.env.SMTP_PASSWORD,   
      },
    });

    // ✅ Email Bhejo
    await transporter.sendMail({
      from: `"LMS Admin" <${process.env.SMTP_FROM_EMAIL}>`, 
      to: email,
      subject,
      html: message,
    });

    console.log("✅ Email sent successfully to:", email);

  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
    throw error;
  }
};

export default sendEmail;