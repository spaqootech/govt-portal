import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ServicesGrid } from "@/components/services/services-grid"

export default function ServicesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Government Services</h1>
          <p className="text-muted-foreground">Access all available government services and applications</p>
        </div>
        <ServicesGrid />
      </div>
    </DashboardLayout>
  )
}
