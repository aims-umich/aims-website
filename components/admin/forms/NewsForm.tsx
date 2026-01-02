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

interface NewsFormProps {
  initialData?: any;
  onChange: (data: any) => void;
}

export default function NewsForm({
  initialData = {},
  onChange,
}: NewsFormProps) {
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    title: initialData.title || "",
    excerpt: initialData.excerpt || "",
    content: initialData.content || "",
    link: initialData.link || "",
    date:
      initialData.date ||
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    timestamp: initialData.timestamp || Math.floor(Date.now() / 1000),
    image_url: initialData.image_url || "",
    images: initialData.images || [],
    category: initialData.category || "general",
    featured: initialData.featured ?? false,
    author: initialData.author || "AIMS Lab",
    slug: initialData.slug || "",
  });
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingBody, setIsUploadingBody] = useState<number | null>(null);

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
        setIsUploadingCover(true);
        try {
          const timestamp = Date.now();
          const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
          const path = `news/${timestamp}-${fileName}`;

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
          setIsUploadingCover(false);
        }
      }
    };

    return (
      <div className="w-full flex flex-col gap-2">
        <Label>Cover Image *</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-32 h-20 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center">
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
                  isLoading={isUploadingCover}
                  isDisabled={isUploadingCover}
                >
                  {isUploadingCover ? "Uploading..." : "Upload Cover"}
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

  const BodyImagesUploader = () => {
    const addFileInputRef = useRef<HTMLInputElement>(null);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleFileSelect = async (
      e: React.ChangeEvent<HTMLInputElement>,
      index?: number
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        const uploadIndex = index ?? formData.images.length;
        setIsUploadingBody(uploadIndex);
        try {
          const timestamp = Date.now();
          const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
          const path = `news/body/${timestamp}-${fileName}`;

          const formDataObj = new FormData();
          formDataObj.append("file", file);
          formDataObj.append("path", path);

          const publicUrl = await uploadImage(formDataObj);
          if (publicUrl) {
            const newImages = [...formData.images];
            if (index !== undefined) {
              newImages[index] = publicUrl;
            } else {
              newImages.push(publicUrl);
            }
            handleChange("images", newImages);
          } else {
            alert("Failed to upload image");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Error uploading image. Please try again.");
        } finally {
          setIsUploadingBody(null);
        }
      }
    };

    return (
      <div className="w-full flex flex-col gap-4">
        <Label>Body Images (Optional)</Label>
        <div className="space-y-4">
          {formData.images.map((url: string, index: number) => (
            <div
              key={index}
              className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-32 h-20 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center">
                  <img
                    src={url}
                    alt={`Body image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <input
                    type="file"
                    ref={(el) => {
                      fileInputRefs.current[index] = el;
                    }}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, index)}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-blue-michigan text-white font-medium"
                      startContent={<Upload size={16} />}
                      onPress={() => fileInputRefs.current[index]?.click()}
                      isLoading={isUploadingBody === index}
                      isDisabled={isUploadingBody === index}
                    >
                      {isUploadingBody === index ? "Uploading..." : "Replace"}
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      color="danger"
                      isIconOnly
                      onPress={() => {
                        const newImages = formData.images.filter(
                          (_: string, i: number) => i !== index
                        );
                        handleChange("images", newImages);
                      }}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  <Input
                    placeholder="Or paste image URL..."
                    size="sm"
                    value={url}
                    onValueChange={(v) => {
                      const newImages = [...formData.images];
                      newImages[index] = v;
                      handleChange("images", newImages);
                    }}
                    variant="bordered"
                    aria-label={`Body image ${index + 1} URL`}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <input
              type="file"
              ref={addFileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileSelect(e)}
            />
            <Button
              size="sm"
              className="bg-blue-michigan text-white font-medium"
              startContent={<Upload size={16} />}
              onPress={() => addFileInputRef.current?.click()}
              isLoading={isUploadingBody === formData.images.length}
              isDisabled={isUploadingBody === formData.images.length}
            >
              {isUploadingBody === formData.images.length
                ? "Uploading..."
                : "Add Body Image"}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-6">
      <div className="w-full flex flex-col gap-2">
        <Label>Title *</Label>
        <Textarea
          placeholder="Enter news title"
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

      <div className="grid grid-cols-1 gap-4 items-start">
        <div className="w-full flex flex-col gap-2">
          <Label>Date *</Label>
          <Input
            placeholder="e.g., January 24, 2025"
            value={formData.date}
            onValueChange={(v) => handleChange("date", v)}
            variant="bordered"
            aria-label="Date"
            isRequired
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label>Excerpt *</Label>
        <Textarea
          placeholder="Brief summary for the homepage..."
          value={formData.excerpt}
          onValueChange={(v) => handleChange("excerpt", v)}
          variant="bordered"
          aria-label="Excerpt"
          isRequired
          classNames={{
            inputWrapper: "h-auto min-h-[80px] py-3",
          }}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label>Content *</Label>
        <Textarea
          placeholder="Full article content..."
          value={formData.content}
          onValueChange={(v) => handleChange("content", v)}
          variant="bordered"
          minRows={4}
          aria-label="Content"
          isRequired
          classNames={{
            inputWrapper: "h-auto min-h-[150px] py-3",
          }}
        />
      </div>

      <ImageUploader />
      <BodyImagesUploader />

      <div className="w-full flex flex-col gap-2">
        <Label>External Link (Optional)</Label>
        <Input
          placeholder="https://..."
          value={formData.link}
          onValueChange={(v) => handleChange("link", v)}
          variant="bordered"
          aria-label="External Link"
        />
      </div>

      <div className="flex items-end gap-6">
        <div className="flex-1 max-w-xs flex flex-col gap-2">
          <Label>Category *</Label>
          <Select
            selectedKeys={[formData.category]}
            onSelectionChange={(keys) =>
              handleChange("category", Array.from(keys)[0])
            }
            variant="bordered"
            placeholder="Select category"
            aria-label="Category"
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
            <SelectItem key="general" value="general">
              General
            </SelectItem>
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

        <div className="pb-3.5">
          <Checkbox
            isSelected={formData.featured}
            onValueChange={(v) => handleChange("featured", v)}
            color="primary"
          >
            Featured Story
          </Checkbox>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label>Author *</Label>
        <Input
          placeholder="Author name"
          value={formData.author}
          onValueChange={(v) => handleChange("author", v)}
          variant="bordered"
          aria-label="Author"
          isRequired
        />
      </div>
    </div>
  );
}
