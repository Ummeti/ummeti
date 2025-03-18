'use server';
import { z } from 'zod';
import prisma from '@/lib/client';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const StatsUpdateSchema = z.object({
  projects: z.number().max(1000000),
  supporters: z.number().max(1000000),
  served: z.number().max(1000000),
  isAuto: z.boolean(),
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
    projects: Number(formData.get('projects')),
    supporters: Number(formData.get('supporters')),
    served: Number(formData.get('served')),
    isAuto: formData.get('isAuto') === 'true',
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

    const statsData = {
      supporters: validatedData.supporters,
      served: validatedData.served,
      isAuto: validatedData.isAuto || false,
    };

    if (!statsData.isAuto && validatedData.projects) {
      statsData.projects = validatedData.projects;
    } else if (!existingStats && !statsData.isAuto) {
      statsData.projects = 0;
    }

    if (existingStats) {
      await prisma.stats.update({
        where: { id: existingStats.id },
        data: statsData,
      });
    } else {
      await prisma.stats.create({
        data: statsData,
      });
    }

    revalidatePath('/dashboard');
    revalidatePath('/');
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
