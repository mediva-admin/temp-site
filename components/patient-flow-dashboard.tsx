import { PatientQueue } from "./patient-queue"
import { PatientFlow } from "./patient-flow"
import { WorkingArea } from "./working-area"
import { Label } from "@/components/ui/label"

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
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">PF</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">Patient Flow</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent"></div>
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)] gap-4 p-4">
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
            <div className="flex-1 p-6 bg-background/50">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">Working Area</h2>
              </div>
              <WorkingArea />
            </div>
          </div>
        </div>

        <div className="w-64 bg-card rounded-lg border border-border shadow-sm">
          <PatientQueue />
        </div>
      </div>
    </div>
  )
}
