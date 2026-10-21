import Navbar from "./components/common/Navbar";
import LanyardBadge from "./components/common/LanyardBadge";
import StatusBanner from "./components/home/StatusBanner";
import ProfileHeader from "./components/home/ProfileHeader";
import TextureDivider from "./components/home/TextureDivider";
import InteractiveLogbook from "./components/about/InteractiveLogbook";
import StackGrid from "./components/skills/StackGrid";
import ProjectsSection from "./components/projects/ProjectsSection";
import EducationSection from "./components/experience/EducationSection";
import ContactSection from "./components/contact/ContactSection";
import Footer from "./components/common/Footer";

export default function Home() {
  return (
    <>
      {/* 3D Physics Lanyard Hanging Badge */}
      <LanyardBadge />

      {/* Sticky Bordered Navigation */}
      <Navbar />

      {/* Main Grid-Bordered Portfolio Body */}
      <main className="min-h-screen bg1">
        {/* Section 1: Dot Matrix Status Banner */}
        <StatusBanner />

        {/* Section 2: Profile Header, Facts Matrix, and Social Links */}
        <ProfileHeader />

        <TextureDivider />

        {/* Section 3: Developer Studio & Interactive Logbook (Replaced About Section) */}
        <InteractiveLogbook />

        <TextureDivider />

        {/* Section 4: Tech Arsenal / Stack (Single line horizontal moving marquee) */}
        <StackGrid />

        <TextureDivider />

        {/* Section 5: Featured Projects */}
        <ProjectsSection />

        <TextureDivider />

        {/* Section 6: Education & Background */}
        <EducationSection />

        <TextureDivider />

        {/* Section 7: Contact Form & Connect */}
        <ContactSection />

        <TextureDivider />

        {/* Section 8: Footer & Quote Rotator */}
        <Footer />
      </main>
    </>
  );
}