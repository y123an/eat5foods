import { transporter } from "./mail-transporter";

export const sendPlainMailToRecipient = async (
  receiverEmails: string[],
  name: string,
  subject: string,
  message: string
) => {
  try {
    const emailPromises = receiverEmails.map(async (email) => {
      const options = {
        from: process.env.GOOGLE_APP_EMAIL,
        to: email,
        subject: subject,
        html: `
          <p>Hi, ${name},</p>
          <p>${message}</p>
          <p>Best regards,</p>
          <p>Ethio shop  </p>
        `,
      };
      await transporter.sendMail(options);
    });

    await Promise.all(emailPromises);

    console.log("Emails sent successfully to all recipients");
  } catch (error) {
    console.log("Error sending emails:", error);
  }
};

export const sendMail = async (
  toEmail: string,
  subject: string,
  message: string
) => {
  try {
    const options = {
      from: process.env.YOUR_SENDER_EMAIL,
      to: toEmail,
      subject: subject,
      html: message,
    };
    const data = await transporter.sendMail(options);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
};
