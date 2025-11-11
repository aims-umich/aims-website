export type NewsItem = {
  id: string
  title: string
  excerpt: string
  content: string
  link?: string
  date: string
  timestamp: number
  imageUrl: string
  images?: string[]
  category: "reactors" | "controls" | "computing" | "general"
  featured: boolean
  author: string
  slug: string
}

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title:
      "PyMAISE development quoted by the American Nuclear Society’ Nuclear News Wire",
    excerpt:
      "Python-based Michigan Artificial Intelligence Standard Environment (pyMAISE) is a project that is providing an “automatic machine learning benchmarking library—the first of its kind created by nuclear engineers for nuclear engineers.”",
    content: "To read full article, please visit the link below.",
    link: "https://www.ans.org/news/2025-01-24/article-6716/umich-ners-builds-online-platform-to-promote-ai-applications-in-nuclear-engineering/",
    date: "January 24, 2025",
    timestamp: 1737694800,
    imageUrl: "/software-datasets/pymaise.png",
    category: "general",
    featured: true,
    author: "ANS Nuclear Cafe",
    slug: "1-24-2025",
  },
  {
    id: "2",
    title:
      "Nabila was selected to attend a workshop that includes visiting the Fukushima-Daiichi decommissioning site",
    excerpt: "",
    content: "",
    date: "October 13, 2024",
    timestamp: 1729656000,
    imageUrl: "/news/10_13_2024_NabilaNews2.jpg",
    images: ["/news/10_13_2024-NabilaNews.jpg"],
    category: "reactors",
    featured: false,
    author: "AIMS",
    slug: "10-13-2024",
  },
  {
    id: "3",
    title:
      "Meredith was selected to attend the OECD Nuclear Energy Global Forum Rising Stars Program for female rising stars in science",
    excerpt: "",
    content: "",
    date: "November 25, 2024",
    timestamp: 1732510800,
    imageUrl: "/news/11_25_2024-Meredith-RisingStars2.png",
    images: ["/news/11_25_2024-Meredith-RisingStars.jpg"],
    category: "reactors",
    featured: false,
    author: "AIMS",
    slug: "11-25-2024",
  },
  {
    id: "4",
    title:
      "AIMS first journal article led by a graduate student (O Hwang Kwon) is highlighted in Michigan News",
    excerpt:
      "US public opinion on social media is warming to nuclear energy, but concerns remain.",
    content: "To read full article, please visit the link below.",
    link: "https://news.umich.edu/us-public-opinion-on-social-media-is-warming-to-nuclear-energy-but-concerns-remain/",
    date: "June 5, 2024",
    timestamp: 1717560000,
    imageUrl: "/news/06_05_2024-OHwangKwon.jpg",
    category: "computing",
    featured: true,
    author: "Michigan News",
    slug: "06-05-2024",
  },
  {
    id: "5",
    title: "AIMS students win NSF fellowships",
    excerpt:
      "Logan Burnett and Nataly R. Panczyk have been awarded prestigious fellowships from the National Science Foundation Graduate Research Fellowship Program.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2024/06/04/ners-graduate-students-receive-nsf-fellowships/",
    date: "June 4, 2024",
    timestamp: 1717473600,
    imageUrl: "/news/06_04_2024-Fellowships.jpg",
    category: "reactors",
    featured: true,
    author: "Sara Norman",
    slug: "06-04-2024",
  },
  {
    id: "6",
    title:
      "AIMS wins two grants in the DOE Nuclear Energy University Program, working in nuclear reactor safety and generative AI",
    excerpt:
      "The Department of Energy will support research into gas-cooled fast modular reactor safety, community consent in nuclear facility siting, and more.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2024/04/30/neups-2024/",
    date: "April 30, 2024",
    timestamp: 1714449600,
    imageUrl: "/news/04_30_2024-Grants.jpeg",
    category: "reactors",
    featured: true,
    author: "Sara Norman",
    slug: "04-30-2024",
  },
  {
    id: "7",
    title:
      "AIMS wins a grant from the Nuclear Regulatory Commission on Explainable AI development for nuclear power",
    excerpt:
      "The Nuclear Regulatory Commission will support this project with a $500k grant.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2024/04/29/majdi-radaideh-to-lead-development-of-nuclear-regulatory-framework-for-explainable-licensable-ai/",
    date: "April 29, 2024",
    timestamp: 1714363200,
    imageUrl: "/news/04_29_2024-Grants.jpg",
    category: "general",
    featured: true,
    author: "Sara Norman",
    slug: "04-29-2024",
  },
  {
    id: "8",
    title:
      "AIMS receives a contract to work with Idaho National Laboratory on digital twin development.",
    excerpt:
      "Majdi Radaideh is supporting Uncertainty Quantification Methods for Digital Twin-based Autonomous Control.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2024/03/06/advancing-nuclear-reactor-control-and-digital-twins-with-idaho-national-laboratory/",
    date: "March 6, 2024",
    timestamp: 1709701200,
    imageUrl: "/news/03_06_2024-INL.jpg",
    category: "general",
    featured: true,
    author: "Sara Norman",
    slug: "03-06-2024",
  },
  {
    id: "9",
    title:
      "Meredith attended COP 28 in Dubai, UAE and shared her experience here:",
    excerpt:
      "COP28 was a significant COP for nuclear energy, being referred to as the ‘nuclear COP’ by many people.",
    content: "To read full article, please visit the link below.",
    link: "https://climateblue.org/2024/01/16/lessons-learned-in-nuclear-communication-at-cop28/",
    date: "January 16, 2024",
    timestamp: 1705381200,
    imageUrl: "/news/01_16_2024-COP28.png",
    category: "general",
    featured: false,
    author: "Meredith Eaheart",
    slug: "01-06-2024",
  },
  {
    id: "10",
    title: "Majdi wins the DOE Distinguished Early Career Award",
    excerpt:
      "RAD’s research seeks to develop new algorithms for optimizing and controlling advanced nuclear reactors.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2023/07/06/majdi-radaideh-wins-doe-distinguished-early-career-award/",
    date: "July 6, 2023",
    timestamp: 1688616000,
    imageUrl: "/news/07_06_2023-Award.jpg",
    category: "general",
    featured: false,
    author: "Sara Norman",
    slug: "07-06-2023",
  },
  {
    id: "11",
    title:
      "pyMAISE founders (Patrick, Connor, Veda) win a Best Presentation Award at ANS Student Conference",
    excerpt:
      "Their paper is titled “pyMAISE: A Machine Learning and Artificial Intelligence Benchmarking Software for Nuclear Reactor Applications”.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2023/05/03/u-m-ners-team-win-best-undergraduate-computational-methods-artificial-intelligence-and-machine-learning-presentation-at-2023-ans-student-conference/",
    date: "May 3, 2023",
    timestamp: 1683086400,
    imageUrl: "/news/05_03_2023-pyMAISE.jpg",
    category: "general",
    featured: true,
    author: "Rod Capps",
    slug: "05-03-2023",
  },
  {
    id: "12",
    title:
      "O Hwang talks about the possible successors of fossil fuels at the 2023 Rackham King Talks",
    excerpt:
      "In his talk, “Which Would Be the Successor of Fossil Fuels—Renewables or Nuclear?”, O Hwang Kwon aims to convey the message of the urgent need for action as he firmly believes that by working together as a team, the world can successfully overcome the challenge of climate change.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2023/02/27/ners-student-o-hwang-kwon-talks-about-the-possible-successors-of-fossil-fuels-at-the-2023-rackham-king-talks/",
    date: "February 27, 2023",
    timestamp: 1677474000,
    imageUrl: "/news/02_27_2023-Rackham.jpg",
    category: "general",
    featured: true,
    author: "Sneha",
    slug: "02-27-2023",
  },
  {
    id: "13",
    title:
      "Meredith Eaheart awarded the University Nuclear Leadership Program fellowship",
    excerpt:
      "The fellowship is awarded to exceptional students researching innovative nuclear energy solutions to today’s climate challenges and help in production of clean electricity and reduction of carbon emissions.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2022/05/09/phd-student-meredith-eaheart-awarded-unlp-fellowship/",
    date: "May 9, 2022",
    timestamp: 1652068800,
    imageUrl: "/news/05_09_2022-Fellowship.jpg",
    category: "general",
    featured: true,
    author: "Sneha",
    slug: "05-09-2022",
  },
  {
    id: "14",
    title: "Majdi joins UMich and starts AIMS!",
    excerpt:
      "The new additions to the department point to a positive future and offer a breadth of educational and research experience.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2022/08/25/majdi-radaideh-stephen-raiman-and-yang-zhang-join-ners-faculty/",
    date: "May 8, 2022",
    timestamp: 1651982400,
    imageUrl: "/news/05_08_2022-Majdi.jpg",
    category: "general",
    featured: true,
    author: "Sara Norman",
    slug: "05-08-2022",
  },
  {
    id: "15",
    title:
      "Majdi Radaideh receives 2025 MCD Young Member's Research Achievement Award",
    excerpt:
      "The award recognizes Assistant Professor Radaideh’s exceptional contributions to nuclear mathematics and computational methods.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2025/04/29/majdi-radaideh-receives-2025-mcd-young-members-research-achievement-award/",
    date: "April 29, 2025",
    timestamp: 1745910000,
    imageUrl: "/news/04_29_2025-Majdi-Award.jpg",
    category: "general",
    featured: true,
    author: "Sara Norman",
    slug: "04-29-2025",
  },
  {
    id: "16",
    title:
      "DOE National Best Paper Award for Our Computing Group For Work on LLMs and Sentiment Analysis",
    excerpt:
      "NERS students are among the authors of the winning research paper.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2025/06/16/ai-powered-paper-on-nuclear-sentiment-wins-neup-award/",
    date: "June 16, 2025",
    timestamp: 1750057200,
    imageUrl: "/news/06_16_2025-Award.jpg",
    category: "general",
    featured: true,
    author: "Sara Norman",
    slug: "06-16-2025",
  },
  {
    id: "17",
    title: "Majdi Radaideh receives ANS Ted Quinn Early Career Award",
    excerpt:
      "The award honors outstanding contributions in instrumentation, control, and human-machine interfaces for nuclear systems.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2025/06/26/majdi-radaideh-receives-ans-ted-quinn-early-career-award/",
    date: "June 26, 2025",
    timestamp: 1750921200,
    imageUrl: "/news/06_26_2025-Award.jpg",
    category: "general",
    featured: true,
    author: "Sara Norman",
    slug: "06-26-2025",
  },
  {
    id: "18",
    title:
      "Leo, Nabila, and Lada attended the STAR☆FIRE 2025 Space Nuclear workshop in Las Vegas.",
    excerpt: "",
    content: "",
    link: "",
    date: "July 22, 2025",
    timestamp: 1753156800,
    imageUrl: "/news/07_22_2025-StarFire.png",
    category: "general",
    featured: true,
    author: "",
    slug: "07-22-2025",
  },
  {
    id: "19",
    title:
      "Logan, Nabila, and Meredith presented in NURETH-21 in Busan, South Korea",
    excerpt: "",
    content: "",
    link: "",
    date: "September 6, 2025",
    timestamp: 1757131200,
    imageUrl: "/news/09_06_2025-NURETH-1.jpg",
    images: ["/news/09_06_2025-NURETH-2.jpg", "/news/09_06_2025-NURETH-3.jpg"],
    category: "general",
    featured: true,
    author: "",
    slug: "09-06-2025",
  },
  {
    id: "20",
    title: "Majdi Radaideh named to ANS 40 Under 40 list",
    excerpt:
      "Radaideh was recognized by the American Nuclear Society as one of its 2025 honorees, highlighting his early-career contributions to nuclear science and engineering.",
    content: "To read full article, please visit the link below.",
    link: "https://ners.engin.umich.edu/2025/11/04/majdi-radaideh-named-to-ans-40-under-40-list/",
    date: "November 4, 2025",
    timestamp: 1762232400,
    imageUrl: "/news/11_04_2025-Majdi.jpg",
    category: "general",
    featured: true,
    author: "Sara Norman",
    slug: "11-04-2025",
  },
];

