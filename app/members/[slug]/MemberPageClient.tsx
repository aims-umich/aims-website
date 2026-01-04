"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Linkedin,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  MapPin,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import { login, logout, getAdminStatus } from "@/lib/supabase/actions";
import { upsertMember, deleteMember } from "@/lib/supabase/actions/members";
import AdminWrapper from "@/components/admin/AdminWrapper";
import AdminModal from "@/components/admin/AdminModal";
import MemberForm from "@/components/admin/forms/MemberForm";

import { useState } from "react";

export default function MemberPageClient({
  member: initialMember,
}: {
  member: any;
}) {
  const [member, setMember] = useState(initialMember);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleEdit = () => {
    setFormData(member);
    setIsModalOpen(true);
  };



  const handleSave = async () => {
    setIsSaving(true);
    try {
      const norm = (v: any) =>
        typeof v === "string"
          ? v.trim() === ""
            ? []
            : v
                .split(v.includes("\n") ? "\n" : ",")
                .map((x) => x.trim())
                .filter(Boolean)
          : Array.isArray(v)
          ? v
          : [];
      
      const normalizedData = {
        ...formData,
        interests: norm(formData.interests),
        education: norm(formData.education),
        degrees: norm(formData.degrees),
      };
      
      await upsertMember(normalizedData);
      setMember(normalizedData);
      setIsModalOpen(false);
    } catch (error) {
      alert("Error saving member");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!member?.id) return;
    setIsDeleting(true);
    try {
      await deleteMember(member.id);
      window.location.href = "/members";
    } catch (error) {
      alert("Error deleting member");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={
              member.hero_image_url || member.heroImageUrl || "/default.webp"
            }
            alt={`${member.name} hero image`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white" />
        </div>
        <AdminWrapper
          onEdit={handleEdit}
          label="Edit Member Profile"
          className="absolute top-32 right-4 z-50"
        >
          <div className="hidden group-hover:block" />
        </AdminWrapper>

        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-end gap-6 md:gap-12"
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white overflow-hidden shadow-xl">
                <Image
                  src={member.image_url || member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-michigan">
                    {member.name}
                  </h1>
                  <p className="text-xl md:text-2xl text-blue-michigan mt-2">
                    {/* {member.status} -  */}
                    {member.role}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-blue-michigan mb-4">
                Contact & Info
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-michigan/70 mt-1" />
                  <div>
                    <p className="text-blue-michigan">{member.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-michigan/70" />
                  <p className="text-blue-michigan">
                    Joined {member.joined_date || member.joinedDate}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 rounded-lg bg-blue-michigan text-yellow-maize hover:bg-blue-michigan/90 transition"
                >
                  <Mail className="w-5 h-5" />
                </a>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-blue-michigan text-yellow-maize hover:bg-blue-michigan/90 transition"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-blue-michigan text-yellow-maize hover:bg-blue-michigan/90 transition"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              {(member.slug === "jeremoon" || member.slug === "radaideh") && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <AdminAccessButton />
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {member.bio && (
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-blue-michigan mb-4">
                  Biography
                </h2>
                <p className="text-blue-michigan/80 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            )}

            {member.interests && Array.isArray(member.interests) && member.interests.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-blue-michigan mb-6">
                  Research Interests
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {member.interests.map((interest, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div className="p-2 rounded-lg bg-blue-michigan/5">
                        <Lightbulb className="w-6 h-6 text-blue-michigan" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-michigan">
                          {interest}
                        </h3>
                        <p className="text-sm text-blue-michigan/70 mt-1">
                          Current research focus
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {member.education && Array.isArray(member.education) && member.education.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-blue-michigan mb-6">
                  Education
                </h2>
                <div className="space-y-6">
                  {member.education.map((edu, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                      className="flex items-start gap-4"
                    >
                      <div className="p-2 rounded-lg bg-blue-michigan/5 mt-1">
                        <GraduationCap className="w-6 h-6 text-blue-michigan" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-michigan">
                          {edu}
                        </h3>
                        <p className="text-sm text-blue-michigan/70 mt-1">
                          {member.degrees && member.degrees[idx]
                            ? member.degrees[idx]
                            : "N/A"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}


          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <Link
            href="/members"
            className="inline-flex items-center px-6 py-3 bg-blue-michigan text-yellow-maize rounded-lg hover:bg-blue-michigan/90 transition group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to Team
          </Link>
        </motion.div>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Member Profile"
        onSave={handleSave}
        isSaving={isSaving}
        onDelete={member?.id ? handleDelete : undefined}
        isDeleting={isDeleting}
      >
        <MemberForm initialData={formData} onChange={setFormData} />
      </AdminModal>


    </div>
  );
}

function AdminAccessButton() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    getAdminStatus().then(setIsAdmin);
  }, []);

  if (isAdmin === null) return null;

  if (isAdmin) {
    return (
      <button
        onClick={() => logout()}
        className="flex items-center gap-2 text-sm text-blue-michigan/50 hover:text-blue-michigan transition"
      >
        <LogOut className="w-4 h-4" />
        Admin Logout
      </button>
    );
  }

  return (
    <button
      onClick={() => login()}
      className="flex items-center gap-2 text-sm text-blue-michigan/50 hover:text-blue-michigan transition"
    >
      <Settings className="w-4 h-4" />
      Admin Login
    </button>
  );
}
