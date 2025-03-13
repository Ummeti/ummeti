import prisma from '@/lib/client';
import s3Client from '@/lib/s3Client';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';

export const generateSignedUrls = async (keys) => {
  const urlPromises = keys.map((key) =>
    getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
      }),
      { expiresIn: 3600 }
    )
  );
  return Promise.all(urlPromises);
};

export const enhanceWithImages = async (items) =>
  Promise.all(
    items.map(async (item) => ({
      ...item,
      ...(item.images?.length > 0 && {
        images: await generateSignedUrls(item.images),
      }),
    }))
  );

export const fetchProjects = async () => {
  const projects = await prisma.project.findMany({
    include: { user: true, category: true },
    orderBy: { createdAt: 'desc' },
  });
  return enhanceWithImages(projects);
};

export const fetchPosts = async () => {
  const posts = await prisma.post.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
  return enhanceWithImages(posts);
};

export const fetchCategories = async () => {
  const categories = await prisma.category.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
  return categories;
};

export const fetchProjectBySlug = async (slug) => {
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!project) return null;

  const enhancedProjects = await enhanceWithImages([project]);
  return enhancedProjects[0];
};

export const fetchPostBySlug = async (slug) => {
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) return null;

  const enhancedPosts = await enhanceWithImages([post]);
  return enhancedPosts[0];
};

export const enhanceUserWithProfilePicture = async (users) => {
  return Promise.all(
    users.map(async (user) => ({
      ...user,
      ...(user.profilePicture && {
        profilePicture: (await generateSignedUrls([user.profilePicture]))[0],
      }),
    }))
  );
};

export const fetchUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return null;
  }

  const enhancedUser = await enhanceUserWithProfilePicture([user]);
  return enhancedUser[0];
};

export const fetchUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return enhanceUserWithProfilePicture(users);
};

export const fetchContact = async () => {
  const contact = await prisma.contact.findFirst();
  return contact;
};

export const fetchReviews = async () => {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return reviews;
};

export const fetchApprovedReviews = async () => {
  const approvedReviews = await prisma.review.findMany({
    where: {
      isApproved: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return approvedReviews;
};

export const fetchDashboardData = async () => {
  const [projects, posts, categories, reviews, users] = await Promise.all([
    fetchProjects(),
    fetchPosts(),
    fetchUsers(),
    fetchReviews(),
    fetchCategories(),
  ]);

  return { projects, posts, categories, reviews, users };
};
