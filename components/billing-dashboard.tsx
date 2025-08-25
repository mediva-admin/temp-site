"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Banknote, CreditCard, Globe, Plus, Search, Send } from "lucide-react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

interface Service {
  id: string
  name: string
  price: number
  discount: number
  finalAmount: number
}

interface Patient {
  id: string
  name: string
  age: string
  gender: string
  status: string
}

export function BillingDashboard() {
  const [isLive, setIsLive] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("machine")
  const [transactionAmount, setTransactionAmount] = useState("")
  const [services, setServices] = useState<Service[]>([
    { id: "1", name: "Ultrasound", price: 1500, discount: 0, finalAmount: 1500 },
    { id: "2", name: "Consultation", price: 1000, discount: 0, finalAmount: 1000 }
  ])
  const [activeTab, setActiveTab] = useState("payNow")
  const [searchQuery, setSearchQuery] = useState("")

  const patients: Patient[] = [
    { id: "1", name: "Raahul", age: "19", gender: "M", status: "PC" },
    { id: "2", name: "Mukesh", age: "19", gender: "M", status: "PC" },
    { id: "3", name: "Mukesh", age: "19", gender: "M", status: "PC" },
    { id: "4", name: "Mukesh", age: "19", gender: "M", status: "PC" },
    { id: "5", name: "Mukesh", age: "19", gender: "M", status: "PC" }
  ]

  const totalAmount = services.reduce((sum, service) => sum + service.finalAmount, 0)
  const prepaid = 100
  const due = totalAmount - prepaid - (Number(transactionAmount) || 0)

  const updateDiscount = (serviceId: string, discount: number) => {
    setServices(services.map(service => {
      if (service.id === serviceId) {
        const finalAmount = service.price * (1 - discount / 100)
        return { ...service, discount, finalAmount: Math.round(finalAmount) }
      }
      return service
    }))
  }

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: "New Service",
      price: 0,
      discount: 0,
      finalAmount: 0
    }
    setServices([...services, newService])
  }

  const handleSendToPatient = () => {
    toast.success("Information has been sent to patient successfully!")
  }

  const handleRecordTransaction = () => {
    // Simulate a transaction recording process
    try {
      // In a real app, this would be an API call
      toast.success("Transaction has been successfully recorded!")
    } catch (error) {
      toast.error("Failed to record transaction. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">B</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">Billing</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-border bg-card/50">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full transition-colors ${isLive ? 'bg-green-500' : 'bg-muted'}`}></div>
                <span className={`text-sm font-medium transition-colors ${isLive ? 'text-green-700' : 'text-muted-foreground'}`}>
                  {isLive ? 'Live' : 'Offline'}
                </span>
              </div>
              <Switch
                checked={isLive}
                onCheckedChange={setIsLive}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
            <Button variant="outline">
              Transactions
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)] gap-4 p-4">
        {/* Main Content Area */}
        <div className="flex-1 bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="p-6 bg-background/50 flex flex-col h-full">
            {/* Patient Information and Services Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">Raahul 19M</h2>
                <p className="text-sm text-muted-foreground">ID 12345</p>
              </div>
              <Button onClick={addService} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add services
              </Button>
            </div>

            {/* Services Section */}
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">Services</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Discount %</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Final Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id} className="border-b border-border/50">
                        <td className="py-3 px-4">
                          <Input
                            value={service.name}
                            onChange={(e) => {
                              setServices(services.map(s => 
                                s.id === service.id ? { ...s, name: e.target.value } : s
                              ))
                            }}
                            className="border-0 p-0 bg-transparent text-card-foreground"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            value={service.price}
                            onChange={(e) => {
                              const price = Number(e.target.value)
                              const finalAmount = price * (1 - service.discount / 100)
                              setServices(services.map(s => 
                                s.id === service.id ? { ...s, price, finalAmount: Math.round(finalAmount) } : s
                              ))
                            }}
                            className="border-0 p-0 bg-transparent w-20 text-card-foreground"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            value={service.discount}
                            onChange={(e) => updateDiscount(service.id, Number(e.target.value))}
                            className="border-0 p-0 bg-transparent w-20 text-card-foreground"
                          />
                        </td>
                        <td className="py-3 px-4 font-medium text-card-foreground">
                          Rs. {service.finalAmount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Section */}
            <div className="mb-6 p-4 bg-card rounded-lg border border-border">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prepaid</span>
                  <span className="font-medium text-card-foreground">Rs. {prepaid}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Transaction Amount</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rs.</span>
                    <Input
                      type="number"
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(e.target.value)}
                      className="w-24 h-8 text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due</span>
                  <span className="font-medium text-destructive">Rs. {due}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="mb-8 p-4 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Payment Method</h3>
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant={paymentMethod === "cash" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("cash")}
                  className="flex items-center gap-2"
                >
                  <Banknote className="h-4 w-4" />
                  Cash
                </Button>
                <Button
                  variant={paymentMethod === "machine" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("machine")}
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Machine
                </Button>
                <Button
                  variant={paymentMethod === "online" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("online")}
                  className="flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Online
                </Button>
                <Button className="ml-auto" onClick={handleSendToPatient}>
                  <Send className="h-4 w-4 mr-2" />
                  Send to patient
                </Button>
              </div>
            </div>

            {/* Remarks and Action Buttons */}
            <div className="mt-auto p-4 bg-card rounded-lg border border-border">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Label htmlFor="remarks" className="text-sm font-medium text-muted-foreground mb-2 block">
                    Add remarks
                  </Label>
                  <Input
                    id="remarks"
                    placeholder="Enter any additional notes..."
                    className="w-full"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleSendToPatient}>
                    Send to patient
                  </Button>
                  <Button onClick={handleRecordTransaction}>
                    Record transaction
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - All Patients */}
        <div className="w-64 bg-card rounded-lg border border-border shadow-sm">
          <div className="p-4 border-b border-border bg-card">
            <h3 className="text-lg font-semibold text-card-foreground">All patients</h3>
          </div>
          
          <div className="p-4 bg-background/50">
            {/* Tabs */}
            <div className="flex border-b border-border mb-4">
              <button
                onClick={() => setActiveTab("payNow")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "payNow"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Pay Now
              </button>
              <button
                onClick={() => setActiveTab("payLater")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "payLater"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Pay Later
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Q Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Patient List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {patients
                .filter(patient => 
                  patient.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-card/50 cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-medium text-card-foreground">
                        {patient.name} {patient.age}{patient.gender}
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-lg">
                      {patient.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
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
    </div>
  )
}
