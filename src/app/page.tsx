import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import ProjectsShowcase from '@/components/home/ProjectsShowcase';
import WhyUsSection from '@/components/home/WhyUsSection';
import ClientsSection from '@/components/home/ClientsSection';
import ContactCTA from '@/components/home/ContactCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesOverview />
      <ProjectsShowcase />
      <WhyUsSection />
      <ClientsSection />
      <ContactCTA />
    </>
  );
}
