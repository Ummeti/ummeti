'use server';

import nodemailer from 'nodemailer';
import { EmailSchema } from '@/lib/schemas';

export async function sendEmailAction(prevState, formData) {
  const formObject = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  const parsed = EmailSchema.safeParse(formObject);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return { success: false, errors, formObject };
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return {
      success: false,
      message: 'Email server configuration is incomplete',
    };
  }

  const turnstileToken = formData.get('cf-turnstile-response');
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  const turnstileResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: turnstileToken,
      }),
    }
  );

  const turnstileData = await turnstileResponse.json();
  if (!turnstileData.success) {
    return { success: false, message: 'Bot verification failed.' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const adminHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Message Received</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; }
        .email-container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
        .header { background-color: #4fa7a9; color: #ffffff; text-align: center; padding: 20px; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 20px; color: #333333; }
        .content p { margin: 10px 0; }
        .footer { background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #777777; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>New Message Received</h1>
        </div>
        <div class="content">
          <p><strong>Name:</strong> ${formObject.name}</p>
          <p><strong>Email:</strong> ${formObject.email}</p>
          <p><strong>Subject:</strong> ${formObject.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${formObject.message}</p>
        </div>
        <div class="footer">
          <p>You have received a new message from your website. Please respond as soon as possible.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const userHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Message Received</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; }
        .email-container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
        .header { background-color: #4fa7a9; color: #ffffff; text-align: center; padding: 20px; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 20px; color: #333333; }
        .content p { margin: 10px 0; }
        .footer { background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #777777; }
        .button { display: inline-block; margin-top: 20px; background-color: #4fa7a9; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Thank You for Your Message</h1>
        </div>
        <div class="content">
          <p>Dear ${formObject.name},</p>
          <p>We have received your message with the subject <strong>${formObject.subject}</strong>. Thank you for reaching out to us!</p>
          <p>Our team will review your message and get back to you as soon as possible.</p>
          <p>If you have any questions, feel free to contact us via our website or email.</p>
          <a href=${process.env.BASE_URL} target="_blank" class="button">Visit Our Website</a>
        </div>
        <div class="footer">
          <p>Best regards,</p>
          <p>Ummeti Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"${formObject.name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: formObject.subject,
      html: adminHtml,
      replyTo: formObject.email,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: formObject.email,
      subject: `We have received your message: ${formObject.subject}`,
      html: userHtml,
    });

    return {
      success: true,
      message: 'Your message was successfully sent!',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again later.',
      formObject,
    };
  }
}
