// app/api/password-recovery/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  // Set up Nodemailer transport (example with Gmail SMTP)
  const transporter = nodemailer.createTransport({
    service: "gmail",  // You can replace with other email services
    auth: {
      user: process.env.GMAIL_USER,  // Store in environment variables for security
      pass: process.env.GMAIL_PASS,
    },
  });

  // Compose the email content
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Password Recovery Request",
    text: `Hello, \n\n Please click the link below to reset your password: \n\n [Reset Link]`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Password recovery email sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to send email", error: error.message }, { status: 500 });
  }
}
