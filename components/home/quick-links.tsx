import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Download, Search, Phone } from "lucide-react"
import Link from "next/link"

export function QuickLinks() {
  const quickLinks = [
    {
      title: "Track Application",
      description: "Check the status of your submitted applications",
      icon: Search,
      href: "/track",
    },
    {
      title: "Download Forms",
      description: "Access and download government forms",
      icon: Download,
      href: "/forms",
    },
    {
      title: "Emergency Services",
      description: "Quick access to emergency contact numbers",
      icon: Phone,
      href: "/emergency",
    },
    {
      title: "Government Directory",
      description: "Find contact information for government offices",
      icon: ExternalLink,
      href: "/directory",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Access</h2>
          <p className="text-lg text-muted-foreground">Frequently used services and important links</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <Card key={link.title} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <link.icon className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">{link.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={link.href}>Access</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
