'use server';

import nodemailer from 'nodemailer';
import { EmailSchema } from '@/lib/schemas';

export async function sendEmailAction(prevState, formData) {
  console.log(formData);
  const formObject = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  const parsed = EmailSchema.safeParse(formObject);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
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

  // Email sending logic
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    tls: { rejectUnauthorized: false },
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"${formObject.name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: formObject.subject,
      html: `<p>${formObject.message}</p>`,
      replyTo: formObject.email,
    });

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email.' };
  }
}
