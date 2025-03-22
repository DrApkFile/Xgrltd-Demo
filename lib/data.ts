import type { Product } from "@/components/cart-provider"

// Generate dummy products data with Naira prices
export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 75000,
    image: "/images/product-headphones.png",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 120000,
    image: "/images/product-smartwatch.png",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 45000,
    image: "/images/product-speaker.png",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Ultra Slim Laptop Pro",
    price: 850000,
    image: "/images/product-laptop.png",
    category: "Electronics",
  },
  {
    id: 5,
    name: "Smartphone X Pro Max",
    price: 450000,
    image: "/images/product-phone.png",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Tablet Air 4",
    price: 320000,
    image: "/images/product-tablet.png",
    category: "Electronics",
  },
  {
    id: 7,
    name: "Digital Camera 4K",
    price: 280000,
    image: "/images/product-camera.png",
    category: "Electronics",
  },
  {
    id: 8,
    name: "Running Shoes Air Max",
    price: 65000,
    image: "/images/product-shoes.png",
    category: "Fashion",
  },
  {
    id: 9,
    name: "Summer Floral Dress",
    price: 38000,
    image: "/images/product-dress.png",
    category: "Fashion",
  },
  {
    id: 10,
    name: "Designer Handbag",
    price: 95000,
    image: "/images/product-bag.png",
    category: "Fashion",
  },
  {
    id: 11,
    name: "Luxury Wrist Watch",
    price: 150000,
    image: "/images/product-watch.png",
    category: "Fashion",
  },
  {
    id: 12,
    name: "Kitchen Blender Pro",
    price: 42000,
    image: "/images/product-blender.png",
    category: "Home & Kitchen",
  },
]

// Generate team members data
export const teamMembers = [
  {
    id: 1,
    name: "John Adebayo",
    role: "CEO & Founder",
    bio: "John has over 15 years of experience in retail and e-commerce. He founded XGRLTD with a vision to create a seamless shopping experience for customers.",
    image: "/images/team-ceo.png",
  },
  {
    id: 2,
    name: "Amara Okafor",
    role: "Chief Operations Officer",
    bio: "Amara oversees all operational aspects of XGRLTD, ensuring that customers receive their orders promptly and efficiently.",
    image: "/images/team-coo.png",
  },
  {
    id: 3,
    name: "Michael Oluwaseun",
    role: "Chief Technology Officer",
    bio: "Michael leads our technology team, constantly innovating to improve the online shopping experience for our customers.",
    image: "/images/team-cto.png",
  },
  {
    id: 4,
    name: "Sarah Nwosu",
    role: "Head of Marketing",
    bio: "Sarah develops and implements our marketing strategies, helping us reach more customers and grow our brand.",
    image: "/images/team-marketing.png",
  },
  {
    id: 5,
    name: "David Eze",
    role: "Customer Service Manager",
    bio: "David ensures that our customers receive the best possible support and assistance with their purchases.",
    image: "/images/team-csm.png",
  },
  {
    id: 6,
    name: "Ngozi Chukwu",
    role: "Product Manager",
    bio: "Ngozi works with suppliers to curate our product selection, ensuring we offer high-quality items at competitive prices.",
    image: "/images/team-pm.png",
  },
]

