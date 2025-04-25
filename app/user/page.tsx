import { HeroSection } from "@/components/Home/HeroSection";
import { HouseList } from "@/components/Home/HouseList";
import AdminContact from "@/components/Home/AdminContact";
import Footer from "@/components/reusable/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <HouseList />
        <AdminContact />
        <Footer />
      </main>
    </div>
  );
}
