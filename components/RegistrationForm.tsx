'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function RegistrationForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registering user:', { name, email })

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      if (response.ok) {
        console.log('User registered successfully')
        toast({
          title: "Registration Successful",
          description: "Please sign in with your new account.",
        })
        
        // Automatically sign in the user after successful registration
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        })

        if (result.ok) {
          console.log('User signed in after registration')
          router.push('/')
        } else {
          console.error('Error signing in after registration:', result.error)
        }
      } else {
        const error = await response.text()
        console.error('Registration failed:', error)
        toast({
          title: "Registration Failed",
          description: error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error during registration:', error)
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">Register</Button>
    </form>
  )
}