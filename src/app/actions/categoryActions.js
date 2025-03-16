'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/client';
import { CategorySchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CategorySchemaWithId = z.object({
  id: z.string().min(1, 'Category ID is required'),
  title: CategorySchema,
});

export async function updateCategoryAction(prevState, formData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to update a category',
    };
  }

  const formObject = {
    id: String(formData.get('id') || ''),
    title: String(formData.get('title') || ''),
  };

  const parsed = CategorySchemaWithId.safeParse(formObject);

  if (!parsed.success) {
    return {
      success: false,
      message: '',
      errors: parsed.error.flatten().fieldErrors,
      formObject,
    };
  }

  try {
    const { id, title } = parsed.data;

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return {
        success: false,
        message: 'Category not found',
        errors: {},
        formObject,
      };
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { title },
    });

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'Category updated successfully',
      category: updatedCategory,
      formObject,
    };
  } catch (error) {
    console.error('Error updating category:', error);
    return {
      success: false,
      message: 'Failed to update category. Please try again.',
      errors: {},
      formObject,
    };
  }
}

export async function removeCategoryAction(id) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to create a post',
    };
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return {
        success: false,
        message: 'Category not found',
      };
    }

    await prisma.$transaction([
      prisma.project.deleteMany({
        where: {
          categoryId: id,
        },
      }),
      prisma.category.delete({
        where: { id },
      }),
    ]);

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'Category and associated projects deleted successfully',
    };
  } catch (error) {
    console.error('Error removing category and projects:', error);
    return {
      success: false,
      message: 'Failed to delete category and projects. Please try again.',
    };
  }
}
