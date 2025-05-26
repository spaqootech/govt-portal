"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  Settings,
  BarChart3,
  Shield,
  AlertTriangle,
  TrendingUp,
  Activity,
  Database,
  Server,
} from "lucide-react"

export function AdminDashboard() {
  const systemStats = [
    { label: "Total Users", value: "12,456", icon: Users, change: "+5.2%", color: "text-blue-600" },
    { label: "Active Applications", value: "1,234", icon: FileText, change: "+12.3%", color: "text-green-600" },
    { label: "System Uptime", value: "99.9%", icon: Server, change: "+0.1%", color: "text-green-600" },
    { label: "Security Alerts", value: "3", icon: AlertTriangle, change: "-2", color: "text-red-600" },
  ]

  const userStats = [
    { role: "Citizens", count: 11234, percentage: 90.2 },
    { role: "Officers", count: 856, percentage: 6.9 },
    { role: "Admins", count: 366, percentage: 2.9 },
  ]

  const serviceStats = [
    { service: "Certificates", applications: 456, status: "active" },
    { service: "Tax Services", applications: 234, status: "active" },
    { service: "Land Records", applications: 123, status: "active" },
    { service: "Business Registration", applications: 89, status: "maintenance" },
    { service: "Vehicle Registration", applications: 67, status: "active" },
  ]

  const recentActivities = [
    { action: "New user registration", user: "john.doe@example.com", time: "2 minutes ago" },
    { action: "Service updated", user: "admin", time: "15 minutes ago" },
    { action: "Security alert resolved", user: "security.team", time: "1 hour ago" },
    { action: "System backup completed", user: "system", time: "2 hours ago" },
    { action: "New officer added", user: "hr.admin", time: "3 hours ago" },
  ]

  const systemHealth = [
    { component: "Database", status: "healthy", uptime: 99.9 },
    { component: "API Gateway", status: "healthy", uptime: 99.8 },
    { component: "Authentication Service", status: "warning", uptime: 98.5 },
    { component: "File Storage", status: "healthy", uptime: 99.7 },
    { component: "Email Service", status: "healthy", uptime: 99.6 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "maintenance":
        return "secondary"
      case "inactive":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management controls</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </Button>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            Security Center
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>{stat.change}</span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activities</CardTitle>
                <CardDescription>Latest actions and events in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">by {activity.user}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of users by role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userStats.map((stat) => (
                  <div key={stat.role} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{stat.role}</span>
                      <span>
                        {stat.count.toLocaleString()} ({stat.percentage}%)
                      </span>
                    </div>
                    <Progress value={stat.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>All registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12,456</div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>+5.2% this month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Currently logged in users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,234</div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span>Real-time count</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New Registrations</CardTitle>
                <CardDescription>This week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">89</div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>+12% from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Management Actions</CardTitle>
              <CardDescription>Quick actions for user administration</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button>Add New User</Button>
              <Button variant="outline">Bulk Import</Button>
              <Button variant="outline">Export Users</Button>
              <Button variant="outline">Role Management</Button>
              <Button variant="outline">Access Logs</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Status Overview</CardTitle>
              <CardDescription>Current status of all government services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceStats.map((service) => (
                  <div key={service.service} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{service.service}</h3>
                      <p className="text-sm text-muted-foreground">{service.applications} active applications</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusBadge(service.status)}>{service.status}</Badge>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Performance</CardTitle>
                <CardDescription>Average processing times</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Certificates</span>
                  <span className="font-medium">2.3 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Services</span>
                  <span className="font-medium">1.8 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Land Records</span>
                  <span className="font-medium">4.2 days</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Actions</CardTitle>
                <CardDescription>Administrative controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">Add New Service</Button>
                <Button variant="outline" className="w-full">
                  Service Configuration
                </Button>
                <Button variant="outline" className="w-full">
                  Maintenance Mode
                </Button>
                <Button variant="outline" className="w-full">
                  Service Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Health Monitor</CardTitle>
              <CardDescription>Real-time status of system components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((component) => (
                  <div key={component.component} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Database className={`h-5 w-5 ${getStatusColor(component.status)}`} />
                      <div>
                        <h3 className="font-medium">{component.component}</h3>
                        <p className="text-sm text-muted-foreground">Uptime: {component.uptime}%</p>
                      </div>
                    </div>
                    <Badge variant={component.status === "healthy" ? "default" : "secondary"}>{component.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Server Resources</CardTitle>
                <CardDescription>Current system resource usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Disk Usage</span>
                    <span>34%</span>
                  </div>
                  <Progress value={34} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Actions</CardTitle>
                <CardDescription>Administrative system controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">System Backup</Button>
                <Button variant="outline" className="w-full">
                  View Logs
                </Button>
                <Button variant="outline" className="w-full">
                  Security Scan
                </Button>
                <Button variant="outline" className="w-full">
                  Performance Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Applications</CardTitle>
                <CardDescription>Total applications this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,456</div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>+18% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Processing Time</CardTitle>
                <CardDescription>Across all services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2.8 days</div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>-0.3 days improvement</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Satisfaction</CardTitle>
                <CardDescription>Based on feedback surveys</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4.2/5</div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>+0.2 from last quarter</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Analytics Actions</CardTitle>
              <CardDescription>Generate detailed reports and insights</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button>
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button variant="outline">Export Data</Button>
              <Button variant="outline">Custom Analytics</Button>
              <Button variant="outline">Performance Metrics</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
