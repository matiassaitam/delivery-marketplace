import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">DeliverEase</Link>
        <div className="space-x-4">
          <Button asChild variant="ghost">
            <Link href="/register">Register</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/marketplace">Marketplace</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}