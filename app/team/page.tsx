"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Linkedin, Twitter, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { teamMembers } from "@/lib/data"

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <motion.h1
          className="text-4xl font-bold mb-4 text-purple-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Team
        </motion.h1>
        <motion.p
          className="text-xl text-purple-700 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The talented individuals behind XGRLTD who work tirelessly to bring you the best shopping experience.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full">
              <div className="relative h-80 w-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-purple-900">{member.name}</h3>
                <p className="text-purple-600 mb-4">{member.role}</p>
                <p className="text-purple-700 mb-6">{member.bio}</p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 bg-purple-50 rounded-lg p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-purple-900">Join Our Team</h2>
            <p className="text-purple-700 mb-6">
              We're always looking for talented individuals to join our team. If you're passionate about e-commerce and
              want to make a difference, we'd love to hear from you.
            </p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <a href="/careers">View Open Positions</a>
            </Button>
          </div>
          <div className="relative h-64 md:h-80">
            <Image
              src="/images/join-team.png"
              alt="Join Our Team"
              fill
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-900">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2 text-purple-900">Customer First</h3>
              <p className="text-purple-700">
                We prioritize our customers in everything we do, ensuring they have the best shopping experience
                possible.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2 text-purple-900">Quality Products</h3>
              <p className="text-purple-700">
                We carefully curate our product selection to ensure we offer only the highest quality items to our
                customers.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2 text-purple-900">Innovation</h3>
              <p className="text-purple-700">
                We constantly strive to innovate and improve our platform to provide the best possible service.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

