"use client"

// import { useState, useEffect, useRef, useCallback, memo } from "react"
import { useState, useEffect, useRef, memo } from "react"
// import dynamic from "next/dynamic"
import WorldMap from "./ui/WorldMap";
import { ChevronDown, List, Plus } from "lucide-react";
import { getMapConnections, addMapConnection } from "@/lib/supabase/actions/media";
import AdminWrapper from "./admin/AdminWrapper";
import AdminModal from "./admin/AdminModal";
import MapConnectionForm from "./admin/forms/MapConnectionForm";

interface Location {
  lat: number;
  lng: number;
  country: string;
}

// Data will be fetched from Supabase

const MapHeading = memo(({ onAdd }: { onAdd?: () => void }) => (
  <div className="pt-12 relative">
    <div className="flex flex-col items-center justify-center">
      <AdminWrapper onEdit={onAdd || (() => {})} label="Add" variant="add" position="header">
        <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl md:text-5xl mb-8">
          Where We Come <span className="text-yellow-maize">From</span>
        </h2>
      </AdminWrapper>
    </div>
  </div>
))
MapHeading.displayName = 'MapHeading'

const LocationsList = memo(({ mapData }: { mapData: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);

  useEffect(() => {
    const locationsSet = new Set<string>();
    mapData.forEach((connection) => {
      locationsSet.add(connection.start.country);
      locationsSet.add(connection.end.country);
    });
    setUniqueLocations(Array.from(locationsSet).sort());
  }, [mapData]);

  return (
    <div className="relative flex justify-center mb-8">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-michigan text-yellow-maize rounded-full font-medium hover:bg-blue-michigan/90 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <List className="h-5 w-5" />
          <span>View Full List ({uniqueLocations.length} Locations)</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="bg-blue-michigan text-yellow-maize px-4 py-3 font-semibold">
              All Member Locations
            </div>
            <div className="max-h-96 overflow-y-auto">
              <ul className="divide-y divide-gray-100">
                {uniqueLocations.map((location, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 hover:bg-blue-michigan/5 transition-colors duration-200 text-blue-michigan"
                  >
                    {location}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 px-4 py-2 text-center text-sm text-gray-600">
              {uniqueLocations.length} unique{" "}
              {uniqueLocations.length === 1 ? "location" : "locations"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
LocationsList.displayName = "LocationsList";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapData, setMapData] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    fetchConnections()
  }, [])

  const fetchConnections = async () => {
    const data = await getMapConnections()
    setMapData(data)
  }

  const handleAdd = () => {
    setFormData({
      start: { lat: 0, lng: 0, country: "" },
      end: { lat: 42.2808, lng: -83.743, country: "Ann Arbor, MI, USA" } // Default end to Ann Arbor
    })
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await addMapConnection(formData.start, formData.end)
      await fetchConnections()
      setIsModalOpen(false)
    } catch (error) {
      alert("Error saving map connection")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="w-full -mt-16 mb-32">
      <div className="h-full w-full dark:bg-black-100 bg-white absolute left-0 right-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <MapHeading onAdd={handleAdd} />
      <div className="flex flex-col items-center">
        <LocationsList mapData={mapData} />
      </div>

      <div ref={mapRef}>
        <WorldMap dots={mapData} />
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Map Connection"
        onSave={handleSave}
        isSaving={isSaving}
      >
        <MapConnectionForm initialData={formData} onChange={setFormData} />
      </AdminModal>
    </div>
  );
}

export default memo(Map)