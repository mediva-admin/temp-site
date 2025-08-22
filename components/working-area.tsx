"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, Eye, Trash2, Save, CheckCircle } from "lucide-react"

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
    <div className="space-y-4">
      {/* Working Area Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Card key={card.id} className="bg-card border-border shadow-sm transition-all duration-200 hover:shadow-md">
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
                      className="bg-input border-border min-h-[80px]"
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
                        <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
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
    </div>
  )
}
