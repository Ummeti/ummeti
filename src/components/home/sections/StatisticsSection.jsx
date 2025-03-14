import { fetchStats } from '@/lib/fetchData';
import Statistics from '../ui/Statistics';

export default async function StatisticsSection() {
  const stats = await fetchStats();
  return <Statistics stats={stats} />;
}
