import prisma from '@/lib/client';
import UpdateStatsForm from './UpdateStatsForm';
import { fetchProjects } from '@/lib/fetchData';

export default async function StatsPage() {
  const stats = await prisma.stats.findFirst();
  const projectsCount = (await fetchProjects()).length;
  return <UpdateStatsForm stats={stats} projectsCount={projectsCount} />;
}
