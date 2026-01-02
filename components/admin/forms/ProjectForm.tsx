"use client";

import React, { useState } from "react";
import { Input, Checkbox, Button } from "@heroui/react";

interface ProjectFormProps {
  initialData?: any;
  onChange: (data: any) => void;
}

export default function ProjectForm({
  initialData = {},
  onChange,
}: ProjectFormProps) {
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    title: initialData.title || "",
    link: initialData.link || "",
    group_name: initialData.group_name || "reactors",
    is_wip: initialData.is_wip ?? false,
  });

  const handleChange = (key: string, value: any) => {
    const newData = { ...formData, [key]: value };
    setFormData(newData);
    onChange(newData);
  };

  const Label = ({ children }: { children: React.ReactNode }) => (
    <span className="block text-sm font-semibold text-gray-700 mb-1.5">
      {children}
    </span>
  );

  return (
    <div className="flex flex-col gap-6 w-full pb-6">
      <div className="w-full flex flex-col gap-2">
        <Label>Project Title *</Label>
        <Input
          placeholder="e.g., Machine Learning for Nuclear Reactors"
          value={formData.title}
          onValueChange={(v) => handleChange("title", v)}
          variant="bordered"
          aria-label="Project Title"
          isRequired
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label>Link / Further Read</Label>
        <Input
          placeholder="https://... (Leave empty if WIP)"
          value={formData.link}
          onValueChange={(v) => handleChange("link", v)}
          variant="bordered"
          aria-label="Link"
        />
      </div>

      <div className="flex items-center gap-6">
        <Checkbox
          isSelected={formData.is_wip}
          onValueChange={(v) => handleChange("is_wip", v)}
        >
          Work in Progress
        </Checkbox>
      </div>

      {!initialData.group_name && (
        <div className="text-xs text-gray-500 italic mt-2">
          Note: This project will be added to the current research group.
        </div>
      )}
    </div>
  );
}
