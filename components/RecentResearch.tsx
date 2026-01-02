"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { FileText, Users, BookOpen } from "lucide-react"
import { Button } from "@heroui/react"

import { getHomepageRecentResearch, upsertHomepageRecentResearch } from "@/lib/supabase/actions/homepage"
import { useState, useEffect } from "react"
import AdminWrapper from "./admin/AdminWrapper"
import AdminModal from "./admin/AdminModal"
import ResearchForm from "./admin/forms/ResearchForm"

export default function RecentResearch() {
  const [paper, setPaper] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    fetchRecentPaper()
  }, [])

  const fetchRecentPaper = async () => {
    const data = await getHomepageRecentResearch()
    if (data) {
      setPaper(data)
    } else {
      console.error("No homepage research data found")
    }
  }

  const handleEdit = () => {
    setFormData(paper)
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await upsertHomepageRecentResearch(formData)
      await fetchRecentPaper()
      setIsModalOpen(false)
    } catch (error) {
      alert("Error saving research")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="w-full py-24 relative overflow-hidden">
      {!paper ? (
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-michigan"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col items-center justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <AdminWrapper onEdit={handleEdit} label="Edit" position="header">
              <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl md:text-5xl mb-4">
                Recent <span className="text-yellow-maize">Research</span>
              </h2>
            </AdminWrapper>
            <p className="text-lg text-center max-w-2xl text-blue-michigan/80">
              Explore our latest publication that showcases our cutting-edge research in nuclear engineering and
              computational science.
            </p>
          </motion.div>

          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col">
                <div className="relative h-[600px] w-full">
                  <Image
                    src={paper.image_url || paper.imageUrl}
                    alt={paper.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out"
                    unoptimized={paper.image_url?.includes('supabase.co')}
                  />

                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-maize text-blue-michigan text-sm font-bold px-3 py-1 rounded-full capitalize">
                      {paper.group_name || paper.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 text-blue-michigan text-sm font-bold px-3 py-1 rounded-full">
                      {paper.year}
                    </div>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <div className="p-0">
                    <h3 className="text-2xl font-bold text-blue-michigan mb-4">{paper.title}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-2">
                        <Users className="text-blue-michigan/70 mt-1 flex-shrink-0" size={18} />
                        <p className="text-blue-michigan/80">{Array.isArray(paper.authors) ? paper.authors.join(", ") : (paper.authors || "AIMS Lab")}</p>
                      </div>

                      <div className="flex items-start gap-2">
                        <BookOpen className="text-blue-michigan/70 mt-1 flex-shrink-0" size={18} />
                        <p className="text-blue-michigan/80">{paper.journal}</p>
                      </div>

                      <div className="flex items-start gap-2 md:col-span-2">
                        <FileText className="text-blue-michigan/70 mt-1 flex-shrink-0" size={18} />
                        <p className="text-blue-michigan/80">DOI: {paper.doi}</p>
                      </div>
                    </div>

                    <p className="text-blue-michigan/70 mb-8">{paper.abstract}</p>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={paper.pdf_url || paper.pdfUrl || "#"}
                        className="inline-flex items-center gap-2 bg-blue-michigan text-yellow-maize px-5 py-2.5 rounded-lg font-medium hover:bg-blue-michigan/90 transition-colors"
                        target="_blank"
                      >
                        <FileText size={18} />
                        Read Paper
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AdminModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Edit Featured Research"
              onSave={handleSave}
              isSaving={isSaving}
            >
              <ResearchForm initialData={formData} onChange={setFormData} hideRecentCheckbox={true} />
            </AdminModal>
          </motion.div>

          <div className="flex justify-center mt-8">
            <Link href="/research" legacyBehavior passHref>
              <Button
                className="px-12 py-0 text-xl font-semibold text-yellow-maize bg-blue-michigan rounded-full hover:bg-blue-michigan/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                size="lg"
                as="a"
              >
                View Research Directory
              </Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

