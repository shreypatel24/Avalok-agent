"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  MapPin,
  AlertTriangle,
  Camera,
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  Zap,
  Play,
  Eye,
  Radio,
} from "lucide-react"

const pulseKeyframes = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 0.6; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-3px) rotate(5deg); }
  }
`

interface CommanderDashboardProps {
  onIncidentClick: (incident: any) => void
  onLostFoundClick: () => void
}

export function CommanderDashboard({ onIncidentClick, onLostFoundClick }: CommanderDashboardProps) {
  const [timelineValue, setTimelineValue] = useState([0])
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null)
  const [drones, setDrones] = useState([
    { id: "DRONE-001", zone: "Zone 2", x: 45, y: 35, status: "Active", battery: 87, signal: "Strong" },
    { id: "DRONE-002", zone: "Zone 4", x: 65, y: 25, status: "Active", battery: 92, signal: "Strong" },
    { id: "DRONE-003", zone: "Zone 6", x: 75, y: 65, status: "Active", battery: 78, signal: "Medium" },
    { id: "DRONE-004", zone: "Zone 1", x: 25, y: 45, status: "Charging", battery: 23, signal: "Weak" },
  ])

  // Simulate drone movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDrones((prevDrones) =>
        prevDrones.map((drone) => ({
          ...drone,
          x: drone.x + (Math.random() - 0.5) * 3,
          y: drone.y + (Math.random() - 0.5) * 3,
          battery: drone.status === "Active" ? Math.max(20, drone.battery - 0.1) : Math.min(100, drone.battery + 2),
        })),
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const incidents = [
    {
      id: 1,
      type: "Fire",
      location: "Sector 4",
      severity: "high",
      time: "2 min ago",
      confidence: 94,
    },
    {
      id: 2,
      type: "Medical",
      location: "North Gate",
      severity: "medium",
      time: "5 min ago",
      confidence: 87,
    },
    {
      id: 3,
      type: "Crowd Surge",
      location: "Main Stage",
      severity: "low",
      time: "8 min ago",
      confidence: 76,
    },
  ]

  const sectorScores = [
    { zone: "Zone 1", safety: 92, sentiment: 85 },
    { zone: "Zone 2", safety: 78, sentiment: 72 },
    { zone: "Zone 3", safety: 95, sentiment: 91 },
    { zone: "Zone 4", safety: 45, sentiment: 38 },
    { zone: "Zone 5", safety: 88, sentiment: 82 },
    { zone: "Zone 6", safety: 91, sentiment: 89 },
  ]

  const handleDroneClick = (droneId: string) => {
    setSelectedDrone(droneId)
  }

  return (
    <div>
      <style jsx>{pulseKeyframes}</style>
      <div className="grid grid-cols-12 gap-4 h-screen max-h-[800px]">
        {/* Main Map Area */}
        <div className="col-span-8 space-y-4">
          <Card className="h-96">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Live Event Map
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full relative">
              <div className="flex gap-4 h-full">
                {/* Legend - Outside Map */}
                <div className="w-32 flex flex-col justify-center">
                  <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-red-500/50">
                    <div className="text-white font-semibold mb-3 text-sm">Crowd Density</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-white text-xs">Critical</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        <span className="text-white text-xs">High</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-white text-xs">Medium</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-white text-xs">Low</span>
                      </div>
                    </div>
                  </div>

                  {/* Alert Status - Outside Map */}
                  <div className="mt-4 bg-red-600/90 backdrop-blur-sm rounded-lg p-2 border border-red-400">
                    <div className="text-white text-xs font-semibold mb-1">FIRE DETECTED</div>
                    <div className="text-red-100 text-xs">Zone 4 - Critical</div>
                  </div>

                  <div className="mt-2 bg-orange-600/90 backdrop-blur-sm rounded-lg p-2 border border-orange-400">
                    <div className="text-white text-xs font-semibold mb-1">MEDICAL</div>
                    <div className="text-orange-100 text-xs">Zone 1 - Medium</div>
                  </div>
                </div>

                {/* Main Map */}
                <div className="flex-1 relative bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                  {/* Dark Map Background with Grid Lines */}
                  <div className="absolute inset-0 bg-gray-900">
                    {/* Map Grid Lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-20">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>

                    {/* Map Roads/Pathways */}
                    <div className="absolute inset-0">
                      {/* Horizontal pathways */}
                      <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-700 opacity-60"></div>
                      <div className="absolute top-2/3 left-0 right-0 h-2 bg-gray-700 opacity-60"></div>

                      {/* Vertical pathways */}
                      <div className="absolute left-1/3 top-0 bottom-0 w-2 bg-gray-700 opacity-60"></div>
                      <div className="absolute left-2/3 top-0 bottom-0 w-2 bg-gray-700 opacity-60"></div>

                      {/* Main entrance pathway */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-16 bg-gray-600 opacity-70"></div>
                    </div>

                    {/* Building/Structure Outlines */}
                    <div className="absolute inset-0">
                      {/* Main Stage Structure */}
                      <div className="absolute top-4 right-8 w-16 h-12 border-2 border-gray-600 bg-gray-800 opacity-80 rounded">
                        <div className="text-xs text-gray-400 text-center mt-2">STAGE</div>
                      </div>

                      {/* Food Court */}
                      <div className="absolute bottom-8 left-8 w-12 h-8 border-2 border-gray-600 bg-gray-800 opacity-80 rounded">
                        <div className="text-xs text-gray-400 text-center mt-1">FOOD</div>
                      </div>

                      {/* Security Posts */}
                      <div className="absolute top-1/2 left-4 w-4 h-4 bg-blue-700 opacity-80 rounded-full"></div>
                      <div className="absolute top-1/2 right-4 w-4 h-4 bg-blue-700 opacity-80 rounded-full"></div>
                    </div>
                  </div>

                  {/* Map Zones with Dark Theme */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 p-2">
                    {[1, 2, 3, 4, 5, 6].map((zone) => (
                      <div
                        key={zone}
                        className={`border border-gray-600 rounded flex items-center justify-center text-xs font-semibold ${
                          zone === 4 ? "bg-red-900/30 border-red-500 text-red-300" : "bg-gray-800/20 text-gray-400"
                        }`}
                      >
                        Zone {zone}
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Realistic Crowd Heatmap Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* CRITICAL ALERT - Incident Area (Zone 4) */}
                    <div
                      className="absolute w-20 h-20 rounded-full"
                      style={{
                        top: "25%",
                        left: "60%",
                        background: `radial-gradient(circle,
                          rgba(239, 68, 68, 0.95) 0%,
                          rgba(220, 38, 38, 0.9) 20%,
                          rgba(185, 28, 28, 0.8) 40%,
                          rgba(153, 27, 27, 0.6) 60%,
                          rgba(127, 29, 29, 0.4) 80%,
                          rgba(127, 29, 29, 0.1) 100%
                        )`,
                        filter: "blur(1px)",
                        animation: "pulse 1.5s ease-in-out infinite",
                        boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)",
                      }}
                    />

                    {/* HIGH DENSITY - Main Stage area */}
                    <div
                      className="absolute w-24 h-24 rounded-full"
                      style={{
                        top: "15%",
                        right: "25%",
                        background: `radial-gradient(circle, 
                          rgba(220, 38, 38, 0.8) 0%,
                          rgba(239, 68, 68, 0.7) 25%,
                          rgba(249, 115, 22, 0.6) 50%,
                          rgba(251, 191, 36, 0.4) 70%,
                          rgba(34, 197, 94, 0.2) 85%,
                          rgba(59, 130, 246, 0.1) 100%
                        )`,
                        filter: "blur(2px)",
                        animation: "pulse 3s ease-in-out infinite",
                      }}
                    />

                    {/* MEDIUM-HIGH DENSITY - Food court */}
                    <div
                      className="absolute w-18 h-18 rounded-full"
                      style={{
                        bottom: "20%",
                        left: "15%",
                        background: `radial-gradient(circle,
                          rgba(249, 115, 22, 0.8) 0%,
                          rgba(251, 191, 36, 0.7) 35%,
                          rgba(34, 197, 94, 0.5) 60%,
                          rgba(59, 130, 246, 0.3) 80%,
                          rgba(59, 130, 246, 0.1) 100%
                        )`,
                        filter: "blur(1.5px)",
                        animation: "pulse 4s ease-in-out infinite",
                      }}
                    />

                    {/* MEDIUM DENSITY - Entry point */}
                    <div
                      className="absolute w-14 h-14 rounded-full"
                      style={{
                        top: "60%",
                        right: "15%",
                        background: `radial-gradient(circle,
                          rgba(251, 191, 36, 0.7) 0%,
                          rgba(34, 197, 94, 0.6) 50%,
                          rgba(59, 130, 246, 0.4) 75%,
                          rgba(59, 130, 246, 0.1) 100%
                        )`,
                        filter: "blur(1px)",
                        animation: "pulse 5s ease-in-out infinite",
                      }}
                    />

                    {/* LOW DENSITY areas */}
                    <div
                      className="absolute w-12 h-12 rounded-full"
                      style={{
                        bottom: "35%",
                        right: "40%",
                        background: `radial-gradient(circle,
                          rgba(34, 197, 94, 0.5) 0%,
                          rgba(59, 130, 246, 0.4) 60%,
                          rgba(59, 130, 246, 0.1) 100%
                        )`,
                        filter: "blur(1px)",
                        animation: "pulse 6s ease-in-out infinite",
                      }}
                    />

                    <div
                      className="absolute w-10 h-10 rounded-full"
                      style={{
                        top: "70%",
                        left: "30%",
                        background: `radial-gradient(circle,
                          rgba(59, 130, 246, 0.4) 0%,
                          rgba(59, 130, 246, 0.2) 70%,
                          rgba(59, 130, 246, 0.05) 100%
                        )`,
                        filter: "blur(0.5px)",
                        animation: "pulse 7s ease-in-out infinite",
                      }}
                    />
                  </div>

                  {/* Multiple Moving Drones */}
                  {drones.map((drone) => (
                    <div
                      key={drone.id}
                      className="absolute transition-all duration-2000 ease-in-out z-10 cursor-pointer"
                      style={{
                        left: `${drone.x}%`,
                        top: `${drone.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      onClick={() => handleDroneClick(drone.id)}
                    >
                      <div className="relative group">
                        {/* Enhanced Drone Icon */}
                        <div className="relative">
                          <Radio
                            className={`h-6 w-6 ${
                              drone.status === "Active" ? "text-cyan-400" : "text-gray-500"
                            } drop-shadow-lg`}
                            style={{ animation: drone.status === "Active" ? "float 2s ease-in-out infinite" : "none" }}
                          />
                          <div
                            className={`absolute inset-0 w-6 h-6 ${
                              drone.status === "Active" ? "bg-cyan-400" : "bg-gray-500"
                            } rounded-full opacity-20 animate-ping`}
                          ></div>
                        </div>

                        {/* Drone Info Tooltip */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {drone.id} - {drone.battery}%
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Status Indicator */}
                  <div className="absolute top-2 right-2 bg-gray-800/90 backdrop-blur-sm rounded px-2 py-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-300">LIVE MONITORING</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Drone Management Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Radio className="h-5 w-5" />
                Active Drones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Drone ID</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Battery</TableHead>
                    <TableHead>Signal</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drones.map((drone) => (
                    <TableRow key={drone.id} className={selectedDrone === drone.id ? "bg-blue-50" : ""}>
                      <TableCell className="font-medium">{drone.id}</TableCell>
                      <TableCell>{drone.zone}</TableCell>
                      <TableCell>
                        <Badge variant={drone.status === "Active" ? "default" : "secondary"}>{drone.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                drone.battery > 50
                                  ? "bg-green-500"
                                  : drone.battery > 20
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${drone.battery}%` }}
                            />
                          </div>
                          <span className="text-xs">{Math.round(drone.battery)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            drone.signal === "Strong"
                              ? "default"
                              : drone.signal === "Medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {drone.signal}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => handleDroneClick(drone.id)}>
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3 mr-1" />
                            Record
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Forecast Timeline */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Forecast Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Slider value={timelineValue} onValueChange={setTimelineValue} max={24} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Now</span>
                  <span>+6h</span>
                  <span>+12h</span>
                  <span>+18h</span>
                  <span>+24h</span>
                </div>
                <p className="text-sm text-gray-600">
                  Predicted crowd density at {timelineValue[0]}:00 -
                  <span className="font-semibold text-orange-600"> High concentration near Main Stage</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4 space-y-4">
          {/* Selected Drone Feed */}
          {selectedDrone && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  {selectedDrone} - Live Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-32 bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2 opacity-60" />
                    <p className="text-sm opacity-80">Live Video Stream</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs">RECORDING</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Live Incidents */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Live Incidents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {incidents.map((incident) => (
                <div
                  key={incident.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => onIncidentClick(incident)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Badge
                      variant={
                        incident.severity === "high"
                          ? "destructive"
                          : incident.severity === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {incident.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{incident.time}</span>
                  </div>
                  <p className="text-sm font-medium">{incident.location}</p>
                  <p className="text-xs text-gray-600">Confidence: {incident.confidence}%</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Command Chat */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Command Chat (Gemini AI)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 max-h-32 overflow-y-auto">
                <div className="bg-blue-50 p-2 rounded text-sm">
                  <strong>You:</strong> What's happening in Zone 6?
                </div>
                <div className="bg-gray-50 p-2 rounded text-sm">
                  <strong>Gemini:</strong> Zone 6 shows normal activity. Safety score: 91%, Sentiment: 89%. No incidents
                  detected.
                </div>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Ask Gemini about any zone..." className="text-sm" />
                <Button size="sm">Send</Button>
              </div>
            </CardContent>
          </Card>

          {/* Zone Scores */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Zone Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sectorScores.map((zone) => (
                <div key={zone.zone} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{zone.zone}</span>
                    <div className="flex gap-2">
                      <span className="text-xs">Safety: {zone.safety}%</span>
                      <span className="text-xs">Mood: {zone.sentiment}%</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${zone.safety > 80 ? "bg-green-500" : zone.safety > 60 ? "bg-yellow-500" : "bg-red-500"}`}
                        style={{ width: `${zone.safety}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${zone.sentiment > 80 ? "bg-green-500" : zone.sentiment > 60 ? "bg-yellow-500" : "bg-red-500"}`}
                        style={{ width: `${zone.sentiment}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" onClick={onLostFoundClick}>
                <Users className="h-4 w-4 mr-2" />
                Lost & Found Search
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Broadcast
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Camera className="h-4 w-4 mr-2" />
                Deploy Additional Drones
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
