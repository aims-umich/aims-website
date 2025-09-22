"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function Department() {
  const [, setHoveredDept] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const departments = [
    {
      id: "ners",
      name: "Nuclear Engineering & Radiological Sciences",
      url: "https://ners.engin.umich.edu/",
      imageUrl:
        "/homepage/departments/ners-icon.png",
      alt: "NERS - Nuclear Engineering & Radiological Sciences",
    },
    {
      id: "cse",
      name: "Computer Science & Engineering",
      url: "https://cse.engin.umich.edu/",
      imageUrl:
        "/homepage/departments/cse-icon.png",
      alt: "CSE - Computer Science & Engineering",
    },
  ];

  return (
    <section ref={ref} className="w-full py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl md:text-5xl mb-4 text-center">
            Proud To Be{" "}
            <span className="text-yellow-maize">Affiliated With</span>
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {departments.map((dept, index) => (
            <motion.a
              key={dept.id}
              href={dept.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full max-w-3xl flex-1"
              onMouseEnter={() => setHoveredDept(dept.id)}
              onMouseLeave={() => setHoveredDept(null)}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative bg-blue-michigan rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-michigan/30 p-6">
                <div className="relative w-full h-auto min-h-[120px] flex items-center justify-center">
                  <Image
                    src={dept.imageUrl}
                    alt={dept.alt}
                    width={800}
                    height={200}
                    className="w-full h-auto max-h-[120px] object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-blue-michigan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                    <span className="text-blue-michigan font-medium">
                      Visit Department
                    </span>
                  </div>
                </div>

                <div className="absolute -top-3 -left-3 w-24 h-24 bg-blue-michigan/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* seo */}
              <span className="sr-only">{dept.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
