"use client";

import React, { useState, useRef } from "react";
import { Input, Checkbox, Button } from "@heroui/react";
import { Upload, X } from "lucide-react";
import { uploadImage } from "@/lib/supabase/actions/upload";

interface GalleryFormProps {
  initialData?: any;
  onChange: (data: any) => void;
}

export default function GalleryForm({
  initialData = {},
  onChange,
}: GalleryFormProps) {
  const [formData, setFormData] = useState({
    src: initialData.src || "",
    title: initialData.title || "",
    url: initialData.url || "",
    is_homepage: initialData.is_homepage ?? false,
  });
  const [isUploading, setIsUploading] = useState(false);

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

  const ImageUploader = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          // Generate a unique path for the file
          const timestamp = Date.now();
          const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
          const path = `gallery/${timestamp}-${fileName}`;

          // Create FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("path", path);

          // Upload to Supabase
          const publicUrl = await uploadImage(formData);
          if (publicUrl) {
            handleChange("src", publicUrl);
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
      <div className="space-y-2">
        <Label>Gallery Image *</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-32 h-20 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center">
              {formData.src ? (
                <img
                  src={formData.src}
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
                {formData.src && (
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    isIconOnly
                    onPress={() => handleChange("src", "")}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
              <Input
                placeholder="Or paste image URL..."
                size="sm"
                value={formData.src}
                onValueChange={(v) => handleChange("src", v)}
                variant="bordered"
                aria-label="Image Source Path"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <ImageUploader />

      <div>
        <Label>Title / Caption *</Label>
        <Input
          placeholder="Annual Lab BBQ"
          value={formData.title}
          onValueChange={(v) => handleChange("title", v)}
          variant="bordered"
          aria-label="Title / Caption"
          isRequired
        />
      </div>
      <div>
        <Label>Redirect URL (Optional)</Label>
        <Input
          placeholder="https://..."
          value={formData.url}
          onValueChange={(v) => handleChange("url", v)}
          variant="bordered"
          aria-label="Redirect URL"
        />
      </div>
      <div className="flex items-center pl-1 pt-1">
        <Checkbox
          isSelected={formData.is_homepage}
          onValueChange={(v) => handleChange("is_homepage", v)}
        >
          Show on Homepage
        </Checkbox>
      </div>
    </div>
  );
}
