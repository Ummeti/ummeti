'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const ReviewSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Please enter your first name.')
    .max(50, 'First name must be 50 characters or fewer.'),
  lastName: z
    .string()
    .min(1, 'Please enter your last name.')
    .max(50, 'Last name must be 50 characters or fewer.'),
  text: z
    .string()
    .min(10, 'Your review must be at least 10 characters long.')
    .max(300, 'Your review cannot be longer than 300 characters.'),
});

export async function submitReviewAction(prevState, formData) {
  const formObject = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    text: formData.get('text'),
  };

  const parsed = ReviewSchema.safeParse(formObject);

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

    await prisma.review.create({
      data: {
        ...validatedData,
      },
    });

    revalidatePath('/');
    return {
      success: true,
      message: 'Review submitted successfully',
    };
  } catch (error) {
    console.error('Error submitting review:', error);
    return {
      success: false,
      message: 'Failed to submit review. Please try again.',
      formObject,
    };
  }
}

export async function approveReviewAction(id) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to approve a review',
    };
  }

  try {
    const review = await prisma.review.findUnique({ where: { id } });

    if (!review) {
      return {
        success: false,
        message: 'Review not found',
      };
    }

    await prisma.review.update({
      where: { id },
      data: {
        isApproved: true,
      },
    });

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'Review updated successfully',
    };
  } catch (error) {
    console.error('Error updating review:', error);
    return {
      success: false,
      message: 'Failed to update review. Please try again.',
    };
  }
}

export async function removeReviewAction(id) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to remove a review',
    };
  }

  try {
    const review = await prisma.review.findUnique({ where: { id } });

    if (!review) {
      return {
        success: false,
        message: 'Review not found',
      };
    }

    await prisma.review.delete({ where: { id } });

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'Review removed successfully',
    };
  } catch (error) {
    console.error('Error removing review:', error);
    return {
      success: false,
      message: 'Failed to remove review. Please try again.',
    };
  }
}
