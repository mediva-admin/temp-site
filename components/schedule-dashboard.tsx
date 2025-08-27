"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AnimatePresence, motion } from "framer-motion"
import { Calendar, ChevronLeft, ChevronRight, Clock, Plus, Settings, Users, X } from "lucide-react"
import { useState } from "react"

interface ScheduleEvent {
  id: string
  title: string
  startTime: string
  endTime: string
  date: string
  type: "appointment" | "scan" | "consultation" | "surgery" | "break"
  patientName?: string
  doctorName?: string
  color: string
}

const sampleEvents: ScheduleEvent[] = [
  {
    id: "1",
    title: "Patient Consultation",
    startTime: "09:00",
    endTime: "09:30",
    date: "2024-01-15",
    type: "consultation",
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    color: "bg-blue-500"
  },
  {
    id: "2",
    title: "Ultrasound Scan",
    startTime: "10:00",
    endTime: "10:45",
    date: "2024-01-15",
    type: "scan",
    patientName: "Jane Smith",
    doctorName: "Dr. Johnson",
    color: "bg-green-500"
  },
  {
    id: "3",
    title: "Lunch Break",
    startTime: "12:00",
    endTime: "13:00",
    date: "2024-01-15",
    type: "break",
    color: "bg-gray-400"
  },
  {
    id: "4",
    title: "Surgery Prep",
    startTime: "14:00",
    endTime: "16:00",
    date: "2024-01-15",
    type: "surgery",
    patientName: "Mike Wilson",
    doctorName: "Dr. Brown",
    color: "bg-red-500"
  }
]

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12
  const ampm = i < 12 ? 'AM' : 'PM'
  return `${hour}:00 ${ampm}`
})

export function ScheduleDashboard() {
  const [isLive, setIsLive] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day")
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const getCurrentMonthName = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getEventsForDate = (date: string) => {
    return sampleEvents.filter(event => event.date === date)
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "consultation": return "bg-blue-500"
      case "scan": return "bg-green-500"
      case "surgery": return "bg-red-500"
      case "break": return "bg-gray-400"
      default: return "bg-purple-500"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Schedule Management
                </h1>
                <p className="text-sm text-gray-600">Manage appointments and schedules</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
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
              <Button
                onClick={() => setShowAddEvent(true)}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Calendar Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={goToPreviousMonth}
                  className="p-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-bold text-gray-900">{getCurrentMonthName()}</h2>
                <Button
                  variant="outline"
                  onClick={goToNextMonth}
                  className="p-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={goToToday}
                  className="ml-4"
                >
                  Today
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "day" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("day")}
                >
                  Day
                </Button>
                <Button
                  variant={viewMode === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("week")}
                >
                  Week
                </Button>
                <Button
                  variant={viewMode === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("month")}
                >
                  Month
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
        >
          {/* Time Grid Header */}
          <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50/50">
            <div className="p-3 border-r border-gray-200 bg-gray-50/50">
              <span className="text-sm font-medium text-gray-600">Time</span>
            </div>
            <div className="p-3 border-r border-gray-200 bg-gray-50/50">
              <span className="text-sm font-medium text-gray-600">Monday</span>
            </div>
            <div className="p-3 border-r border-gray-200 bg-gray-50/50">
              <span className="text-sm font-medium text-gray-600">Tuesday</span>
            </div>
            <div className="p-3 border-r border-gray-200 bg-gray-50/50">
              <span className="text-sm font-medium text-gray-600">Wednesday</span>
            </div>
            <div className="p-3 border-r border-gray-200 bg-gray-50/50">
              <span className="text-sm font-medium text-gray-600">Thursday</span>
            </div>
            <div className="p-3 border-r border-gray-200 bg-gray-50/50">
              <span className="text-sm font-medium text-gray-600">Friday</span>
            </div>
            <div className="p-3 border-r border-gray-200 bg-gray-50/50">
              <span className="text-sm font-medium text-gray-600">Saturday</span>
            </div>
            <div className="p-3 bg-gray-50/50">
              <span className="text-sm font-medium text-gray-600">Sunday</span>
            </div>
          </div>

          {/* Time Grid Body */}
          <div className="max-h-[600px] overflow-y-auto">
            {timeSlots.map((time, index) => (
              <div key={time} className="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50/30 transition-colors">
                <div className="p-3 border-r border-gray-200 bg-gray-50/30 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">{time}</span>
                </div>
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const events = getEventsForDate(`2024-01-${15 + dayIndex}`).filter(
                    event => event.startTime === time.split(' ')[0]
                  )
                  return (
                    <div key={dayIndex} className="p-1 border-r border-gray-200 min-h-[60px] relative">
                      {events.map((event) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`${event.color} text-white text-xs p-2 rounded-md mb-1 cursor-pointer hover:shadow-md transition-all duration-200`}
                          title={`${event.title} - ${event.patientName || 'No patient'} (${event.startTime}-${event.endTime})`}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          {event.patientName && (
                            <div className="text-xs opacity-90 truncate">{event.patientName}</div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{sampleEvents.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Patients Today</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Event</p>
                <p className="text-2xl font-bold text-gray-900">09:00</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Settings className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Available Slots</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddEvent && (
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Add New Event</h2>
                  <button
                    onClick={() => setShowAddEvent(false)}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <Label htmlFor="eventTitle" className="text-sm font-medium text-gray-700">Event Title</Label>
                  <Input
                    id="eventTitle"
                    placeholder="Enter event title"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime" className="text-sm font-medium text-gray-700">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime" className="text-sm font-medium text-gray-700">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="eventDate" className="text-sm font-medium text-gray-700">Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50/50">
                <Button
                  variant="outline"
                  onClick={() => setShowAddEvent(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                  Add Event
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
