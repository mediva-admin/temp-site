"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Eye, Save, Send, Trash2, Upload } from "lucide-react"
import { useState } from "react"

interface FieldData {
  [key: string]: string | File | null
}

interface WorkingAreaCard {
  id: string
  title: string
  fields: {
    id: string
    label: string
    type: "text" | "textarea" | "file"
    value?: string | File | null
  }[]
}

const initialCards: WorkingAreaCard[] = [
  {
    id: "upload-report",
    title: "Upload Report",
    fields: [
      { id: "report-file", label: "Report File", type: "file", value: null },
      { id: "report-notes", label: "Notes", type: "textarea", value: "" },
    ],
  },
  {
    id: "opted-services",
    title: "Opted Services",
    fields: [
      { id: "service-type", label: "Service Type", type: "text", value: "" },
      { id: "service-notes", label: "Additional Notes", type: "textarea", value: "" },
    ],
  },
]

export function WorkingArea() {
  const [cards, setCards] = useState<WorkingAreaCard[]>(initialCards)
  const [cardData, setCardData] = useState<{ [cardId: string]: FieldData }>({})
  const [isLive, setIsLive] = useState(true)

  const updateCardField = (cardId: string, fieldId: string, value: string | File | null) => {
    setCardData((prev) => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        [fieldId]: value,
      },
    }))
  }

  const handleFileUpload = (cardId: string, fieldId: string, file: File | null) => {
    updateCardField(cardId, fieldId, file)
  }

  const removeFile = (cardId: string, fieldId: string) => {
    updateCardField(cardId, fieldId, null)
  }

  const saveCard = (cardId: string) => {
    // Save logic here
    console.log("Saving card:", cardId, cardData[cardId])
  }

  return (
    <div className="space-y-4 pb-16">
      {/* Header with Live Toggle */}
      <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-lg font-semibold text-card-foreground">Working Area</h2>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-border bg-card/50">
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

      {/* Working Area Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="bg-card border-border shadow-sm transition-all duration-200 hover:shadow-md min-h-[280px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-card-foreground">{card.title}</CardTitle>
                <Button onClick={() => saveCard(card.id)} size="sm" className="h-8">
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {card.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id} className="text-sm font-medium text-card-foreground">
                    {field.label}
                  </Label>

                  {field.type === "text" && (
                    <Input
                      id={field.id}
                      value={(cardData[card.id]?.[field.id] as string) || ""}
                      onChange={(e) => updateCardField(card.id, field.id, e.target.value)}
                      className="bg-input border-border"
                    />
                  )}

                  {field.type === "textarea" && (
                    <Textarea
                      id={field.id}
                      value={(cardData[card.id]?.[field.id] as string) || ""}
                      onChange={(e) => updateCardField(card.id, field.id, e.target.value)}
                      className="bg-input border-border min-h-[80px] resize-none"
                    />
                  )}

                  {field.type === "file" && (
                    <div className="space-y-2">
                      {cardData[card.id]?.[field.id] ? (
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-md border border-border">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span className="text-sm text-card-foreground flex-1">
                            {(cardData[card.id][field.id] as File)?.name || "File uploaded"}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                            title="Send to patient"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(card.id, field.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-border rounded-md p-8 text-center">
                          <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground mb-3">Click to upload or drag and drop</p>
                          <input
                            type="file"
                            id={`${card.id}-${field.id}`}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null
                              handleFileUpload(card.id, field.id, file)
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById(`${card.id}-${field.id}`)?.click()}
                          >
                            Choose File
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Bottom Action Tab */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-4 shadow-lg z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-card-foreground">
              Working Area Actions
            </span>
            <Input
              placeholder="Add remarks..."
              className="w-80"
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
