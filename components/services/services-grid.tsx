"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import Link from "next/link"
import {
  FileText,
  CreditCard,
  MapPin,
  MessageSquare,
  Users,
  Building,
  Car,
  GraduationCap,
  Heart,
  Home,
  Search,
} from "lucide-react"

export function ServicesGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const services = [
    {
      id: "certificates",
      title: "Certificates",
      description: "Birth, death, marriage, and domicile certificates",
      icon: FileText,
      category: "documents",
      popular: true,
      estimatedTime: "3-5 days",
    },
    {
      id: "tax",
      title: "Tax Services",
      description: "File taxes, view statements, and manage payments",
      icon: CreditCard,
      category: "finance",
      popular: true,
      estimatedTime: "1-2 days",
    },
    {
      id: "land",
      title: "Land Records",
      description: "Property records, ownership documents, and transfers",
      icon: MapPin,
      category: "property",
      popular: false,
      estimatedTime: "5-7 days",
    },
    {
      id: "complaints",
      title: "Public Complaints",
      description: "Lodge complaints and track resolution status",
      icon: MessageSquare,
      category: "grievance",
      popular: false,
      estimatedTime: "7-14 days",
    },
    {
      id: "business",
      title: "Business Registration",
      description: "Register businesses and manage licenses",
      icon: Building,
      category: "business",
      popular: true,
      estimatedTime: "10-15 days",
    },
    {
      id: "social",
      title: "Social Services",
      description: "Welfare programs and social security benefits",
      icon: Users,
      category: "welfare",
      popular: false,
      estimatedTime: "15-30 days",
    },
    {
      id: "vehicle",
      title: "Vehicle Registration",
      description: "Register vehicles and renew licenses",
      icon: Car,
      category: "transport",
      popular: true,
      estimatedTime: "2-3 days",
    },
    {
      id: "education",
      title: "Education Services",
      description: "School admissions and educational certificates",
      icon: GraduationCap,
      category: "education",
      popular: false,
      estimatedTime: "5-10 days",
    },
    {
      id: "health",
      title: "Health Services",
      description: "Medical certificates and health records",
      icon: Heart,
      category: "health",
      popular: false,
      estimatedTime: "3-7 days",
    },
    {
      id: "housing",
      title: "Housing Services",
      description: "Housing schemes and property approvals",
      icon: Home,
      category: "property",
      popular: false,
      estimatedTime: "30-45 days",
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "documents", label: "Documents" },
    { value: "finance", label: "Finance" },
    { value: "property", label: "Property" },
    { value: "business", label: "Business" },
    { value: "transport", label: "Transport" },
    { value: "education", label: "Education" },
    { value: "health", label: "Health" },
    { value: "welfare", label: "Welfare" },
    { value: "grievance", label: "Grievance" },
  ]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <service.icon className="h-10 w-10 text-blue-600 mb-2" />
                {service.popular && <Badge variant="secondary">Popular</Badge>}
              </div>
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Processing Time:</span>
                <span className="font-medium">{service.estimatedTime}</span>
              </div>
              <Button className="w-full" asChild>
                <Link href={`/services/${service.id}`}>Apply Now</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No services found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or category filter</p>
        </div>
      )}
    </div>
  )
}
