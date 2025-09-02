"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QueueService } from "@/services/queue-service"
import { formatPatientDisplayName, PatientQueueItem, transformQueueEntryToPatient } from "@/utils/queue-utils"
import { Clock, Loader2, Move, RefreshCw, Trash2, User, X } from "lucide-react"
import { useEffect, useState } from "react"

interface PatientQueueProps {
  terminalId?: number;
}

export function PatientQueue({ terminalId = 1 }: PatientQueueProps) {
  const [patients, setPatients] = useState<PatientQueueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showMovePopup, setShowMovePopup] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<PatientQueueItem | null>(null)
  const [moveType, setMoveType] = useState<"number" | "minutes">("number")
  const [moveValue, setMoveValue] = useState("")

  // Fetch patients from API
  const fetchPatients = async () => {
    try {
      setLoading(true)
      setError(null)
      const queueEntries = await QueueService.getCurrentQueue(terminalId)
      const transformedPatients = queueEntries.map(transformQueueEntryToPatient)
      setPatients(transformedPatients)
    } catch (err) {
      console.error('Failed to fetch patients:', err)
      setError('Failed to load patient queue')
      setPatients([])
    } finally {
      setLoading(false)
    }
  }

  // Load patients on component mount
  useEffect(() => {
    fetchPatients()
  }, [terminalId])

  const removePatient = (id: string) => {
    setPatients(patients.filter((patient) => patient.id !== id))
  }

  const openMovePopup = (patient: PatientQueueItem) => {
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

  const formatTime = (timeString?: string) => {
    if (!timeString) return "TBD"
    try {
      const date = new Date(timeString)
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    } catch {
      return "TBD"
    }
  }

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[200px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Loading patient queue...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-center space-y-4">
          <div className="text-sm text-destructive mb-4">
            {error}
          </div>
          <Button 
            onClick={fetchPatients} 
            variant="outline" 
            size="sm"
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            {patients.length} patient{patients.length !== 1 ? 's' : ''} in queue
          </span>
        </div>
        <Button
          onClick={fetchPatients}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          title="Refresh queue"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {patients.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-2">No patients in queue</p>
          <p className="text-xs text-muted-foreground">Patients will appear here when added to the queue</p>
        </div>
      ) : (
        <div className="space-y-3">
          {patients.map((patient, index) => (
            <Card key={patient.id} className="p-4 bg-card border border-border hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <span className="text-sm font-semibold text-card-foreground truncate">
                      {formatPatientDisplayName(patient)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {patient.startTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(patient.startTime)}</span>
                      </div>
                    )}
                    {patient.doctor && (
                      <Badge variant="outline" className="text-xs">
                        {patient.doctor}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openMovePopup(patient)}
                    className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
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
      )}

      {/* Move Patient Popup */}
      {showMovePopup && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border shadow-lg w-96 max-w-[90vw]">
            {/* Popup Header */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Move className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">Move Patient</h3>
                    <p className="text-sm text-muted-foreground">{formatPatientDisplayName(selectedPatient)}</p>
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
