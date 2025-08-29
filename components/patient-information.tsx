"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatePresence, motion } from "framer-motion"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Calendar,
  Camera,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  File,
  FileText,
  Heart,
  Image,
  Mail,
  MapPin,
  Microscope,
  Phone,
  PieChart,
  Plus,
  Search,
  Shield,
  Stethoscope,
  User,
  X
} from "lucide-react"
import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

interface Patient {
  id: string
  name: string
  age: number
  phoneNumber: string
  email: string
  address: string
  bloodType: string
  emergencyContact: string
  insuranceProvider: string
  insuranceNumber: string
  lastVisit: string
  nextAppointment?: string
  status: "active" | "inactive" | "pending"
}

interface MedicalRecord {
  id: string
  date: string
  area: string
  remarks: string
  files: string[]
  doctor: string
  diagnosis?: string
  prescription?: string
  followUp?: string
}

const samplePatient: Patient = {
  id: "12345",
  name: "Mukesh Ram",
  age: 22,
  phoneNumber: "+917975257165",
  email: "mukesh.ram@email.com",
  address: "123 Medical Center Dr, Healthcare City, HC 12345",
  bloodType: "O+",
  emergencyContact: "+919876543210",
  insuranceProvider: "HealthCare Plus",
  insuranceNumber: "HC-789456123",
  lastVisit: "2024-01-15",
  nextAppointment: "2024-02-20",
  status: "active"
}

const sampleMedicalRecords: MedicalRecord[] = [
  {
    id: "1",
    date: "2024-01-15",
    area: "General Checkup",
    remarks: "Patient reports mild fever and fatigue. Blood pressure normal.",
    files: ["prescription.pdf", "lab_results.pdf"],
    doctor: "Dr. Sarah Johnson",
    diagnosis: "Viral fever",
    prescription: "Paracetamol 500mg, Vitamin C supplements",
    followUp: "2024-01-22"
  },
  {
    id: "2",
    date: "2024-01-10",
    area: "Ultrasound - Chest & Abdomen",
    remarks: "Chest examination shows normal lung fields. Abdomen scan reveals no abnormalities.",
    files: ["ultrasound_chest.jpg", "ultrasound_abdomen.jpg", "report.pdf"],
    doctor: "Dr. Mike Chen",
    diagnosis: "Normal findings",
    followUp: "2024-02-10"
  },
  {
    id: "3",
    date: "2024-01-05",
    area: "X-Ray - Hand",
    remarks: "X-ray examination of right hand shows no fractures or dislocations.",
    files: ["xray_hand.jpg", "radiology_report.pdf"],
    doctor: "Dr. Emily Rodriguez",
    diagnosis: "No acute findings",
    followUp: "2024-01-20"
  },
  {
    id: "4",
    date: "2023-12-20",
    area: "Dental Checkup",
    remarks: "Regular dental cleaning and examination. No cavities detected.",
    files: ["dental_report.pdf"],
    doctor: "Dr. James Wilson",
    diagnosis: "Good oral health",
    followUp: "2024-06-20"
  }
]

const medicalAreas = [
  "General Checkup",
  "Ultrasound",
  "X-Ray",
  "Blood Tests",
  "Dental",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Dermatology",
  "Ophthalmology"
]

