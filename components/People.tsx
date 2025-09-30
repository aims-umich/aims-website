"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { Button } from "@heroui/react"

export const orgData: OrgTreeData = {
  leaders: [
    {
      id: "radaideh",
      name: "Majdi Radaideh",
      status: "Principal Investigator",
      role: "AIMS Lead",
      imageUrl: "/people/radaideh.jpg",
      keywords: ["Reactors", "Computing", "Controls"],
      children: [
        {
          id: "hyungjki",
          name: "Dr. Hyungjun Kim",
          status: "Group Lead",
          role: "Research Scientist (Reactors Lead)",
          imageUrl: "/people/hyungjki.jpg",
          bio: "",
          keywords: [
            "Multiphysics Simulations",
            "Reinforcement Learning",
            "Thermal Hydraulics Code",
          ],
          children: [
            {
              id: "eaheart",
              name: "Meredith Eaheart",
              status: "PhD",
              role: "PhD Student",
              imageUrl: "/people/eaheart.jpg",
              keywords: [
                "Reactor Design and Safety",
                "Computational Fluid Dynamics",
                "Multifidelity Neural Networks",
              ],
              children: [
                {
                  id: "davidgw",
                  name: "David Wenger",
                  status: "Undergraduate",
                  role: "Undergraduate",
                  imageUrl: "/people/davidgw.jpg",
                  keywords: [
                    "Fission Reactor Optimization",
                    "Commercial Fusion Power",
                    "Computational Physics",
                  ],
                },
              ],
            },
            {
              id: "npanczyk",
              name: "Nataly Panczyk",
              status: "PhD",
              role: "PhD Student",
              imageUrl: "/people/npanczyk.JPG",
              keywords: [
                "Explainable AI",
                "Interpretable AI",
                "Nuclear Energy",
              ],
            },
            {
              id: "oferdem",
              name: "Omer Erdem",
              status: "PhD",
              role: "PhD Student",
              imageUrl: "/people/oferdem.png",
              keywords: [
                "Multiobjective Optimization",
                "Neutronics Simulations",
                "Core Design",
              ],
            },
            {
              id: "sarmiento",
              name: "Marco Sarmiento",
              status: "Graduate Student",
              role: "MS Student",
              imageUrl: "/people/sarmiento.jpg",
              keywords: [
                "Multiphysics simulations",
                "Reactor Design",
                "Hybrid RL-metaheuristic",
              ],
            },
            {
              id: "cfruble",
              name: "Colin Ruble",
              status: "Graduate Student",
              role: "MS Student",
              imageUrl: "/people/cfruble.JPG",
              keywords: ["Multiphysics Simulations", "Reactor Design"],
            },
          ],
        },
        {
          id: "malradai",
          name: "Dr. Mohammed Al-Radaideh",
          status: "Group Lead",
          role: "MICDE Research Scholar and Postdoctoral Fellow (Computing Lead)",
          imageUrl: "/people/malradai.jpg",
          keywords: [
            "Alternative Fuel Combustion and Certification",
            "Renewable Energy",
            "Machine Learning",
            "Large Language Models",
          ],
          children: [
            {
              id: "shebromi",
              name: "Fares Shebromi",
              status: "PhD",
              role: "PhD Student",
              imageUrl: "/people/shebromi.png",
              keywords: [
                "Reactor Design",
                "Machine Learning",
                "Radiation Detection",
              ],
            },
            {
              id: "almulhim",
              name: "Yasir Almulhim",
              status: "PhD",
              role: "PhD Student",
              imageUrl: "/people/almulhim.png",
              bio: "",
              keywords: [
                "Monte Carlo Mathods",
                "Multiphysics simulations",
                "Machine Learning",
              ],
            },
            {
              id: "jeremoon",
              name: "Jeremy Moon",
              status: "Undergraduate",
              role: "Undergraduate",
              imageUrl: "/people/jeremoon.jpeg",
              keywords: ["Artificial Intelligence", "Machine Learning"],
              children: [
                {
                  id: "yjson",
                  name: "Emma Son",
                  status: "Undergraduate",
                  role: "Undergraduate",
                  imageUrl: "/people/yjson.JPG",
                  keywords: [
                    "Applied Data Science",
                    "Artificial Intelligence",
                    "Machine Learning",
                  ],
                },
              ],
            },
            {
              id: "asgala",
              name: "Andre Gala-Garza",
              status: "Graduate",
              role: "MS Student",
              imageUrl: "/people/asgala.jpg",
              keywords: [
                "Natural Language Processing (NLP)",
                "Artificial Intelligence (AI)",
              ],
              children: [
                {
                  id: "shahyug",
                  name: "Yug Shah",
                  status: "Undergraduate",
                  role: "Undergraduate",
                  imageUrl: "/people/shahyug.jpeg",
                  keywords: [
                    "Full-Stack Development",
                    "Artificial Intelligence",
                    "Computer Vision",
                  ],
                },
              ],
            },
            {
              id: "qasiddiq",
              name: "Qasim Siddiq",
              status: "Graduate",
              role: "MS Student",
              imageUrl: "/people/qasiddiq.jpg",
              keywords: ["Neutronics", "Reactor Design", "Machine Learning"],
              children: [
                {
                  id: "clairekm",
                  name: "Claire Kaufman",
                  status: "Undergraduate",
                  role: "Undergraduate",
                  imageUrl: "/people/clairekm.jpg",
                  keywords: [
                    "Reactor design",
                    "Core design",
                    "Computer Simulation",
                  ],
                },
              ],
            },
            {
              id: "miloparr",
              name: "Milo Parrott",
              status: "Graduate",
              role: "MS Student",
              imageUrl: "/people/miloparr.png",
              keywords: [
                "Plasma Physics Simulation",
                "Machine Learning",
                "Pulsed Power",
              ],
            },
            {
              id: "arsha",
              name: "Arsha Witoelar",
              status: "Undergraduate",
              role: "Undergraduate",
              imageUrl: "/people/arsha.jpg",
              bio: "",
              keywords: [
                "Multiphysics Simulations",
                "Reactor Design and Analysis",
                "Data Analysis",
              ],
            },
            {
              id: "hsiencc",
              name: "Andrew Chou",
              status: "Undergraduate",
              role: "Undergraduate",
              imageUrl: "/people/hsiencc.jpg",
              bio: "",
              keywords: [
                "Reactor Design and Simuation",
                "Systems Thermal Analysis",
                "Fluid Mechanics",
                "Process Automation",
              ],
            },
          ],
        },
        {
          id: "tunkleo",
          name: "Leo Tunkle",
          status: "Group Lead",
          role: "PhD student (Controls Lead)",
          imageUrl: "/people/tunkleo.jpg",
          keywords: [
            "Reinforcement Learning",
            "Reactor Control",
            "Reactor Modeling",
          ],
          children: [
            {
              id: "abkamal",
              name: "Dr. Kamal Kayode Abdulraheem",
              status: "Postdoc",
              role: "Schmidt AI in Science Postdoctoral Fellow",
              imageUrl: "/people/abkamal.jpg",
              keywords: [
                "Autonomous Control System",
                "Integrated Energy System",
                "Thermal Hydraulics",
                "Modeling and Simulation",
              ],
            },
            {
              id: "lprotche",
              name: "Lada Protcheva",
              status: "PhD Student",
              role: "PhD Student",
              imageUrl: "/people/lprotche.jpg",
              keywords: [
                "Autonomous Radiation Mapping",
                "Explainable AI",
                "Multiphysics Simulations",
              ],
              children: [
                {
                  id: "sshamant",
                  name: "Shamanth Shastry",
                  status: "Undergraduate",
                  role: "Undergraduate",
                  imageUrl: "/people/sshamant.jpeg",
                  keywords: [
                    "Machine Learning",
                    "Radiation Mapping",
                    "Data Analysis",
                  ],
                },
              ],
            },
            {
              id: "nucleai",
              name: "Logan Burnett",
              status: "PhD Student",
              role: "PhD Student",
              imageUrl: "/people/nucleai.jpg",
              keywords: [
                "Digital Twins",
                "Uncertainty Quantification",
                "Systems Engineering",
              ],
            },
            {
              id: "unabila",
              name: "Umme Mahbuba Nabila",
              status: "PhD Student",
              role: "PhD Student",
              imageUrl: "/people/unabila.png",
              keywords: [
                "Nuclear Energy",
                "Advanced Reactor Design",
                "Machine Learning",
                "Digital Twin",
              ],
            },
            {
              id: "pbahl",
              name: "Pranav Bahl",
              status: "Graduate",
              role: "MS Student",
              imageUrl: "/people/pbahl.jpg",
              keywords: [
                "Multiphysics Simulations",
                "Dynamical Systems",
                "Interpretable ML/AI",
              ],
            },
          ],
        },
        {
          id: "myerspat",
          name: "Patrick Myers",
          status: "Group Lead",
          role: "PhD student (HPC Lead)",
          imageUrl: "/people/myerspat.jpg",
          keywords: [
            "Transport methods",
            "Scientific computing",
            "Reactor physics",
            "Reduced order modeling",
          ],
          children: [
            {
              id: "aims01-machine",
              name: "AIMS01 Machine",
              status: "AIMS01 Machine",
              role: "AIMS01 Machine",
              imageUrl: "/people/default.jpg",
              keywords: ["Compute Node", "GPU"],
            },
            {
              id: "aims02-machine",
              name: "AIMS02 Machine",
              status: "AIMS02 Machine",
              role: "AIMS02 Machine",
              imageUrl: "/people/default.jpg",
              keywords: ["Compute Node", "Storage"],
            },
          ],
        },
      ],
    },
  ],
};

