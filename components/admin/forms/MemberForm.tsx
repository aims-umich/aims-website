"use client";

import React, { useState, useRef } from "react";
import { Input, Textarea, Select, SelectItem, Button } from "@heroui/react";
import { Upload, X } from "lucide-react";
import { uploadImage } from "@/lib/supabase/actions/upload";

interface MemberFormProps {
  initialData?: any;
  onChange: (data: any) => void;
}

export default function MemberForm({
  initialData = {},
  onChange,
}: MemberFormProps) {
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    name: initialData.name || "",
    email: initialData.email || "",
    status: initialData.status || "Graduate",
    role: initialData.role || "",
    joined_date: initialData.joined_date || "",
    image_url: initialData.image_url || "",
    hero_image_url: initialData.hero_image_url || "",
    bio: initialData.bio || "",
    interests: Array.isArray(initialData.interests)
      ? initialData.interests.join(", ")
      : initialData.interests || "",
    education: Array.isArray(initialData.education)
      ? initialData.education.join("\n")
      : initialData.education || "",
    degrees: Array.isArray(initialData.degrees)
      ? initialData.degrees.join("\n")
      : initialData.degrees || "",
    department: initialData.department || "",
    linkedin: initialData.linkedin || "",
    website: initialData.website || "",
    slug: initialData.slug || "",
  });

  const handleChange = (key: string, value: any) => {
    const newData = { ...formData, [key]: value };
    setFormData(newData);

    const formattedData = { ...newData };
    if (key === "interests") {
      formattedData.interests =
        typeof value === "string"
          ? value
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : value;
    } else if (key === "education") {
      formattedData.education =
        typeof value === "string"
          ? value
              .split("\n")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : value;
    } else if (key === "degrees") {
      formattedData.degrees =
        typeof value === "string"
          ? value
              .split("\n")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : value;
    }
    onChange(formattedData);
  };

  const Label = ({ children }: { children: React.ReactNode }) => (
    <span className="block text-sm font-semibold text-gray-700 mb-1.5">
      {children}
    </span>
  );

  const ImageUploader = ({
    label,
    value,
    fieldKey,
    required,
  }: {
    label: string;
    value: string;
    fieldKey: string;
    required?: boolean;
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          const timestamp = Date.now();
          const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
          const folder =
            fieldKey === "image_url" ? "members/profile" : "members/hero";
          const path = `${folder}/${timestamp}-${fileName}`;

          const formDataObj = new FormData();
          formDataObj.append("file", file);
          formDataObj.append("path", path);

          const publicUrl = await uploadImage(formDataObj);
          if (publicUrl) {
            handleChange(fieldKey, publicUrl);
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
        <Label>{label}</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-24 h-24 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center">
              {value ? (
                <img
                  src={value}
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
                {value && (
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    isIconOnly
                    onPress={() => handleChange(fieldKey, "")}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
              <Input
                placeholder="Or paste image URL..."
                size="sm"
                value={value}
                onValueChange={(v) => handleChange(fieldKey, v)}
                variant="bordered"
                aria-label={`URL for ${label}`}
                isRequired={required}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-6">
      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="w-full flex flex-col gap-2">
          <Label>Name *</Label>
          <Input
            placeholder="e.g. Jeremy Moon"
            value={formData.name}
            onValueChange={(v) => handleChange("name", v)}
            variant="bordered"
            aria-label="Name"
            isRequired
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Email *</Label>
          <Input
            placeholder="e.g. jeremoon@umich.edu"
            value={formData.email}
            onValueChange={(v) => handleChange("email", v)}
            variant="bordered"
            aria-label="Email"
            isRequired
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="w-full flex flex-col gap-2">
          <Label>Status *</Label>
          <Select
            selectedKeys={[formData.status]}
            onSelectionChange={(keys) =>
              handleChange("status", Array.from(keys)[0])
            }
            variant="bordered"
            placeholder="Select status"
            aria-label="Status"
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
            <SelectItem
              key="Principal Investigator"
              value="Principal Investigator"
            >
              Principal Investigator
            </SelectItem>
            <SelectItem key="Postdoc" value="Postdoc">
              Postdoc
            </SelectItem>
            <SelectItem key="Graduate" value="Graduate">
              Graduate
            </SelectItem>
            <SelectItem key="Undergraduate" value="Undergraduate">
              Undergraduate
            </SelectItem>
            <SelectItem key="Alumni" value="Alumni">
              Alumni
            </SelectItem>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Slug *</Label>
          <Input
            placeholder="e.g. jeremoon"
            value={formData.slug}
            onValueChange={(v) => handleChange("slug", v)}
            variant="bordered"
            aria-label="Slug"
            isRequired
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label>Role *</Label>
        <Input
          placeholder="e.g. PhD Student / Research Scholar"
          value={formData.role}
          onValueChange={(v) => handleChange("role", v)}
          variant="bordered"
          aria-label="Role"
          isRequired
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="w-full flex flex-col gap-2">
          <Label>Joined Date *</Label>
          <Input
            placeholder="e.g. September 2024"
            value={formData.joined_date}
            onValueChange={(v) => handleChange("joined_date", v)}
            variant="bordered"
            aria-label="Joined Date"
            isRequired
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Department *</Label>
          <Input
            placeholder="e.g. NERS"
            value={formData.department}
            onValueChange={(v) => handleChange("department", v)}
            variant="bordered"
            aria-label="Department"
            isRequired
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <ImageUploader
          label="Profile Image *"
          value={formData.image_url}
          fieldKey="image_url"
          required
        />
        <ImageUploader
          label="Hero Image"
          value={formData.hero_image_url}
          fieldKey="hero_image_url"
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label>Bio</Label>
        <Textarea
          placeholder="Tell us about yourself..."
          value={formData.bio}
          onValueChange={(v) => handleChange("bio", v)}
          variant="bordered"
          minRows={4}
          aria-label="Bio"
          classNames={{
            inputWrapper: "h-auto min-h-[120px] py-3", // Force wrapper height to expand
            input: "text-base leading-relaxed",
          }}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label>Interests (comma-separated)</Label>
        <Textarea
          placeholder="e.g. AI, Machine Learning, Physics"
          value={formData.interests}
          onValueChange={(v) => handleChange("interests", v)}
          variant="bordered"
          minRows={1}
          aria-label="Interests"
          classNames={{
            inputWrapper: "h-auto min-h-12 py-3",
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="w-full flex flex-col gap-2">
          <Label>Education (one per line)</Label>
          <Textarea
            placeholder="e.g. University of Michigan"
            value={formData.education}
            onValueChange={(v) => handleChange("education", v)}
            variant="bordered"
            minRows={3}
            aria-label="Education"
            classNames={{
              inputWrapper: "h-auto min-h-[100px] py-3",
            }}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Degrees (one per line)</Label>
          <Textarea
            placeholder="e.g. B.S. in Data Science, 2027"
            value={formData.degrees}
            onValueChange={(v) => handleChange("degrees", v)}
            variant="bordered"
            minRows={3}
            aria-label="Degrees"
            classNames={{
              inputWrapper: "h-auto min-h-[100px] py-3",
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="w-full flex flex-col gap-2">
          <Label>LinkedIn URL</Label>
          <Input
            placeholder="https://linkedin.com/in/..."
            value={formData.linkedin}
            onValueChange={(v) => handleChange("linkedin", v)}
            variant="bordered"
            aria-label="LinkedIn URL"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Website URL</Label>
          <Input
            placeholder="https://..."
            value={formData.website}
            onValueChange={(v) => handleChange("website", v)}
            variant="bordered"
            aria-label="Website URL"
          />
        </div>
      </div>
    </div>
  );
}
