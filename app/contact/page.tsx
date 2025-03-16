"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Mail, MessageSquare, Send, Phone, MapPin, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      })
    }, 1500)
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-emerald-600" />,
      title: "Email",
      details: "support@islamy.example.com",
    },
    {
      icon: <Phone className="h-5 w-5 text-emerald-600" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
    },
    {
      icon: <MapPin className="h-5 w-5 text-emerald-600" />,
      title: "Address",
      details: "123 Islamic Center St, Knowledge City, 12345",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="w-full bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="flex justify-center mb-4 bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                {info.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-emerald-700 dark:text-emerald-400">{info.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{info.details}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <MessageSquare className="h-6 w-6" /> Get in Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're here to help with any questions about Islamic knowledge or feedback about our service. Fill out the
              form, and we'll get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3">
                  {info.icon}
                  <div>
                    <p className="font-medium text-emerald-700 dark:text-emerald-400">{info.title}</p>
                    <p className="text-gray-600 dark:text-gray-300">{info.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below to send us a message.</CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <CheckCircle className="h-16 w-16 text-emerald-600 mb-4" />
                    <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <Button
                      className="mt-6"
                      variant="outline"
                      onClick={() => {
                        setIsSubmitted(false)
                        setFormState({
                          name: "",
                          email: "",
                          subject: "",
                          message: "",
                        })
                      }}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email address"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Message subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your message"
                          rows={4}
                          value={formState.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </form>
                )}
              </CardContent>
              {!isSubmitted && (
                <CardFooter>
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Sending...</span>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Send className="h-4 w-4" />
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <span className="mr-2">Send Message</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

