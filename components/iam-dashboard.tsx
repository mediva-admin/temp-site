"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AnimatePresence, motion } from "framer-motion"
import {
  Edit,
  Search,
  Shield,
  Trash2,
  UserPlus,
  Users,
  X
} from "lucide-react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

interface StaffMember {
  id: string
  name: string
  phoneNumber: string
  emailAddress: string
  role: "Admin" | "Optometrist" | "Doctor" | "Nurse"
  accessibleTerminals: string[]
}

const initialStaff: StaffMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    phoneNumber: "+1 (555) 123-4567",
    emailAddress: "sarah.johnson@mediva.com",
    role: "Doctor",
    accessibleTerminals: ["Doctor consultation", "Scans", "Lab tests"]
  },
  {
    id: "2",
    name: "Nurse Mike Chen",
    phoneNumber: "+1 (555) 234-5678",
    emailAddress: "mike.chen@mediva.com",
    role: "Nurse",
    accessibleTerminals: ["Scans", "Patient monitoring"]
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    phoneNumber: "+1 (555) 345-6789",
    emailAddress: "emily.rodriguez@mediva.com",
    role: "Optometrist",
    accessibleTerminals: ["Eye exams", "Vision tests", "Contact lens fitting"]
  }
]

const roles = ["Admin", "Optometrist", "Doctor", "Nurse"]
const availableTerminals = [
  "Doctor consultation",
  "Scans",
  "Lab tests",
  "Eye exams",
  "Vision tests",
  "Contact lens fitting",
  "Patient monitoring",
  "Surgery",
  "Emergency care",
  "Pharmacy"
]

export function IAMDashboard() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff)
  const [searchQuery, setSearchQuery] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [isLive, setIsLive] = useState(true)
  const [newStaff, setNewStaff] = useState<Omit<StaffMember, 'id'>>({
    name: "",
    phoneNumber: "",
    emailAddress: "",
    role: "Doctor",
    accessibleTerminals: []
  })

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.emailAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.phoneNumber || !newStaff.emailAddress) {
      toast.error("Please fill in all required fields")
      return
    }

    const staffMember: StaffMember = {
      ...newStaff,
      id: Date.now().toString()
    }

    setStaff([...staff, staffMember])
    setNewStaff({
      name: "",
      phoneNumber: "",
      emailAddress: "",
      role: "Doctor",
      accessibleTerminals: []
    })
    setShowModal(false)
    toast.success("Staff member added successfully!")
  }

  const handleTerminalToggle = (terminal: string) => {
    setNewStaff(prev => ({
      ...prev,
      accessibleTerminals: prev.accessibleTerminals.includes(terminal)
        ? prev.accessibleTerminals.filter(t => t !== terminal)
        : [...prev.accessibleTerminals, terminal]
    }))
  }

  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter(member => member.id !== id))
    toast.success("Staff member removed successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Identity & Access Management
                </h1>
                <p className="text-sm text-gray-600">Manage staff permissions and access</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-lg border border-white/20">
                <Users className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {staff.length} Staff Members
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/60 rounded-lg border border-white/20">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full transition-colors ${isLive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className={`text-sm font-medium transition-colors ${isLive ? 'text-green-700' : 'text-gray-600'}`}>
                    {isLive ? 'Live' : 'Offline'}
                  </span>
                </div>
                <Switch
                  checked={isLive}
                  onCheckedChange={setIsLive}
                  className="data-[state=checked]:bg-green-600"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 pb-28">
        {/* Search and Add Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search staff members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-white/20 focus:border-blue-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <UserPlus className="h-4 w-4" />
            Add New Staff
          </motion.button>
        </div>

        {/* Staff Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Accessible Terminals
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50">
                {filteredStaff.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.emailAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        member.role === 'Admin' ? 'bg-red-100 text-red-800' :
                        member.role === 'Doctor' ? 'bg-blue-100 text-blue-800' :
                        member.role === 'Optometrist' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {member.accessibleTerminals.map((terminal, idx) => (
                          <span
                            key={idx}
                            className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
                          >
                            {terminal}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteStaff(member.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Add Staff Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Add New Staff Member</h2>
                  <p className="text-sm text-gray-600">Fill in the details below to add a new staff member</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                      placeholder="Enter full name"
                      className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={newStaff.phoneNumber}
                      onChange={(e) => setNewStaff({ ...newStaff, phoneNumber: e.target.value })}
                      placeholder="Enter phone number"
                      className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStaff.emailAddress}
                    onChange={(e) => setNewStaff({ ...newStaff, emailAddress: e.target.value })}
                    placeholder="Enter email address"
                    className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                    Role *
                  </Label>
                  <select
                    id="role"
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as any })}
                    className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Accessible Terminals
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableTerminals.map((terminal) => (
                      <label
                        key={terminal}
                        className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={newStaff.accessibleTerminals.includes(terminal)}
                          onChange={() => handleTerminalToggle(terminal)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{terminal}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddStaff}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  Add Staff Member
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Action Tab */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-white/20 px-6 py-4 shadow-lg z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-gray-900">
              IAM Actions
            </span>
            <Input
              placeholder="Add remarks..."
              className="w-80 bg-white/80 border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="px-6 py-2">
              Remarks
            </Button>
            <Button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
