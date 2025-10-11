"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState, useId, useRef, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Linkedin, Mail, ChevronDown, GraduationCap, Lightbulb, X } from "lucide-react"
import { TeamMember, teamMembers } from "@/data/members"

type MemberCategory = "all" | "pi" | "scientists" | "phd/graduate" | "undergraduate" | "alumni"

export default function TeamShowcase() {
  const [activeCategory, setActiveCategory] = useState<MemberCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)
  const [isGridView, setIsGridView] = useState(true)

  const filteredMembers = teamMembers.filter((member) => {
    const matchesCategory =
      (activeCategory === "all" && member.status !== "Alumni") ||
      (activeCategory === "pi" && member.status === "Principal Investigator") ||
      (activeCategory === "scientists" && (member.status === "Research Scientist" || member.status === "Postdoc")) ||
      (activeCategory === "phd/graduate" && (member.status === "PhD" || member.status === "Graduate")) ||
      (activeCategory === "undergraduate" && member.status === "Undergraduate") ||
      (activeCategory === "alumni" && member.status === "Alumni")

    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.interests &&
        member.interests.some((interest) => interest.toLowerCase().includes(searchQuery.toLowerCase())))

    return matchesCategory && matchesSearch
  }).sort((a, b) => a.name.localeCompare(b.name));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-white text-blue-michigan py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Member <span className="text-yellow-maize">Directory</span>
          </h1>
          <p className="max-w-2xl mx-auto text-blue-michigan text-lg">
            Our group follows a hierarchy where our students step up to support Majdi in administering AIMS especially after we became a 20+ member group. Student leaders make a lot of day-to-day management and communications of their respective groups, while Majdi is kept for final approvals on major items related to each group.
          </p>
        </div>

        <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <CategoryButton active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
              All Members
            </CategoryButton>
            <CategoryButton active={activeCategory === "pi"} onClick={() => setActiveCategory("pi")}>
              Principal Investigators
            </CategoryButton>
            <CategoryButton active={activeCategory === "scientists"} onClick={() => setActiveCategory("scientists")}>
              Postdocs
            </CategoryButton>
            <CategoryButton active={activeCategory === "phd/graduate"} onClick={() => setActiveCategory("phd/graduate")}>
              PhD + Graduate
            </CategoryButton>
            <CategoryButton
              active={activeCategory === "undergraduate"}
              onClick={() => setActiveCategory("undergraduate")}
            >
              Undergraduate
            </CategoryButton>
            <CategoryButton active={activeCategory === "alumni"} onClick={() => setActiveCategory("alumni")}>
              Alumni
            </CategoryButton>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search members..."
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-blue-michigan w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-michigan"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-lg ${isGridView ? "bg-blue-michigan text-white" : "bg-gray-100 text-blue-michigan hover:bg-gray-200"}`}
                aria-label="Grid view"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-lg ${!isGridView ? "bg-blue-michigan text-white" : "bg-gray-100 text-blue-michigan hover:bg-gray-200"}`}
                aria-label="List view"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8 text-blue-michigan">
          <p>
            Showing {filteredMembers.length} {filteredMembers.length === 1 ? "member" : "members"}
          </p>
        </div>

        {isGridView ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                isHovered={hoveredMember === member.id}
                onHover={() => setHoveredMember(member.id)}
                onLeave={() => setHoveredMember(null)}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div className="flex flex-col gap-4" variants={containerVariants} initial="hidden" animate="visible">
            {filteredMembers.map((member) => (
              <MemberListItem key={member.id} member={member} variants={itemVariants} />
            ))}
          </motion.div>
        )}

        {filteredMembers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-blue-michigan text-xl">No members found matching your criteria.</p>
            <button
              onClick={() => {
                setActiveCategory("all")
                setSearchQuery("")
              }}
              className="mt-4 px-4 py-2 bg-blue-michigan text-yellow-maize rounded-lg hover:bg-blue-michigan/90 transition"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// category filter button
function CategoryButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        active ? "bg-blue-michigan text-yellow-maize" : "bg-gray-100 text-blue-michigan hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  )
}

// grid view card component
function MemberCard({
  member,
  isHovered,
  onHover,
  onLeave,
  variants,
}: {
  member: TeamMember
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  variants: Variants
}) {
  const [active, setActive] = useState(false)
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false)
      }
    }

    if (active) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  const handleModalClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setActive(false)
    }
  }

  return (
    <>
      <motion.div
        className="relative group"
        variants={variants}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={() => setActive(true)}
      >
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:border-blue-michigan/50 hover:shadow-lg cursor-pointer">
          <div className="relative aspect-square overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-michigan/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div className="p-6 relative">
            <h3 className="text-xl font-bold text-blue-michigan mb-1 relative z-10">{member.name}</h3>
            <p className="text-blue-michigan/70 mb-3 relative z-10">
              {/* {member.status} -  */}
              {member.role}
            </p>

            <div className={`overflow-hidden transition-all duration-300 ${isHovered ? "max-h-40" : "max-h-0"}`}>
              {member.interests && member.interests.length > 0 && (
                <div className="flex items-start gap-2 mb-3">
                  <Lightbulb className="text-blue-michigan/70 mt-1 shrink-0" size={16} />
                  <p className="text-sm text-blue-michigan">
                    {member.interests.slice(0, 2).join(", ")}
                    {member.interests.length > 2 && "..."}
                  </p>
                </div>
              )}

              {member.education && member.education.length > 0 && (
                <div className="flex items-start gap-2">
                  <GraduationCap className="text-blue-michigan/70 mt-1 shrink-0" size={16} />
                  <p className="text-sm text-blue-michigan">
                    {member.education[0]}
                    {member.education.length > 1 && "..."}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-michigan transition">
                  <Linkedin size={16} />
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-michigan transition">
                  <Mail size={16} />
                </button>
              </div>
              <ChevronDown
                className={`text-blue-michigan/70 transition-transform duration-300 ${isHovered ? "rotate-180" : "rotate-0"}`}
                size={18}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-[60] flex items-center justify-center"
            onClick={handleModalClose}
          >
            <motion.div
              layoutId={`card-${member.id}-${id}`}
              ref={ref}
              className="relative w-full max-w-3xl h-fit max-h-[90vh] flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-blue-michigan z-20 hover:bg-gray-200 transition-colors"
                onClick={() => setActive(false)}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="md:w-2/5 relative">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  className="object-cover h-full w-full"
                  width={500}
                  height={500}
                />
              </div>

              <div className="md:w-3/5 p-6 md:p-8 overflow-y-auto max-h-[70vh] md:max-h-[90vh]">
                <h2 className="text-3xl font-bold text-blue-michigan mb-1">{member.name}</h2>
                <p className="text-blue-michigan/70 mb-6">
                  {/* {member.status} -  */}
                  {member.role}
                </p>

                {member.bio && (
                  <div className="mb-6">
                    <p className="text-blue-michigan truncate">{member.bio}</p>
                  </div>
                )}

                {member.interests && member.interests.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-blue-michigan mb-2">Interests</h3>
                    <ul className="space-y-1">
                      {member.interests.map((interest: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-blue-michigan/70 mt-2 mr-2"></span>
                          <span className="text-blue-michigan">{interest}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {member.education && member.education.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-blue-michigan mb-2">Education</h3>
                    <ul className="space-y-2">
                      {member.education.map((edu: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block w-6 h-6 mr-2 text-blue-michigan">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                            </svg>
                          </span>
                          <span className="text-blue-michigan">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex space-x-3 mt-6">
                  <Link
                    href={`/members/${member.slug}`}
                    className="px-6 py-2 bg-blue-michigan text-yellow-maize rounded-lg hover:bg-blue-michigan/90 transition"
                  >
                    View Full Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// list view item component
function MemberListItem({
  member,
  variants,
}: {
  member: TeamMember
  variants: Variants
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:border-blue-michigan/50"
      variants={variants}
    >
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6">
        <div className="relative w-full sm:w-24 h-24 shrink-0">
          <Image
            src={member.imageUrl}
            alt={member.name}
            width={96}
            height={96}
            className="rounded-full border-2 border-gray-200 object-cover relative z-10"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <div>
              <h3 className="text-xl font-bold text-blue-michigan">{member.name}</h3>
              <p className="text-blue-michigan/70">
                {/* {member.status} -  */}
                {member.role}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-michigan transition">
                <Linkedin size={16} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-michigan transition">
                <Mail size={16} />
              </button>
              <Link
                href={`/members/${member.slug}`}
                className="px-4 py-2 bg-blue-michigan text-yellow-maize rounded-lg hover:bg-blue-michigan/90 transition text-sm"
              >
                View Profile
              </Link>
            </div>
          </div>

          {member.bio && (
            <div className="mb-4">
              <p className="text-blue-michigan line-clamp-2">{member.bio}</p>
            </div>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-blue-michigan/70 hover:text-blue-michigan transition"
          >
            <span className="text-sm">{isExpanded ? "Show less" : "Show more"}</span>
            <ChevronDown
              className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
              size={16}
            />
          </button>

          {isExpanded && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {member.interests && member.interests.length > 0 && (
                <div>
                  <h4 className="text-blue-michigan font-medium flex items-center gap-2 mb-2">
                    <Lightbulb size={16} />
                    Interests
                  </h4>
                  <ul className="list-disc list-inside text-blue-michigan space-y-1">
                    {member.interests.map((interest: string, idx: number) => (
                      <li key={idx}>{interest}</li>
                    ))}
                  </ul>
                </div>
              )}

              {member.education && member.education.length > 0 && (
                <div>
                  <h4 className="text-blue-michigan font-medium flex items-center gap-2 mb-2">
                    <GraduationCap size={16} />
                    Education
                  </h4>
                  <ul className="list-disc list-inside text-blue-michigan space-y-1">
                    {member.education.map((edu: string, idx: number) => (
                      <li key={idx}>{edu}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
