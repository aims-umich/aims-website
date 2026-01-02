"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getProjectsByGroup, upsertProject, deleteProject } from "@/lib/supabase/actions/projects"
import AdminWrapper from "../admin/AdminWrapper"
import AdminModal from "../admin/AdminModal"
import ProjectForm from "../admin/forms/ProjectForm"

export default function Projects({ group }: { group: string }) {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [formData, setFormData] = useState<any>(null)

  const fetchProjects = async () => {
    try {
      const data = await getProjectsByGroup(group)
      setProjects(data)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [group])

  const handleAdd = () => {
    setEditingProject(null)
    setFormData({ group_name: group })
    setIsModalOpen(true)
  }

  const handleEdit = (project: any) => {
    setEditingProject(project)
    setFormData(project)
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await upsertProject(formData)
      await fetchProjects()
      setIsModalOpen(false)
    } catch (error) {
      alert("Error saving project")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!editingProject?.id) return
    try {
      await deleteProject(editingProject.id)
      await fetchProjects()
      setIsModalOpen(false)
    } catch (error) {
      alert("Error deleting project")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-michigan"></div>
      </div>
    )
  }

  return (
    <div className="mb-20 max-w-4xl mx-auto relative">
      <div className="flex justify-center items-center mb-8">
        <AdminWrapper onEdit={handleAdd} variant="add" position="header" label="Add Project">
          <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl text-center px-4">
            Recent Funded and Ongoing <span className="text-yellow-maize">Projects</span>
          </h2>
        </AdminWrapper>
      </div>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 italic py-8 border-2 border-dashed border-gray-100 rounded-2xl mx-4">
          No projects found for this group.
        </p>
      ) : (
        <ul className="space-y-6 text-lg px-4">
          {projects.map((project, index) => (
            <motion.li
              key={project.id || index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <AdminWrapper onEdit={() => handleEdit(project)} variant="edit" position="top-right">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="text-yellow-maize text-2xl leading-none mt-1 group-hover:scale-125 transition-transform duration-300">•</span>
                  <div>
                    <span className="text-blue-michigan font-bold block mb-2 leading-snug">
                      {project.title}
                    </span>
                    <span className="text-gray-600 text-base">
                      (Further read:{" "}
                      {project.is_wip ? (
                        <span className="text-gray-500 italic">Work in progress</span>
                      ) : (
                        <Link
                          href={project.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-maize hover:underline break-all"
                        >
                          {project.link}
                        </Link>
                      )}
                      )
                    </span>
                  </div>
                </div>
              </AdminWrapper>
            </motion.li>
          ))}
        </ul>
      )}

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "Edit Project" : "Add Project"}
        onSave={handleSave}
        isSaving={isSaving}
        onDelete={editingProject ? handleDelete : undefined}
      >
        <ProjectForm initialData={formData} onChange={setFormData} />
      </AdminModal>
    </div>
  )
}

