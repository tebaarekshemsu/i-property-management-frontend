import { HeroSection } from "@/components/Home/HeroSection"
import { HouseList } from "@/components/Home/HouseList"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <HouseList />
      </main>
    </div>
  )
}

