import prisma from '@/lib/client';
import UpdateStatsForm from './UpdateStatsForm';

export default async function StatsPage() {
  const stats = await prisma.stats.findFirst();
  return <UpdateStatsForm stats={stats} />;
}
