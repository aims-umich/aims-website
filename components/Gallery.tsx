"use client";
import React from "react";
import { ParallaxScroll } from "@/components/ui/ParallaxScroll";
import { Button } from "@heroui/react";
import Link from "next/link";

import {
  getGalleryItems,
  upsertGalleryItem,
  deleteGalleryItem,
} from "@/lib/supabase/actions/media";
import { useState, useEffect } from "react";
import AdminWrapper from "./admin/AdminWrapper";
import AdminModal from "./admin/AdminModal";
import GalleryForm from "./admin/forms/GalleryForm";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const data = await getGalleryItems(true);
    setGalleryImages(data);
  };

  const handleAdd = () => {
    setFormData({ is_homepage: true });
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
      await fetchImages();
      setIsModalOpen(false);
    } catch (error) {
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
      await fetchImages();
      setIsModalOpen(false);
    } catch (error) {
      alert("Error deleting gallery item");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full -mt-16 mb-32">
      <div className="h-full w-full dark:bg-black-100 bg-white absolute left-0 right-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="py-12 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <AdminWrapper
            onEdit={handleAdd}
            label="Add"
            variant="add"
            position="header"
          >
            <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl md:text-5xl mb-4">
              Our <span className="text-yellow-maize">Gallery</span>
            </h2>
          </AdminWrapper>
        </div>

        <div className="px-4 md:px-6 max-w-7xl mx-auto">
          <ParallaxScroll images={galleryImages} />
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

        <div className="flex justify-center mt-8">
          <Link href="/gallery" legacyBehavior passHref>
            <Button
              as="a"
              className="px-12 py-0 text-xl font-semibold text-yellow-maize bg-blue-michigan rounded-full hover:bg-blue-michigan/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
              size="lg"
            >
              View Full Gallery
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
