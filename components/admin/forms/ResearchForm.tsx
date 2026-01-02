"use client";

import React, { useState, useRef } from "react";
import {
  Input,
  Textarea,
  Checkbox,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import { Upload, X } from "lucide-react";
import { uploadImage } from "@/lib/supabase/actions/upload";

interface ResearchFormProps {
  initialData?: any;
  onChange: (data: any) => void;
  hideRecentCheckbox?: boolean;
}

export default function ResearchForm({
  initialData = {},
  onChange,
  hideRecentCheckbox = false,
}: ResearchFormProps) {
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    type: initialData.type || "publication",
    title: initialData.title || "",
    group_name: initialData.group_name || "reactors",
    image_url: initialData.image_url || "",
    authors: initialData.authors?.join(", ") || "",
    journal: initialData.journal || "",
    year: initialData.year || new Date().getFullYear(),
    timestamp: initialData.timestamp || Math.floor(Date.now() / 1000),
    abstract: initialData.abstract || "",
    keywords: initialData.keywords?.join(", ") || "",
    doi: initialData.doi || "",
    pdf_url: initialData.pdf_url || "",
    status: initialData.status || "Completed",
  });

  const handleChange = (key: string, value: any) => {
    const newData = { ...formData, [key]: value };
    setFormData(newData);

    const formattedData = { ...newData };
    if (typeof formattedData.authors === "string") {
      formattedData.authors = formattedData.authors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (typeof formattedData.keywords === "string") {
      formattedData.keywords = formattedData.keywords
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    onChange(formattedData);
  };

  const Label = ({ children }: { children: React.ReactNode }) => (
    <span className="block text-sm font-semibold text-gray-700 mb-1.5">
      {children}
    </span>
  );

  const ImageUploader = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          const timestamp = Date.now();
          const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
          const path = `research/${timestamp}-${fileName}`;

          const formDataObj = new FormData();
          formDataObj.append("file", file);
          formDataObj.append("path", path);

          const publicUrl = await uploadImage(formDataObj);
          if (publicUrl) {
            handleChange("image_url", publicUrl);
          } else {
            alert("Failed to upload image");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Error uploading image. Please try again.");
        } finally {
          setIsUploading(false);
        }
      }
    };

    return (
      <div className="w-full flex flex-col gap-2">
        <Label>Cover Image *</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-24 h-24 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center">
              {formData.image_url ? (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">No Image</span>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-blue-michigan text-white font-medium"
                  startContent={<Upload size={16} />}
                  onPress={() => fileInputRef.current?.click()}
                  isLoading={isUploading}
                  isDisabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload Image"}
                </Button>
                {formData.image_url && (
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    isIconOnly
                    onPress={() => handleChange("image_url", "")}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
              <Input
                placeholder="Or paste image URL..."
                size="sm"
                value={formData.image_url}
                onValueChange={(v) => handleChange("image_url", v)}
                variant="bordered"
                aria-label="Image URL"
                isRequired
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-6">
      <div className="grid grid-cols-1 gap-4 items-start">
        <div className="w-full flex flex-col gap-2">
          <Label>Type *</Label>
          <Select
            selectedKeys={[formData.type]}
            onSelectionChange={(keys) =>
              handleChange("type", Array.from(keys)[0])
            }
            variant="bordered"
            placeholder="Select type"
            aria-label="Type"
            isRequired
            classNames={{
              trigger: "h-12 relative",
              value: "text-left font-normal pr-8",
              selectorIcon: "absolute right-3 top-1/2 -translate-y-1/2",
            }}
            popoverProps={{
              classNames: {
                content: "bg-white shadow-xl border border-gray-100",
              },
            }}
          >
            <SelectItem key="publication" value="publication">
              Publication
            </SelectItem>
            <SelectItem key="project" value="project">
              Project
            </SelectItem>
          </Select>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label>Title *</Label>
        <Textarea
          placeholder="Enter paper or project title"
          value={formData.title}
          onValueChange={(v) => handleChange("title", v)}
          variant="bordered"
          minRows={1}
          aria-label="Title"
          isRequired
          classNames={{
            inputWrapper: "h-auto min-h-12 py-3",
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="w-full flex flex-col gap-2">
          <Label>Research Group *</Label>
          <Select
            selectedKeys={[formData.group_name]}
            onSelectionChange={(keys) =>
              handleChange("group_name", Array.from(keys)[0])
            }
            variant="bordered"
            placeholder="Select group"
            aria-label="Research Group"
            isRequired
            classNames={{
              trigger: "h-12 relative",
              value: "text-left font-normal pr-8",
              selectorIcon: "absolute right-3 top-1/2 -translate-y-1/2",
            }}
            popoverProps={{
              classNames: {
                content: "bg-white shadow-xl border border-gray-100",
              },
            }}
          >
            <SelectItem key="reactors" value="reactors">
              Reactors
            </SelectItem>
            <SelectItem key="controls" value="controls">
              Controls
            </SelectItem>
            <SelectItem key="computing" value="computing">
              Computing
            </SelectItem>
          </Select>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label>Authors (comma-separated)</Label>
        <Textarea
          placeholder="Author 1, Author 2, Author 3"
          value={formData.authors}
          onValueChange={(v) => handleChange("authors", v)}
          variant="bordered"
          minRows={1}
          aria-label="Authors"
          classNames={{
            inputWrapper: "h-auto min-h-12 py-3",
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="w-full flex flex-col gap-2">
          <Label>Journal / Venue</Label>
          <Input
            placeholder="e.g., Nature, ANS M&C"
            value={formData.journal}
            onValueChange={(v) => handleChange("journal", v)}
            variant="bordered"
            aria-label="Journal"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Year</Label>
          <Input
            type="number"
            value={formData.year.toString()}
            onValueChange={(v) => handleChange("year", parseInt(v) || 0)}
            variant="bordered"
            aria-label="Year"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label>Abstract / Description</Label>
        <Textarea
          placeholder="Detailed summary..."
          value={formData.abstract}
          onValueChange={(v) => handleChange("abstract", v)}
          variant="bordered"
          minRows={3}
          aria-label="Abstract"
          classNames={{
            inputWrapper: "h-auto min-h-[100px] py-3",
          }}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label>Keywords (comma-separated)</Label>
        <Textarea
          placeholder="AI, Nuclear, CFD"
          value={formData.keywords}
          onValueChange={(v) => handleChange("keywords", v)}
          variant="bordered"
          minRows={1}
          aria-label="Keywords"
          classNames={{
            inputWrapper: "h-auto min-h-12 py-3",
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="w-full flex flex-col gap-2">
          <Label>DOI</Label>
          <Input
            placeholder="https://doi.org/..."
            value={formData.doi}
            onValueChange={(v) => handleChange("doi", v)}
            variant="bordered"
            aria-label="DOI"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>PDF URL</Label>
          <Input
            placeholder="/pdfs/paper.pdf or https://..."
            value={formData.pdf_url}
            onValueChange={(v) => handleChange("pdf_url", v)}
            variant="bordered"
            aria-label="PDF URL"
          />
        </div>
      </div>

      <ImageUploader />

      <div className="w-full flex flex-col gap-2">
        <Label>Status</Label>
        <Select
          selectedKeys={[formData.status]}
          onSelectionChange={(keys) =>
            handleChange("status", Array.from(keys)[0])
          }
          variant="bordered"
          placeholder="Select status"
          aria-label="Status"
          classNames={{
            trigger: "h-12 relative",
            value: "text-left font-normal pr-8",
            selectorIcon: "absolute right-3 top-1/2 -translate-y-1/2",
          }}
          popoverProps={{
            classNames: {
              content: "bg-white shadow-xl border border-gray-100",
            },
          }}
        >
          <SelectItem key="Completed" value="Completed">
            Completed
          </SelectItem>
          <SelectItem key="Ongoing" value="Ongoing">
            Ongoing
          </SelectItem>
        </Select>
      </div>
    </div>
  );
}
