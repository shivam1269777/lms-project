import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, subject, message) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "LMS Admin <onboarding@resend.dev>",
      to: email,
      subject: subject,
      html: message,
    });

    if (error) {
      console.error("EMAIL ERROR:", error);
      throw new Error(error.message);
    }

    console.log("Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw new Error(error.message);
  }
};

export default sendEmail;