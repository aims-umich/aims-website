"use client"

import React, { useEffect, useState, useMemo, type JSX } from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { ChevronRight } from "lucide-react"
import {
  AnimatePresence,
  MotionProps,
  Variants,
  motion,
  useAnimation,
} from "motion/react"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel"

interface Tip {
  text: string
  image: string
  url?: string
}

interface LoadingCarouselProps {
  tips?: Tip[]
  className?: string
  autoplayInterval?: number
  showNavigation?: boolean
  showIndicators?: boolean
  showProgress?: boolean
  aspectRatio?: "video" | "square" | "wide"
  textPosition?: "top" | "bottom"
  onTipChange?: (index: number) => void
  backgroundTips?: boolean
  backgroundGradient?: boolean
  shuffleTips?: boolean
  animateText?: boolean
}

const defaultTips: Tip[] = [
  {
    text: "Dinner from the M&C-2025 conference in Denver with AIMS members celebrating Majdi’s Young Researcher Achievement Award. Leo is the main suspect for messing up group photos—thanks to his real-time blinking. Meanwhile, Nataly is doing her best to prove Majdi wrong about her being the second person to blame for ruining pictures.",
    image: "/gallery/0_MC-dinner.jpg",
  },
  {
    text: "Leo exploring other career avenues if his PhD did not work out. His fanbase currently has two.",
    image: "/gallery/1_Leo-Other-Career.jpg",
  },
  {
    text: "Our reaction when Majdi says the group meeting is cancelled.",
    image: "/gallery/2_Meeting_Cancelled.jpeg",
  },
  {
    text: 'Majdi’s with full confidence while bragging about how much student loves him in the classroom because of his engaging style: "I’ve gotten animals to pose for photos with me, you really think engaging students is gonna be a challenge?"',
    image: "/gallery/3_Majdi-Engaging-Style.jpg",
  },
  {
    text: "Leo and Nabila’s reactions when Majdi starts complaining about his administrative loads, us not meeting deadlines, being behind on research, and so on. Meanwhile Kamal listens carefully as he plans to become a faculty!",
    image: "/gallery/4_Leo-Nabila-Sleeping.jpg",
  },
  {
    text: "Meredith after she promised Majdi she will stop travelling to all events and workshops and settle down to get her PhD done. Picture from COP28 in UAE.",
    image: "/gallery/5_Meredith-COP28.png",
  },
  {
    text: "Nabila (a.k.a Meredith – 2.0) does not let any workshop or nuclear event miss her no matter where it is. Photo from the Fukushima-Daiichi site in Japan!",
    image: "/gallery/6_Nabila-Japan.jpg",
  },
  {
    text: 'AIMS students and alumni snapped a photo in Idaho Falls during a conference. Meanwhile, Majdi stood there, baffled, wondering: "Have I ever seen them this happy before? Is it me... or is Idaho Falls way more fun than Ann Arbor?" Tough call. What do you think?',
    image: "/gallery/7_Idaho-Smiles.jpeg",
  },
  {
    text: "Nataly’s lifecycle in AIMS: She overcommits to numerous tasks, ends up in trouble, feels overwhelmed, then blames Majdi for that, and finally smiles when the mission is accomplished.",
    image: "/gallery/8_Nataly-Smile.png",
  },
  {
    text: "Andre reaction when Majdi misspells his name for the thousand time by adding “i” to the end of his name while texting on Slack. Sorry Andrei, I will NOT do this again.",
    image: "/gallery/9_Andre-Misspell.jpg",
  },
  {
    text: 'Logan, keeping a straight face like a true professional, as Majdi cheerfully announces he\'s about to whip up some "easy" CAD drawings — meanwhile, Logan’s never touched CAD in his life and is internally screaming.',
    image: "/gallery/10_Logan-CAD.jpg",
  },
  {
    text: "Majdi’s face after winning an argument with us …",
    image: "/gallery/11_Majdi-Wins-Argument.png",
  },
  {
    text: "When he loses the argument …",
    image: "/gallery/12_Majdi-loses-argument.jpg",
  },
  {
    text: "Claire (Cal) typical explanation on missing group meetings and not responding to Slack.",
    image: "/gallery/13_Claire-Studying.png",
  },
  {
    text: "Our expectation and dreams of the food to be served in the group meetings while Majdi insists that he does not serve that because he cares about our health and fitness in the first place.",
    image: "/gallery/14_food.JPG",
  },
  {
    text: "Part of our core values is “Support”. Here we support Jacob and push him out of Michigan as he graduates and joins Westinghouse",
    image: "/gallery/15_Jacob-Out.jpg",
  },
  {
    text: "Jazmin with the pic of the year during her visit to the Fermi-2 power plant in Michigan.",
    image: "/gallery/16_Jazmin-AIMSPicYear.jpg",
  },
  {
    text: "Lada is being super loyal to the photographer. Till today, we have no idea what we were all looking at here and why Lada was completely disinterested.",
    image: "/gallery/17_Lada-Loyality-Photo.jpg",
  },
  {
    text: "Majdi after giving us a long lecture about hardwork and dedication. Photo Credit: The brave Leo Tunkle",
    image: "/gallery/18_Majdi-Relax-After-Crticism.jpg",
  },
  {
    text: "Majdi when asked whether he dares making a joke about all people in this picture: “I do not want to ruin my life” We have the most bright and talented women in the field (and this is not a joke).",
    image: "/gallery/19_AIMS-women.jpg",
  },
  {
    text: "You are a true AIMS if you can find one AIMS member in this picture and a loyal NERS and Wolverine if you can find two more people from NERS!",
    image: "/gallery/20_RisingStars.jpg",
  },
  {
    text: "Majdi at the early career panel at the ANS 2024 Winter conference in Orlando, FL. This picture is also his way to remind us that he was a superstar scientist in the past before being buried in management.",
    image: "/gallery/21_Majdi-Early-Career.jpg",
  },
  {
    text: "Majdi’s first award in Michigan was a water bottle and a backpack after winning best faculty pitch award. When asked about the award: “It is true I was thirsty after the pitch, but I did not expect the prize to be a water bottle”.",
    image: "/gallery/22_Majdi-first-award.png",
  },
  {
    text: "The hardest part to get this picture done was to find two people in AIMS who have close heights!",
    image: "/gallery/23_AIMS-Compete.jpg",
  },
  {
    text: "We know Omer is a multi-talent guy in AIMS but his greatest talent is getting Majdi lost during one-to-one meetings by diving into a million complex directions to describe his research. Majdi says he needs a meditation retreat afterward.",
    image: "/gallery/24_Omer-Talent.jpg",
  },
  {
    text: "Mohammed, who is conducting research on Sustainable Aviation Fuel (SAF), is applying his research in practice here, with his brain powering this balloon with SAF.",
    image: "/gallery/25_Mohammed-SAF.jpg",
  },
  {
    text: "Patrick complains he does not get much time to chat with Majdi. Meanwhile Patrick when Majdi tries to schedule a meeting …",
    image: "/gallery/26_Patrick-Busy.jpg",
  },
  {
    text: "Our reaction when Majdi says the paper still needs a lot of work just to be “good”.",
    image: "/gallery/27_Paper-feedback.jpg",
  },
  {
    text: "Majdi taking pictures with crocodiles = Our *worst* nightmare of a new project. Please, no hands-on experience needed.",
    image: "/gallery/28_Majdi-with-Crocodiles.jpg",
  },
  {
    text: "We tell Majdi we’re working *super* hard during our internships, and people are basically blown away by our brilliance. A spy then sends him this.",
    image: "/gallery/29_Students-Internships.jpg",
  },
  // {
  //   text: "Nobody tries to make a joke at us. We created this website and we can hack it if we want. Sorry guys! We just wanted to say you are very awesome.",
  //   image: "/gallery/30_Jeremy-Nick.jpg",
  // },
  {
    text: "And we remain friends and professionals! Thank you from the AIMS family!",
    image: "/gallery/31_AndWeRemainFriends.jpg",
  },
  {
    text: "",
    image: "/gallery/32_Qasiddiq.jpeg",
  },
  {
    text: "",
    image: "/gallery/33_Shahyug.jpeg",
  },
  {
    text: "",
    image: "/gallery/34_Miloparr.jpg",
  },
  {
    text: "Shamanth when he sees an unusually large dog behind him",
    image: "/gallery/35_Sshamant.jpeg",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
}

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[2/1]",
}

