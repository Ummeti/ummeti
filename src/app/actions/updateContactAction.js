'use server';
import { z } from 'zod';
import prisma from '@/lib/client';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const ContactUpdateSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20, 'Phone number too long'),
  address: z.string().max(255, 'Address too long'),
  youtube: z.string().url('Invalid URL').optional().or(z.literal('')),
  twitter: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagram: z.string().url('Invalid URL').optional().or(z.literal('')),
  facebook: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export async function updateContactAction(prevState, formData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message:
        'Unauthorized: You must be logged in to update contact information',
    };
  }

  const formObject = {
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    youtube: formData.get('youtube'),
    twitter: formData.get('twitter'),
    instagram: formData.get('instagram'),
    facebook: formData.get('facebook'),
  };

  const parsed = ContactUpdateSchema.safeParse(formObject);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      formObject,
      message: 'Validation failed',
    };
  }

  try {
    const validatedData = parsed.data;

    const existingContact = await prisma.contact.findFirst();

    if (existingContact) {
      await prisma.contact.update({
        where: { id: existingContact.id },
        data: {
          email: validatedData.email,
          phone: validatedData.phone,
          address: validatedData.address,
          youtube: validatedData.youtube,
          twitter: validatedData.twitter,
          instagram: validatedData.instagram,
          facebook: validatedData.facebook,
        },
      });
    } else {
      await prisma.contact.create({
        data: {
          email: validatedData.email,
          phone: validatedData.phone,
          address: validatedData.address,
          youtube: validatedData.youtube,
          twitter: validatedData.twitter,
          instagram: validatedData.instagram,
          facebook: validatedData.facebook,
        },
      });
    }

    revalidatePath('/');
    return {
      success: true,
      message: 'Contact information updated successfully!',
    };
  } catch (error) {
    console.error('Error updating contact:', error);
    return {
      success: false,
      message: 'Failed to update contact information. Please try again.',
      formObject,
    };
  }
}
