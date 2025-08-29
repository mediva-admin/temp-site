"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PatientFlow } from "./patient-flow";
import { PatientQueue } from "./patient-queue";
import { WorkingArea } from "./working-area";

export function PatientFlowDashboard() {
  const patientData = { 
    name: "Raahul",
    age: "19",
    gender: "Male",
    id: "ID 12345",
    contact: "+91 98765 43210",
    bloodGroup: "O+",
    allergies: "None",
    lastVisit: "15 Dec 2024",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)] gap-4 p-4 pb-20">
        <div className="flex-1 bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-lg font-semibold text-card-foreground">
                {patientData.name} {patientData.age}
                {patientData.gender.charAt(0)}
              </span>
              <span className="text-sm text-muted-foreground">{patientData.id}</span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <Label className="text-xs text-muted-foreground">Contact</Label>
                <p className="font-medium text-card-foreground">{patientData.contact}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Blood Group</Label>
                <p className="font-medium text-card-foreground">{patientData.bloodGroup}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Allergies</Label>
                <p className="font-medium text-card-foreground">{patientData.allergies}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Last Visit</Label>
                <p className="font-medium text-card-foreground">{patientData.lastVisit}</p>
              </div>
            </div>
          </div>

          <div className="flex h-[calc(100%-120px)]">
            {/* Patient Flow Section */}
            <div className="w-80 border-r border-border bg-sidebar/30">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="text-lg font-semibold text-sidebar-foreground">Patient Flow</h2>
              </div>
              <PatientFlow />
            </div>

            {/* Working Area Section */}
            <div className="flex-1 p-6 bg-background/50 overflow-y-auto pb-20">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">Working Area</h2>
              </div>
              <WorkingArea />
            </div>
          </div>
        </div>

        {/* Patient Queue Section */}
        <div className="w-80 bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-lg font-semibold text-card-foreground">Patient Queue</h2>
          </div>
          <PatientQueue />
        </div>
      </div>

      {/* Floating Bottom Action Tab */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-4 shadow-lg z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-card-foreground">
              Patient Flow Actions
            </span>
            <Input
              placeholder="Add remarks..."
              className="w-80"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
