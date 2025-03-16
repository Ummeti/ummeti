import { z } from 'zod';

export const CategorySchema = z
  .string()
  .min(2, 'Category must be at least 2 characters')
  .max(50, 'Category title must not exceed 50 characters');

export const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(1, 'Description is required'),
  isMain: z.boolean(),
  category: CategorySchema,
  raised: z.number().min(0, 'Raised amount must be 0 or greater'),
  goal: z.number().min(1, 'Goal must be greater than 0'),
  images: z
    .array(
      z
        .custom((val) => val instanceof File, 'Must be a valid File object')
        .refine(
          (file) => file.size <= 5 * 1024 * 1024,
          'Image must be less than 5MB'
        )
        .refine(
          (file) =>
            ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'].includes(
              file.type
            ),
          'Only JPEG, PNG, and WebP images are allowed'
        )
    )
    .optional(),
});

export const ToggleItemMainSchema = z.object({
  id: z.string().min(1, 'Project ID is required'),
  isMain: z.boolean(),
});

export const ProjectIdSchema = z.string().min(1, 'Project ID is required');

export const PostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  description: z.string().min(1, 'Description is required'),
  isMain: z.boolean(),
  images: z
    .array(
      z
        .custom((val) => val instanceof File, 'Must be a valid File object')
        .refine(
          (file) => file.size <= 5 * 1024 * 1024,
          'Image must be less than 5MB'
        )
        .refine(
          (file) =>
            ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'].includes(
              file.type
            ),
          'Only JPEG, PNG, and WebP images are allowed'
        )
    )
    .optional(),
});

export const PostIdSchema = z.string().min(1, 'Post ID is required');

export const EmailSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  subject: z.string().min(1, 'Subject is required'),
  message: z
    .string()
    .min(10, 'Message must contain at least 10 characters')
    .max(500, 'Message can contain a maximum of 500 characters'),
});
