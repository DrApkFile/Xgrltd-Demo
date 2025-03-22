"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Package,
  ShoppingBag,
  CreditCard,
  Heart,
  Settings,
  LogOut,
  User,
  MapPin,
  Bell,
  Calendar,
  TrendingUp,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { orderHistory, wishlistItems, userAddresses, paymentMethods, userProfile } from "@/lib/data"

// Helper function to format Naira
const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const { cartItems } = useCart()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const recentOrders = orderHistory.slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-900">Dashboard</h1>
          <p className="text-purple-700">Welcome back, {userProfile.name}</p>
        </div>
        <Button variant="outline" onClick={logout} className="border-purple-300 text-purple-700 hover:bg-purple-50">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <div className="md:col-span-3">
          <Card className="border-purple-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-purple-100">
                  <Image
                    src={userProfile.avatar || "/placeholder.svg"}
                    alt={userProfile.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-purple-900">{userProfile.name}</h2>
                <p className="text-purple-600 mb-2">{userProfile.email}</p>
                <p className="text-sm text-purple-500">Member since {userProfile.dateJoined}</p>

                <div className="mt-4 w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-purple-700">Loyalty Points</span>
                    <span className="font-medium text-purple-900">750 / 1000</span>
                  </div>
                  <Progress value={75} className="h-2 bg-purple-100" indicatorClassName="bg-amber-500" />
                  <p className="text-xs text-purple-500 mt-1">250 more points for Gold status</p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    asChild
                  >
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    asChild
                  >
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="border-teal-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-teal-600">Total Orders</p>
                      <h3 className="text-3xl font-bold text-teal-900 mt-1">{userProfile.totalOrders}</h3>
                      <p className="text-xs text-teal-500 mt-1">+2 this month</p>
                    </div>
                    <div className="p-3 bg-teal-100 rounded-full">
                      <ShoppingBag className="h-6 w-6 text-teal-600" />
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
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-amber-600">Total Spent</p>
                      <h3 className="text-3xl font-bold text-amber-900 mt-1">{formatNaira(userProfile.totalSpent)}</h3>
                      <p className="text-xs text-amber-500 mt-1">+₦320,000 this month</p>
                    </div>
                    <div className="p-3 bg-amber-100 rounded-full">
                      <CreditCard className="h-6 w-6 text-amber-600" />
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
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-coral-600">Wishlist</p>
                      <h3 className="text-3xl font-bold text-coral-900 mt-1">{wishlistItems.length}</h3>
                      <p className="text-xs text-coral-500 mt-1">2 items on sale</p>
                    </div>
                    <div className="p-3 bg-coral-100 rounded-full">
                      <Heart className="h-6 w-6 text-coral-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Card className="border-purple-200">
            <CardHeader className="bg-purple-50 rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-purple-900">Recent Activity</CardTitle>
                  <CardDescription className="text-purple-700">Your recent orders and activity</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-300 text-purple-700 hover:bg-purple-100"
                  asChild
                >
                  <Link href="/dashboard/orders">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col md:flex-row md:items-center justify-between border-b border-purple-100 pb-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={order.items[0].image || "/placeholder.svg"}
                          alt={order.items[0].name}
                          fill
                          className="object-cover"
                        />
                        {order.items.length > 1 && (
                          <div className="absolute bottom-0 right-0 bg-purple-900 text-white text-xs px-1 rounded-tl-md">
                            +{order.items.length - 1}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-900">{order.id}</h4>
                        <p className="text-sm text-purple-600">
                          {new Date(order.date).toLocaleDateString("en-NG", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm font-medium text-purple-800 mt-1">{formatNaira(order.total)}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 md:mt-0">
                      <Badge
                        className={
                          order.status === "Delivered"
                            ? "bg-teal-100 text-teal-800 hover:bg-teal-200"
                            : order.status === "Shipped"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                        }
                      >
                        {order.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 text-purple-700 hover:text-purple-900 hover:bg-purple-50"
                        asChild
                      >
                        <Link href={`/dashboard/orders/${order.id}`}>Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-purple-50 p-1 rounded-lg">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-white data-[state=active]:text-purple-900 text-purple-700"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="data-[state=active]:bg-white data-[state=active]:text-purple-900 text-purple-700"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="wishlist"
            className="data-[state=active]:bg-white data-[state=active]:text-purple-900 text-purple-700"
          >
            Wishlist
          </TabsTrigger>
          <TabsTrigger
            value="addresses"
            className="data-[state=active]:bg-white data-[state=active]:text-purple-900 text-purple-700"
          >
            Addresses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="border-teal-200">
                <CardHeader className="bg-teal-50 rounded-t-lg">
                  <CardTitle className="text-teal-900">Payment Methods</CardTitle>
                  <CardDescription className="text-teal-700">Manage your payment options</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between border border-teal-100 p-4 rounded-md"
                      >
                        <div className="flex items-center">
                          <div className="relative w-10 h-6 mr-4">
                            <Image
                              src={method.image || "/placeholder.svg"}
                              alt={method.cardType || method.type}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-teal-900">
                              {method.cardType ? `${method.cardType} ending in ${method.last4}` : method.type}
                              {method.default && (
                                <Badge className="ml-2 bg-teal-100 text-teal-800 hover:bg-teal-200">Default</Badge>
                              )}
                            </p>
                            <p className="text-sm text-teal-600">
                              {method.expiryDate !== "N/A" ? `Expires ${method.expiryDate}` : "No expiration date"}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-teal-700 hover:text-teal-900 hover:bg-teal-50"
                        >
                          Edit
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-teal-300 text-teal-700 hover:bg-teal-50">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-200 mt-6">
                <CardHeader className="bg-amber-50 rounded-t-lg">
                  <CardTitle className="text-amber-900">Recent Purchases</CardTitle>
                  <CardDescription className="text-amber-700">Your shopping activity</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {orderHistory.slice(0, 2).map((order) => (
                      <div key={order.id} className="border-b border-amber-100 pb-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium text-amber-900">Order {order.id}</h4>
                          <Badge
                            className={
                              order.status === "Delivered"
                                ? "bg-teal-100 text-teal-800 hover:bg-teal-200"
                                : order.status === "Shipped"
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                  : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3">
                              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-amber-900 line-clamp-1">{item.name}</p>
                                <p className="text-sm text-amber-600">
                                  {formatNaira(item.price)} × {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <p className="text-sm text-amber-600">
                              {new Date(order.date).toLocaleDateString("en-NG", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                            <p className="font-medium text-amber-900">{formatNaira(order.total)}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-amber-300 text-amber-700 hover:bg-amber-50"
                            asChild
                          >
                            <Link href={`/dashboard/orders/${order.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-amber-50 rounded-b-lg">
                  <Button
                    variant="outline"
                    className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
                    asChild
                  >
                    <Link href="/dashboard/orders">View All Orders</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card className="border-purple-200">
                <CardHeader className="bg-purple-50 rounded-t-lg">
                  <CardTitle className="text-purple-900">Account Summary</CardTitle>
                  <CardDescription className="text-purple-700">Your account details</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm text-purple-600">Member Since</p>
                        <p className="font-medium text-purple-900">{userProfile.dateJoined}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ShoppingBag className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm text-purple-600">Total Orders</p>
                        <p className="font-medium text-purple-900">{userProfile.totalOrders} orders</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm text-purple-600">Total Spent</p>
                        <p className="font-medium text-purple-900">{formatNaira(userProfile.totalSpent)}</p>
                      </div>
                    </div>
                    <Separator className="bg-purple-100" />
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm text-purple-600">Notifications</p>
                        <p className="font-medium text-purple-900">
                          {userProfile.preferences.orderNotifications ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm text-purple-600">Default Address</p>
                        <p className="font-medium text-purple-900">
                          {userAddresses.find((addr) => addr.default)?.city},{" "}
                          {userAddresses.find((addr) => addr.default)?.state}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-purple-50 rounded-b-lg">
                  <Button
                    variant="outline"
                    className="w-full border-purple-300 text-purple-700 hover:bg-purple-100"
                    asChild
                  >
                    <Link href="/dashboard/profile">Edit Profile</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-coral-200 mt-6">
                <CardHeader className="bg-coral-50 rounded-t-lg">
                  <CardTitle className="text-coral-900">Wishlist Highlights</CardTitle>
                  <CardDescription className="text-coral-700">Products you've saved</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {wishlistItems.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-coral-900 line-clamp-1">{item.name}</p>
                          <p className="text-sm text-coral-600">{formatNaira(item.price)}</p>
                        </div>
                        <Button size="sm" className="bg-coral-500 hover:bg-coral-600 text-white">
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-coral-50 rounded-b-lg">
                  <Button
                    variant="outline"
                    className="w-full border-coral-300 text-coral-700 hover:bg-coral-100"
                    asChild
                  >
                    <Link href="/dashboard/wishlist">View Wishlist</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Card className="border-teal-200">
            <CardHeader className="bg-teal-50 rounded-t-lg">
              <CardTitle className="text-teal-900">Order History</CardTitle>
              <CardDescription className="text-teal-700">View and track your orders</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {orderHistory.length > 0 ? (
                <div className="space-y-6">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="border border-teal-100 rounded-lg overflow-hidden">
                      <div className="bg-teal-50 p-4 flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-teal-900">{order.id}</h4>
                            <Badge className="ml-2 bg-teal-100 text-teal-800 hover:bg-teal-200">{order.status}</Badge>
                          </div>
                          <p className="text-sm text-teal-600">
                            {new Date(order.date).toLocaleDateString("en-NG", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <p className="font-bold text-teal-900">{formatNaira(order.total)}</p>
                          <p className="text-sm text-teal-600">
                            {order.items.length} {order.items.length === 1 ? "item" : "items"}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3">
                              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-teal-900 line-clamp-1">{item.name}</p>
                                <p className="text-sm text-teal-600">
                                  {formatNaira(item.price)} × {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between border-t border-teal-100 pt-4">
                          <div>
                            <p className="text-sm font-medium text-teal-900">Shipping Address:</p>
                            <p className="text-sm text-teal-600">
                              {order.shippingAddress.name}, {order.shippingAddress.street}, {order.shippingAddress.city}
                              , {order.shippingAddress.state}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0 flex space-x-2">
                            <Button size="sm" className="bg-teal-500 hover:bg-teal-600" asChild>
                              <Link href={`/dashboard/orders/${order.id}`}>View Details</Link>
                            </Button>
                            {order.status === "Delivered" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-teal-300 text-teal-700 hover:bg-teal-50"
                              >
                                Buy Again
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-teal-400" />
                  <h3 className="mt-4 text-lg font-medium text-teal-900">No orders yet</h3>
                  <p className="mt-2 text-sm text-teal-600">When you place orders, they will appear here.</p>
                  <Button className="mt-4 bg-teal-500 hover:bg-teal-600" asChild>
                    <Link href="/products">Start Shopping</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="mt-6">
          <Card className="border-coral-200">
            <CardHeader className="bg-coral-50 rounded-t-lg">
              <CardTitle className="text-coral-900">My Wishlist</CardTitle>
              <CardDescription className="text-coral-700">Products you've saved for later</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 border border-coral-100 rounded-lg p-4">
                      <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-coral-900">{item.name}</h4>
                          <Badge className="bg-coral-100 text-coral-800 hover:bg-coral-200">{item.category}</Badge>
                        </div>
                        <p className="text-lg font-bold text-coral-800 mt-1">{formatNaira(item.price)}</p>
                        <p className="text-sm text-coral-600 mt-1">Added on July 15, 2023</p>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" className="bg-coral-500 hover:bg-coral-600 text-white">
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-coral-300 text-coral-700 hover:bg-coral-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="mx-auto h-12 w-12 text-coral-400" />
                  <h3 className="mt-4 text-lg font-medium text-coral-900">Your wishlist is empty</h3>
                  <p className="mt-2 text-sm text-coral-600">Save items you like to your wishlist to buy them later.</p>
                  <Button className="mt-4 bg-coral-500 hover:bg-coral-600" asChild>
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="mt-6">
          <Card className="border-amber-200">
            <CardHeader className="bg-amber-50 rounded-t-lg">
              <CardTitle className="text-amber-900">My Addresses</CardTitle>
              <CardDescription className="text-amber-700">Manage your shipping addresses</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userAddresses.map((address) => (
                  <div key={address.id} className="border border-amber-100 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <h4 className="font-medium text-amber-900">{address.type}</h4>
                        {address.default && (
                          <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-200">Default</Badge>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-amber-700 hover:text-amber-900 hover:bg-amber-50"
                        >
                          <Settings className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-amber-700 hover:text-amber-900 hover:bg-amber-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1 text-amber-800">
                      <p className="font-medium">{address.name}</p>
                      <p>{address.street}</p>
                      <p>
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p>{address.country}</p>
                      <p className="text-amber-600">{address.phone}</p>
                    </div>
                    {!address.default && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 border-amber-300 text-amber-700 hover:bg-amber-50"
                      >
                        Set as Default
                      </Button>
                    )}
                  </div>
                ))}
                <div className="border border-dashed border-amber-200 rounded-lg p-4 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                  <MapPin className="h-8 w-8 text-amber-400 mb-2" />
                  <h4 className="font-medium text-amber-900 mb-1">Add New Address</h4>
                  <p className="text-sm text-amber-600 mb-4">Add a new shipping or billing address</p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-amber-950">Add Address</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

