"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { FileText, Users, BookOpen } from "lucide-react"
import { Button } from "@heroui/react"

const paper = {
  title:
    "Sensitivity analysis and uncertainty propagation of the time to onset of natural circulation in air ingress accidents",
  authors: [
    "Meredith Eaheart",
    "Jacob Cooper",
    "Molly Ross",
    "Nate See",
    "Majdi I. Radaideh",
  ],
  journal: "Nuclear Engineering and Design",
  year: 2025,
  doi: "https://doi.org/10.1016/j.nucengdes.2025.114510",
  abstract:
    "This study investigates the time to onset of natural circulation (ONC) during a depressurized loss of forced cooling (DLOFC) event in a high-temperature gas reactor (HTGR). Using a fully automated Ansys Fluent simulation framework with PyFluent scripting, 500 CFD cases were generated with perturbed thermal and material properties. Surrogate models (random forests and neural networks) were trained to predict ONC time and post-ONC temperature, enabling global sensitivity analysis (SA) via Morris screening, Sobol indices, Fourier Amplitude Sensitivity Test, and regional sensitivity analysis. Monte Carlo-based uncertainty quantification was performed using the trained surrogates. Results showed that the heated section temperature was the dominant factor influencing ONC timing, with negligible contributions from heat transfer coefficient (HTC) and other thermophysical properties. In contrast, post-ONC temperature was influenced by both initial temperature and HTC. Sensitivity analysis revealed signs of nonlinear behavior and potential interactions between these parameters. The neural network achieved a test R^2 of 0.986 and MAE of 64 s for ONC timing, and an R^2 of 0.993 and MAE of 10 K for post-ONC temperature. While the random forest performed slightly worse, it still achieved a test R^2 of 0.985 and MAE of 64 s for ONC timing, and an R^2 of 0.964 with MAE of 24 K for post-ONC temperature. Using these surrogate models, the uncertainty propagation results verified the influence of the primary input parameters identified by sensitivity analysis on ONC timing and post-ONC temperature.",
  imageUrl: "/homepage/recentPaper.jpg",
  pdfUrl:
    "https://www.sciencedirect.com/science/article/pii/S0029549325006879?via%3Dihub",
  category: "reactors",
};

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
