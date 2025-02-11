"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion" // For slide-in effect

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Logging in with", username, password, "Remember me:", rememberMe)
    router.push("/dashboard")
  }

  const handleForgotPassword = async (e: React.FormEvent) =>  {
    e.preventDefault()
    router.push("/forgotpassword") // Navigate to the Forgot Password page
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
      >
        {/* Slide-in Welcome Message */}
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-center mb-6"
        >
          Welcome Back!! Please sign in
        </motion.h1>

        {/* Username Field */}
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            Remember me
          </label>

          {/* Forgot Password Button */}
          <Button variant="link" onClick={handleForgotPassword} className="text-blue-600 hover:underline">
            Forgot Password?
          </Button>
        </div>

        {/* Login Button */}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  )
}
