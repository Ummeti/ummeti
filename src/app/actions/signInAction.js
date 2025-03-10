'use server';

import { signIn } from '@/lib/auth';
import prisma from '@/lib/client';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function signInAction(prevState, formData) {
  const parsedData = signInSchema.safeParse({ email: formData.get('email') });

  if (!parsedData.success) {
    return {
      success: false,
      message: 'Invalid input',
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const email = parsedData.data.email;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return {
      success: false,
      message: 'Unauthorized access.',
      errors: { email: ['Access denied'] },
    };
  }

  try {
    await signIn('nodemailer', {
      email,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    return {
      success: true,
      message: `Magic link has been sent to ${email}`,
      errors: {},
    };
  } catch (error) {
    console.error('Error sending magic link:', error);
    return {
      success: false,
      message: 'Failed to send magic link. Please try again.',
      errors: {},
    };
  }
}
