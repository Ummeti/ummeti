'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/client';
import s3Client from '@/lib/s3Client';
import {
  ProjectSchema,
  ProjectIdSchema,
  ToggleItemMainSchema,
} from '@/lib/schemas';
import { slugify } from '@/lib/utils';
import { PutObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addProjectAction(prevState, formData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to create a project',
    };
  }

  const formObject = {
    title: String(formData.get('title') || ''),
    description: String(formData.get('description') || ''),
    isMain: formData.get('isMain') === 'true',
    category: String(formData.get('category') || ''),
    raised: Number.parseFloat(formData.get('raised')) || 0,
    goal: Number.parseFloat(formData.get('goal')) || 0,
    images: formData.getAll('images').filter((file) => file && file.size > 0),
  };

  const parsed = ProjectSchema.safeParse(formObject);

  if (!parsed.success) {
    return {
      success: false,
      message: '',
      errors: parsed.error.flatten().fieldErrors,
      formObject,
    };
  }

  try {
    const { category, ...projectData } = parsed.data;
    await createProject(category, projectData, session.user.id);

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'Project created successfully',
    };
  } catch (error) {
    console.error('Error adding project:', error);
    return {
      success: false,
      message: 'Failed to create project due to a server error.',
      formObject,
    };
  }
}

async function createProject(category, projectData, userId) {
  const imageKeys = await uploadImages(projectData.images);
  const slug = await generateUniqueSlug(projectData.title);

  let categoryRecord = await prisma.category.findFirst({
    where: { title: category },
  });

  if (!categoryRecord) {
    categoryRecord = await prisma.category.create({
      data: {
        title: category,
        userId,
      },
    });
  }

  return prisma.project.create({
    data: {
      ...projectData,
      slug,
      categoryId: categoryRecord.id,
      userId,
      images: imageKeys,
    },
  });
}

async function uploadImages(images) {
  return Promise.all(
    images.map(async (file) => {
      const fileName = `${Date.now()}-${file.name}`;
      const key = `projects/${fileName}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      });

      await s3Client.send(command);
      return key;
    })
  );
}

async function generateUniqueSlug(title) {
  const baseSlug = slugify(title);
  let finalSlug = baseSlug;
  let count = 0;

  while (await prisma.project.findUnique({ where: { slug: finalSlug } })) {
    count++;
    finalSlug = `${baseSlug}-${count}`;
  }

  return finalSlug;
}

export async function updateProjectAction(prevState, formData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to update a project',
    };
  }

  const projectId = formData.get('id');

  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
    include: { category: true },
  });

  if (!existingProject) {
    return {
      success: false,
      message: 'Project not found',
    };
  }

  const formObject = {
    title: String(formData.get('title') || ''),
    description: String(formData.get('description') || ''),
    isMain: formData.get('isMain') === 'true',
    category: String(formData.get('category') || ''),
    raised: Number.parseFloat(formData.get('raised')) || 0,
    goal: Number.parseFloat(formData.get('goal')) || 0,
    images: formData.getAll('images').filter((file) => file && file.size > 0),
  };

  const parsed = ProjectSchema.safeParse(formObject);
  if (!parsed.success) {
    return {
      success: false,
      message: '',
      errors: parsed.error.flatten().fieldErrors,
      formObject,
    };
  }

  try {
    const newImages = formData
      .getAll('images')
      .filter((file) => file && file.size > 0);
    const getImagesToRemove = formData.getAll('imagesToRemove');
    const imagesToRemoveUrls = getImagesToRemove ? getImagesToRemove : [];

    const imagesToRemove = imagesToRemoveUrls.map((url) => {
      try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/');
        return pathParts.slice(pathParts.indexOf('projects')).join('/');
      } catch (error) {
        console.error('Error parsing image URL:', url, error);
        return url;
      }
    });
    const newImageKeys =
      newImages.length > 0 ? await uploadImages(newImages) : [];

    const remainingImages = existingProject.images.filter(
      (img) => !imagesToRemove.some((key) => img.includes(key))
    );

    const updatedImages = [...remainingImages, ...newImageKeys];

    let slug = existingProject.slug;
    if (existingProject.title !== parsed.data.title) {
      slug = await generateUniqueSlug(parsed.data.title);
    }

    const { category, ...projectData } = parsed.data;
    let categoryRecord = await prisma.category.findFirst({
      where: { title: category },
    });

    if (!categoryRecord) {
      categoryRecord = await prisma.category.create({
        data: {
          title: category,
          userId: session.user.id,
        },
      });
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        ...projectData,
        slug,
        categoryId: categoryRecord.id,
        images: updatedImages,
      },
    });

    if (imagesToRemove.length > 0) {
      try {
        await s3Client.send(
          new DeleteObjectsCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Delete: {
              Objects: imagesToRemove.map((key) => ({ Key: key })),
              Quiet: true,
            },
          })
        );
      } catch (error) {
        console.error('Error deleting images from S3:', error);
      }
    }
    return {
      redirect: '/dashbaord',
      success: true,
      message: 'Project updated successfully',
      project: updatedProject,
    };
  } catch (error) {
    console.error('Error updating project:', error);
    return {
      success: false,
      message: 'Failed to update project due to a server error.',
      formObject,
    };
  }
}

export async function ToggleProjectMainAction(prevState, formData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to toggle project status',
    };
  }

  const formObject = {
    id: formData.get('id'),
    isMain: formData.get('isMain') === 'true',
  };

  const parsed = ToggleItemMainSchema.safeParse(formObject);
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

    const project = await prisma.project.findUnique({
      where: { id: validatedData.id },
    });

    if (!project) {
      return {
        success: false,
        message: 'Project not found',
        formObject,
      };
    }

    await prisma.project.update({
      where: { id: validatedData.id },
      data: { isMain: validatedData.isMain },
    });

    revalidatePath('/dashboard');

    return {
      success: true,
      message: validatedData.isMain
        ? 'Project will be displayed on main page!'
        : "Project won't be displayed on main page!",
    };
  } catch (error) {
    console.error('Error toggling project status:', error);
    return {
      success: false,
      message: 'Failed to toggle project status. Please try again.',
      formObject,
    };
  }
}

export async function removeProjectAction(id) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to delete a project',
    };
  }

  const parsed = ProjectIdSchema.safeParse(id);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      select: { images: true },
    });

    if (!project) throw new Error('Project not found');

    if (project.images?.length) {
      await s3Client.send(
        new DeleteObjectsCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Delete: {
            Objects: project.images.map((key) => ({ Key: key })),
            Quiet: true,
          },
        })
      );
    }

    await prisma.project.delete({ where: { id } });
    revalidatePath('/dashboard');
    return { success: true, message: 'Project deleted successfully' };
  } catch (error) {
    console.error('Error removing project:', error);
    return {
      success: false,
      message: error.message || 'Failed to delete project.',
    };
  }
}
