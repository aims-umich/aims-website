"use client"

import React, { useState } from "react"
import { Input, Divider } from "@heroui/react"

interface MapConnectionFormProps {
  initialData?: any
  onChange: (data: any) => void
}

export default function MapConnectionForm({ initialData = {}, onChange }: MapConnectionFormProps) {
  const [formData, setFormData] = useState({
    start: initialData.start || { lat: 0, lng: 0, country: "" },
    end: initialData.end || { lat: 0, lng: 0, country: "" },
  })

  const handleChange = (section: 'start' | 'end', key: string, value: any) => {
    const newData = {
      ...formData,
      [section]: { ...formData[section], [key]: value }
    }
    setFormData(newData)
    onChange(newData)
  }

  const Label = ({ children }: { children: React.ReactNode }) => (
    <span className="block text-sm font-semibold text-gray-700 mb-1.5">{children}</span>
  )

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <h3 className="font-semibold text-blue-michigan text-lg">Start Location</h3>
        <div>
          <Label>Country / City Name</Label>
          <Input
            placeholder="Ann Arbor, MI, USA"
            value={formData.start.country}
            onValueChange={(v) => handleChange('start', 'country', v)}
            variant="bordered"
            aria-label="Start Country"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Latitude</Label>
            <Input
              type="number"
              step="any"
              value={formData.start.lat}
              onValueChange={(v) => handleChange('start', 'lat', parseFloat(v))}
              variant="bordered"
              aria-label="Start Latitude"
            />
          </div>
          <div>
            <Label>Longitude</Label>
            <Input
              type="number"
              step="any"
              value={formData.start.lng}
              onValueChange={(v) => handleChange('start', 'lng', parseFloat(v))}
              variant="bordered"
              aria-label="Start Longitude"
            />
          </div>
        </div>
      </div>

      <Divider />

      <div className="space-y-5">
        <h3 className="font-semibold text-blue-michigan text-lg">End Location</h3>
        <div>
          <Label>Country / City Name</Label>
          <Input
            placeholder="Dubai, UAE"
            value={formData.end.country}
            onValueChange={(v) => handleChange('end', 'country', v)}
            variant="bordered"
            aria-label="End Country"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Latitude</Label>
            <Input
              type="number"
              step="any"
              value={formData.end.lat}
              onValueChange={(v) => handleChange('end', 'lat', parseFloat(v))}
              variant="bordered"
              aria-label="End Latitude"
            />
          </div>
          <div>
            <Label>Longitude</Label>
            <Input
              type="number"
              step="any"
              value={formData.end.lng}
              onValueChange={(v) => handleChange('end', 'lng', parseFloat(v))}
              variant="bordered"
              aria-label="End Longitude"
            />
          </div>
        </div>
      </div>
    </div>
  )
}