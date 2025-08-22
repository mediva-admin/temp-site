"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

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

  const removePatient = (id: string) => {
    setPatients(patients.filter((patient) => patient.id !== id))
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-sidebar-foreground mb-4">Patient Queue</h2>
      <div className="space-y-2">
        {patients.map((patient) => (
          <Card key={patient.id} className="p-3 bg-card border border-sidebar-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">{patient.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePatient(patient.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
