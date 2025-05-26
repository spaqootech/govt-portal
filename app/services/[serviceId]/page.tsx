import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ServiceForm } from "@/components/services/service-form"

interface ServicePageProps {
  params: {
    serviceId: string
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  return (
    <DashboardLayout>
      <ServiceForm serviceId={params.serviceId} />
    </DashboardLayout>
  )
}
