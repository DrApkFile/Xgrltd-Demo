"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  checkAuthAndRedirect: (redirectTo: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    }
  }, [])

  // Check if the current path requires authentication
  useEffect(() => {
    const protectedRoutes = ["/dashboard", "/products", "/cart", "/checkout"]

    // Check if the current path starts with any protected route
    const requiresAuth = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

    if (requiresAuth && !isAuthenticated) {
      router.push("/login")
    }
  }, [pathname, isAuthenticated, router])

  const login = async (email: string, password: string) => {
    // This is a dummy login function
    // In a real app, you would make an API call to authenticate

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a dummy user
    const dummyUser = {
      id: "user-1",
      name: email.split("@")[0],
      email,
    }

    // Save user to state and localStorage
    setUser(dummyUser)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(dummyUser))

    // Redirect to dashboard
    router.push("/dashboard")
  }

  const signup = async (name: string, email: string, password: string) => {
    // This is a dummy signup function
    // In a real app, you would make an API call to register

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a dummy user
    const dummyUser = {
      id: "user-" + Date.now(),
      name,
      email,
    }

    // Save user to state and localStorage
    setUser(dummyUser)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(dummyUser))

    // Redirect to dashboard
    router.push("/dashboard")
  }

  const logout = () => {
    // Clear user from state and localStorage
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")

    // Redirect to home
    router.push("/")
  }

  const checkAuthAndRedirect = (redirectTo: string): boolean => {
    if (!isAuthenticated) {
      router.push("/login")
      return false
    }
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        checkAuthAndRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

