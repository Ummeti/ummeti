'use server';
import { z } from 'zod';
import prisma from '@/lib/client';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const StatsUpdateSchema = z.object({
  projects: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1, 'Minimum 1').max(1000000, 'Maximum 1,000,000')),
  supporters: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1, 'Minimum 1').max(1000000, 'Maximum 1,000,000')),
  served: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1, 'Minimum 1').max(1000000, 'Maximum 1,000,000')),
});

export async function updateStatsAction(prevState, formData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to update stats',
    };
  }

  const formObject = {
    projects: formData.get('projects'),
    supporters: formData.get('supporters'),
    served: formData.get('served'),
  };

  const parsed = StatsUpdateSchema.safeParse(formObject);
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

    const existingStats = await prisma.stats.findFirst();

    if (existingStats) {
      await prisma.stats.update({
        where: { id: existingStats.id },
        data: {
          projects: validatedData.projects,
          supporters: validatedData.supporters,
          served: validatedData.served,
        },
      });
    } else {
      await prisma.stats.create({
        data: {
          projects: validatedData.projects,
          supporters: validatedData.supporters,
          served: validatedData.served,
        },
      });
    }

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'Stats updated successfully!',
    };
  } catch (error) {
    console.error('Error updating stats:', error);
    return {
      success: false,
      message: 'Failed to update stats. Please try again.',
      formObject,
    };
  }
}