export function LoadingCarousel({
  onTipChange,
  className,
  tips = defaultTips,
  showProgress = true,
  aspectRatio = "video",
  showNavigation = false,
  showIndicators = true,
  backgroundTips = false,
  textPosition = "bottom",
  autoplayInterval = 4500,
  backgroundGradient = false,
  shuffleTips = false,
  animateText = true,
}: LoadingCarouselProps) {
  const [progress, setProgress] = useState(0)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const controls = useAnimation()
  const [displayTips] = useState(() =>
    shuffleTips ? shuffleArray(tips) : tips
  )

  const autoplay = useMemo(() => Autoplay({
    delay: autoplayInterval,
    stopOnInteraction: false,
  }), [autoplayInterval]);

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())
    setDirection(
      api.scrollSnapList().indexOf(api.selectedScrollSnap()) - current
    )

    const onSelect = () => {
      const newIndex = api.selectedScrollSnap()
      setCurrent(newIndex)
      setDirection(api.scrollSnapList().indexOf(newIndex) - current)
      onTipChange?.(newIndex)
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api, current, onTipChange])

  useEffect(() => {
    if (!showProgress) return

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = 2 // Constant increment for smoother progress
        return Math.min(oldProgress + diff, 100)
      })
    }, autoplayInterval / 50)

    return () => {
      clearInterval(timer)
    }
  }, [showProgress, autoplayInterval])

  useEffect(() => {
    if (progress === 100) {
      controls.start({ scaleX: 0 }).then(() => {
        setProgress(0)
        controls.set({ scaleX: 1 })
      })
    } else {
      controls.start({ scaleX: progress / 100 })
    }
  }, [progress, controls])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "w-full max-w-6xl mx-auto rounded-lg bg-muted shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
        className
      )}
    >
      <div className="w-full overflow-hidden rounded-lg">
        <Carousel
          setApi={setApi}
          plugins={[autoplay]}
          className="w-full relative"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            <AnimatePresence initial={false} custom={direction}>
              {(displayTips || []).map((tip, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    variants={carouselVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={direction}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`relative ${aspectRatioClasses[aspectRatio]} w-full overflow-hidden`}
                  >
                    <Image
                      src={tip.image}
                      alt={`Visual representation for tip: ${tip.text}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    {backgroundGradient && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    )}

                    {backgroundTips ? (
                      <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className={`absolute ${
                          textPosition === "top" ? "top-0" : "bottom-0"
                        } left-0 right-0 p-4 sm:p-6 md:p-8`}
                      >
                        {displayTips[current]?.url ? (
                          <a
                            href={displayTips[current]?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <p className="text-white text-center md:text-left text-base sm:text-lg md:text-xl lg:text-2xl lg:font-bold tracking-tight font-medium leading-relaxed">
                              {tip.text}
                            </p>
                          </a>
                        ) : (
                          <p className="text-white text-center md:text-left text-base sm:text-lg md:text-xl lg:text-2xl lg:font-bold tracking-tight font-medium leading-relaxed">
                            {tip.text}
                          </p>
                        )}
                      </motion.div>
                    ) : null}
                  </motion.div>
                </CarouselItem>
              ))}
            </AnimatePresence>
          </CarouselContent>
          {showNavigation && (
            <>
              <CarouselPrevious
                className="absolute left-2 top-1/2 -translate-y-1/2"
                onClick={() => {
                  if (api) {
                    api.scrollPrev();
                    autoplay.reset();
                    setProgress(0);
                  }
                }}
              />
              <CarouselNext
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => {
                  if (api) {
                    api.scrollNext();
                    autoplay.reset();
                    setProgress(0);
                  }
                }}
              />
            </>
          )}
        </Carousel>
        <div
          className={cn(
            "bg-muted p-4 ",
            showIndicators && !backgroundTips ? "lg:py-2 lg:px-4 " : ""
          )}
        >
          <div
            className={cn(
              "flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0",
              showIndicators && !backgroundTips
                ? "sm:flex-col space-y-2 items-start gap-3"
                : ""
            )}
          >
            <div className="flex items-center space-x-2 text-primary">
              {backgroundTips ? (
                <span className="text-sm font-medium">
                  Tip {current + 1}/{displayTips?.length || 0}
                </span>
              ) : (
                <div className="flex flex-col w-full">
                  {displayTips[current]?.url ? (
                    <a
                      href={displayTips[current]?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base lg:text-2xl xl:font-semibold tracking-tight font-medium break-words"
                    >
                      {animateText ? (
                        <TextScramble
                          key={displayTips[current]?.text}
                          duration={1.2}
                          characterSet=". "
                        >
                          {displayTips[current]?.text}
                        </TextScramble>
                      ) : (
                        displayTips[current]?.text
                      )}
                    </a>
                  ) : (
                    <span className="text-base lg:text-2xl xl:font-semibold tracking-tight font-medium break-words">
                      {animateText ? (
                        <TextScramble
                          key={displayTips[current]?.text}
                          duration={1.2}
                          characterSet=". "
                        >
                          {displayTips[current]?.text}
                        </TextScramble>
                      ) : (
                        displayTips[current]?.text
                      )}
                    </span>
                  )}
                  {showIndicators && (
                    <span className="text-sm font-medium mt-2 items-center">
                      {current + 1}/{displayTips?.length || 0}
                    </span>
                  )}
                </div>
              )}
              {backgroundTips && <ChevronRight className="w-4 h-4" />}
            </div>
          </div>
          {showProgress && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={controls}
              transition={{ duration: 0.5, ease: "linear" }}
              className="h-1 bg-muted origin-left mt-2"
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Credit -> https://motion-primitives.com/docs/text-scramble
// https://x.com/Ibelick
type TextScrambleProps = {
  children: string
  duration?: number
  speed?: number
  characterSet?: string
  as?: React.ElementType
  className?: string
  trigger?: boolean
  onScrambleComplete?: () => void
} & MotionProps

const defaultChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = "p",
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  )
  const [displayText, setDisplayText] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)
  const text = children

  const scramble = async () => {
    if (isAnimating) return
    setIsAnimating(true)

    const steps = duration / speed
    let step = 0

    const interval = setInterval(() => {
      let scrambled = ""
      const progress = step / steps

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          scrambled += " "
          continue
        }

        if (progress * text.length > i) {
          scrambled += text[i]
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)]
        }
      }

      setDisplayText(scrambled)
      step++

      if (step > steps) {
        clearInterval(interval)
        setDisplayText(text)
        setIsAnimating(false)
        onScrambleComplete?.()
      }
    }, speed * 1000)
  }

  useEffect(() => {
    if (!trigger) return

    scramble()
  }, [trigger])

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  )
}

export default LoadingCarousel