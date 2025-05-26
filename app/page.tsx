import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesOverview } from "@/components/home/services-overview"
import { NewsAnnouncements } from "@/components/home/news-announcements"
import { QuickLinks } from "@/components/home/quick-links"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesOverview />
        <QuickLinks />
        <NewsAnnouncements />
      </main>
      <Footer />
    </div>
  )
}
