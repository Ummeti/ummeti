import AboutSection from '@/components/home/sections/AboutSection';
import BlogSection from '@/components/home/sections/BlogSection';
import HeroSection from '@/components/home/sections/HeroSection';
import ProjectsSection from '@/components/home/sections/ProjectsSection';
import TestimonialsSection from '@/components/home/sections/TestimonialsSection';
import VolunteerSection from '@/components/home/sections/VolunteerSection';
import Statistics from '@/components/home/sections/StatisticsSection';
import Socials from '@/components/widgets/Socials';
import ContactInfo from '@/components/widgets/ContactInfo';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Statistics />
      <AboutSection />
      <ProjectsSection />
      <VolunteerSection>
        <ContactInfo color="text-gray-900" />
        <Socials color="text-gray-900" />
      </VolunteerSection>
      <TestimonialsSection />
      <BlogSection />
    </main>
  );
}
