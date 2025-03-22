"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"

// Helper function to format Naira
const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      clearCart()
      window.location.href = "/checkout/success"
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-purple-900">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-purple-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-purple-800">Your cart is empty</h2>
          <p className="text-purple-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-purple-200">
              <CardHeader className="bg-purple-50 rounded-t-lg">
                <CardTitle className="text-purple-900">Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-purple-100 pb-4"
                  >
                    <div className="relative h-24 w-24 rounded-md overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg?height=100&width=100"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-purple-900">{item.name}</h3>
                      <p className="text-sm text-purple-600">{item.category}</p>
                      <p className="font-bold mt-1 text-purple-800">{formatNaira(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-purple-300 text-purple-700 hover:bg-purple-50"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span className="w-8 text-center text-purple-900">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-purple-300 text-purple-700 hover:bg-purple-50"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-800">{formatNaira(item.price * item.quantity)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-coral-600 hover:text-coral-700 hover:bg-coral-50 mt-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between bg-purple-50 rounded-b-lg">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-purple-400 text-purple-700 hover:bg-purple-100"
                >
                  Clear Cart
                </Button>
                <Button asChild className="bg-teal-500 hover:bg-teal-600">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div>
            <Card className="border-amber-200">
              <CardHeader className="bg-amber-50 rounded-t-lg">
                <CardTitle className="text-amber-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-between text-amber-800">
                  <span>Subtotal</span>
                  <span>{formatNaira(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-amber-800">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-amber-800">
                  <span>Tax</span>
                  <span>{formatNaira(totalPrice * 0.1)}</span>
                </div>
                <Separator className="bg-amber-200" />
                <div className="flex justify-between font-bold text-lg text-amber-900">
                  <span>Total</span>
                  <span>{formatNaira(totalPrice * 1.1)}</span>
                </div>
                <div className="pt-4">
                  <Button
                    className="w-full bg-amber-500 hover:bg-amber-600 text-amber-950"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Checkout <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <div className="text-center text-sm text-amber-700 pt-2">Secure checkout powered by Paystack</div>
              </CardContent>
            </Card>
            <Card className="mt-4 border-amber-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-amber-900 mb-2">We Accept</h3>
                <div className="flex gap-2">
                  <div className="bg-amber-100 h-8 w-12 rounded flex items-center justify-center text-xs text-amber-800">
                    Paystack
                  </div>
                  <div className="bg-amber-100 h-8 w-12 rounded flex items-center justify-center text-xs text-amber-800">
                    Flutterwave
                  </div>
                  <div className="bg-amber-100 h-8 w-12 rounded flex items-center justify-center text-xs text-amber-800">
                    Bank
                  </div>
                  <div className="bg-amber-100 h-8 w-12 rounded flex items-center justify-center text-xs text-amber-800">
                    USSD
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

