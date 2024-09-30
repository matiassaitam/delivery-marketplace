"use client"

import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from '@/hooks/use-toast'

// You would typically store this in an environment variable
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'

interface Deliverer {
  id: string
  name: string
  location: { lat: number; lng: number }
  distance: number
}

interface DeliveryRequest {
  id: string
  pickupAddress: string
  deliveryAddress: string
  itemDescription: string
}

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 0,
  lng: 0
}

export default function Marketplace() {
  const [deliverers, setDeliverers] = useState<Deliverer[]>([])
  const [selectedDeliverer, setSelectedDeliverer] = useState<Deliverer | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [deliveryRequests, setDeliveryRequests] = useState<DeliveryRequest[]>([])
  const [newRequest, setNewRequest] = useState({
    pickupAddress: '',
    deliveryAddress: '',
    itemDescription: '',
  })

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          toast({
            title: "Geolocation error",
            description: "Unable to retrieve your location",
            variant: "destructive",
          })
        }
      )
    }

    // Fetch deliverers and delivery requests
    fetchDeliverers()
    fetchDeliveryRequests()
  }, [])

  const fetchDeliverers = async () => {
    // This would be an API call in a real application
    const mockDeliverers: Deliverer[] = [
      { id: '1', name: 'John Doe', location: { lat: 0.01, lng: 0.01 }, distance: 1.5 },
      { id: '2', name: 'Jane Smith', location: { lat: -0.01, lng: -0.01 }, distance: 2.3 },
    ]
    setDeliverers(mockDeliverers)
  }

  const fetchDeliveryRequests = async () => {
    // This would be an API call in a real application
    const mockRequests: DeliveryRequest[] = [
      { id: '1', pickupAddress: '123 Main St', deliveryAddress: '456 Elm St', itemDescription: 'Small package' },
      { id: '2', pickupAddress: '789 Oak St', deliveryAddress: '101 Pine St', itemDescription: 'Large box' },
    ]
    setDeliveryRequests(mockRequests)
  }

  const handleHire = (deliverer: Deliverer) => {
    setSelectedDeliverer(deliverer)
    toast({
      title: "Deliverer selected",
      description: `You've selected ${deliverer.name} for your delivery.`,
    })
  }

  const handleNewRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    // This would be an API call in a real application
    const newDeliveryRequest = {
      id: String(Date.now()),
      ...newRequest,
    }
    setDeliveryRequests([...deliveryRequests, newDeliveryRequest])
    setNewRequest({ pickupAddress: '', deliveryAddress: '', itemDescription: '' })
    toast({
      title: "Delivery request created",
      description: "Your delivery request has been added to the marketplace.",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Available Deliverers</CardTitle>
          </CardHeader>
          <CardContent>
            {deliverers.map((deliverer) => (
              <div key={deliverer.id} className="mb-4 p-4 border rounded">
                <h3 className="font-bold">{deliverer.name}</h3>
                <p>Distance: {deliverer.distance} km</p>
                <Button onClick={() => handleHire(deliverer)}>Hire</Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Map</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={userLocation || center}
                zoom={10}
              >
                {userLocation && (
                  <Marker
                    position={userLocation}
                    icon={{
                      url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    }}
                  />
                )}
                {deliverers.map((deliverer) => (
                  <Marker
                    key={deliverer.id}
                    position={deliverer.location}
                    onClick={() => setSelectedDeliverer(deliverer)}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create Delivery Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewRequest} className="space-y-4">
              <div>
                <Label htmlFor="pickupAddress">Pickup Address</Label>
                <Input
                  id="pickupAddress"
                  value={newRequest.pickupAddress}
                  onChange={(e) => setNewRequest({ ...newRequest, pickupAddress: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="deliveryAddress">Delivery Address</Label>
                <Input
                  id="deliveryAddress"
                  value={newRequest.deliveryAddress}
                  onChange={(e) => setNewRequest({ ...newRequest, deliveryAddress: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="itemDescription">Item Description</Label>
                <Input
                  id="itemDescription"
                  value={newRequest.itemDescription}
                  onChange={(e) => setNewRequest({ ...newRequest, itemDescription: e.target.value })}
                  required
                />
              </div>
              <Button type="submit">Create Request</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Delivery Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {deliveryRequests.map((request) => (
              <div key={request.id} className="mb-4 p-4 border rounded">
                <h3 className="font-bold">Request #{request.id}</h3>
                <p>Pickup: {request.pickupAddress}</p>
                <p>Delivery: {request.deliveryAddress}</p>
                <p>Item: {request.itemDescription}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}