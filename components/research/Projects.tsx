"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getProjectsByGroup } from "@/lib/supabase/actions/projects"

export default function Projects({ group }: { group: string }) {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjectsByGroup(group)
        setProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [group])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-michigan"></div>
      </div>
    )
  }

  if (projects.length === 0) return null

  return (
    <div className="mb-20 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl mb-8 text-center px-4">
        Recent Funded and Ongoing <span className="text-yellow-maize">Projects</span>
      </h2>

      <ul className="space-y-6 text-lg px-4">
        {projects.map((project, index) => (
          <motion.li
            key={project.id || index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
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
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

