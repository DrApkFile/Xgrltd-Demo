"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard, Download, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth-provider"
import { orderHistory } from "@/lib/data"

// Helper function to format Naira
const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function OrderDetailPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string

  const order = orderHistory.find((o) => o.id === orderId)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-purple-900">Order Not Found</h1>
        <p className="text-purple-700 mb-8">The order you are looking for does not exist or has been removed.</p>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/dashboard/orders">Back to Orders</Link>
        </Button>
      </div>
    )
  }

  // Calculate order progress based on status
  const getOrderProgress = (status: string) => {
    switch (status) {
      case "Delivered":
        return 100
      case "Shipped":
        return 66
      case "Processing":
        return 33
      default:
        return 0
    }
  }

  const orderProgress = getOrderProgress(order.status)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" className="text-purple-700 hover:text-purple-900 hover:bg-purple-50 -ml-4" asChild>
          <Link href="/dashboard/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-purple-900">Order {order.id}</h1>
          <p className="text-purple-700">
            Placed on{" "}
            {new Date(order.date).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            <Download className="mr-2 h-4 w-4" />
            Invoice
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Buy Again
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="border-teal-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-teal-100 rounded-full">
                  <Package className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-medium text-teal-900">Order Status</h3>
                  <p className="text-teal-700">{order.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-amber-100 rounded-full">
                  <Truck className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-amber-900">Tracking Number</h3>
                  <p className="text-amber-700">
                    {order.trackingNumber !== "Pending" ? order.trackingNumber : "Pending"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-coral-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-coral-100 rounded-full">
                  <CreditCard className="h-6 w-6 text-coral-600" />
                </div>
                <div>
                  <h3 className="font-medium text-coral-900">Payment Method</h3>
                  <p className="text-coral-700">{order.paymentMethod.type}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <Card className="border-purple-200">
            <CardHeader className="bg-purple-50 rounded-t-lg">
              <CardTitle className="text-purple-900">Order Items</CardTitle>
              <CardDescription className="text-purple-700">
                {order.items.length} {order.items.length === 1 ? "item" : "items"} in your order
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 border-b border-purple-100 pb-6"
                  >
                    <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-purple-900">{item.name}</h4>
                      <p className="text-sm text-purple-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-900">{formatNaira(item.price)}</p>
                      <p className="text-sm text-purple-600">Per Item</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-200 mt-6">
            <CardHeader className="bg-teal-50 rounded-t-lg">
              <CardTitle className="text-teal-900">Order Timeline</CardTitle>
              <CardDescription className="text-teal-700">Track your order progress</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-teal-100"></div>

                <div className="relative pl-10 pb-8">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-medium text-teal-900">Order Placed</h4>
                  <p className="text-sm text-teal-600">
                    {new Date(order.date).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm text-teal-700 mt-1">Your order has been received and is being processed.</p>
                </div>

                <div className="relative pl-10 pb-8">
                  <div
                    className={`absolute left-0 top-1 w-8 h-8 rounded-full ${orderProgress >= 33 ? "bg-teal-500" : "bg-teal-200"} flex items-center justify-center`}
                  >
                    {orderProgress >= 33 ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : (
                      <Clock className="h-5 w-5 text-teal-500" />
                    )}
                  </div>
                  <h4 className="font-medium text-teal-900">Processing</h4>
                  <p className="text-sm text-teal-600">
                    {orderProgress >= 33
                      ? new Date(new Date(order.date).getTime() + 86400000).toLocaleDateString("en-NG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Pending"}
                  </p>
                  <p className="text-sm text-teal-700 mt-1">Your order is being prepared for shipment.</p>
                </div>

                <div className="relative pl-10 pb-8">
                  <div
                    className={`absolute left-0 top-1 w-8 h-8 rounded-full ${orderProgress >= 66 ? "bg-teal-500" : "bg-teal-200"} flex items-center justify-center`}
                  >
                    {orderProgress >= 66 ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : (
                      <Clock className="h-5 w-5 text-teal-500" />
                    )}
                  </div>
                  <h4 className="font-medium text-teal-900">Shipped</h4>
                  <p className="text-sm text-teal-600">
                    {orderProgress >= 66
                      ? new Date(new Date(order.date).getTime() + 172800000).toLocaleDateString("en-NG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Pending"}
                  </p>
                  <p className="text-sm text-teal-700 mt-1">Your order has been shipped and is on its way to you.</p>
                </div>

                <div className="relative pl-10">
                  <div
                    className={`absolute left-0 top-1 w-8 h-8 rounded-full ${orderProgress >= 100 ? "bg-teal-500" : "bg-teal-200"} flex items-center justify-center`}
                  >
                    {orderProgress >= 100 ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : (
                      <Clock className="h-5 w-5 text-teal-500" />
                    )}
                  </div>
                  <h4 className="font-medium text-teal-900">Delivered</h4>
                  <p className="text-sm text-teal-600">
                    {orderProgress >= 100
                      ? new Date(new Date(order.date).getTime() + 432000000).toLocaleDateString("en-NG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Pending"}
                  </p>
                  <p className="text-sm text-teal-700 mt-1">Your order has been delivered. Enjoy your purchase!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-4">
          <Card className="border-amber-200">
            <CardHeader className="bg-amber-50 rounded-t-lg">
              <CardTitle className="text-amber-900">Order Summary</CardTitle>
              <CardDescription className="text-amber-700">Order details and totals</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-amber-700">Subtotal</span>
                  <span className="font-medium text-amber-900">{formatNaira(order.total * 0.9)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Shipping</span>
                  <span className="font-medium text-amber-900">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Tax</span>
                  <span className="font-medium text-amber-900">{formatNaira(order.total * 0.1)}</span>
                </div>
                <Separator className="bg-amber-200" />
                <div className="flex justify-between font-bold">
                  <span className="text-amber-900">Total</span>
                  <span className="text-amber-900">{formatNaira(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-coral-200 mt-6">
            <CardHeader className="bg-coral-50 rounded-t-lg">
              <CardTitle className="text-coral-900">Shipping Information</CardTitle>
              <CardDescription className="text-coral-700">Delivery details</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <MapPin className="h-5 w-5 text-coral-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-coral-900">Shipping Address</h4>
                  <div className="text-sm text-coral-700 mt-1 space-y-1">
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>
              </div>

              <Separator className="bg-coral-100 my-4" />

              <div className="flex items-start space-x-3">
                <CreditCard className="h-5 w-5 text-coral-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-coral-900">Payment Method</h4>
                  <div className="flex items-center mt-2">
                    <div className="relative w-10 h-6 mr-2">
                      <Image
                        src={order.paymentMethod.image || "/placeholder.svg"}
                        alt={order.paymentMethod.type}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-coral-700">
                      {order.paymentMethod.type}{" "}
                      {order.paymentMethod.last4 ? `ending in ${order.paymentMethod.last4}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-coral-50 rounded-b-lg">
              <Button variant="outline" className="w-full border-coral-300 text-coral-700 hover:bg-coral-100">
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

