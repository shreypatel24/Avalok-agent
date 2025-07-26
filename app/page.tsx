"use client"

import { useState } from "react"
import { CommanderDashboard } from "@/components/commander-dashboard"
import { LostFoundPanel } from "@/components/lost-found-panel"
import { IncidentModal } from "@/components/incident-modal"
import { MobileApp } from "@/components/mobile-app"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WireframePage() {
  const [activeIncident, setActiveIncident] = useState<any>(null)
  const [showLostFound, setShowLostFound] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crowd Management System - Wireframes</h1>
          <p className="text-gray-600">Interactive prototypes for emergency response and crowd control</p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Commander Dashboard</TabsTrigger>
            <TabsTrigger value="lost-found">Lost & Found</TabsTrigger>
            <TabsTrigger value="incident">Incident Detail</TabsTrigger>
            <TabsTrigger value="mobile">Mobile App</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <CommanderDashboard onIncidentClick={setActiveIncident} onLostFoundClick={() => setShowLostFound(true)} />
          </TabsContent>

          <TabsContent value="lost-found" className="mt-6">
            <LostFoundPanel />
          </TabsContent>

          <TabsContent value="incident" className="mt-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Incident Detail View</h3>
              <p className="text-gray-600 mb-4">
                Click on an incident in the Commander Dashboard to see the detail modal.
              </p>
              <Button
                onClick={() =>
                  setActiveIncident({
                    id: "demo-incident",
                    type: "Fire",
                    location: "Sector 4",
                    confidence: 94,
                    timestamp: new Date(),
                    status: "Drone en route",
                  })
                }
              >
                Show Demo Incident
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="mt-6">
            <MobileApp />
          </TabsContent>
        </Tabs>

        {/* Incident Modal */}
        {activeIncident && <IncidentModal incident={activeIncident} onClose={() => setActiveIncident(null)} />}
      </div>
    </div>
  )
}
