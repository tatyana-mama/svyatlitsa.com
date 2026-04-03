import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import HorizontalSections from '@/components/HorizontalSections';
import SidePanel from '@/components/SidePanel';

export default function Home() {
  return (
    <main className="bg-[#faf9f6] text-[#1d1d1f] antialiased">
      <Nav />
      <HeroSection />
      <HorizontalSections />
      <SidePanel />
    </main>
  );
}