export function PatientInformation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(samplePatient)
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(sampleMedicalRecords)
  const [areaFilter, setAreaFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [showAddRecord, setShowAddRecord] = useState(false)
  const [showPatientDetails, setShowPatientDetails] = useState(false)
  const [newRecord, setNewRecord] = useState<Omit<MedicalRecord, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    area: "",
    remarks: "",
    files: [],
    doctor: "",
    diagnosis: "",
    prescription: "",
    followUp: ""
  })

  // Listen for custom events from the navbar
  useEffect(() => {
    const handleTogglePatientDetails = () => {
      setShowPatientDetails(prev => !prev);
    };

    window.addEventListener('togglePatientDetails', handleTogglePatientDetails);
    
    return () => {
      window.removeEventListener('togglePatientDetails', handleTogglePatientDetails);
    };
  }, []);

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.remarks.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesArea = areaFilter === "all" || record.area === areaFilter
    const matchesDate = dateFilter === "all" || record.date === dateFilter
    return matchesSearch && matchesArea && matchesDate
  })

  const handleAddRecord = () => {
    if (!newRecord.area || !newRecord.remarks || !newRecord.doctor) {
      toast.error("Please fill in all required fields")
      return
    }

    const record: MedicalRecord = {
      ...newRecord,
      id: Date.now().toString()
    }

    setMedicalRecords([record, ...medicalRecords])
    setNewRecord({
      date: new Date().toISOString().split('T')[0],
      area: "",
      remarks: "",
      files: [],
      doctor: "",
      diagnosis: "",
      prescription: "",
      followUp: ""
    })
    setShowAddRecord(false)
    toast.success("Medical record added successfully!")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "inactive": return <AlertCircle className="h-4 w-4 text-red-600" />
      case "pending": return <Clock3 className="h-4 w-4 text-yellow-600" />
      default: return <Clock3 className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200"
      case "inactive": return "bg-red-100 text-red-800 border-red-200"
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAreaIcon = (area: string) => {
    if (area.includes("Ultrasound")) return <Camera className="h-4 w-4" />
    if (area.includes("X-Ray")) return <Image className="h-4 w-4" />
    if (area.includes("Blood")) return <Microscope className="h-4 w-4" />
    if (area.includes("Dental")) return <Stethoscope className="h-4 w-4" />
    if (area.includes("Cardio")) return <Heart className="h-4 w-4" />
    if (area.includes("Neuro")) return <Activity className="h-4 w-4" />
    if (area.includes("Ortho")) return <BarChart3 className="h-4 w-4" />
    if (area.includes("Derma")) return <PieChart className="h-4 w-4" />
    if (area.includes("Ophtha")) return <Eye className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-white" data-records-count={medicalRecords.length} data-show-details={showPatientDetails}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#000',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />



      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 pb-28">
        {/* Compact Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search patient name, phone, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/80 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="px-3 py-2 bg-white/80 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="all">All Areas</option>
                  {medicalAreas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                <Button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Patient Summary Card - Always Visible */}
        {selectedPatient && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>ID: {selectedPatient.id}</span>
                      <span>Age: {selectedPatient.age}</span>
                      <span>Blood: {selectedPatient.bloodType}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedPatient.status)}`}>
                        {getStatusIcon(selectedPatient.status)}
                        {selectedPatient.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Last Visit: {selectedPatient.lastVisit}</p>
                  {selectedPatient.nextAppointment && (
                    <p className="text-sm text-emerald-600 font-medium">Next: {selectedPatient.nextAppointment}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {selectedPatient.phoneNumber}
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {selectedPatient.email}
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  {selectedPatient.insuranceProvider}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Expandable Patient Details */}
        <AnimatePresence>
          {showPatientDetails && selectedPatient && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      <span className="font-medium">Address:</span>
                      <span>{selectedPatient.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Phone className="h-4 w-4 text-emerald-600" />
                      <span className="font-medium">Emergency:</span>
                      <span>{selectedPatient.emergencyContact}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Shield className="h-4 w-4 text-emerald-600" />
                      <span className="font-medium">Policy:</span>
                      <span>{selectedPatient.insuranceNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact Medical History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" />
                Medical History
              </h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAddRecord(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                Add Record
              </motion.button>
            </div>

             {/* Collapsible Table with Date Grouping */}
             <div className="overflow-x-auto">
               <table className="w-full">
                 <thead className="bg-gray-50/50">
                   <tr>
                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Area</th>
                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Remarks</th>
                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Files</th>
                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100/50">
                   {(() => {
                     // Group records by date
                     const groupedRecords = filteredRecords.reduce((groups, record) => {
                       const date = record.date;
                       if (!groups[date]) {
                         groups[date] = [];
                       }
                       groups[date].push(record);
                       return groups;
                     }, {} as Record<string, MedicalRecord[]>);

                     // Sort dates in descending order
                     const sortedDates = Object.keys(groupedRecords).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

                     const rows: React.ReactElement[] = [];
                     
                     sortedDates.forEach((date, dateIndex) => {
                       const recordsForDate = groupedRecords[date];
                       
                       recordsForDate.forEach((record, recordIndex) => {
                         const isFirstRecordForDate = recordIndex === 0;
                         
                         rows.push(
                           <motion.tr
                             key={`${date}-${record.id}`}
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: (dateIndex * 0.1) + (recordIndex * 0.05) }}
                             className="hover:bg-gray-50/30 transition-colors duration-200"
                           >
                             <td className="px-4 py-3 whitespace-nowrap">
                               {isFirstRecordForDate ? (
                                 <div className="flex items-center gap-2">
                                   <Calendar className="h-4 w-4 text-emerald-600" />
                                   <div>
                                     <div className="text-sm font-medium text-gray-900">{record.date}</div>
                                     <div className="text-xs text-emerald-600">
                                       {recordsForDate.length} {recordsForDate.length === 1 ? 'procedure' : 'procedures'}
                                     </div>
                                   </div>
                                 </div>
                               ) : (
                                 <div className="pl-6 text-xs text-gray-400">↳</div>
                               )}
                             </td>
                             <td className="px-4 py-3 whitespace-nowrap">
                               <div className="flex items-center gap-2">
                                 <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                                   {getAreaIcon(record.area)}
                                 </div>
                                 <span className="text-sm font-medium text-gray-900">{record.area}</span>
                               </div>
                             </td>
                             <td className="px-4 py-3">
                               <div className="max-w-xs">
                                 {record.diagnosis && (
                                   <p className="text-sm text-gray-900 font-medium mb-1">
                                     {record.diagnosis}
                                   </p>
                                 )}
                                 <p className="text-xs text-gray-600 line-clamp-2">{record.remarks}</p>
                                 {record.followUp && (
                                   <div className="mt-1 text-xs text-emerald-600">
                                     Follow-up: {record.followUp}
                                   </div>
                                 )}
                               </div>
                             </td>
                             <td className="px-4 py-3 whitespace-nowrap">
                               <div className="flex gap-1">
                                 {record.files.slice(0, 3).map((file, idx) => (
                                   <div
                                     key={idx}
                                     className="h-8 w-8 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center cursor-pointer hover:bg-emerald-100 transition-colors duration-200"
                                     title={file}
                                   >
                                     {file.includes('.pdf') ? (
                                       <FileText className="h-4 w-4 text-emerald-600" />
                                     ) : file.includes('.jpg') || file.includes('.png') ? (
                                       <Image className="h-4 w-4 text-emerald-600" />
                                     ) : (
                                       <File className="h-4 w-4 text-emerald-600" />
                                     )}
                                   </div>
                                 ))}
                                 {record.files.length > 3 && (
                                   <div className="h-8 w-8 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-600">
                                     +{record.files.length - 3}
                                   </div>
                                 )}
                               </div>
                             </td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                 <div className="flex items-center gap-2">
                                   <button className="text-emerald-600 hover:text-emerald-900 p-1 rounded-md hover:bg-emerald-50">
                                     <Eye className="h-4 w-4" />
                                   </button>
                                   <button className="text-emerald-600 hover:text-emerald-900 p-1 rounded-md hover:bg-emerald-50">
                                     <Download className="h-4 w-4" />
                                   </button>
                                 </div>
                               </td>
                           </motion.tr>
                         );
                       });
                     });
                     
                     return rows;
                   })()}
                 </tbody>
               </table>
             </div>

            {/* Empty State */}
            {filteredRecords.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No medical records found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters.</p>
                <Button
                  onClick={() => {
                    setAreaFilter("all")
                    setDateFilter("all")
                  }}
                  variant="outline"
                  size="sm"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Compact Add Medical Record Modal */}
      <AnimatePresence>
        {showAddRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <Plus className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Add Medical Record</h2>
                      <p className="text-sm text-gray-600">Quick entry for new medical record</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddRecord(false)}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newRecord.date}
                      onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                      className="h-10 bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-sm font-medium text-gray-700">Medical Area *</Label>
                    <select
                      id="area"
                      value={newRecord.area}
                      onChange={(e) => setNewRecord({ ...newRecord, area: e.target.value })}
                      className="h-10 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
                    >
                      <option value="">Select area</option>
                      {medicalAreas.map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor" className="text-sm font-medium text-gray-700">Doctor *</Label>
                  <Input
                    id="doctor"
                    value={newRecord.doctor}
                    onChange={(e) => setNewRecord({ ...newRecord, doctor: e.target.value })}
                    placeholder="Enter doctor's name"
                    className="h-10 bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks" className="text-sm font-medium text-gray-700">Remarks *</Label>
                  <textarea
                    id="remarks"
                    value={newRecord.remarks}
                    onChange={(e) => setNewRecord({ ...newRecord, remarks: e.target.value })}
                    placeholder="Enter medical remarks"
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="diagnosis" className="text-sm font-medium text-gray-700">Diagnosis</Label>
                    <Input
                      id="diagnosis"
                      value={newRecord.diagnosis}
                      onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                      placeholder="Enter diagnosis"
                      className="h-10 bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="followUp" className="text-sm font-medium text-gray-700">Follow-up Date</Label>
                    <Input
                      id="followUp"
                      type="date"
                      value={newRecord.followUp}
                      onChange={(e) => setNewRecord({ ...newRecord, followUp: e.target.value })}
                      className="h-10 bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50/50">
                <Button
                  variant="outline"
                  onClick={() => setShowAddRecord(false)}
                  className="px-6 py-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddRecord}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  Add Record
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Action Tab */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-sm z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-gray-900">
              Patient Information Actions
            </span>
            <Input
              placeholder="Add remarks..."
              className="w-80 bg-white/80 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="px-6 py-2">
              Remarks
            </Button>
            <Button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
