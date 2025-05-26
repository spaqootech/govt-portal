"use client"

import { useAuth } from "@/contexts/auth-context"
import { CitizenDashboard } from "@/components/dashboard/citizen-dashboard"
import { OfficerDashboard } from "@/components/dashboard/officer-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function DashboardPage() {
  const { user } = useAuth()

  const renderDashboard = () => {
    switch (user?.role) {
      case "citizen":
        return <CitizenDashboard />
      case "officer":
        return <OfficerDashboard />
      case "admin":
        return <AdminDashboard />
      default:
        return <CitizenDashboard />
    }
  }

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>
}
