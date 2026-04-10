"use client"

import { Button } from "@/components/common/Button"
import { Container } from "@/components/frontend/Container"
import { FELayout } from "@/components/frontend/FELayout"
import { CheckCircle, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { useState } from "react"

export default function ContactUsContent() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const [phoneError, setPhoneError] = useState("")

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    if (name === "phone") {
      // Allow only numbers and an optional + at the start
      const cleanedValue = value.replace(/[^0-9+]/g, "")
      setFormData((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }))
      // Validate phone number length
      if (cleanedValue.startsWith("+")) {
        if (cleanedValue.length < 13) {
          setPhoneError("Phone number must be at least 10 digits")
        } else if (cleanedValue.length > 16) {
          setPhoneError("Phone number cannot exceed 15 digits")
        } else {
          setPhoneError("")
        }
      } else {
        if (cleanedValue.length < 10 && cleanedValue.length > 0) {
          setPhoneError("Phone number must be at least 10 digits")
        } else {
          setPhoneError("")
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Additional validation before submission
    if (formData.phone.replace(/\+/g, "").length < 10) {
      setPhoneError("Phone number must be at least 10 digits")
      return
    }

    // Construct mailto URL
    const emailBody = `Name: ${formData.name}\n\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    const mailtoUrl = `mailto:collegecutoff@gmail.com?subject=${encodeURIComponent(formData.phone)}&body=${encodeURIComponent(emailBody)}`

    // Open Gmail app or default email client
    window.location.href = mailtoUrl

    // Reset form
    setFormData({
      name: "",
      phone: "",
      message: "",
    })
    setPhoneError("")
  }

  return (
    <FELayout>
      {/* HERO */}

      <section
        className="contact-hero w-full py-24 relative overflow-hidden"
      >

        {/* Glow Effects */}

        <div
          className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full blur-3xl opacity-30"
          style={{ background: "#38bdf8" }}
        ></div>

        <div
          className="absolute bottom-[-120px] left-[-120px] w-[350px] h-[350px] rounded-full blur-3xl opacity-20"
          style={{ background: "#60a5fa" }}
        ></div>

        <Container>
          <div className="text-center max-w-2xl mx-auto space-y-8">

            <span
              className="px-5 py-1.5 rounded-full text-sm font-medium backdrop-blur-md"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#1d4ed8",
              }}
            >
              💬 Contact Support
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Let’s Talk & Solve Your Doubts
            </h1>

            <p className="text-gray-600 text-lg">
              Get expert guidance for NEET counselling and college predictions —
              fast, accurate, and reliable.
            </p>

          </div>

        </Container>
      </section>

      {/* MAIN SECTION */}

      <section className="w-full py-20 bg-white px-4">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">

            {/* LEFT SIDE */}
            <div className="space-y-8">

              <h2 className="text-3xl font-bold text-gray-900">
                Talk to Experts
              </h2>

              <p className="text-gray-600 text-lg">
                Our team helps thousands of students every year to secure the best
                medical colleges across India.
              </p>

              {/* Cards */}
              <div className="space-y-4">

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-white shadow-sm border">
                  <Mail className="text-blue-600 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="font-semibold text-gray-800">
                      collegecutoff.net@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-white shadow-sm border">
                  <Phone className="text-blue-600 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <p className="font-semibold text-gray-800">
                      +91 9028009835
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT SIDE FORM */}
            <div
              className="p-8 rounded-3xl backdrop-blur-xl border"
              style={{
                background: "rgba(255,255,255,0.7)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >

              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Send Message ✉️
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                />

                {phoneError && (
                  <p className="text-red-500 text-sm">{phoneError}</p>
                )}

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                />

                <button
                  type="submit"
                  className="contact-hero w-full py-3 rounded-xl font-semibold text-white transition hover:scale-[1.02]"
                  style={{ background: "linear-gradient(to right, #2563eb, #3b82f6)", }}
                >
                  Send Message →
                </button>

              </form>

            </div>

          </div>
        </Container>
      </section>

      {/* <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-yellow-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-20 blur-3xl -z-10"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-200 to-emerald-400 opacity-20 blur-3xl -z-10"></div>

        <Container>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-block rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-medium text-yellow-800 shadow-sm border border-yellow-200 mb-4">
              GET IN TOUCH
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-color-table-header">
              Contact Us
            </h1>
            <p className="text-gray-600 md:text-lg mb-8 max-w-2xl">
              {`Have questions about NEET counselling or need guidance for your
              medical career? We're here to help you every step of the way.`}
            </p>
          </div>
        </Container>

      </section> */}

      {/* Contact Information & Urgent Help Section */}
      {/* <section className="w-full py-12 md:py-16 px-3 bg-gray-50 dark:bg-color-form-background">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-8">
              <div className="relative pt-10 md:pt-0">
                <h2 className="text-2xl font-bold mb-6 absolute md:relative top-0 left-0">
                  Contact Information
                </h2>
                <div className="bg-white p-5 md:p-6 rounded-xl shadow-md border border-gray-100 mt-4 md:mt-1">
                  <div className="space-y-6 md:space-y-8 py-3">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-100 flex-shrink-0 flex items-center justify-center">
                        <Mail className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-base md:text-lg text-gray-900">
                          Email Us
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm md:text-base">
                          For counselling:
                        </p>
                        <a
                          href="mailto:collegecutoff.net@gmail.com"
                          className="text-yellow-600 hover:underline font-medium text-sm md:text-base"
                        >
                          collegecutoff.net@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-100 flex-shrink-0 flex items-center justify-center">
                        <Phone className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-base md:text-lg text-gray-900">
                          Call Us
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm md:text-base">
                          Counselling Helpline:
                        </p>
                        <a
                          href="tel:+919028009835"
                          className="text-yellow-600 hover:underline font-medium text-sm md:text-base"
                        >
                          +91 9028009835
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Card className="bg-color-table-header text-white border-0 p-4">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">
                      Send Us a Message
                    </CardTitle>
                    <p className="text-orange-100">
                      {`Fill out the form below and we'll get back to you as soon as possible.`}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-white font-medium"
                        >
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          className="bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-white font-medium"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your Phone Number"
                          required
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid phone number"
                          className="bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"
                        />
                        {phoneError && (
                          <p className="text-red-500 text-sm font-medium">
                            {phoneError}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-4">
                        <Label
                          htmlFor="message"
                          className="text-white font-medium"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Enter your message"
                          required
                          rows={4}
                          className="bg-white/90 border-0 text-gray-900 placeholder:text-gray-500 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-color-accent text-white hover:bg-color-accent-dark hover:border-white border border-transparent font-semibold py-2 px-4 rounded-lg transition-colors translate-y-3 h-[50px]"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section> */}

      {/* About Us Section */}
      {/* <section className="w-full py-12 md:py-16 bg-color-background px-3">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                About CollegeCutoff
              </h2>
              <p className="text-gray-600 mb-4">
                {`CollegeCutoff is India's leading platform dedicated to helping
                NEET aspirants make informed decisions about their medical
                education journey. Founded in 2019, we have guided over 30,000
                students to secure admissions in their dream medical colleges.`}
              </p>
              <p className="text-gray-600 mb-4">
                Our team consists of experienced counsellors, medical
                professionals, and education experts who understand the
                complexities of NEET counselling and admission processes across
                India.
              </p>
              <p className="text-gray-600 mb-6">
                We pride ourselves on providing accurate, up-to-date information
                and personalized guidance to help students navigate the
                challenging path to becoming medical professionals.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="font-medium">8+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="font-medium">30,000+ Students Guided</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="font-medium">500+ Medical Colleges</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-yellow-100 to-emerald-100 rounded-3xl transform rotate-3 scale-105 opacity-70"></div>
              <div className="bg-color-form-background p-6 md:p-8 rounded-2xl">
                <img
                  src="/medical-education-counselling-team.png"
                  alt="CollegeCutoff Team"
                  className="w-full h-auto rounded-lg mb-6"
                />
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  To simplify medical education choices and empower NEET
                  aspirants with accurate information and personalized guidance
                  to achieve their career goals.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section> */}
      {/* About Section */}

      <section
        className="contact-hero w-full py-24 px-4 relative overflow-hidden"
      >

        {/* Glow Effects */}

        <div
          className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full blur-3xl opacity-20"
          style={{ background: "#38bdf8" }}
        ></div>

        <div
          className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] rounded-full blur-3xl opacity-20"
          style={{ background: "#60a5fa" }}
        ></div>

        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

            {/* LEFT CONTENT */}
            <div className="space-y-8">

              <div className="space-y-4">
                <span
                  className="px-4 py-1 rounded-full text-sm font-medium inline-block"
                  style={{
                    background: "#dbeafe",
                    color: "#1d4ed8",
                  }}
                >
                  About Us
                </span>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Helping Students Choose the Right Medical College
                </h2>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                CollegeCutoff is India's leading platform helping NEET aspirants make
                smarter decisions with accurate data, counselling insights, and expert guidance.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                We’ve helped thousands of students secure admissions in top medical colleges
                across India with confidence and clarity.
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 pt-4">

                {[
                  { title: "8+", label: "Years Experience" },
                  { title: "30K+", label: "Students Guided" },
                  { title: "500+", label: "Medical Colleges" },
                  { title: "100%", label: "Trusted Data" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white border shadow-sm"
                  >
                    <p className="text-xl font-bold text-blue-600">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                ))}

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="relative">

              {/* Glow Background */}
              <div
                className="contact-hero w-full py-24 absolute inset-0 rounded-3xl blur-2xl opacity-40 -z-10"
              ></div>

              {/* Glass Card */}
              <div
                className="p-8 rounded-3xl backdrop-blur-xl border"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  boxShadow: "0 30px 70px rgba(0,0,0,0.12)",
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              >

                <img
                  src="/medical-education-counselling-team.png"
                  alt="CollegeCutoff Team"
                  className="w-full rounded-xl mb-6"
                />

                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Our Mission 🚀
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed">
                  To simplify medical education choices and empower NEET aspirants
                  with accurate insights, smart tools, and personalized guidance.
                </p>

              </div>

            </div>

          </div>

        </Container>
      </section>


    </FELayout>
  )
}

// re-design /about page Contact Information create a form ask "Name" subject and Message "" on submit click mailto:collegecutoff@gmail.com" with subject and msg and redirect them to gmail app in phone.

// Custom Card components using divs
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
  >
    {children}
  </div>
)

const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
)

const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </div>
)

const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => <div className={`p-6 pt-0 ${className}`}>{children}</div>

const Label = ({
  children,
  htmlFor,
  className = "",
}: {
  children: React.ReactNode
  htmlFor?: string
  className?: string
}) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
)

const Input = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  pattern, // Add pattern prop
  title, // Add title prop
  className = "",
}: {
  id?: string
  name?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  pattern?: string
  title?: string
  required?: boolean
  className?: string
}) => (
  <input
    id={id}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    pattern={pattern}
    title={title}
    required={required}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
)

const Textarea = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 3,
  className = "",
}: {
  id?: string
  name?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  rows?: number
  className?: string
}) => (
  <textarea
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    rows={rows}
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
)
