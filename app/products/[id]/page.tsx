"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { products } from "@/lib/data"

// Helper function to format Naira
const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function ProductDetailPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const params = useParams()
  const productId = Number(params.id)
  const product = products.find((p) => p.id === productId)

  const { addToCart } = useCart()
  const [selectedColor, setSelectedColor] = useState("black")
  const [selectedSize, setSelectedSize] = useState("m")
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  // Generate multiple product images for the gallery
  const productImages = [
    product.image,
    `/placeholder.svg?height=600&width=600&text=Image+2`,
    `/placeholder.svg?height=600&width=600&text=Image+3`,
    `/placeholder.svg?height=600&width=600&text=Image+4`,
  ]

  const colors = [
    { id: "black", name: "Black", value: "bg-black" },
    { id: "white", name: "White", value: "bg-white" },
    { id: "blue", name: "Blue", value: "bg-blue-500" },
    { id: "red", name: "Red", value: "bg-red-500" },
  ]

  const sizes = [
    { id: "xs", name: "XS" },
    { id: "s", name: "S" },
    { id: "m", name: "M" },
    { id: "l", name: "L" },
    { id: "xl", name: "XL" },
  ]

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    })
  }

  // Generate related products
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products" className="hover:text-primary">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-primary">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={productImages[activeImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square cursor-pointer rounded-md overflow-hidden border ${
                  activeImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 10vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <Star className="h-5 w-5 fill-primary text-primary" />
                <Star className="h-5 w-5 fill-primary text-primary" />
                <Star className="h-5 w-5 fill-primary text-primary" />
                <Star className="h-5 w-5 text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">(42 reviews)</span>
              </div>
              <span className="text-sm text-muted-foreground">SKU: PRD-{product.id}</span>
            </div>
            <div className="text-3xl font-bold mb-6">{formatNaira(product.price)}</div>
            <p className="text-muted-foreground mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam tincidunt, nisl
              nisi aliquam nunc, vitae aliquam nisl nunc vitae nisl.
            </p>

            <Separator className="my-6" />

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Color</h3>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex space-x-3">
                {colors.map((color) => (
                  <div key={color.id} className="flex items-center space-x-2">
                    <RadioGroupItem id={`color-${color.id}`} value={color.id} className="sr-only" />
                    <Label
                      htmlFor={`color-${color.id}`}
                      className="relative rounded-full w-8 h-8 cursor-pointer flex items-center justify-center"
                    >
                      <span
                        className={`absolute inset-0 rounded-full ${color.value} ${
                          color.id === "white" ? "border border-gray-200" : ""
                        }`}
                      ></span>
                      {selectedColor === color.id && (
                        <span className="absolute inset-0 rounded-full ring-2 ring-primary"></span>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">Size</h3>
                <Button variant="link" className="p-0 h-auto">
                  Size Guide
                </Button>
              </div>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex space-x-3">
                {sizes.map((size) => (
                  <div key={size.id}>
                    <RadioGroupItem id={`size-${size.id}`} value={size.id} className="sr-only" />
                    <Label
                      htmlFor={`size-${size.id}`}
                      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border text-sm font-medium ${
                        selectedSize === size.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input hover:bg-muted"
                      }`}
                    >
                      {size.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" className="rounded-none" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? "text-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share product</span>
              </Button>
            </div>

            {/* Product Features */}
            <div className="space-y-4 text-sm">
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>Free shipping on orders over {formatNaira(25000)}</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>2-year warranty on all products</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Rest of the product detail page content */}
      {/* Product Tabs, Related Products, etc. */}
      {/* Product Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Reviews (42)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-6">
          <div className="prose max-w-none">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam tincidunt, nisl
              nisi aliquam nunc, vitae aliquam nisl nunc vitae nisl. Sed euismod, diam quis aliquam tincidunt, nisl nisi
              aliquam nunc, vitae aliquam nisl nunc vitae nisl.
            </p>
            <p>
              Sed euismod, diam quis aliquam tincidunt, nisl nisi aliquam nunc, vitae aliquam nisl nunc vitae nisl. Sed
              euismod, diam quis aliquam tincidunt, nisl nisi aliquam nunc, vitae aliquam nisl nunc vitae nisl.
            </p>
            <h3>Features</h3>
            <ul>
              <li>High-quality materials</li>
              <li>Durable construction</li>
              <li>Comfortable fit</li>
              <li>Stylish design</li>
              <li>Available in multiple colors and sizes</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="font-medium">Material</span>
                  <span>Cotton, Polyester</span>
                </div>
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="font-medium">Weight</span>
                  <span>0.5 kg</span>
                </div>
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="font-medium">Dimensions</span>
                  <span>30 x 20 x 10 cm</span>
                </div>
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="font-medium">Country of Origin</span>
                  <span>Nigeria</span>
                </div>
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="font-medium">Warranty</span>
                  <span>2 Years</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="font-medium">Shipping</span>
                  <span>Free over {formatNaira(25000)}</span>
                </div>
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="font-medium">Delivery</span>
                  <span>3-5 business days</span>
                </div>
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="font-medium">Returns</span>
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <div className="flex items-center mt-1">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">Based on 42 reviews</span>
                </div>
              </div>
              <Button>Write a Review</Button>
            </div>

            <div className="space-y-6">
              {/* Sample reviews */}
              {[
                { name: "Ade Johnson", time: "2 weeks ago" },
                { name: "Chioma Eze", time: "1 month ago" },
                { name: "Tunde Bakare", time: "3 weeks ago" },
              ].map((reviewer, i) => (
                <div key={i} className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">{reviewer.name}</div>
                    <div className="text-sm text-muted-foreground">{reviewer.time}</div>
                  </div>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">Great product!</h4>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam tincidunt,
                    nisl nisi aliquam nunc, vitae aliquam nisl nunc vitae nisl.
                  </p>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              Load More Reviews
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <motion.div key={relatedProduct.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Link href={`/products/${relatedProduct.id}`}>
                <div className="border rounded-lg overflow-hidden h-full">
                  <div className="relative aspect-square">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                    <p className="text-lg font-bold mt-1">{formatNaira(relatedProduct.price)}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

