// pages/api/sendRecoveryEmail.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;  // Get email from the request body

    // Generate a random recovery code (for simplicity, a 6-digit number)
    const recoveryCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code

    // Configure Nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use the email service of your choice (e.g., Gmail)
      auth: {
        user: process.env.MAIL_USER,  // Accessing the environment variable for the email address
        pass: process.env.MAIL_PASS,  // Accessing the environment variable for the email password
      },
    });

    try {
      // Send the email
      await transporter.sendMail({
        from: process.env.MAIL_USER, // Sender's email address (use environment variable)
        to: email,                   // Recipient's email address
        subject: 'Password Recovery Code',
        text: `Your password recovery code is: ${recoveryCode}`,
      });

      // Respond with a success message if email is sent
      res.status(200).json({ message: 'Recovery email sent successfully!' });
    } catch (error) {
      // Handle any errors that occur while sending the email
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send recovery email' });
    }
  } else {
    // Respond with a 405 Method Not Allowed if the request method is not POST
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
