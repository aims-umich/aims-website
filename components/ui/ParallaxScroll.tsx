"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AdminWrapper from "@/components/admin/AdminWrapper";

export const ParallaxScroll = ({
  images,
  className,
  onEdit,
}: {
  images: any[];
  className?: string;
  onEdit?: (image: any) => void;
}) => {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [hovered, setHovered] = useState<number | null>(null);

  const half = Math.ceil(images.length / 2);
  const firstPart = images.slice(0, half);
  const secondPart = images.slice(half);

  return (
    <div className={cn("h-[40rem] w-full overflow-y-auto", className)} ref={gridRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto py-40 px-10 gap-2">
        {/* First Column */}
        <div className="flex flex-col gap-2">
          {firstPart.map((el, idx) => (
            <AdminWrapper
              key={"grid-1-" + idx}
              onEdit={() => onEdit?.(el)}
              label="Edit Image"
              className="w-full"
            >
              <motion.div
                style={{ y: translateFirst }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "relative rounded-lg overflow-hidden transition-all duration-300 ease-out",
                  hovered !== null && hovered !== idx && "blur-sm scale-[0.98]"
                )}
              >
                <Image
                  src={el.src}
                  className="h-[500px] w-auto object-cover rounded-lg"
                  height={600}
                  width={450}
                  alt={el.title}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
                    hovered === idx ? "opacity-100" : "opacity-0"
                  )}
                >
                  <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
                    {el.title}
                  </div>
                </div>
              </motion.div>
            </AdminWrapper>
          ))}
        </div>

        {/* Second Column */}
        <div className="flex flex-col gap-2">
          {secondPart.map((el, idx) => (
            <AdminWrapper
              key={"grid-2-" + idx}
              onEdit={() => onEdit?.(el)}
              label="Edit Image"
              className="w-full"
            >
              <motion.div
                style={{ y: translateSecond }}
                onMouseEnter={() => setHovered(idx + half)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "relative rounded-lg overflow-hidden transition-all duration-300 ease-out",
                  hovered !== null &&
                    hovered !== idx + half &&
                    "blur-sm scale-[0.98]"
                )}
              >
                <Image
                  src={el.src}
                  className="h-[500px] w-auto object-cover rounded-lg"
                  height={600}
                  width={450}
                  alt={el.title}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
                    hovered === idx + half ? "opacity-100" : "opacity-0"
                  )}
                >
                  <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
                    {el.title}
                  </div>
                </div>
              </motion.div>
            </AdminWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};
