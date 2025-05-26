"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "citizen" | "officer" | "admin"
  cnic: string
  phone: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token and validate
    const token = localStorage.getItem("auth_token")
    if (token) {
      // Simulate user data - in real app, validate token with API
      setUser({
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        role: "citizen",
        cnic: "12345-1234567-1",
        phone: "+92-300-1234567",
      })
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data based on email
    const mockUser: User = {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email,
      role: email.includes("admin") ? "admin" : email.includes("officer") ? "officer" : "citizen",
      cnic: "12345-1234567-1",
      phone: "+92-300-1234567",
    }

    setUser(mockUser)
    localStorage.setItem("auth_token", "mock_token_123")
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_token")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
