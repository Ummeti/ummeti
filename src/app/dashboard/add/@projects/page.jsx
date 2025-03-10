import prisma from '@/lib/client';
import { unstable_noStore as noStore } from 'next/cache';
import AddProjectForm from './AddProjectForm';

export default async function Projects() {
  noStore();
  const categories = await prisma.category.findMany();
  return <AddProjectForm categories={categories} />;
}
