"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, CreditCard, Plus, Search } from "lucide-react"
import { useState } from "react"

interface Booking {
  id: string
  name: string
  age: string
  gender: string
  phone: string
  services: string
  time: string
  status: string
}

export function ReceptionistDashboard() {
  const [showServicesModal, setShowServicesModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState("21/09/2025")
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
    age: "",
    referrer: "",
    gender: "male",
    allergies: "",
    bloodGroup: ""
  })

  const bookings: Booking[] = [
    { id: "1", name: "Raahul", age: "19", gender: "M", phone: "7845068452", services: "Doctor consultation +2", time: "9:00", status: "PC" },
    { id: "2", name: "Raahul", age: "19", gender: "M", phone: "7845068452", services: "Doctor consultation +2", time: "9:00", status: "PC" },
    { id: "3", name: "Raahul", age: "19", gender: "M", phone: "7845068452", services: "Doctor consultation +2", time: "9:00", status: "PC" },
    { id: "4", name: "Raahul", age: "19", gender: "M", phone: "7845068452", services: "Doctor consultation +2", time: "9:00", status: "PC" },
    { id: "5", name: "Raahul", age: "19", gender: "M", phone: "7845068452", services: "Doctor consultation +2", time: "9:00", status: "PC" }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">


      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)] gap-4 p-4 pb-28">
        {/* Left Column */}
        <div className="flex-1 space-y-4">
                      {/* Today's Summary Card */}
            <div className="bg-card rounded-lg border border-border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-card-foreground mb-4">Today's Summary</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Completed</div>
                  <div className="text-3xl font-bold text-card-foreground">26</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Waiting patients</div>
                  <div className="text-3xl font-bold text-card-foreground">26</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Upcoming</div>
                  <div className="text-3xl font-bold text-card-foreground">10</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Average Wait Time</div>
                  <div className="text-3xl font-bold text-card-foreground">1:04</div>
                </div>
              </div>
            </div>

          {/* Booking Details Form */}
          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-card-foreground mb-6">Booking details</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
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
                  placeholder="Enter allergies (or 'None')"
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
            </div>
            
            <div className="flex gap-4">
              <Button onClick={() => setShowServicesModal(true)} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Services and date
              </Button>
              <Button variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment link
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add patient
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Booking List */}
        <div className="w-80 bg-card rounded-lg border border-border shadow-sm">
          <div className="p-4 border-b border-border bg-card">
            <h3 className="text-lg font-semibold text-card-foreground text-center">Booking list</h3>
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
          
          <div className="p-4 bg-background/50">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-3 h-full overflow-y-auto">
              {bookings
                .filter(booking => {
                  // Filter by search query
                  const matchesSearch = 
                    booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    booking.phone.includes(searchQuery);
                  
                  // For now, just filter by search since mock data doesn't have dates
                  // In a real app, you would filter by actual booking dates
                  return matchesSearch;
                })
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="p-3 rounded-lg border border-border hover:bg-card/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-card-foreground">
                          {booking.name} {booking.age}{booking.gender}
                        </p>
                        <p className="text-sm text-muted-foreground">Phone: {booking.phone}</p>
                      </div>
                      <span className="text-sm font-medium text-card-foreground">{booking.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground underline cursor-pointer">
                        {booking.services}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-lg">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
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
          <div className="bg-card rounded-lg border border-border shadow-lg w-[1000px] h-[700px] overflow-hidden">
            <div className="flex h-full">
              {/* Left Section - Select Date */}
              <div className="w-1/3 p-6 border-r border-border">
                <h2 className="text-xl font-semibold text-card-foreground mb-4">Select date</h2>
                
                {/* Mode Selector */}
                <div className="flex bg-muted rounded-lg p-1 mb-4">
                  <button className="flex-1 py-2 px-3 rounded-md bg-card text-card-foreground font-medium text-sm">
                    Appointment
                  </button>
                  <button className="flex-1 py-2 px-3 rounded-md text-muted-foreground font-medium text-sm">
                    Walkin
                  </button>
                </div>

                {/* Calendar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <button className="p-2 hover:bg-muted rounded-lg">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <span className="font-medium text-card-foreground">September 2021</span>
                    <button className="p-2 hover:bg-muted rounded-lg">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                  
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['SAN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                      <div key={day} className="text-xs text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 35 }, (_, i) => (
                      <button
                        key={i}
                        className={`p-2 text-sm rounded-lg hover:bg-muted ${
                          i === 18 ? 'bg-orange-500 text-white' : 'text-card-foreground'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Section - Select Patient Journey */}
              <div className="w-2/3 p-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-4">Select patient journey</h2>
                
                {/* Horizontal Layout: Search + Services on left, Patient Journey on right */}
                <div className="flex gap-4 h-[400px]">
                  {/* Left: Search and Available Services */}
                  <div className="w-1/2 space-y-4">
                    {/* Search Services */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search services"
                        className="pl-10"
                      />
                    </div>

                    {/* Available Services */}
                    <div className="space-y-2">
                      <div 
                        draggable 
                        className="w-full p-3 bg-muted rounded-lg border border-border cursor-move hover:bg-muted/80 transition-colors"
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', 'Scan')}
                      >
                        <span className="text-sm font-medium text-card-foreground">Scan</span>
                      </div>
                      <div 
                        draggable 
                        className="w-full p-3 bg-muted rounded-lg border border-border cursor-move hover:bg-muted/80 transition-colors"
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', 'Treatment Room 1')}
                      >
                        <span className="text-sm font-medium text-card-foreground">Treatment Room 1</span>
                      </div>
                      <div 
                        draggable 
                        className="w-full p-3 bg-muted rounded-lg border border-border cursor-move hover:bg-muted/80 transition-colors"
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', 'Consultation: Dr. Praveen')}
                      >
                        <span className="text-sm font-medium text-card-foreground">Consultation: Dr. Praveen</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Patient Journey */}
                  <div 
                    className="w-1/2 bg-muted/30 rounded-lg p-4 border-2 border-dashed border-muted-foreground/30"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const serviceName = e.dataTransfer.getData('text/plain');
                      // Here you would add the service to the patient journey
                      console.log('Dropped service:', serviceName);
                    }}
                  >
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between bg-card p-3 rounded-lg">
                        <span className="text-sm font-medium text-card-foreground">Scan</span>
                        <select className="text-xs text-muted-foreground bg-transparent border-none">
                          <option>9:10 PM</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between bg-card p-3 rounded-lg">
                        <span className="text-sm font-medium text-card-foreground">Consultation: Dr. Praveen</span>
                        <select className="text-xs text-muted-foreground bg-transparent border-none">
                          <option>9:25 PM</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 text-center bg-card/50">
                      <span className="text-sm text-muted-foreground">+ Drag and drop here</span>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => setShowServicesModal(false)}>
                    Save flow
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
