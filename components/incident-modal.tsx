"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Clock, MapPin, Camera, TrendingUp, Users, Phone, Navigation } from "lucide-react"

interface IncidentModalProps {
  incident: any
  onClose: () => void
}

export function IncidentModal({ incident, onClose }: IncidentModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Dispatched":
        return "bg-blue-500"
      case "Drone en route":
        return "bg-yellow-500"
      case "EMT arriving in 3 mins":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Incident Detail - {incident.type}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Incident Info */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Incident Type:</span>
                    <Badge variant="destructive">{incident.type}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Location:</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{incident.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Confidence Score:</span>
                    <Badge variant={incident.confidence > 90 ? "default" : "secondary"}>{incident.confidence}%</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Detected:</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>2 minutes ago</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status:</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(incident.status)}`} />
                      <span className="text-sm">{incident.status}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Timeline */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Response Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Incident Detected</p>
                      <p className="text-xs text-gray-500">14:32:15 - AI Confidence: 94%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Drone Dispatched</p>
                      <p className="text-xs text-gray-500">14:32:45 - ETA: 2 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Emergency Services Notified</p>
                      <p className="text-xs text-gray-500">14:33:12 - Fire Dept. responding</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">EMT Arrival</p>
                      <p className="text-xs text-gray-400">ETA: 3 minutes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Assessment */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Impact Assessment</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Affected Area:</span>
                    <span className="text-sm font-medium">50m radius</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">People in Area:</span>
                    <span className="text-sm font-medium">~150 attendees</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk Level:</span>
                    <Badge variant="destructive">High</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Visual Feed & Actions */}
          <div className="space-y-4">
            {/* Live Feed */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Live Drone Feed
                </h4>
                <div className="w-full h-48 bg-gray-900 rounded-lg flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2 opacity-60" />
                    <p className="text-sm opacity-80">Drone Camera View</p>
                    <p className="text-xs opacity-60 mt-1">Sector 4 - Fire Detected</p>
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600 px-2 py-1 rounded text-xs text-white">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
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
                    <Navigation className="h-4 w-4 mr-1" />
                    View Route
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Escalate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-1" />
                    Replay Feed
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-1" />
                    Evacuate Area
                  </Button>
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
                    Fire Department - Unit 7
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Medical Team - Station 3
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Security Chief
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">AI Recommendations</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                    <p className="font-medium text-yellow-800">Immediate Action Required</p>
                    <p className="text-yellow-700">Deploy fire suppression drone to contain spread</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p className="font-medium text-blue-800">Crowd Management</p>
                    <p className="text-blue-700">Redirect foot traffic via alternate routes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Mark as Resolved</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
