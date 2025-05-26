import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"

export function NewsAnnouncements() {
  const announcements = [
    {
      title: "New Online Tax Filing System Launched",
      date: "2024-01-15",
      category: "Tax Services",
      excerpt: "Citizens can now file their annual tax returns online with our new simplified system.",
      urgent: false,
    },
    {
      title: "System Maintenance Scheduled",
      date: "2024-01-20",
      category: "System Update",
      excerpt: "Planned maintenance on January 25th from 2:00 AM to 6:00 AM. Services will be temporarily unavailable.",
      urgent: true,
    },
    {
      title: "Digital Certificate Services Expanded",
      date: "2024-01-10",
      category: "Certificates",
      excerpt: "Birth, death, and marriage certificates are now available for instant download.",
      urgent: false,
    },
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Updates</h2>
            <p className="text-lg text-muted-foreground">
              Stay informed about new services and important announcements
            </p>
          </div>
          <Button variant="outline">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={announcement.urgent ? "destructive" : "secondary"}>{announcement.category}</Badge>
                  {announcement.urgent && <Badge variant="destructive">Urgent</Badge>}
                </div>
                <CardTitle className="text-lg">{announcement.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(announcement.date).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{announcement.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
