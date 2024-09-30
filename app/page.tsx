import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, Package, Truck } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-background">
      <h1 className="text-5xl font-bold mb-8 text-center">Welcome to DeliverEase</h1>
      <p className="text-xl mb-12 text-center max-w-2xl">
        Connect with local deliverers and get your items delivered quickly and efficiently.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
          <Package size={48} className="mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-2">Need something delivered?</h2>
          <p className="text-center mb-4">Post your delivery request and connect with local deliverers.</p>
          <Button asChild>
            <Link href="/register">Get Started <ArrowRight className="ml-2" size={16} /></Link>
          </Button>
        </div>
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
          <Truck size={48} className="mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-2">Want to become a deliverer?</h2>
          <p className="text-center mb-4">Sign up as a deliverer and start earning money today.</p>
          <Button asChild>
            <Link href="/register-deliverer">Join as Deliverer <ArrowRight className="ml-2" size={16} /></Link>
          </Button>
        </div>
      </div>
      <Button asChild size="lg" variant="outline">
        <Link href="/marketplace">Explore Marketplace</Link>
      </Button>
    </div>
  )
}