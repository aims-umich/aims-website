"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { FileText, Users, BookOpen } from "lucide-react"
import { Button } from "@heroui/react"

const paper = {
  title: "Nuclear microreactor transient and load-following control with deep reinforcement learning",
  authors: ["Leo Tunkle", "Kamal Abdulraheem", "Linyu Lin", "Majdi I. Radaideh"],
  journal: "Energy Conversion and Management: X",
  year: 2025,
  doi: "10.1016/j.ecmx.2025.101090",
  abstract:
    "The economic feasibility of nuclear microreactors will depend on minimizing operating costs through advancements in autonomous control, especially when these microreactors are operating alongside other types of energy systems (e.g., renewable energy). This study explores the application of deep reinforcement learning (RL) for real-time drum control in microreactors, exploring performance in regard to load-following scenarios. By leveraging a point kinetics model with thermal and xenon feedback, we first establish a baseline using a single-output RL agent, then compare it against a traditional proportional–integral–derivative (PID) controller. This study demonstrates that RL controllers, including both single- and multi-agent RL (MARL) frameworks, can achieve load-following performance similar or even superior to traditional PID control across a range of load-following scenarios. In short transients, the RL agent was able to reduce the tracking error rate in comparison to PID by one half to one third. Over extended 300 min load-following scenarios in which xenon feedback becomes a dominant factor, PID maintained better accuracy, but RL still remained within a 1% error margin despite being trained only on short-duration scenarios. This highlights RL’s strong ability to generalize and extrapolate to longer, more complex transients, affording substantial reductions in training costs and reduced overfitting. Furthermore, when control was extended to multiple drums, MARL enabled independent drum control as well as maintained reactor symmetry constraints without sacrificing performance—an objective that standard single-agent RL could not learn. We also found that the RL controllers were able to maintain lower error rates than PID, despite increasing levels of Gaussian noise being added to the power measurements, doing so with at least 10% and upwards of 150% less control effort. These findings illustrate RL’s potential for autonomous nuclear reactor control, laying the groundwork for future integration into high-fidelity simulations and experimental validation efforts.",
  imageUrl: "/homepage/recentPaper.png",
  pdfUrl: "https://www.sciencedirect.com/science/article/pii/S2590174525002223",
  category: "reactors",
}

export default function RecentResearch() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="w-full py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl md:text-5xl mb-4">
            Recent <span className="text-yellow-maize">Research</span>
          </h2>
          <p className="text-lg text-center max-w-2xl text-blue-michigan/80">
            Explore our latest publication that showcases our cutting-edge research in nuclear engineering and
            computational science.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col">
              <div className="relative h-[600px] w-full">
                <Image
                  src={paper.imageUrl}
                  alt={paper.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out"
                />

                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-maize text-blue-michigan text-sm font-bold px-3 py-1 rounded-full capitalize">
                    {paper.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 text-blue-michigan text-sm font-bold px-3 py-1 rounded-full">
                    {paper.year}
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-blue-michigan mb-4">{paper.title}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-2">
                      <Users className="text-blue-michigan/70 mt-1 flex-shrink-0" size={18} />
                      <p className="text-blue-michigan/80">{paper.authors.join(", ")}</p>
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
                      href={paper.pdfUrl}
                      className="inline-flex items-center gap-2 bg-blue-michigan text-yellow-maize px-5 py-2.5 rounded-lg font-medium hover:bg-blue-michigan/90 transition-colors"
                    >
                      <FileText size={18} />
                      Read Paper
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </section>
  )
}
