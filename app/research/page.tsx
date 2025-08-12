"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState, useId, useRef, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { FileText, BookOpen, Calendar, Users, ChevronDown, X, ExternalLink, Download, Tag, Clock } from "lucide-react"
import { Button } from "@heroui/react"
import { researchItems, ResearchItem } from "@/data/research"
import { FaGoogleScholar, FaResearchgate, FaSchool } from "react-icons/fa6";

type ResearchCategory = "all" | "publications" | "projects" | "reactors" | "controls" | "computing"

export default function ResearchDirectory() {
  const [activeCategory, setActiveCategory] = useState<ResearchCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isGridView, setIsGridView] = useState(true)

  const filteredItems = researchItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "publications" && item.type === "publication") ||
      (activeCategory === "projects" && item.type === "project") ||
      (activeCategory === "reactors" && item.group === "reactors") ||
      (activeCategory === "controls" && item.group === "controls") ||
      (activeCategory === "computing" && item.group === "computing")

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.type === "publication" &&
        (item.authors?.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
          item.journal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.keywords?.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase())))) ||
      (item.type === "project" &&
        (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.collaborators?.some((collaborator) => collaborator.toLowerCase().includes(searchQuery.toLowerCase()))))

    return matchesCategory && (searchQuery ? matchesSearch : true)
  }).sort((a, b) => {
    return b.timestamp - a.timestamp
  });

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
            Research <span className="text-yellow-maize">Directory</span>
          </h1>
          <p className="max-w-2xl mx-auto text-blue-michigan text-lg">
            Explore our lab&apos;s publications and current research projects across our three main focus areas: Reactors, Controls,
            and Computing. Our interdisciplinary approach combines nuclear engineering with advanced computational
            methods to solve complex challenges.
          </p>
          <motion.div 
            className="max-w-3xl mx-auto mt-8 mb-12 bg-gradient-to-r from-blue-michigan/5 via-blue-michigan/10 to-blue-michigan/5 rounded-xl p-6 border border-blue-michigan/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center">
                <div className="bg-blue-michigan/10 p-3 rounded-full mr-4">
                  <Clock />
                </div>
                <div>
                  <p className="text-blue-michigan font-medium">Directory last updated</p>
                  <p className="text-blue-michigan/70 text-sm">08-11-2025</p>
                </div>
              </div>
              
              <div>
                <p className="text-blue-michigan font-medium mb-2 text-center md:text-right">View our complete research archive:</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                  <a 
                    href="https://scholar.google.com/citations?user=G2zrIPUAAAAJ&hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white border border-blue-michigan/30 hover:border-blue-michigan text-blue-michigan px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    <FaGoogleScholar />
                    Google Scholar
                  </a>
                  <a 
                    href="https://www.researchgate.net/profile/Majdi-Radaideh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white border border-blue-michigan/30 hover:border-blue-michigan text-blue-michigan px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    <FaResearchgate />
                    ResearchGate
                  </a>
                  <a 
                    href="https://experts.umich.edu/10012-majdi-radaideh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white border border-blue-michigan/30 hover:border-blue-michigan text-blue-michigan px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    <FaSchool />
                    Michigan Experts
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <CategoryButton active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
              All Research
            </CategoryButton>
            {/* NOTE: RE-ADD THESE BUTTONS IF WE INTRODUCE PROJECTS TO DIRECTORY TOO */}
            {/* <CategoryButton
              active={activeCategory === "publications"}
              onClick={() => setActiveCategory("publications")}
            >
              Publications
            </CategoryButton>
            <CategoryButton active={activeCategory === "projects"} onClick={() => setActiveCategory("projects")}>
              Current Projects
            </CategoryButton> */}
            <CategoryButton active={activeCategory === "reactors"} onClick={() => setActiveCategory("reactors")}>
              Reactors
            </CategoryButton>
            <CategoryButton active={activeCategory === "controls"} onClick={() => setActiveCategory("controls")}>
              Controls
            </CategoryButton>
            <CategoryButton active={activeCategory === "computing"} onClick={() => setActiveCategory("computing")}>
              Computing
            </CategoryButton>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
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
            Showing {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        {isGridView ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredItems.map((item) => (
              <ResearchCard
                key={item.id}
                item={item}
                isHovered={hoveredItem === item.id}
                onHover={() => setHoveredItem(item.id)}
                onLeave={() => setHoveredItem(null)}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div className="flex flex-col gap-4" variants={containerVariants} initial="hidden" animate="visible">
            {filteredItems.map((item) => (
              <ResearchListItem key={item.id} item={item} variants={itemVariants} />
            ))}
          </motion.div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-blue-michigan text-xl">No research items found matching your criteria.</p>
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
function ResearchCard({
  item,
  isHovered,
  onHover,
  onLeave,
  variants,
}: {
  item: ResearchItem
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
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:border-blue-michigan/50 hover:shadow-lg cursor-pointer h-full flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-michigan/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-2 right-2 z-20">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.type === "publication"
                    ? "bg-yellow-maize text-blue-michigan"
                    : "bg-blue-michigan text-yellow-maize"
                }`}
              >
                {item.type === "publication" ? "Publication" : "Project"}
              </span>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-blue-michigan mb-2 line-clamp-2">{item.title}</h3>

            {item.type === "publication" && item.authors && (
              <>
                <p className="text-blue-michigan/70 mb-2 text-sm">
                  {item.authors.slice(0, 3).join(", ")}
                  {item.authors.length > 3 && ", et al."}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="text-blue-michigan/70" size={14} />
                  <p className="text-sm text-blue-michigan/70">{item.journal}</p>
                </div>
              </>
            )}

            {item.type === "project" && item.description && (
              <>
                <p className="text-blue-michigan/70 mb-2 text-sm line-clamp-3">{item.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="text-blue-michigan/70" size={14} />
                  <p className="text-sm text-blue-michigan/70">{item.status}</p>
                </div>
              </>
            )}

            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-michigan/70" size={14} />
              <p className="text-sm text-blue-michigan/70">
                {item.type === "publication" && item.year
                  ? item.year
                  : item.startYear && `${item.startYear} - ${item.endYear || "Present"}`}
              </p>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 mt-auto ${isHovered ? "max-h-40" : "max-h-0"}`}
            >
              {item.type === "publication" && item.keywords && item.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                    <span key={idx} className="text-xs bg-gray-100 text-blue-michigan px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                  {item.keywords.length > 3 && (
                    <span className="text-xs bg-gray-100 text-blue-michigan px-2 py-1 rounded-full">
                      +{item.keywords.length - 3}
                    </span>
                  )}
                </div>
              )}

              {item.type === "project" && item.collaborators && item.collaborators.length > 0 && (
                <div className="flex items-start gap-2 mb-3">
                  <Users className="text-blue-michigan/70 mt-1 shrink-0" size={14} />
                  <p className="text-xs text-blue-michigan">
                    {item.collaborators.slice(0, 2).join(", ")}
                    {item.collaborators.length > 2 && ` +${item.collaborators.length - 2} more`}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                {item.type === "publication" && item.pdfUrl && (
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-michigan transition">
                    <Download size={16} />
                  </button>
                )}
                {item.type === "project" && item.websiteUrl && (
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-michigan transition">
                    <ExternalLink size={16} />
                  </button>
                )}
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
              layoutId={`card-${item.id}-${id}`}
              ref={ref}
              className="relative w-full max-w-4xl h-fit max-h-[90vh] flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-2xl"
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
                  src={item.imageUrl}
                  alt={item.title}
                  className="object-cover h-full w-full"
                  width={500}
                  height={500}
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.type === "publication"
                        ? "bg-yellow-maize text-blue-michigan"
                        : "bg-blue-michigan text-yellow-maize"
                    }`}
                  >
                    {item.type === "publication" ? "Publication" : "Project"}
                  </span>
                </div>
              </div>

              <div className="md:w-3/5 p-6 md:p-8 overflow-y-auto max-h-[70vh] md:max-h-[90vh]">
                <h2 className="text-2xl font-bold text-blue-michigan mb-4">{item.title}</h2>

                {item.type === "publication" && (
                  <>
                    {item.authors && (
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="text-blue-michigan/70" size={16} />
                        <p className="text-blue-michigan/70">{item.authors.join(", ")}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 mb-6">
                      {item.journal && (
                        <div className="flex items-center gap-2">
                          <BookOpen className="text-blue-michigan/70" size={16} />
                          <p className="text-blue-michigan/70">{item.journal}</p>
                        </div>
                      )}

                      {item.year && (
                        <div className="flex items-center gap-2">
                          <Calendar className="text-blue-michigan/70" size={16} />
                          <p className="text-blue-michigan/70">{item.year}</p>
                        </div>
                      )}

                      {item.doi && (
                        <div className="flex items-center gap-2">
                          <FileText className="text-blue-michigan/70" size={16} />
                          <p className="text-blue-michigan/70">DOI: {item.doi}</p>
                        </div>
                      )}
                    </div>

                    {item.abstract && (
                      <div className="mb-6">
                        <h3 className="text-xl font-medium text-blue-michigan mb-2">Abstract</h3>
                        <p className="text-blue-michigan">{item.abstract}</p>
                      </div>
                    )}

                    {item.keywords && item.keywords.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-medium text-blue-michigan mb-2">Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                          {item.keywords.map((keyword: string, idx: number) => (
                            <span key={idx} className="text-sm bg-gray-100 text-blue-michigan px-3 py-1 rounded-full">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {item.type === "project" && (
                  <>
                    <div className="flex flex-wrap gap-4 mb-6">
                      {item.status && (
                        <div className="flex items-center gap-2">
                          <Tag className="text-blue-michigan/70" size={16} />
                          <p className="text-blue-michigan/70">{item.status}</p>
                        </div>
                      )}

                      {item.startYear && (
                        <div className="flex items-center gap-2">
                          <Calendar className="text-blue-michigan/70" size={16} />
                          <p className="text-blue-michigan/70">
                            {item.startYear} - {item.endYear || "Present"}
                          </p>
                        </div>
                      )}
                    </div>

                    {item.description && (
                      <div className="mb-6">
                        <h3 className="text-xl font-medium text-blue-michigan mb-2">Description</h3>
                        <p className="text-blue-michigan">{item.description}</p>
                      </div>
                    )}

                    {item.fundingSource && (
                      <div className="mb-6">
                        <h3 className="text-xl font-medium text-blue-michigan mb-2">Funding</h3>
                        <p className="text-blue-michigan">{item.fundingSource}</p>
                      </div>
                    )}

                    {item.collaborators && item.collaborators.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-medium text-blue-michigan mb-2">Collaborators</h3>
                        <ul className="space-y-1">
                          {item.collaborators.map((collaborator: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <span className="inline-block w-2 h-2 rounded-full bg-blue-michigan/70 mt-2 mr-2"></span>
                              <span className="text-blue-michigan">{collaborator}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}

                <div className="flex space-x-3 mt-6">
                  {item.type === "publication" && item.pdfUrl && (
                    <Link href={item.pdfUrl}>
                      <Button
                        className="px-6 py-2 bg-blue-michigan text-yellow-maize rounded-lg hover:bg-blue-michigan/90 transition"
                        size="sm"
                      >
                        <Download className="h-4 w-4" />
                        View Paper
                      </Button>
                    </Link>
                  )}

                  {item.type === "project" && item.websiteUrl && (
                    <Link href={item.websiteUrl}>
                      <Button
                        className="px-6 py-2 bg-blue-michigan text-yellow-maize rounded-lg hover:bg-blue-michigan/90 transition"
                        size="sm"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Project Website
                      </Button>
                    </Link>
                  )}

                  <Link href={`/research/${item.group}`}>
                    <Button
                      className="px-6 py-2 border border-blue-michigan text-blue-michigan bg-white rounded-lg hover:bg-gray-50 transition"
                      size="sm"
                    >
                      View {item.group.charAt(0).toUpperCase() + item.group.slice(1)} Group
                    </Button>
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
function ResearchListItem({
  item,
  variants,
}: {
  item: ResearchItem
  variants: Variants
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:border-blue-michigan/50"
      variants={variants}
    >
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6">
        <div className="relative w-full sm:w-32 h-32 shrink-0">
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={128}
            height={128}
            className="rounded-lg object-cover relative z-10 h-full w-full"
          />
          <div className="absolute top-2 right-2 z-20">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.type === "publication"
                  ? "bg-yellow-maize text-blue-michigan"
                  : "bg-blue-michigan text-yellow-maize"
              }`}
            >
              {item.type === "publication" ? "Publication" : "Project"}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="text-xl font-bold text-blue-michigan mb-1">{item.title}</h3>

              {item.type === "publication" && item.authors && (
                <p className="text-blue-michigan/70 mb-2">{item.authors.join(", ")}</p>
              )}

              <div className="flex flex-wrap gap-4 mb-2">
                {item.type === "publication" && (
                  <>
                    {item.journal && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="text-blue-michigan/70" size={14} />
                        <p className="text-sm text-blue-michigan/70">{item.journal}</p>
                      </div>
                    )}

                    {item.year && (
                      <div className="flex items-center gap-2">
                        <Calendar className="text-blue-michigan/70" size={14} />
                        <p className="text-sm text-blue-michigan/70">{item.year}</p>
                      </div>
                    )}
                  </>
                )}

                {item.type === "project" && (
                  <>
                    {item.status && (
                      <div className="flex items-center gap-2">
                        <Tag className="text-blue-michigan/70" size={14} />
                        <p className="text-sm text-blue-michigan/70">{item.status}</p>
                      </div>
                    )}

                    {item.startYear && (
                      <div className="flex items-center gap-2">
                        <Calendar className="text-blue-michigan/70" size={14} />
                        <p className="text-sm text-blue-michigan/70">
                          {item.startYear} - {item.endYear || "Present"}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {item.type === "publication" && item.pdfUrl && (
                <Link href={item.pdfUrl}>
                  <Button
                    className="px-3 py-1 text-sm bg-blue-michigan text-yellow-maize rounded-lg hover:bg-blue-michigan/90 transition"
                    size="sm"
                  >
                    <Download className="mr-1 h-3 w-3" />
                    PDF
                  </Button>
                </Link>
              )}

              {item.type === "project" && item.websiteUrl && (
                <Link href={item.websiteUrl}>
                  <Button
                    className="px-3 py-1 text-sm bg-blue-michigan text-yellow-maize rounded-lg hover:bg-blue-michigan/90 transition"
                    size="sm"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Website
                  </Button>
                </Link>
              )}

              <Link href={`/research/${item.group}`}>
                <Button
                  className="px-3 py-1 text-sm border border-blue-michigan text-blue-michigan bg-white rounded-lg hover:bg-gray-50 transition"
                  size="sm"
                >
                  {item.group.charAt(0).toUpperCase() + item.group.slice(1)}
                </Button>
              </Link>
            </div>
          </div>

          {item.type === "publication" && item.abstract && (
            <div className="mb-4">
              <p className="text-blue-michigan line-clamp-2">{item.abstract}</p>
            </div>
          )}

          {item.type === "project" && item.description && (
            <div className="mb-4">
              <p className="text-blue-michigan line-clamp-2">{item.description}</p>
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
              {item.type === "publication" && item.keywords && item.keywords.length > 0 && (
                <div>
                  <h4 className="text-blue-michigan font-medium mb-2">Keywords</h4>
                  <div className="flex flex-wrap gap-1">
                    {item.keywords.map((keyword: string, idx: number) => (
                      <span key={idx} className="text-xs bg-gray-100 text-blue-michigan px-2 py-1 rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.type === "project" && item.collaborators && item.collaborators.length > 0 && (
                <div>
                  <h4 className="text-blue-michigan font-medium mb-2">Collaborators</h4>
                  <ul className="space-y-1">
                    {item.collaborators.map((collaborator: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-michigan/70 mt-2 mr-2"></span>
                        <span className="text-blue-michigan">{collaborator}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.type === "project" && item.fundingSource && (
                <div>
                  <h4 className="text-blue-michigan font-medium mb-2">Funding</h4>
                  <p className="text-blue-michigan">{item.fundingSource}</p>
                </div>
              )}

              {item.type === "publication" && item.doi && (
                <div>
                  <h4 className="text-blue-michigan font-medium mb-2">DOI</h4>
                  <p className="text-blue-michigan">{item.doi}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}