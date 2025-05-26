"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Search, FileText, Clock, CheckCircle, AlertCircle, Eye, MessageSquare } from "lucide-react"

export function OfficerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const applications = [
    {
      id: "APP001",
      applicantName: "John Doe",
      service: "Birth Certificate",
      status: "pending",
      submittedDate: "2024-01-15",
      priority: "normal",
      assignedTo: "Officer Smith",
    },
    {
      id: "APP002",
      applicantName: "Jane Smith",
      service: "Tax Filing",
      status: "in-review",
      submittedDate: "2024-01-20",
      priority: "high",
      assignedTo: "Officer Johnson",
    },
    {
      id: "APP003",
      applicantName: "Mike Wilson",
      service: "Land Record",
      status: "completed",
      submittedDate: "2024-01-18",
      priority: "normal",
      assignedTo: "Officer Brown",
    },
    {
      id: "APP004",
      applicantName: "Sarah Davis",
      service: "Business License",
      status: "pending",
      submittedDate: "2024-01-22",
      priority: "urgent",
      assignedTo: "Officer Smith",
    },
  ]

  const quickStats = [
    { label: "Total Applications", value: "156", icon: FileText, color: "text-blue-600" },
    { label: "Pending Review", value: "23", icon: Clock, color: "text-yellow-600" },
    { label: "Completed Today", value: "8", icon: CheckCircle, color: "text-green-600" },
    { label: "Overdue", value: "3", icon: AlertCircle, color: "text-red-600" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-review":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive"
      case "high":
        return "secondary"
      default:
        return "outline"
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Officer Dashboard</h1>
          <p className="text-muted-foreground">Manage and review citizen applications</p>
        </div>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Send Notification
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Management</CardTitle>
              <CardDescription>Review and process citizen applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Applications List */}
              <div className="space-y-4">
                {filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium">{app.applicantName}</h3>
                        <Badge variant="outline">{app.id}</Badge>
                        <Badge variant={getPriorityColor(app.priority)}>{app.priority}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Service: {app.service}</span>
                        <span>Submitted: {new Date(app.submittedDate).toLocaleDateString()}</span>
                        <span>Assigned to: {app.assignedTo}</span>
                      </div>
                      <div className="mt-2">
                        <Badge className={getStatusColor(app.status)}>{app.status.replace("-", " ")}</Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Review
                      </Button>
                      <Button size="sm">Update Status</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Report</CardTitle>
                <CardDescription>Applications processed today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-sm text-muted-foreground">+12% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Summary</CardTitle>
                <CardDescription>This week's performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-sm text-muted-foreground">Applications processed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Processing Time</CardTitle>
                <CardDescription>Current efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3 days</div>
                <p className="text-sm text-muted-foreground">-0.5 days from last week</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Assigned Tasks</CardTitle>
              <CardDescription>Applications assigned to you for review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications
                  .filter((app) => app.assignedTo === "Officer Smith")
                  .map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">
                          {app.applicantName} - {app.service}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Submitted: {new Date(app.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getPriorityColor(app.priority)}>{app.priority}</Badge>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
