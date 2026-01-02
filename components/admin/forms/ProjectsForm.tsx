"use client";

import React, { useState } from "react";
import { Input, Button } from "@heroui/react";
import { Plus, X } from "lucide-react";

interface ProjectsFormProps {
  initialData?: any;
  onChange: (data: any) => void;
}

interface Project {
  title: string;
  link: string;
}

export default function ProjectsForm({
  initialData = {},
  onChange,
}: ProjectsFormProps) {
  const [projects, setProjects] = useState<Project[]>(
    initialData.projects && Array.isArray(initialData.projects)
      ? initialData.projects
      : []
  );

  const handleChange = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
    onChange({ ...initialData, projects: newProjects });
  };

  const handleAdd = () => {
    const newProjects = [...projects, { title: "", link: "" }];
    setProjects(newProjects);
    onChange({ ...initialData, projects: newProjects });
  };

  const handleRemove = (index: number) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
    onChange({ ...initialData, projects: newProjects });
  };

  const Label = ({ children }: { children: React.ReactNode }) => (
    <span className="block text-sm font-semibold text-gray-700 mb-1.5">
      {children}
    </span>
  );

  return (
    <div className="flex flex-col gap-6 w-full pb-6">
      <div className="flex items-center justify-between">
        <Label>Recent Funded and Ongoing Projects</Label>
        <Button
          size="sm"
          className="bg-blue-michigan text-white font-medium"
          startContent={<Plus size={16} />}
          onPress={handleAdd}
        >
          Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50/50"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <div>
                  <Label>Project Title *</Label>
                  <Input
                    placeholder="e.g., Machine Learning for Nuclear Reactors"
                    value={project.title}
                    onValueChange={(v) => handleChange(index, "title", v)}
                    variant="bordered"
                    aria-label={`Project ${index + 1} Title`}
                    isRequired
                  />
                </div>
                <div>
                  <Label>Link / Further Read *</Label>
                  <Input
                    placeholder="https://... or WIP"
                    value={project.link}
                    onValueChange={(v) => handleChange(index, "link", v)}
                    variant="bordered"
                    aria-label={`Project ${index + 1} Link`}
                    isRequired
                  />
                </div>
              </div>
              <Button
                size="sm"
                variant="flat"
                color="danger"
                isIconOnly
                onPress={() => handleRemove(index)}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
            No projects added yet. Click &quot;Add Project&quot; to get started.
          </div>
        )}
      </div>
    </div>
  );
}
