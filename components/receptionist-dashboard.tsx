"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreateFlowRequest, FlowService } from "@/services/flow-service"
import { NotCheckedInPatient, NotCheckedInService } from "@/services/not-checked-in-service"
import { TerminalTemplateData, TerminalTemplateService } from "@/services/terminal-template-service"
import {
  formatTime,
  getDoctorDisplayName,
  getServiceDisplayName,
  validateAge,
  validatePhoneNumber
} from "@/utils/patient-utils"
import { Calendar, CreditCard, Loader2, Plus, Search, Trash2, X } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"



export function ReceptionistDashboard() {
  const [showServicesModal, setShowServicesModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState("21/09/2025")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [patients, setPatients] = useState<NotCheckedInPatient[]>([])
  const [patientCount, setPatientCount] = useState(0)
  const [selectedFlowSteps, setSelectedFlowSteps] = useState<string[]>([])
  const [terminalTemplates, setTerminalTemplates] = useState<TerminalTemplateData[]>([])
  const [templateSearchQuery, setTemplateSearchQuery] = useState("")
  const [loadingTemplates, setLoadingTemplates] = useState(false)
  const [creatingFlow, setCreatingFlow] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
    age: "",
    referrer: "",
    gender: "male" as "male" | "female" | "other",
    allergies: "",
    bloodGroup: "",
    doctor: "Dr. Praveen",
    consultationType: "General",
    bookingDate: new Date().toISOString().split('T')[0] // Today's date as default
  })

  // Load patients and terminal templates on component mount
  useEffect(() => {
    loadPatients()
    loadTerminalTemplates()
  }, [])

  const loadPatients = async () => {
    try {
      setLoading(true)
      const [patientsData, count] = await Promise.all([
        NotCheckedInService.getAllPatients(),
        NotCheckedInService.getPatientCount()
      ])
      setPatients(patientsData)
      setPatientCount(count)

      // Show toast if no patients in queue
      if (patientsData.length === 0) {
        toast("No patients in queue. Add a patient to get started!", {
          icon: '👥',
          style: {
            borderRadius: '10px',
            background: '#363636',
            color: '#fff',
          },
        })
      }
    } catch (error) {
      console.error('Failed to load patients:', error)
      toast.error("Failed to load patients")
    } finally {
      setLoading(false)
    }
  }

  const loadTerminalTemplates = async () => {
    try {
      setLoadingTemplates(true)
      const templates = await TerminalTemplateService.getAllTerminalTemplates()
      setTerminalTemplates(templates)
    } catch (error) {
      console.error('Failed to load terminal templates:', error)
      toast.error("Failed to load terminal templates")
    } finally {
      setLoadingTemplates(false)
    }
  }

  const createFlow = async () => {
    if (selectedFlowSteps.length === 0) {
      toast.error("Please add at least one step to the flow")
      return
    }

    try {
      setCreatingFlow(true)
      
      // Map flow steps to flow entries using terminal template IDs
      const flowEntries = selectedFlowSteps.map((stepName, index) => {
        // Find the corresponding terminal template
        const template = terminalTemplates.find(t => t.name === stepName)
        const terminalTemplateId = template?.id || 1 // Default to 1 if not found
        
        return {
          terminalId: terminalTemplateId,
          terminalName: stepName,
          order: index,
          estimatedDuration: 30,
          notes: `Step ${index + 1}: ${stepName}`
        }
      })

      const flowRequest: CreateFlowRequest = {
        patientId: 1, // TODO: Get patient ID from context or selection
        hospitalId: 1, // TODO: Get hospital ID from context
        flowName: `Flow with ${selectedFlowSteps.length} steps`,
        flowEntries: flowEntries,
        description: `Patient journey flow with ${selectedFlowSteps.length} steps`
      }

      const createdFlow = await FlowService.createFlow(flowRequest)
      
      toast.success(`Flow created successfully!`, {
        icon: '✅',
        style: {
          borderRadius: '10px',
          background: '#363636',
          color: '#fff',
        },
      })
      
      // Clear the flow steps after successful creation
      setSelectedFlowSteps([])
      setShowServicesModal(false)
      
      return createdFlow
    } catch (error) {
      console.error('Failed to create flow:', error)
      toast.error("Failed to create flow. Please try again.")
      throw error
    } finally {
      setCreatingFlow(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddPatient = async () => {
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.age) {
      toast.error("Please fill in all required fields (Name, Phone, Age)")
      return
    }

    if (!validatePhoneNumber(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number")
      return
    }

    const age = parseInt(formData.age)
    if (!validateAge(age)) {
      toast.error("Please enter a valid age (1-150)")
      return
    }

    try {
      setLoading(true)
      await NotCheckedInService.addPatient({
        name: formData.name,
        phone: formData.phone,
        age: age,
        gender: formData.gender,
        doctor: formData.doctor,
        consultationType: formData.consultationType,
        notes: formData.allergies ? `Allergies: ${formData.allergies}` : undefined
      })

      // Reset form
      setFormData({
        phone: "",
        name: "",
        email: "",
        age: "",
        referrer: "",
        gender: "male",
        allergies: "",
        bloodGroup: "",
        doctor: "Dr. Praveen",
        consultationType: "General",
        bookingDate: new Date().toISOString().split('T')[0]
      })

      // Reload patients
      await loadPatients()

      toast.success("Patient added successfully!")
    } catch (error) {
      console.error('Failed to add patient:', error)
      toast.error("Failed to add patient. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCheckInPatient = async (patientId: string) => {
    try {
      setLoading(true)
      const success = await NotCheckedInService.checkInPatient(patientId)
      if (success) {
        await loadPatients() // Reload the list
        toast.success("Patient checked in successfully!")
      } else {
        toast.error("Failed to check in patient")
      }
    } catch (error) {
      console.error('Failed to check in patient:', error)
      toast.error("Failed to check in patient. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleRemovePatient = async (patientId: string) => {
    try {
      setLoading(true)
      const success = await NotCheckedInService.removePatient(patientId)
      if (success) {
        await loadPatients() // Reload the list
        toast.success("Patient removed successfully!")
      } else {
        toast.error("Failed to remove patient")
      }
    } catch (error) {
      console.error('Failed to remove patient:', error)
      toast.error("Failed to remove patient. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => {
    const matchesSearch =
      patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone?.includes(searchQuery) ||
      patient.patientId?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  // Filter terminal templates based on search query
  const filteredTemplates = terminalTemplates.filter(template => {
    const matchesSearch =
      template.name?.toLowerCase().includes(templateSearchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(templateSearchQuery.toLowerCase())

    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">


      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)] gap-4 p-4 pb-28">
        {/* Left Column */}
        <div className="flex-1 flex flex-col space-y-4">
          {/* Today's Summary Card */}
          <div className="bg-card rounded-lg border border-border shadow-sm p-6 flex-shrink-0">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">Today&apos;s Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">Completed</div>
                <div className="text-3xl font-bold text-card-foreground">12</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">Waiting patients</div>
                <div className="text-3xl font-bold text-card-foreground">{patientCount}</div>
              </div>
            </div>
          </div>

          {/* Booking Details Form */}
          <div className="bg-card rounded-lg border border-border shadow-sm p-6 flex-1 flex flex-col">
            <h2 className="text-lg font-semibold text-card-foreground mb-6 flex-shrink-0">Booking details</h2>
            <div className="grid grid-cols-2 gap-6 mb-6 flex-1 overflow-y-auto">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Phone Number:
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Name:
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter name"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Email Address:
                </Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="age" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Age:
                </Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Enter age"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="referrer" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Referrer:
                </Label>
                <Input
                  id="referrer"
                  value={formData.referrer}
                  onChange={(e) => handleInputChange("referrer", e.target.value)}
                  placeholder="Enter referrer"
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Gender:
                </Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="text-sm text-card-foreground">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="text-sm text-card-foreground">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="text-sm text-card-foreground">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="allergies" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Allergies:
                </Label>
                <Input
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  placeholder="Enter allergies (or &apos;None&apos;)"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="bloodGroup" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Blood Group:
                </Label>
                <select
                  id="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <Label htmlFor="bookingDate" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Booking Date:
                </Label>
                <Input
                  id="bookingDate"
                  type="date"
                  value={formData.bookingDate}
                  onChange={(e) => handleInputChange("bookingDate", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-4 flex-shrink-0">
              <Button onClick={() => setShowServicesModal(true)} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Services and date
              </Button>
              <Button variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment link
              </Button>
              <Button onClick={handleAddPatient} disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                Add patient
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Patient Queue */}
        <div className="w-96 bg-card rounded-lg border border-border shadow-sm flex flex-col h-full">
          <div className="p-4 border-b border-border bg-card flex-shrink-0">
            <h3 className="text-lg font-semibold text-card-foreground text-center mb-3">Patient Queue</h3>
            <div className="flex items-center justify-between mb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{patientCount}</div>
                <div className="text-xs text-muted-foreground">Total Patients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{filteredPatients.length}</div>
                <div className="text-xs text-muted-foreground">Filtered</div>
              </div>
            </div>
            <div className="mt-3">
              <Button
                variant="outline"
                onClick={() => {
                  // Filter bookings by date instead of opening popup
                  // When real data is available, this will filter bookings by selected date
                  const today = new Date().toLocaleDateString('en-GB');
                  setSelectedDate(today);
                }}
                className="w-full justify-between bg-background hover:bg-muted"
              >
                <span className="text-sm font-medium text-card-foreground">{selectedDate}</span>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </Button>
              <div className="mt-2 text-xs text-muted-foreground text-center">
                Click to filter by date
              </div>
            </div>
          </div>

          <div className="p-4 bg-background/50 flex-1 flex flex-col min-h-0">
            <div className="mb-4 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients by name, phone, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border/50 focus:border-primary"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
                  <span className="text-sm text-muted-foreground">Loading patients...</span>
                </div>
              ) : filteredPatients.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">No patients found</p>
                  <p className="text-xs text-muted-foreground/70">
                    {searchQuery ? "Try adjusting your search terms" : "Patients will appear here when added"}
                  </p>
                </div>
              ) : (
                filteredPatients.map((patient) => (
                  <div
                    key={patient.patientId}
                    className="p-4 rounded-xl border border-border/50 hover:border-border bg-card/30 hover:bg-card/50 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-card-foreground text-sm truncate max-w-[120px]" title={patient.name}>
                            {patient.name}
                          </h3>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium flex-shrink-0">
                            {patient.age} {patient.gender}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                            <span className="truncate">{patient.phone}</span>
                          </p>
                          <p className="text-xs text-muted-foreground/70 truncate">ID: {patient.patientId}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div className="text-xs font-medium text-card-foreground bg-muted/50 px-2 py-1 rounded-lg">
                          {formatTime(patient.originalStartTime)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-xs text-primary font-medium underline cursor-pointer hover:text-primary/80 transition-colors truncate">
                          {getServiceDisplayName(patient.consultationType)}
                        </span>
                        <span className="text-xs text-muted-foreground flex-shrink-0">•</span>
                        <span className="text-xs text-muted-foreground truncate">
                          {getDoctorDisplayName(patient.doctor)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemovePatient(patient.patientId!)
                          }}
                          disabled={loading}
                          className="h-8 px-3 text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
                        >
                          {loading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCheckInPatient(patient.patientId!)
                          }}
                          disabled={loading}
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
                        >
                          {loading ? (
                            <Loader2 className="h-3 w-3 animate-spin mr-1" />
                          ) : null}
                          Check In
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Action Tab */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-4 shadow-lg z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-card-foreground">
              Live dues INR 2400
            </span>
            <Input
              placeholder="Add remarks"
              className="w-80"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-card-foreground">
              Checkin
            </span>
            <Button variant="outline">
              Pay later
            </Button>
            <Button variant="outline" className="px-6 py-2">
              Remarks
            </Button>
            <Button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              Done
            </Button>
          </div>
        </div>
      </div>

      {/* Services and Date Modal */}
      {showServicesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border shadow-lg w-[1000px] h-[700px] overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={() => setShowServicesModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors z-10"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="flex h-full">
              {/* Left Section - Available Services */}
              <div className="w-1/2 p-6 border-r border-border bg-white">
                <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Available Services
                </h2>

                {/* Search Services */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search templates"
                    value={templateSearchQuery}
                    onChange={(e) => setTemplateSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Available Services */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {loadingTemplates ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-blue-600 mb-2" />
                      <span className="text-sm text-gray-500">Loading templates...</span>
                    </div>
                  ) : filteredTemplates.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 mb-1">No templates found</p>
                      <p className="text-xs text-gray-400">
                        {templateSearchQuery ? "Try adjusting your search terms" : "Templates will appear here"}
                      </p>
                    </div>
                  ) : (
                    filteredTemplates.map((template, index) => {
                      const colors = ['blue', 'green', 'purple', 'orange', 'red', 'indigo', 'pink', 'teal'];
                      const color = colors[index % colors.length];
                      const colorClasses = {
                        blue: 'bg-blue-100 text-blue-700',
                        green: 'bg-green-100 text-green-700',
                        purple: 'bg-purple-100 text-purple-700',
                        orange: 'bg-orange-100 text-orange-700',
                        red: 'bg-red-100 text-red-700',
                        indigo: 'bg-indigo-100 text-indigo-700',
                        pink: 'bg-pink-100 text-pink-700',
                        teal: 'bg-teal-100 text-teal-700'
                      };

                      return (
                        <div
                          key={template.id}
                          draggable
                          className="w-full p-4 bg-white rounded-xl border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                          onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', template.name || 'Template');
                            e.dataTransfer.effectAllowed = 'copy';
                          }}
                          onDragEnd={(e) => {
                            e.currentTarget.classList.remove('scale-[1.02]');
                          }}
                        >
                          <div className="flex items-center mb-2">
                            <span className={`text-xs ${colorClasses[color as keyof typeof colorClasses]} px-3 py-1 rounded-full font-medium`}>
                              {template.name || 'Unnamed Template'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">
                            {template.description || 'No description available'}
                          </p>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 bg-${color}-500 rounded-full`}></div>
                            <span className="text-xs text-gray-500">Drag to add to flow</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Section - Patient Journey */}
              <div className="w-1/2 p-6 bg-gradient-to-br from-gray-50 to-blue-50">
                <h2 className="text-xl font-semibold text-card-foreground mb-6 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Patient Journey Flow
                </h2>

                {/* Patient Journey Drop Zone */}
                <div
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-dashed border-blue-200 min-h-[500px] transition-all duration-200"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add('border-blue-400', 'bg-blue-100/50');
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.classList.remove('border-blue-400', 'bg-blue-100/50');
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('border-blue-400', 'bg-blue-100/50');
                    const serviceName = e.dataTransfer.getData('text/plain');
                    if (serviceName) {
                      setSelectedFlowSteps(prev => [...prev, serviceName]);
                    }
                  }}
                >
                  {selectedFlowSteps.length === 0 ? (
                    <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-white/70 backdrop-blur-sm h-[400px] flex items-center justify-center transition-all duration-200">
                      <div className="space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                          <Plus className="h-10 w-10 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Build Your Patient Flow</p>
                          <p className="text-xs text-gray-500">Drag and drop templates from the left to create a journey</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[420px] overflow-y-auto">
                      {selectedFlowSteps.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                              <span className="text-xs font-bold text-white">{index + 1}</span>
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-gray-800">{step}</span>
                              <p className="text-xs text-gray-500 mt-0.5">Step {index + 1} of {selectedFlowSteps.length}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setSelectedFlowSteps(prev => prev.filter((_, i) => i !== index))}
                              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {selectedFlowSteps.length > 0 ? `${selectedFlowSteps.length} steps in flow` : 'No steps added'}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedFlowSteps([])}
                      disabled={selectedFlowSteps.length === 0}
                    >
                      Clear Flow
                    </Button>
                    <Button
                      onClick={createFlow}
                      disabled={selectedFlowSteps.length === 0 || creatingFlow}
                    >
                      {creatingFlow ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating Flow...
                        </>
                      ) : (
                        `Save Flow`
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
