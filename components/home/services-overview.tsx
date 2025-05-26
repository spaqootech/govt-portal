import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CreditCard, MapPin, MessageSquare, Users, Building } from "lucide-react"
import Link from "next/link"

export function ServicesOverview() {
  const services = [
    {
      title: "Tax Services",
      description: "File taxes, view statements, and manage tax-related documents",
      icon: CreditCard,
      href: "/services/tax",
    },
    {
      title: "Land Records",
      description: "Access land ownership documents and property records",
      icon: MapPin,
      href: "/services/land",
    },
    {
      title: "Certificates",
      description: "Apply for birth, death, marriage, and other certificates",
      icon: FileText,
      href: "/services/certificates",
    },
    {
      title: "Complaints",
      description: "Lodge complaints and track their resolution status",
      icon: MessageSquare,
      href: "/services/complaints",
    },
    {
      title: "Business Registration",
      description: "Register new businesses and manage existing registrations",
      icon: Building,
      href: "/services/business",
    },
    {
      title: "Social Services",
      description: "Access welfare programs and social security services",
      icon: Users,
      href: "/services/social",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital services to meet all your government-related needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <service.icon className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={service.href}>Access Service</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
