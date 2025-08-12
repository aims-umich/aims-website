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
    title: "Reactor Design",
    description:
      "We apply modeling and simulation tools to evaluate both light water reactors and advanced reactor concepts",
    imageUrl: "/reactors/Reactor-Design.jpg",
  },
  {
    id: 2,
    title: "Optimization",
    description:
      "We create scalable, multi-objective optimization algorithms to accelerate the design process of nuclear reactors, especially in high-fidelity and computationally intensive simulations.",
    imageUrl: "/reactors/Optimization.png",
  },
  {
    id: 3,
    title: "Neutron Transport",
    description:
      "We design advanced numerical methods to efficiently solve neutron transport problems relevant to nuclear reactor applications.",
    imageUrl: "/reactors/NeutronTransport.jpg",
  },
  {
    id: 4,
    title: "Multiphysics Simulations",
    description: "We conduct coupled simulations involving neutronics, thermal-hydraulics, and fuel performance to gain deeper insights into the safety and behavior of advanced reactors.",
    imageUrl: "/reactors/Multiphysics-Simulations.jpg",
  },
  {
    id: 5,
    title: "Multifidelity Modeling",
    description: "We develop neural network-based surrogate models to predict high-fidelity outcomes from low-fidelity simulations, enabling more efficient analysis.",
    imageUrl: "/reactors/MultifidelityModeling.jpg",
  },
]

const recentPapers = researchItems
  .sort((a, b) => b.timestamp - a.timestamp)
  .filter(item => item.type === "publication" && item.group === "reactors")
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
    title: "Safety analysis and design optimization of small modular reactors, with a focus on NuScale and Holtec SMR-300 systems",
    link: "Work in progress",
    wip: true
  },
  {
    title: "Acceleration of CFD-based reactor safety analysis using multifidelity surrogate models for improved computational efficiency",
    link: "Work in progress",
    wip: true
  },
  {
    title: "Application of tensor-train decompositions and isogeometric analysis to enhance the efficiency of neutron transport simulations",
    link: "Work in progress",
    wip: true
  },
  {
    title: "Combinatorial optimization strategies for nuclear reactor site selection and evaluation",
    link: "https://doi.org/10.1016/j.ecmx.2025.100923",
    wip: false
  },
  {
    title: "Development of scalable ensemble - based optimization algorithms integrated with online surrogate models to accelerate nuclear reactor design under computationally expensive simulations",
    link: "https://link.springer.com/article/10.1007/s00521-022-07878-y",
    wip: false
  },
  {
    title: "Model-agnostic explainability methods for trustworthy and licensable AI in nuclear applications",
    link: "https://arxiv.org/abs/2504.03913",
    wip: false
  },
  {
    title: "Coupled multiphysics simulations and criticality search for optimal drum placement in eVinci™-like microreactors",
    link: "https://doi.org/10.1080/00295639.2024.2409582",
    wip: false
  },
  {
    title: "Physics-informed reinforcement learning for optimizing nuclear reactor cores and assemblies at large scale",
    link: "https://doi.org/10.1016/j.nucengdes.2020.110966",
    wip: false
  },
  {
    title: "Advanced simulation and depletion modeling for precise isotopic predictions in boiling water reactor fuel assemblies",
    link: "https://doi.org/10.1016/j.pnucene.2019.01.010",
    wip: false
  },
  {
    title: "Criticality safety and accident scenario modeling for spent fuel in boiling water reactors",
    link: "https://doi.org/10.1016/j.pnucene.2019.03.039",
    wip: false
  },
  {
    title: "Propagation of delayed neutron data uncertainties into macroscopic kinetics parameters for light water reactors",
    link: "https://doi.org/10.1016/j.anucene.2018.11.043",
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
              Reactors <span className="text-yellow-maize">Research Group</span>
            </h1>
          </div>

          <div className="mb-20 relative">
            <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl mb-8 text-center">
              Research <span className="text-yellow-maize">Focus Areas</span>
            </h2>
            <div
              ref={slideshowRef}
              className="relative overflow-hidden rounded-xl shadow-xl h-[600px] max-w-6xl mx-auto"
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

