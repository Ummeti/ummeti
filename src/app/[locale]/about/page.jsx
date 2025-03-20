import { fetchProjects, fetchStats } from '@/lib/fetchData';
import AboutPage from './AboutPage';

export default async function About() {
  const stats = await fetchStats();
  const projectsCount = (await fetchProjects()).length;

  return <AboutPage stats={stats} projectsCount={projectsCount} />;
}
