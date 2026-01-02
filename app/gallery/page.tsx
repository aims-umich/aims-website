"use client";

import React, { useState } from "react";
import { LoadingCarousel } from "./Carousel";
import {
  upsertGalleryItem,
  deleteGalleryItem,
} from "@/lib/supabase/actions/media";
import AdminWrapper from "@/components/admin/AdminWrapper";
import AdminModal from "@/components/admin/AdminModal";
import GalleryForm from "@/components/admin/forms/GalleryForm";

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const handleAdd = () => {
    setFormData({ is_homepage: false });
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await upsertGalleryItem(formData);
      setIsModalOpen(false);
      // Reload the page to refresh the carousel
      window.location.reload();
    } catch {
      alert("Error saving gallery item");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!formData?.id) return;
    setIsDeleting(true);
    try {
      await deleteGalleryItem(formData.id);
      setIsModalOpen(false);
      // Reload the page to refresh the carousel
      window.location.reload();
    } catch {
      alert("Error deleting gallery item");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-blue-michigan py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-yellow-maize">Gallery</span>
          </h1>
          <AdminWrapper
            onEdit={handleAdd}
            label="Add"
            variant="add"
            position="top-right"
            className="absolute top-0 right-0"
          >
            <span />
          </AdminWrapper>
          <p className="max-w-2xl mx-auto text-blue-michigan text-lg">
            Showcasing some of our favorite moments!
          </p>
        </div>

        <div className="relative overflow-hidden w-full h-full py-16">
          <LoadingCarousel
            autoplayInterval={10000}
            showNavigation={true}
            onEdit={handleEdit}
          />
        </div>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={formData?.id ? "Edit Gallery Image" : "Add Gallery Image"}
        onSave={handleSave}
        isSaving={isSaving}
        onDelete={formData?.id ? handleDelete : undefined}
        isDeleting={isDeleting}
      >
        <GalleryForm initialData={formData} onChange={setFormData} />
      </AdminModal>
    </div>
  );
};

export default Gallery;
