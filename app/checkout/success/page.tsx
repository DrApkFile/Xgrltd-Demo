"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ShoppingBag, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import confetti from "canvas-confetti"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutSuccessPage() {
  const { toast } = useToast()

  useEffect(() => {
    // Show payment success notification
    toast({
      title: "Payment Successful!",
      description: "Your order has been placed successfully.",
      variant: "success",
      duration: 5000,
    })

    // Trigger confetti effect
    const duration = 3 * 1000
    const end = Date.now() + duration

    const runConfetti = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#8B5CF6", "#F59E0B", "#38B2AC"],
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#8B5CF6", "#F59E0B", "#38B2AC"],
      })

      if (Date.now() < end) {
        requestAnimationFrame(runConfetti)
      }
    }

    runConfetti()
  }, [toast])

  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="text-center border-teal-200">
          <CardHeader className="bg-teal-50 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-teal-500" />
            </div>
            <CardTitle className="text-2xl text-teal-900">Order Successful!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <p className="text-teal-700">
              Thank you for your purchase! Your order has been received and is being processed.
            </p>
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="font-medium text-teal-800">Order Number</p>
              <p className="text-2xl font-bold text-teal-900">{orderNumber}</p>
            </div>
            <p className="text-sm text-teal-600">
              A confirmation email has been sent to your email address with all the details of your order.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-teal-50 rounded-b-lg">
            <Button asChild className="w-full bg-teal-500 hover:bg-teal-600">
              <Link href="/dashboard">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View Order
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full border-teal-500 text-teal-600 hover:bg-teal-50">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

