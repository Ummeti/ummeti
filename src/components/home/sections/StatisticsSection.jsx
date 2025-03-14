import { fetchProjects, fetchStats } from '@/lib/fetchData';
import Statistics from '../ui/Statistics';

export default async function StatisticsSection() {
  const stats = await fetchStats();
  const projectsCount = (await fetchProjects()).length;
  return <Statistics stats={stats} projectsCount={projectsCount} />;
}
