"use client"

import React, { useState, useEffect } from "react"
import { Pencil, Plus } from "lucide-react"
import { getAdminStatus } from "@/lib/supabase/actions"
import { motion } from "framer-motion"

interface AdminWrapperProps {
  children: React.ReactNode
  onEdit: () => void
  label?: string
  className?: string
  variant?: "edit" | "add"
  position?: "top-right" | "header" | "inline"
}

export default function AdminWrapper({ 
  children, 
  onEdit, 
  label, 
  className = "",
  variant = "edit",
  position = "top-right"
}: AdminWrapperProps) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    getAdminStatus().then(setIsAdmin)
  }, [])

  if (!isAdmin) {
    return <>{children}</>
  }

  const Icon = variant === "add" ? Plus : Pencil
  
  const getButtonStyles = () => {
    switch (position) {
      case "header":
        return "relative inline-flex items-center gap-1.5 ml-3 px-3 py-1.5 text-xs font-semibold bg-blue-michigan/10 text-blue-michigan border border-blue-michigan/20 rounded-full hover:bg-blue-michigan hover:text-yellow-maize transition-all duration-200"
      case "inline":
        return "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-michigan/70 hover:text-blue-michigan hover:bg-blue-michigan/5 rounded transition-all duration-200"
      case "top-right":
      default:
        return "absolute top-3 right-3 z-40 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-michigan text-yellow-maize rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
    }
  }

  if (position === "header") {
    return (
      <div className={`flex items-center ${className}`}>
        {children}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onEdit()
          }}
          className={getButtonStyles()}
          title={label || (variant === "add" ? "Add" : "Edit")}
        >
          <Icon size={14} />
          {label && <span>{label}</span>}
        </motion.button>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {children}
      
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onEdit()
        }}
        className={getButtonStyles()}
        title={label || (variant === "add" ? "Add" : "Edit")}
      >
        <Icon size={14} />
        {label && <span>{label}</span>}
      </motion.button>
    </div>
  )
}
