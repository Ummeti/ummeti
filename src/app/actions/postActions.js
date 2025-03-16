'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/client';
import s3Client from '@/lib/s3Client';
import { PostIdSchema, PostSchema, ToggleItemMainSchema } from '@/lib/schemas';
import { slugify } from '@/lib/utils';
import { PutObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { revalidatePath } from 'next/cache';

export async function addPostAction(prevState, formData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to create a post',
    };
  }

  const formObject = {
    title: formData.get('title'),
    description: formData.get('description'),
    isMain: formData.get('isMain') === 'true',
    images: formData.getAll('images'),
  };

  const parsed = PostSchema.safeParse(formObject);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      formObject,
    };
  }

  try {
    const validatedData = parsed.data;
    await createPost(validatedData, session.user.id);

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'Post created successfully',
    };
  } catch (error) {
    console.error('Error adding post:', error);
    return {
      success: false,
      message: 'Failed to create post. Please try again.',
      formObject,
    };
  }
}

async function createPost(data, userId) {
  const imageKeys = await uploadImages(data.images);
  const slug = await generateUniqueSlug(data.title);

  return prisma.post.create({
    data: {
      title: data.title,
      description: data.description,
      isMain: data.isMain,
      slug,
      userId,
      images: imageKeys,
    },
  });
}

async function uploadImages(images) {
  return Promise.all(
    images.map(async (file) => {
      const fileName = `${Date.now()}-${file.name}`;
      const key = `posts/${fileName}`;
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

  while (await prisma.post.findUnique({ where: { slug: finalSlug } })) {
    count++;
    finalSlug = `${baseSlug}-${count}`;
  }

  return finalSlug;
}

export async function updatePostAction(formData) {
  console.log(formData);
}

export async function TogglePostMainAction(prevState, formData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to toggle post status',
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

    const post = await prisma.post.findUnique({
      where: { id: validatedData.id },
    });

    if (!post) {
      return {
        success: false,
        message: 'Post not found',
        formObject,
      };
    }

    await prisma.post.update({
      where: { id: validatedData.id },
      data: { isMain: validatedData.isMain },
    });

    revalidatePath('/dashboard');

    return {
      success: true,
      message: validatedData.isMain
        ? 'Post will be displayed on main page!'
        : "Post won't be displayed on main page!",
    };
  } catch (error) {
    console.error('Error toggling post status:', error);
    return {
      success: false,
      message: 'Failed to toggle post status. Please try again.',
      formObject,
    };
  }
}

export async function removePostAction(id) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to delete a post',
    };
  }

  const parsed = PostIdSchema.safeParse(id);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return { success: false, errors };
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      select: { images: true },
    });

    if (!post) {
      return {
        success: false,
        message: 'Post not found',
      };
    }

    if (post.images?.length > 0) {
      const deleteCommand = new DeleteObjectsCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Delete: {
          Objects: post.images.map((key) => ({ Key: key })),
          Quiet: true,
        },
      });

      await s3Client.send(deleteCommand);
    }

    await prisma.post.delete({
      where: { id },
    });

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'Post deleted successfully',
    };
  } catch (error) {
    console.error('Error removing post:', error);
    return {
      success: false,
      message: 'Failed to delete post. Please try again.',
    };
  }
}
