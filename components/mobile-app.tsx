"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mic,
  MapPin,
  User,
  Navigation,
  AlertTriangle,
  Phone,
  Heart,
  Droplets,
  Users,
  Bell,
  MessageSquare,
} from "lucide-react"

export function MobileApp() {
  const [isRecording, setIsRecording] = useState(false)
  const [activeTab, setActiveTab] = useState("staff")

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="staff">Ground Staff App</TabsTrigger>
          <TabsTrigger value="attendee">Attendee App</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Staff Mobile Interface */}
            <Card className="max-w-sm mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Staff Command App</CardTitle>
                <p className="text-sm text-gray-600">Ground Team Interface</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Voice Input */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3 text-center">Voice Report</h4>
                    <div className="text-center space-y-3">
                      <Button
                        size="lg"
                        className={`w-24 h-24 rounded-full ${isRecording ? "bg-red-500 hover:bg-red-600" : ""}`}
                        onClick={() => setIsRecording(!isRecording)}
                      >
                        <Mic className={`h-8 w-8 ${isRecording ? "animate-pulse" : ""}`} />
                      </Button>
                      <p className="text-sm text-gray-600">
                        {isRecording ? "Recording... Tap to stop" : "Hold to speak"}
                      </p>
                      {isRecording && (
                        <div className="text-xs text-red-600 animate-pulse">
                          "Medical issue near North Gate, elderly person needs assistance"
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Current Assignment */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Current Assignment</h4>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Medical Response</span>
                      </div>
                      <p className="text-sm text-blue-800 mb-2">Proceed to Zone 3 - North Gate</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Navigation className="h-4 w-4 mr-1" />
                          Navigate
                        </Button>
                        <Button size="sm">Arrived</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Emergency
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        Medical
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-1" />
                        Lost Person
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call HQ
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Status */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge variant="default">On Duty</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium">Location:</span>
                      <span className="text-sm">Zone 2</span>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Notifications Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Live Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-900">High Priority</span>
                    <Badge variant="destructive" className="text-xs">
                      New
                    </Badge>
                  </div>
                  <p className="text-sm text-red-800">Fire detected in Sector 4 - All units avoid area</p>
                  <p className="text-xs text-red-600 mt-1">2 minutes ago</p>
                </div>

                <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-900">Assignment</span>
                  </div>
                  <p className="text-sm text-yellow-800">Medical assistance needed - Zone 3 North Gate</p>
                  <p className="text-xs text-yellow-600 mt-1">5 minutes ago</p>
                </div>

                <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Update</span>
                  </div>
                  <p className="text-sm text-blue-800">Lost child found safe in Zone 1 - case closed</p>
                  <p className="text-xs text-blue-600 mt-1">8 minutes ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendee" className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Attendee Mobile Interface */}
            <Card className="max-w-sm mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Event Companion</CardTitle>
                <p className="text-sm text-gray-600">Your Safety & Navigation App</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Emergency Actions */}
                <Card className="border-red-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3 text-red-900">Emergency</h4>
                    <div className="space-y-2">
                      <Button variant="destructive" size="sm" className="w-full">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Emergency Help
                      </Button>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Heart className="h-4 w-4 mr-2" />
                        Medical Assistance
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Report Lost Person */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Report Lost Person</h4>
                    <div className="space-y-3">
                      <Input placeholder="Person's name" />
                      <Input placeholder="Description" />
                      <Input placeholder="Last seen location" />
                      <Button size="sm" className="w-full">
                        <User className="h-4 w-4 mr-2" />
                        Submit Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Navigate To</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Droplets className="h-4 w-4 mr-1" />
                        Water
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        First Aid
                      </Button>
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-1" />
                        Exit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-1" />
                        Meet Point
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Find Friends */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Find Friends</h4>
                    <div className="space-y-2">
                      <Input placeholder="Enter friend's phone or ID" />
                      <Button size="sm" className="w-full">
                        <MapPin className="h-4 w-4 mr-2" />
                        Locate Friend
                      </Button>
                    </div>
                    <div className="mt-3 p-2 bg-green-50 rounded text-sm">
                      <p className="font-medium text-green-900">Sarah M.</p>
                      <p className="text-green-700">Near Main Stage - 150m away</p>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Safety Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Safety Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current Alerts */}
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">Current Alerts</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="text-sm">Avoid Sector 4 - Emergency Response in Progress</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        <span className="text-sm">High crowd density near Main Stage</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Safe Routes */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Recommended Safe Routes</h4>
                    <div className="space-y-2">
                      <div className="p-2 border rounded flex items-center justify-between">
                        <span className="text-sm">To Main Exit</span>
                        <Button size="sm" variant="outline">
                          <Navigation className="h-4 w-4 mr-1" />
                          Navigate
                        </Button>
                      </div>
                      <div className="p-2 border rounded flex items-center justify-between">
                        <span className="text-sm">To Food Court</span>
                        <Button size="sm" variant="outline">
                          <Navigation className="h-4 w-4 mr-1" />
                          Navigate
                        </Button>
                      </div>
                      <div className="p-2 border rounded flex items-center justify-between">
                        <span className="text-sm">To Restrooms</span>
                        <Button size="sm" variant="outline">
                          <Navigation className="h-4 w-4 mr-1" />
                          Navigate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contacts */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Emergency Contacts</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Event Security: (555) 123-4567
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Medical: (555) 987-6543
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Lost & Found: (555) 456-7890
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
