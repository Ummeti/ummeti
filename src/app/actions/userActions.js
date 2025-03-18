'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/client';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '@/lib/s3Client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Invalid email address'),
});

export async function addUserAction(prevState, formData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to add a user',
    };
  }

  const formObject = {
    name: formData.get('name'),
    email: formData.get('email'),
  };

  const parsed = UserSchema.safeParse(formObject);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      formObject,
    };
  }

  try {
    const validatedData = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'A user with this email already exists',
        formObject,
      };
    }

    await createUser(validatedData);

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'User added successfully',
    };
  } catch (error) {
    console.error('Error adding user:', error);
    return {
      success: false,
      message: 'Failed to add user. Please try again.',
      formObject,
    };
  }
}

async function createUser({ name, email }) {
  return prisma.user.create({
    data: { name, email },
  });
}

const UserUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Invalid email address'),
  profilePicture: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file || file.size === 0) return true;
        const maxSize = 5 * 1024 * 1024;
        const allowedTypes = [
          'image/png',
          'image/jpg',
          'image/jpeg',
          'image/webp',
        ];
        return file.size <= maxSize && allowedTypes.includes(file.type);
      },
      {
        message:
          'Profile picture must be PNG, JPG, JPEG, or WEBP and less than 5MB',
      }
    ),
});

export async function updateUserAction(prevState, formData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to update your profile',
    };
  }

  const userId = session.user.id;

  const formObject = {
    name: formData.get('name'),
    email: formData.get('email'),
    profilePicture: formData.get('profilePicture'),
  };

  const parsed = UserUpdateSchema.safeParse(formObject);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      formObject,
      message: 'Validation failed',
    };
  }

  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { profilePicture: true },
    });

    const validatedData = parsed.data;
    const updateData = await prepareUpdateData(
      validatedData,
      currentUser?.profilePicture
    );

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'Profile updated successfully!',
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      success: false,
      message: 'Failed to update profile. Please try again.',
      formObject,
    };
  }
}

async function prepareUpdateData(data, existingProfilePicture) {
  const updateData = {
    name: data.name,
    email: data.email,
  };

  if (data.profilePicture && data.profilePicture.size > 0) {
    if (existingProfilePicture) {
      await deleteProfilePicture(existingProfilePicture);
    }

    const profilePictureKey = await uploadProfilePicture(data.profilePicture);
    updateData.profilePicture = profilePictureKey;
  }

  return updateData;
}

async function uploadProfilePicture(file) {
  const fileName = `${Date.now()}-${file.name}`;
  const key = `users/${fileName}`;
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
}

async function deleteProfilePicture(key) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });

  await s3Client.send(command);
}

const RemoveUserSchema = UserSchema.omit({ name: true });

export async function removeUserAction(email) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to remove a user',
    };
  }

  if (session.user.role !== 'admin') {
    return {
      success: false,
      message: 'Unauthorized: Only super admin can remove users',
    };
  }

  if (session.user.email === email) {
    return {
      success: false,
      message: 'Unauthorized: Super admin cannot delete himself',
    };
  }

  const parsed = RemoveUserSchema.safeParse({ email });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    await prisma.user.delete({ where: { email } });

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'User removed successfully',
    };
  } catch (error) {
    console.error('Error removing user:', error);
    return {
      success: false,
      message: 'Failed to remove user. Please try again.',
    };
  }
}
