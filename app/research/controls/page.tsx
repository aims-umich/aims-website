"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@heroui/react"
import { researchItems } from "@/data/research"

const topicsData = [
  {
    id: 1,
    title: "Digital Twins",
    description:
      "We establish general mathematical and computational frameworks for real-time digital twins, with applications demonstrated on nuclear power plant systems.",
    imageUrl: "/controls/Digital-Twins.jpg",
  },
  {
    id: 2,
    title: "Intelligent Control",
    description:
      "We leverage deep reinforcement learning to develop real-time, uncertainty-aware control strategies for both light water and advanced microreactor concepts.",
    imageUrl: "/controls/IntelligentControl.jpg",
  },
  {
    id: 3,
    title: "Classical Control Theory",
    description:
      "We apply both linear and nonlinear model predictive control techniques, and integrate them with reinforcement learning to create hybrid algorithms.",
    imageUrl: "/controls/ClassicalControlTheory.jpg",
  },
  {
    id: 4,
    title: "Anomaly Detection",
    description: "We develop data-driven methods to identify anomalies and predict potential faults in sensor data.",
    imageUrl: "/controls/Anomaly-Detection.png",
  },
  {
    id: 5,
    title: "Robotics",
    description: "We program drones and quadruped robots for autonomous inspection tasks and radiation mapping in nuclear power plant environments.",
    imageUrl: "/controls/Robotics.jpg",
  },
]

const recentPapers = researchItems
  .sort((a, b) => b.timestamp - a.timestamp)
  .filter(item => item.type === "publication" && item.group === "controls")
  .map(item => ({
    id: item.id,
    title: item.title,
    authors: item.authors?.join(", ") ?? "Unknown Authors",
    journal: item.journal,
    year: item.year,
    imageUrl: item.imageUrl,
    url: item.doi
}))

const projects = [
  {
    title: "Generative diffusion models for full-field reconstruction in nuclear digital twins",
    link: "Work in progress",
    wip: true
  },
  {
    title: "Collaborative drone-based autonomous inspection in nuclear-plant-like environments",
    link: "Work in progress",
    wip: true
  },
  {
    title: "Real-time sensor data assimilation into digital twins using variati onal inference techniques",
    link: "Work in progress",
    wip: true
  },
  {
    title: "Deep reinforcement learning for real-time control of nuclear reactors",
    link: "https://arxiv.org/abs/2504.00156",
    wip: false
  },
  {
    title: "Classical control a pproaches for load-following system design in nuclear microreactors",
    link: "https://doi.org/10.1016/j.pnucene.2025.105676",
    wip: false
  },
  {
    title: "Recurrent neural networks and autoencoders for anomaly detection in electronic power signals",
    link: "https://doi.org/10.1016/j.dsp.2022.103704",
    wip: false
  },
  {
    title: "Fault prognosis in particle accelerators using ensemble learning techniques",
    link: "https://doi.org/10.36001/ijphm.2023.v14i1.3419",
    wip: false
  },
  {
    title: "Full-field temperature reconstruction in microreactor systems via matching pursuits",
    link: "https://doi.org/10.1016/j.apm.2024.04.011",
    wip: false
  },
  {
    title: "Reactivity control and criticality search using swarm intelligence and evolutionary algorithms",
    link: "https://doi.org/10.1016/j.nucengdes.2022.111776",
    wip: false
  },
  {
    title: "Forward digital twins for monitoring nuclear reactor transients and accident progression",
    link: "https://doi.org/10.1016/j.eswa.2020.113699",
    wip: false
  },

]

