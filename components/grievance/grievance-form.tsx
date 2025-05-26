"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Upload, AlertTriangle } from "lucide-react"

export function GrievanceForm() {
  const [formData, setFormData] = useState({
    complainantInfo: {
      name: "",
      cnic: "",
      email: "",
      phone: "",
      address: "",
    },
    complaintDetails: {
      category: "",
      department: "",
      subject: "",
      description: "",
      incidentDate: "",
      location: "",
      priority: "",
    },
    documents: [],
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Grievance submitted successfully",
        description: "Your complaint has been registered and will be investigated.",
      })

      // Reset form
      setFormData({
        complainantInfo: {
          name: "",
          cnic: "",
          email: "",
          phone: "",
          address: "",
        },
        complaintDetails: {
          category: "",
          department: "",
          subject: "",
          description: "",
          incidentDate: "",
          location: "",
          priority: "",
        },
        documents: [],
        consent: false,
      })
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Grievance Redressal</h1>
        <p className="text-muted-foreground">Lodge your complaint against government services or officials</p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Important Notice</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              Please ensure all information provided is accurate and truthful. False complaints may result in legal
              action.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Complainant Information */}
        <Card>
          <CardHeader>
            <CardTitle>Complainant Information</CardTitle>
            <CardDescription>Provide your personal details for complaint registration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.complainantInfo.name}
                  onChange={(e) => handleInputChange("complainantInfo", "name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC Number</Label>
                <Input
                  id="cnic"
                  placeholder="XXXXX-XXXXXXX-X"
                  value={formData.complainantInfo.cnic}
                  onChange={(e) => handleInputChange("complainantInfo", "cnic", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.complainantInfo.email}
                  onChange={(e) => handleInputChange("complainantInfo", "email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.complainantInfo.phone}
                  onChange={(e) => handleInputChange("complainantInfo", "phone", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.complainantInfo.address}
                onChange={(e) => handleInputChange("complainantInfo", "address", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Complaint Details */}
        <Card>
          <CardHeader>
            <CardTitle>Complaint Details</CardTitle>
            <CardDescription>Provide detailed information about your complaint</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Complaint Category</Label>
                <Select onValueChange={(value) => handleInputChange("complaintDetails", "category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corruption">Corruption</SelectItem>
                    <SelectItem value="misconduct">Official Misconduct</SelectItem>
                    <SelectItem value="delay">Unnecessary Delay</SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="bribery">Bribery</SelectItem>
                    <SelectItem value="negligence">Negligence</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department/Office</Label>
                <Select onValueChange={(value) => handleInputChange("complaintDetails", "department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue Department</SelectItem>
                    <SelectItem value="police">Police Department</SelectItem>
                    <SelectItem value="health">Health Department</SelectItem>
                    <SelectItem value="education">Education Department</SelectItem>
                    <SelectItem value="municipal">Municipal Corporation</SelectItem>
                    <SelectItem value="transport">Transport Department</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Brief description of the complaint"
                value={formData.complaintDetails.subject}
                onChange={(e) => handleInputChange("complaintDetails", "subject", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the incident, including names, dates, and circumstances"
                value={formData.complaintDetails.description}
                onChange={(e) => handleInputChange("complaintDetails", "description", e.target.value)}
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="incidentDate">Date of Incident</Label>
                <Input
                  id="incidentDate"
                  type="date"
                  value={formData.complaintDetails.incidentDate}
                  onChange={(e) => handleInputChange("complaintDetails", "incidentDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Where did the incident occur?"
                  value={formData.complaintDetails.location}
                  onChange={(e) => handleInputChange("complaintDetails", "location", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select onValueChange={(value) => handleInputChange("complaintDetails", "priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Supporting Documents</CardTitle>
            <CardDescription>Upload any evidence or supporting documents (optional but recommended)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium mb-2">Upload Supporting Documents</h4>
              <p className="text-sm text-muted-foreground mb-4">Photos, videos, documents, or any other evidence</p>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              <h4 className="font-medium">Accepted file types:</h4>
              <div className="flex flex-wrap gap-2">
                {["PDF", "JPG", "PNG", "DOC", "DOCX", "MP4", "AVI"].map((type) => (
                  <span key={type} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consent and Submit */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => handleInputChange("", "consent", checked as boolean)}
                  required
                />
                <Label htmlFor="consent" className="text-sm leading-relaxed">
                  I hereby declare that the information provided is true and accurate to the best of my knowledge. I
                  understand that providing false information may result in legal consequences. I consent to the
                  investigation of this complaint and authorize the relevant authorities to contact me for further
                  information.
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting || !formData.consent} size="lg">
                {isSubmitting ? "Submitting Complaint..." : "Submit Grievance"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
