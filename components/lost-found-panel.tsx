"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, Search, MapPin, Camera, Clock, User, CheckCircle } from "lucide-react"

export function LostFoundPanel() {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate AI search
    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          confidence: 94,
          location: "Sector 3, Near Food Court",
          timestamp: "3 minutes ago",
          description: "Child matching description found",
          droneView: true,
        },
        {
          id: 2,
          confidence: 78,
          location: "Sector 1, Main Entrance",
          timestamp: "8 minutes ago",
          description: "Partial match - similar clothing",
          droneView: true,
        },
      ])
      setIsSearching(false)
    }, 2000)
  }

  return (
    <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
      {/* Search Input Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Lost Person Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Photo Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Photo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Describe the person: age, clothing, distinctive features..."
              className="min-h-20"
              defaultValue="7-year-old boy, red t-shirt, blue jeans, brown hair, carrying a blue backpack"
            />
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Seen Location</label>
              <Input placeholder="e.g., Near Main Stage" defaultValue="Food Court Area" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Last Seen</label>
              <Input placeholder="e.g., 2:30 PM" defaultValue="15 minutes ago" />
            </div>
          </div>

          <Button onClick={handleSearch} className="w-full" disabled={isSearching}>
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Searching with AI...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search with Gemini AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Search Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          {searchResults.length === 0 && !isSearching && (
            <div className="text-center py-8 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Enter details and search to find matches</p>
            </div>
          )}

          {isSearching && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3" />
              <p className="text-gray-600">AI analyzing crowd footage...</p>
            </div>
          )}

          <div className="space-y-4">
            {searchResults.map((result) => (
              <div key={result.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={result.confidence > 90 ? "default" : "secondary"}>{result.confidence}% Match</Badge>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {result.timestamp}
                    </Badge>
                  </div>
                  {result.confidence > 90 && <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>

                <p className="font-medium mb-2">{result.description}</p>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{result.location}</span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <MapPin className="h-4 w-4 mr-1" />
                    Show on Map
                  </Button>
                  <Button size="sm" variant="outline">
                    <Camera className="h-4 w-4 mr-1" />
                    Drone View
                  </Button>
                  {result.confidence > 90 && <Button size="sm">Dispatch Team</Button>}
                </div>
              </div>
            ))}
          </div>

          {searchResults.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Gemini AI Summary</h4>
              <p className="text-sm text-blue-800">
                High confidence match found in Sector 3. Child appears to be safe and unaccompanied near the food court.
                Recommend immediate dispatch of security personnel to location.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
