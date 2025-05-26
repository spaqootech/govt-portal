import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shield, Users, Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Digital Government Services</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Access all government services online with transparency, efficiency, and ease. Your digital gateway to
            public services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/auth/register">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/services">Browse Services</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Secure & Trusted</h3>
              <p className="text-blue-100">Bank-level security for all your government transactions</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">24/7 Available</h3>
              <p className="text-blue-100">Access services anytime, anywhere from any device</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Citizen-Centric</h3>
              <p className="text-blue-100">Designed with citizens' needs and convenience in mind</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
