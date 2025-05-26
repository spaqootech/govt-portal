"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, CheckCircle } from "lucide-react"

interface ServiceFormProps {
  serviceId: string
}

export function ServiceForm({ serviceId }: ServiceFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      cnic: "",
      email: "",
      phone: "",
      address: "",
    },
    serviceDetails: {
      certificateType: "",
      purpose: "",
      urgentProcessing: false,
      additionalInfo: "",
    },
    documents: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const serviceConfig = {
    certificates: {
      title: "Certificate Application",
      description: "Apply for birth, death, marriage, or domicile certificates",
      requiredDocuments: ["CNIC Copy", "Passport Size Photo", "Supporting Documents"],
    },
    tax: {
      title: "Tax Filing",
      description: "Submit your annual tax return",
      requiredDocuments: ["Income Statements", "Bank Statements", "Previous Tax Returns"],
    },
    land: {
      title: "Land Record Request",
      description: "Request land ownership and property documents",
      requiredDocuments: ["Property Documents", "CNIC Copy", "Authorization Letter"],
    },
  }

  const config = serviceConfig[serviceId as keyof typeof serviceConfig] || serviceConfig.certificates

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Application submitted successfully",
        description: "Your application has been received and is being processed.",
      })

      setCurrentStep(totalSteps)
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => handleInputChange("personalInfo", "fullName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC Number</Label>
                <Input
                  id="cnic"
                  placeholder="XXXXX-XXXXXXX-X"
                  value={formData.personalInfo.cnic}
                  onChange={(e) => handleInputChange("personalInfo", "cnic", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.personalInfo.address}
                onChange={(e) => handleInputChange("personalInfo", "address", e.target.value)}
                required
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Service Details</h3>
            {serviceId === "certificates" && (
              <div className="space-y-2">
                <Label htmlFor="certificateType">Certificate Type</Label>
                <Select onValueChange={(value) => handleInputChange("serviceDetails", "certificateType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select certificate type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="birth">Birth Certificate</SelectItem>
                    <SelectItem value="death">Death Certificate</SelectItem>
                    <SelectItem value="marriage">Marriage Certificate</SelectItem>
                    <SelectItem value="domicile">Domicile Certificate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea
                id="purpose"
                placeholder="Describe the purpose for this application"
                value={formData.serviceDetails.purpose}
                onChange={(e) => handleInputChange("serviceDetails", "purpose", e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgent"
                checked={formData.serviceDetails.urgentProcessing}
                onCheckedChange={(checked) =>
                  handleInputChange("serviceDetails", "urgentProcessing", checked as boolean)
                }
              />
              <Label htmlFor="urgent">Urgent Processing (Additional charges apply)</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any additional information or special requirements"
                value={formData.serviceDetails.additionalInfo}
                onChange={(e) => handleInputChange("serviceDetails", "additionalInfo", e.target.value)}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Document Upload</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2">Upload Required Documents</h4>
                <p className="text-sm text-muted-foreground mb-4">Drag and drop files here or click to browse</p>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Files
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Required Documents:</h4>
                <ul className="space-y-1">
                  {config.requiredDocuments.map((doc, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Application Submitted!</h3>
              <p className="text-muted-foreground mb-4">
                Your application has been successfully submitted and is being processed.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                <p className="text-sm">
                  <strong>Application ID:</strong> APP{Date.now().toString().slice(-6)}
                </p>
                <p className="text-sm">
                  <strong>Estimated Processing Time:</strong> 3-5 business days
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                You will receive email updates about your application status. You can also track your application in
                your dashboard.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/dashboard">Go to Dashboard</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/services">Apply for Another Service</a>
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (currentStep === 4) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">{renderStep()}</CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{config.title}</CardTitle>
          <CardDescription>{config.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </Button>

            {currentStep === totalSteps - 1 ? (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
