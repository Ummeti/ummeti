import AboutSection from '@/components/home/sections/AboutSection';
import HeroSection from '@/components/home/sections/HeroSection';
import Statistics from '@/components/home/sections/StatisticsSection';
import ProjectsSection from '@/components/home/sections/ProjectsSection';
import VolunteerSection from '@/components/home/sections/VolunteerSection';
import ReviewsSection from '@/components/home/sections/ReviewsSection';
import BlogSection from '@/components/home/sections/BlogSection';
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
      <ReviewsSection />
      <BlogSection />
    </main>
  );
}
