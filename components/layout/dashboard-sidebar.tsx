"use client"

import { useAuth } from "@/contexts/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Home,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  Users,
  BarChart3,
  Shield,
  Search,
  Bell,
} from "lucide-react"
import Link from "next/link"

export function DashboardSidebar() {
  const { user } = useAuth()

  const citizenMenuItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Services", url: "/services", icon: FileText },
    { title: "Applications", url: "/applications", icon: FileText },
    { title: "Notifications", url: "/notifications", icon: Bell },
    { title: "Support", url: "/support", icon: HelpCircle },
    { title: "Grievance", url: "/grievance", icon: MessageSquare },
  ]

  const officerMenuItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Applications", url: "/officer/applications", icon: FileText },
    { title: "Search", url: "/officer/search", icon: Search },
    { title: "Reports", url: "/officer/reports", icon: BarChart3 },
    { title: "Settings", url: "/settings", icon: Settings },
  ]

  const adminMenuItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "User Management", url: "/admin/users", icon: Users },
    { title: "Service Management", url: "/admin/services", icon: Settings },
    { title: "Reports & Analytics", url: "/admin/reports", icon: BarChart3 },
    { title: "System Logs", url: "/admin/logs", icon: FileText },
    { title: "Security", url: "/admin/security", icon: Shield },
  ]

  const getMenuItems = () => {
    switch (user?.role) {
      case "officer":
        return officerMenuItems
      case "admin":
        return adminMenuItems
      default:
        return citizenMenuItems
    }
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="font-bold text-lg">Gov Portal</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <p className="text-xs text-muted-foreground">Government Services Portal v1.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
