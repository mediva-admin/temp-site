"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Move, Trash2, X } from "lucide-react"
import { useState } from "react"

interface Patient {
  id: string
  name: string
}

const initialPatients: Patient[] = [
  { id: "1", name: "Raahul 19M" },
  { id: "2", name: "Mukesh 19M" },
  { id: "3", name: "Mukesh 19M" },
  { id: "4", name: "Mukesh 19M" },
]

export function PatientQueue() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [showMovePopup, setShowMovePopup] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [moveType, setMoveType] = useState<"number" | "minutes">("number")
  const [moveValue, setMoveValue] = useState("")

  const removePatient = (id: string) => {
    setPatients(patients.filter((patient) => patient.id !== id))
  }

  const openMovePopup = (patient: Patient) => {
    setSelectedPatient(patient)
    setShowMovePopup(true)
    setMoveValue("")
  }

  const handleMove = () => {
    if (!selectedPatient || !moveValue) return

    // Here you would implement the actual move logic
    // For now, we'll just log the action
    console.log(`Moving patient ${selectedPatient.name} by ${moveType}: ${moveValue}`)
    
    // Close popup and reset
    setShowMovePopup(false)
    setSelectedPatient(null)
    setMoveValue("")
  }

  const closeMovePopup = () => {
    setShowMovePopup(false)
    setSelectedPatient(null)
    setMoveValue("")
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-sidebar-foreground mb-4">Patient Queue</h2>
      <div className="space-y-2">
        {patients.map((patient) => (
          <Card key={patient.id} className="p-3 bg-card border border-sidebar-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">{patient.name}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openMovePopup(patient)}
                  className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  title="Move patient"
                >
                  <Move className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePatient(patient.id)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  title="Remove patient"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Move Patient Popup */}
      {showMovePopup && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border shadow-lg w-96 max-w-[90vw]">
            {/* Popup Header */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Move className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">Move Patient</h3>
                    <p className="text-sm text-muted-foreground">{selectedPatient.name}</p>
                  </div>
                </div>
                <button
                  onClick={closeMovePopup}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Popup Body */}
            <div className="p-4 space-y-4">
              {/* Move Type Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">Move by:</Label>
                <div className="flex gap-2">
                  <Button
                    variant={moveType === "number" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMoveType("number")}
                    className="flex-1"
                  >
                    Position Number
                  </Button>
                  <Button
                    variant={moveType === "minutes" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMoveType("minutes")}
                    className="flex-1"
                  >
                    Minutes
                  </Button>
                </div>
              </div>

              {/* Move Value Input */}
              <div className="space-y-2">
                <Label htmlFor="moveValue" className="text-sm font-medium text-card-foreground">
                  {moveType === "number" ? "Move to position:" : "Move by minutes:"}
                </Label>
                <Input
                  id="moveValue"
                  type={moveType === "number" ? "number" : "number"}
                  value={moveValue}
                  onChange={(e) => setMoveValue(e.target.value)}
                  placeholder={moveType === "number" ? "Enter position number" : "Enter minutes"}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  {moveType === "number" 
                    ? "Enter the position number where you want to move this patient"
                    : "Enter the number of minutes to move this patient forward or backward"
                  }
                </p>
              </div>
            </div>

            {/* Popup Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-border bg-gray-50/50">
              <Button
                variant="outline"
                onClick={closeMovePopup}
                className="px-6 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleMove}
                disabled={!moveValue}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700"
              >
                Move Patient
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
