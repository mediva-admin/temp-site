"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

interface FlowStep {
  id: string
  title: string
  remarks?: string
  status: "completed" | "current" | "pending"
}

const initialSteps: FlowStep[] = [
  { id: "1", title: "Reception", remarks: "Patient checked in", status: "completed" },
  { id: "2", title: "Billing", remarks: "Insurance verified", status: "completed" },
  { id: "3", title: "Optometrist", remarks: "Eye examination in progress", status: "current" },
  { id: "4", title: "Scan", status: "pending" },
  { id: "5", title: "Doctor", status: "pending" },
]

export function PatientFlow() {
  const [steps, setSteps] = useState<FlowStep[]>(initialSteps)

  const getStepVariant = (status: FlowStep["status"]) => {
    switch (status) {
      case "completed":
        return "default"
      case "current":
        return "secondary"
      case "pending":
        return "outline"
    }
  }

  const getStepBgColor = (status: FlowStep["status"]) => {
    switch (status) {
      case "completed":
        return "bg-primary/10 border-primary/20"
      case "current":
        return "bg-accent/10 border-accent/20"
      case "pending":
        return "bg-muted border-border"
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-3">
        {steps.map((step, index) => (
          <Card key={step.id} className={`p-3 ${getStepBgColor(step.status)}`}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-sm text-card-foreground">{step.title}</h3>
              <Badge variant={getStepVariant(step.status)} className="text-xs">
                {step.status === "completed" ? "✓" : step.status === "current" ? "●" : "○"}
              </Badge>
            </div>
            {step.remarks && <p className="text-xs text-muted-foreground mt-1">{step.remarks}</p>}
          </Card>
        ))}
      </div>

      <div className="p-4 pt-0 space-y-2">
        <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
          <Plus className="h-3 w-3 mr-1" />
          Add Remarks
        </Button>

        <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
          Modify Flow
        </Button>
      </div>
    </div>
  )
}