export interface TeamMember {
  id: string
  name: string
  status: string
  role: string
  imageUrl?: string
  bio?: string
  keywords?: string[]
  children?: TeamMember[]
}

export interface OrgTreeData {
  leaders: TeamMember[]
}

const groupByLevel = (leaders: TeamMember[]): Record<string, TeamMember[]> => {
  const levels: Record<string, TeamMember[]> = {
    "Principal Investigators": [],
    "Group Leads": [],
    "Research Fellows and Scientists": [],
    "Graduate Students": [],
    "Undergraduates": [],
  }

  const flattenMembers = (member: TeamMember) => {
    if (member.status === "Principal Investigator") {
      levels["Principal Investigators"].push(member)
    } else if (member.status === "Group Lead") {
      levels["Group Leads"].push(member)
      if (member.id === "hyungjki" || member.id === "malradai") { // a brute-force approach... likely better option somewhere
        levels["Research Fellows and Scientists"].push({ ...member })
      } else if (member.id === "tunkleo" || member.id === "myerspat") {
        levels["Graduate Students"].push({ ...member })
      }
    } else if (member.status === "Research Fellow and Scientist" || member.status === "Postdoc") {
      levels["Research Fellows and Scientists"].push(member)
    } else if (
      member.status === "PhD" ||
      member.status === "Graduate" ||
      member.status === "PhD Student" ||
      member.status === "Graduate Student"
    ) {
      levels["Graduate Students"].push(member)
    } else if (member.status === "Undergraduate") {
      levels["Undergraduates"].push(member)
    }

    if (member.children) {
      member.children.forEach(flattenMembers)
    }
  }

  leaders.forEach(flattenMembers)

  Object.keys(levels).forEach((key) => {
    if (key === "Graduate Students") {
      const phdStudents = levels[key]
        .filter((m) => m.status === "PhD" || m.status === "PhD Student")
        .sort((a, b) => a.name.localeCompare(b.name))
      const msStudents = levels[key]
        .filter((m) => m.status === "Graduate" || m.status === "Graduate Student")
        .sort((a, b) => a.name.localeCompare(b.name))
      const groupLeads = levels[key]
        .filter((m) => m.status === "Group Lead")
        .sort((a, b) => a.name.localeCompare(b.name))
      levels[key] = [...phdStudents, ...msStudents, ...groupLeads]
    } else {
      levels[key].sort((a, b) => a.name.localeCompare(b.name))
    }
  })

  return levels
}

