import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async function (email, subject, message) {
  try {
    // ✅ Environment variables check
    if (
      !process.env.SENDGRID_API_KEY ||
      !process.env.SENDGRID_FROM_EMAIL
    ) {
      throw new Error("SendGrid environment variables are missing");
    }

    // ✅ Email Bhejo
    await sgMail.send({
      to: email,
      from: {
        name: "LMS Project",
        email: process.env.SENDGRID_FROM_EMAIL,
      },
      subject,
      html: message,
    });

    console.log("✅ Email sent successfully to:", email);

  } catch (error) {
    console.error("❌ EMAIL ERROR:", error.response?.body || error.message);
    throw error;
  }
};

export default sendEmail;