// Order history data
export const orderHistory = [
  {
    id: "ORD-39472",
    date: "2023-06-15",
    status: "Delivered",
    total: 129500,
    items: [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 75000,
        quantity: 1,
        image: "/images/product-headphones.png",
      },
      {
        id: 8,
        name: "Running Shoes Air Max",
        price: 65000,
        quantity: 1,
        image: "/images/product-shoes.png",
      },
    ],
    shippingAddress: {
      name: "Oluwaseun Ajayi",
      street: "15 Admiralty Way",
      city: "Lekki",
      state: "Lagos",
      zipCode: "105102",
      country: "Nigeria",
    },
    paymentMethod: {
      type: "Credit Card",
      last4: "4242",
      expiryDate: "05/25",
      image: "/images/payment-visa.png",
    },
    trackingNumber: "NGP8374628937",
  },
  {
    id: "ORD-28561",
    date: "2023-05-22",
    status: "Delivered",
    total: 450000,
    items: [
      {
        id: 5,
        name: "Smartphone X Pro Max",
        price: 450000,
        quantity: 1,
        image: "/images/product-phone.png",
      },
    ],
    shippingAddress: {
      name: "Oluwaseun Ajayi",
      street: "15 Admiralty Way",
      city: "Lekki",
      state: "Lagos",
      zipCode: "105102",
      country: "Nigeria",
    },
    paymentMethod: {
      type: "Paystack",
      last4: "2389",
      expiryDate: "N/A",
      image: "/images/payment-paystack.png",
    },
    trackingNumber: "NGP7263518264",
  },
  {
    id: "ORD-19384",
    date: "2023-07-03",
    status: "Processing",
    total: 320000,
    items: [
      {
        id: 6,
        name: "Tablet Air 4",
        price: 320000,
        quantity: 1,
        image: "/images/product-tablet.png",
      },
    ],
    shippingAddress: {
      name: "Oluwaseun Ajayi",
      street: "15 Admiralty Way",
      city: "Lekki",
      state: "Lagos",
      zipCode: "105102",
      country: "Nigeria",
    },
    paymentMethod: {
      type: "Flutterwave",
      last4: "7890",
      expiryDate: "N/A",
      image: "/images/payment-flutterwave.png",
    },
    trackingNumber: "Pending",
  },
  {
    id: "ORD-09283",
    date: "2023-07-10",
    status: "Shipped",
    total: 133000,
    items: [
      {
        id: 9,
        name: "Summer Floral Dress",
        price: 38000,
        quantity: 1,
        image: "/images/product-dress.png",
      },
      {
        id: 10,
        name: "Designer Handbag",
        price: 95000,
        quantity: 1,
        image: "/images/product-bag.png",
      },
    ],
    shippingAddress: {
      name: "Oluwaseun Ajayi",
      street: "15 Admiralty Way",
      city: "Lekki",
      state: "Lagos",
      zipCode: "105102",
      country: "Nigeria",
    },
    paymentMethod: {
      type: "Credit Card",
      last4: "5678",
      expiryDate: "09/24",
      image: "/images/payment-mastercard.png",
    },
    trackingNumber: "NGP9283746523",
  },
]

// Wishlist data
export const wishlistItems = [
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 120000,
    image: "/images/product-smartwatch.png",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Ultra Slim Laptop Pro",
    price: 850000,
    image: "/images/product-laptop.png",
    category: "Electronics",
  },
  {
    id: 7,
    name: "Digital Camera 4K",
    price: 280000,
    image: "/images/product-camera.png",
    category: "Electronics",
  },
  {
    id: 11,
    name: "Luxury Wrist Watch",
    price: 150000,
    image: "/images/product-watch.png",
    category: "Fashion",
  },
]

// User addresses
export const userAddresses = [
  {
    id: 1,
    type: "Home",
    default: true,
    name: "Oluwaseun Ajayi",
    phone: "+234 812 345 6789",
    street: "15 Admiralty Way",
    city: "Lekki",
    state: "Lagos",
    zipCode: "105102",
    country: "Nigeria",
  },
  {
    id: 2,
    type: "Work",
    default: false,
    name: "Oluwaseun Ajayi",
    phone: "+234 809 876 5432",
    street: "25 Broad Street",
    city: "Marina",
    state: "Lagos",
    zipCode: "101233",
    country: "Nigeria",
  },
]

// Payment methods
export const paymentMethods = [
  {
    id: 1,
    type: "Credit Card",
    default: true,
    cardType: "Visa",
    last4: "4242",
    expiryDate: "05/25",
    image: "/images/payment-visa.png",
  },
  {
    id: 2,
    type: "Credit Card",
    default: false,
    cardType: "Mastercard",
    last4: "5678",
    expiryDate: "09/24",
    image: "/images/payment-mastercard.png",
  },
  {
    id: 3,
    type: "Paystack",
    default: false,
    last4: "2389",
    expiryDate: "N/A",
    image: "/images/payment-paystack.png",
  },
  {
    id: 4,
    type: "Flutterwave",
    default: false,
    last4: "7890",
    expiryDate: "N/A",
    image: "/images/payment-flutterwave.png",
  },
]

// User profile data
export const userProfile = {
  id: "user-1",
  name: "Oluwaseun Ajayi",
  email: "oluwaseun.ajayi@example.com",
  phone: "+234 812 345 6789",
  avatar: "/images/user-avatar.png",
  dateJoined: "January 15, 2022",
  totalOrders: 12,
  totalSpent: 2450000,
  preferences: {
    marketingEmails: true,
    orderNotifications: true,
    twoFactorAuth: false,
    darkMode: false,
  },
}