export default function ReactorsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideshowRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === topicsData.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? topicsData.length - 1 : prev - 1))
  }

  return (
    <div className="w-full pt-16">
      <div className="h-full w-full dark:bg-black-100 bg-white absolute left-0 right-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-blue-michigan text-center md:text-5xl mb-6">
              Controls <span className="text-yellow-maize">Research Group</span>
            </h1>
          </div>

          <div className="mb-20 relative">
            <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl mb-8 text-center">
              Research <span className="text-yellow-maize">Focus Areas</span>
            </h2>
            <div
              ref={slideshowRef}
              className="relative overflow-hidden rounded-xl shadow-xl h-[725px] max-w-6xl mx-auto"
            >
              {topicsData.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  className="absolute top-0 left-0 w-full h-full"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    x: currentSlide === index ? 0 : 100,
                    zIndex: currentSlide === index ? 10 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full h-full">
                    <Image src={topic.imageUrl} alt={topic.title} width={1920} height={1080} className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                      <h3 className="text-2xl font-bold text-yellow-maize mb-2">{topic.title}</h3>
                      <p className="text-white text-lg">{topic.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-blue-michigan" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-blue-michigan" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                {topicsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-yellow-maize" : "bg-white/50"}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl mb-8 text-center">
              Recent <span className="text-yellow-maize">Publications</span>
            </h2>

            <div className="max-w-6xl mx-auto">
              <div className="flex justify-center gap-8 mb-8 flex-wrap">
                {recentPapers.slice(0, 2).map((paper) => (
                  <div
                    key={paper.id}
                    className="bg-white dark:bg-zinc-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] max-w-md"
                  >
                    <div className="relative h-48">
                      <Image
                        src={paper.imageUrl}
                        alt={paper.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-blue-michigan mb-2 line-clamp-2">{paper.title}</h3>
                      <p className="text-blue-michigan/60 dark:text-zinc-400 text-sm mb-1">{paper.year}</p>
                      <p className="text-blue-michigan/80 dark:text-zinc-300 text-sm italic mb-4">
                        {paper.journal}
                      </p>
                      <Link href={paper.url || "#"}>
                        <Button
                          className="w-full text-sm font-semibold text-yellow-maize bg-blue-michigan rounded-full hover:bg-blue-michigan/90 transition-colors duration-300"
                          size="sm"
                        >
                          View Paper
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-8 flex-wrap">
                {recentPapers.slice(2, 5).map((paper) => (
                  <div
                    key={paper.id}
                    className="bg-white dark:bg-zinc-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] max-w-md"
                  >
                    <div className="relative h-48">
                      <Image
                        src={paper.imageUrl}
                        alt={paper.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-blue-michigan mb-2 line-clamp-2">{paper.title}</h3>
                      <p className="text-blue-michigan/60 dark:text-zinc-400 text-sm mb-1">{paper.year}</p>
                      <p className="text-blue-michigan/80 dark:text-zinc-300 text-sm italic mb-4">
                        {paper.journal}
                      </p>
                      <Link href={paper.url || "#"} legacyBehavior passHref>
                        <Button
                          as="a"
                          className="w-full text-sm font-semibold text-yellow-maize bg-blue-michigan rounded-full hover:bg-blue-michigan/90 transition-colors duration-300"
                          size="sm"
                        >
                          View Paper
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center -mt-12 mb-24">
            <Link href="/research">
              <Button
                className="px-8 py-0 text-lg font-semibold text-yellow-maize bg-blue-michigan rounded-full hover:bg-blue-michigan/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                size="lg"
              >
                View All Publications
              </Button>
            </Link>
          </div>

          <div className="mb-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl mb-8 text-center">
              Recent Funded and Ongoing <span className="text-yellow-maize">Projects</span>
            </h2>

            <ul className="space-y-4 text-lg">
              {projects.map((project, index) => (
                <li key={index}>
                  <span className="text-yellow-maize mr-2 text-2xl leading-none">•</span>
                  <span className="text-blue-michigan font-bold">{project.title}</span>
                  <br />
                  <span className="text-blue-michigan">
                    (Further read: {" "}
                      {!project.wip 
                        ? <Link href={project.link} className="text-yellow-maize">
                          {project.link}
                        </Link>
                        : <p className="inline">{project.link}</p>
                      }
                    )
                    </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

