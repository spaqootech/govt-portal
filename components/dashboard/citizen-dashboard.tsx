"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"
import Link from "next/link"

export function CitizenDashboard() {
  const recentApplications = [
    {
      id: "APP001",
      service: "Birth Certificate",
      status: "completed",
      date: "2024-01-15",
      progress: 100,
    },
    {
      id: "APP002",
      service: "Tax Filing",
      status: "in-progress",
      date: "2024-01-20",
      progress: 75,
    },
    {
      id: "APP003",
      service: "Land Record",
      status: "pending",
      date: "2024-01-22",
      progress: 25,
    },
  ]

  const quickStats = [
    { label: "Total Applications", value: "12", icon: FileText },
    { label: "Pending", value: "3", icon: Clock },
    { label: "Completed", value: "8", icon: CheckCircle },
    { label: "Rejected", value: "1", icon: AlertCircle },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/services">
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Track the status of your recent service applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium">{app.service}</h3>
                    <Badge variant="outline">{app.id}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Applied: {new Date(app.date).toLocaleDateString()}</span>
                    <Badge className={getStatusColor(app.status)}>{app.status.replace("-", " ")}</Badge>
                  </div>
                  <div className="mt-2">
                    <Progress value={app.progress} className="w-full" />
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">Apply for Certificate</CardTitle>
            <CardDescription>Birth, death, marriage certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/services/certificates">Start Application</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">File Tax Return</CardTitle>
            <CardDescription>Submit your annual tax filing</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/services/tax">File Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">Lodge Complaint</CardTitle>
            <CardDescription>Report issues or grievances</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/grievance">Submit Complaint</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