interface AccordionItemProps {
  title: string
  members: TeamMember[]
  isExpanded: boolean
  onToggle: () => void
}

interface AccordionProps {
  items: Array<{
    title: string
    members: TeamMember[]
  }>
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  members,
  isExpanded,
  onToggle,
}) => {
  const cardVariants: Variants = {
    collapsed: { height: "60px", transition: { type: "spring", stiffness: 400, damping: 30 } },
    expanded: { height: "auto", transition: { type: "spring", stiffness: 400, damping: 30 } },
  }
  const contentVariants: Variants = { collapsed: { opacity: 0, transition: { duration: 0.1 } }, expanded: { opacity: 1, transition: { delay: 0.1, duration: 0.2 } } }
  const chevronVariants: Variants = { collapsed: { rotate: 0 }, expanded: { rotate: 180 } }

  return (
    <motion.div
      className="w-full my-4 h-auto select-none overflow-hidden rounded-lg border border-blue-michigan/20 dark:border-zinc-700"
      variants={cardVariants}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
    >
      <div onClick={onToggle} className="flex items-center justify-between p-4 text-blue-michigan dark:text-white cursor-pointer">
        <h2 className="m-0 text-lg font-semibold">{title}</h2>
        <motion.div variants={chevronVariants}><ChevronDown size={18} /></motion.div>
      </div>
      <motion.div
        className="px-4 pt-0 pb-4"
        variants={contentVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        style={{ overflow: 'hidden' }}
      >
        <div className="flex flex-wrap gap-6 justify-center pt-4">
          {members.map((member) => (
            <MemberNode key={member.id} member={member} viewMode="accordion" />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [expandedStates, setExpandedStates] = useState<boolean[]>(items.map(() => true));
  const handleToggle = (index: number) => setExpandedStates(prev => prev.map((state, i) => (i === index ? !state : state)));

  return (
    <div className="space-y-4">
      {items
        .filter(item => item.members.length > 0)
        .map((item, index) => (
          <AccordionItem
            key={item.title}
            title={item.title}
            members={item.members}
            isExpanded={expandedStates[index]}
            onToggle={() => handleToggle(index)}
          />
        ))}
    </div>
  );
};

function MemberNode({
  member,
  isLeader = false,
  viewMode = "tree",
}: {
  member: TeamMember
  isLeader?: boolean
  viewMode?: "tree" | "accordion"
}) {
  const hasChildren = member.children && member.children.length > 0

  return (
    <div className={`member-node-container relative flex flex-col items-center ${viewMode === 'tree' ? 'inline-block align-top px-10 py-4' : 'mb-4'}`}>
      {!isLeader && viewMode === 'tree' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-blue-michigan/20" />
      )}

      <Link href={`/members/${member.id}`} className="relative z-10 flex flex-col items-center bg-transparent mt-8 group w-48">
        <div className={`relative ${isLeader ? "w-48 h-48" : "w-40 h-40"} rounded-full overflow-hidden border-8 border-white dark:border-zinc-800 group-hover:border-yellow-maize transition-colors duration-200 shadow-md`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-michigan to-blue-michigan/80 opacity-50" />
          <Image
            src={member.imageUrl || "/people/default.jpg"}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 160px, 192px"
            className="relative z-10 object-cover"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-semibold text-lg text-blue-michigan dark:text-white group-hover:text-yellow-maize transition-colors duration-200">{member.name}</h3>
          <p className="text-md text-blue-michigan/70 dark:text-zinc-400">{member.role}</p>
           {member.keywords && (
            <p className="text-sm text-blue-michigan/60 dark:text-zinc-500 mt-1 leading-tight whitespace-normal break-words">
              {member.keywords.join(', ')}
            </p>
          )}
        </div>
      </Link>

      {hasChildren && viewMode === 'tree' && (
        <div className="children-section relative w-full pt-8">
          <div className="absolute top-0 left-10 right-10 h-px mt-4 bg-blue-michigan/20" />
          <div className="flex justify-center gap-x-0 mt-0 whitespace-nowrap">
            {member.children?.map((child) => (
              <MemberNode key={child.id} member={child} viewMode="tree" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function OrgTree() {
  const [viewMode, setViewMode] = useState<"tree" | "accordion">("accordion")
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const levels = groupByLevel(orgData.leaders)
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const majdiNodeRef = useRef<HTMLDivElement>(null);

  const accordionItems = [
    { title: "Principal Investigators", members: levels["Principal Investigators"] },
    { title: "Group Leads", members: levels["Group Leads"] },
    { title: "Research Fellows and Scientists", members: levels["Research Fellows and Scientists"] },
    { title: "Graduate Students", members: levels["Graduate Students"] },
    { title: "Undergraduates", members: levels["Undergraduates"] },
  ].filter(item => item.members.length > 0);

  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.innerWidth >= 1024;
      setIsLargeScreen(largeScreen);
      if (!largeScreen && viewMode === "tree") {
        setViewMode("accordion");
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [viewMode])

  useEffect(() => {
    if (viewMode === 'tree' && isLargeScreen && scrollContainerRef.current && majdiNodeRef.current) {
      const container = scrollContainerRef.current;
      const majdiNodeWrapper = majdiNodeRef.current;
      if (majdiNodeWrapper) {
          const majdiNodeCenter = majdiNodeWrapper.offsetLeft + majdiNodeWrapper.offsetWidth / 2;
          const containerCenter = container.offsetWidth / 2;
          const scrollLeftTarget = majdiNodeCenter - containerCenter;
          container.scrollTo({ left: scrollLeftTarget, behavior: 'auto' });
      }
    }
  }, [viewMode, isLargeScreen]);

  return (
    <div className="w-full -mt-16 mb-32">
      <div className="h-full w-full dark:bg-black-100 bg-white absolute left-0 right-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="py-12 relative z-10">
        <div className="flex flex-col items-center justify-center px-4">
          <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl md:text-5xl mb-6 dark:text-white text-center">
            Our <span className="text-yellow-maize">People</span>
          </h2>
          <p className='text-xl text-center tracking-tight text-blue-michigan mb-4 dark:text-zinc-300 max-w-3xl'>
            Meet the talented researchers, scientists, and students who make our lab&apos;s groundbreaking work possible.
          </p>
          {isLargeScreen && (
            <button
              onClick={() => setViewMode(vm => vm === "tree" ? "accordion" : "tree")}
              className="mb-8 px-4 py-2 bg-blue-michigan text-yellow-maize font-bold rounded-lg hover:bg-blue-michigan/80 transition shadow"
            >
              View By {viewMode === "tree" ? "Status" : "Group"}
            </button>
          )}
           {!isLargeScreen && viewMode === 'accordion' && (
             <p className="mb-8 text-sm text-blue-michigan/80 dark:text-zinc-400">(View by Group)</p>
           )}
        </div>

        <div className="container mx-auto px-4">
          {viewMode === "tree" && isLargeScreen ? (
            <div ref={scrollContainerRef} className="overflow-x-auto w-full cursor-grab active:cursor-grabbing relative pb-4">
              <div className="inline-block py-8 text-center">
                {orgData.leaders.map((leader) => (
                   <div key={leader.id} ref={leader.id === 'radaideh' ? majdiNodeRef : null} className="inline-block">
                     <MemberNode member={leader} isLeader viewMode="tree" />
                   </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              <Accordion items={accordionItems} />
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/members" legacyBehavior passHref>
            <Button
              as="a"
              className="px-12 py-0 text-xl font-semibold text-yellow-maize bg-blue-michigan rounded-full hover:bg-blue-michigan/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
              size="lg"
            >
              Member Directory
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}