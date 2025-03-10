import AboutSection from '@/components/home/sections/AboutSection';
import BlogSection from '@/components/home/sections/BlogSection';
import HeroSection from '@/components/home/sections/HeroSection';
import ProjectsSection from '@/components/home/sections/ProjectsSection';
import TestimonialsSection from '@/components/home/sections/TestimonialsSection';
import VolunteerSection from '@/components/home/sections/VolunteerSection';
import Statistics from '@/components/home/sections/StatisticsSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Statistics />
      <AboutSection />
      <ProjectsSection />
      <VolunteerSection />
      <TestimonialsSection />
      <BlogSection />
    </main>
  );
}
