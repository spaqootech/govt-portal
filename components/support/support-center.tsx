"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle, Phone, Mail, Clock, Search } from "lucide-react"

export function SupportCenter() {
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const faqs = [
    {
      question: "How do I track my application status?",
      answer:
        'You can track your application status by logging into your dashboard and viewing the "My Applications" section.',
      category: "Applications",
    },
    {
      question: "What documents are required for certificate applications?",
      answer:
        "Required documents vary by certificate type. Generally, you need CNIC copy, passport photos, and supporting documents.",
      category: "Documents",
    },
    {
      question: "How long does it take to process applications?",
      answer:
        "Processing times vary by service type. Most certificates take 3-5 business days, while complex applications may take longer.",
      category: "Processing",
    },
    {
      question: "Can I cancel or modify my application?",
      answer: "You can modify applications before they enter processing. Contact support for assistance with changes.",
      category: "Applications",
    },
  ]

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Support ticket created",
        description: "Your ticket has been submitted. We'll respond within 24 hours.",
      })

      setTicketForm({ subject: "", category: "", priority: "", description: "" })
    } catch (error) {
      toast({
        title: "Failed to create ticket",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support Center</h1>
        <p className="text-muted-foreground">Get help with your government services and applications</p>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="ticket">Submit Ticket</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about our services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                        <Badge variant="secondary">{faq.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ticket" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit Support Ticket</CardTitle>
              <CardDescription>Can't find what you're looking for? Submit a support ticket</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm((prev) => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setTicketForm((prev) => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="application">Application Help</SelectItem>
                        <SelectItem value="payment">Payment Issue</SelectItem>
                        <SelectItem value="documents">Document Problem</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select onValueChange={(value) => setTicketForm((prev) => ({ ...prev, priority: value }))}>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about your issue"
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm((prev) => ({ ...prev, description: e.target.value }))}
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Ticket
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Phone className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Phone Support</CardTitle>
                <CardDescription>Speak with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">+92-51-111-222-333</p>
                <p className="text-sm text-muted-foreground mt-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Mail className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Send us an email</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">support@govportal.gov.pk</p>
                <p className="text-sm text-muted-foreground mt-2">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Office Hours</CardTitle>
                <CardDescription>Visit our office</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">Monday - Friday</p>
                <p className="text-sm">9:00 AM - 5:00 PM</p>
                <p className="text-sm text-muted-foreground mt-2">Government Complex, Islamabad</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Live Chat Support</CardTitle>
              <CardDescription>Chat with our support team in real-time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Support agents are online</span>
                </div>
                <p className="text-sm text-muted-foreground">Average response time: 2-3 minutes</p>
              </div>

              <Button className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Live Chat
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Chat is available Monday - Friday, 9:00 AM - 6:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
