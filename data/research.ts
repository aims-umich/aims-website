export type ResearchItem = {
  id: string
  type: "publication" | "project"
  title: string
  group: "reactors" | "controls" | "computing"
  imageUrl: string
  isRecent: boolean
  authors?: string[]
  journal?: string
  year?: number
  timestamp: number
  abstract?: string
  keywords?: string[]
  doi?: string
  pdfUrl?: string
  description?: string
  status?: "Ongoing" | "Completed"
  startYear?: number
  endYear?: number
  fundingSource?: string
  collaborators?: string[]
  websiteUrl?: string
}

export const researchItems: ResearchItem[] = [
  {
    id: "reactors-1",
    type: "publication",
    title:
      "Multi-objective combinatorial methodology for nuclear reactor site assessment: A case study for the United States",
    authors: [
      "Omer Erdem",
      "Kevin Daley",
      "Gabrielle Hoelzle",
      "Majdi I. Radaideh",
    ],
    journal: "Energy Conversion and Management: X",
    year: 2025,
    timestamp: 1751180400,
    abstract:
      "As clean energy demand grows to meet sustainability and net-zero goals, nuclear energy emerges as a reliable option. However, high capital costs remain a challenge for nuclear power plants (NPP), where repurposing coal power plant sites (CPP) with existing infrastructure is one way to reduce these costs. Additionally, Brownfield sites — previously developed or underutilized lands often impacted by industrial activity — present another compelling alternative. This study introduces a novel multi-objective optimization methodology, leveraging combinatorial search to evaluate over 30,000 potential NPP sites in the United States. Our approach addresses gaps in the current practice of assigning pre-determined weights to each site attribute that could lead to bias in the ranking. Each site is assigned a performance-based score, derived from a detailed combinatorial analysis of its site attributes. The methodology generates a comprehensive database comprising site locations (inputs), attributes (outputs), site score (outputs), and the contribution of each attribute to the site score. We then use this database to train a neural network model, enabling rapid predictions of nuclear siting suitability across any location in the United States. Our findings highlight that CPP sites are highly competitive for nuclear development, but some Brownfield sites are able to compete with them. Notably, four CPP sites in Ohio, North Carolina, and New Hampshire, and two Brownfield sites in Florida and California rank among the most promising locations. These results underscore the potential of integrating machine learning and optimization techniques to transform nuclear siting, paving the way for a cost-effective and sustainable energy future.",
    keywords: [
      "Multi-objective combinatorial methodology",
      "Nuclear power plant",
      "Neural network",
    ],
    doi: "https://doi.org/10.1016/j.ecmx.2025.100923",
    group: "reactors",
    imageUrl: "/research-directory/reactors/reactors-1.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S2590174525000558?via%3Dihub",
    isRecent: true,
  },
  {
    id: "reactors-2",
    type: "publication",
    title:
      "Multiphysics Modeling of Heat Pipe Microreactor with Critical Control Drum Position Search",
    authors: [
      "Dean Price",
      "Nathan Roskoff",
      "Majdi I. Radaideh",
      "Brendan Kochunas",
    ],
    journal: "Nuclear Science and Engineering",
    year: 2024,
    timestamp: 1730707200,
    abstract:
      "A multiphysics coupling methodology for heat pipe microreactors is presented in this work that includes a focus on a critical control drum position search routine and burnup capabilities. As the Serpent code is used for neutronics calculations, the recently developed GRsecant method for finding critical control drum positions is employed, which has explicit measures to manage the uncertainty introduced from the Monte Carlo calculation method. This work complements existing multiphysics modeling tools for heat pipe microreactors because it can be used to generate cross sections with fuel compositions determined by depletion with critical control drum positions. These methods are applied to a microreactor design motivated by the eVinciTM heat pipe microreactor. The convergence of the multiphysics coupling routine is analyzed at multiple burnup points. The multiphysics iterations with critical control drum search were observed to converge for all calculations performed in this work. Overall, the multiphysics coupling procedure enables the calculation of both thermal and neutronics characteristics with control drums in their critical positions for the core lifetime.",
    keywords: [
      "Multiphysics Modeling",
      "Heat Pipe Microreactor",
      "Critical Control Drum Position Search",
    ],
    doi: "https://doi.org/10.1080/00295639.2024.2409582",
    group: "reactors",
    imageUrl: "/research-directory/reactors/reactors-2.jpg",
    pdfUrl:
      "https://www.tandfonline.com/doi/full/10.1080/00295639.2024.2409582",
    isRecent: true,
  },
  {
    id: "reactors-3",
    type: "publication",
    title:
      "Thermal Modeling of an eVinci™-like heat pipe microreactor using OpenFOAM",
    authors: [
      "Dean Price",
      "Nathan Roskoff",
      "Majdi I. Radaideh",
      "Brendan Kochunas",
    ],
    journal: "Nuclear Engineering and Design",
    year: 2023,
    timestamp: 1698994800,
    abstract:
      "The simulation of heat pipe microreactors is an active area of research. In this paper, a thermal analysis of a heat pipe microreactor motivated by the eVinci™ design is performed. Thorough discussion on the modeling of heat pipes without a dedicated heat pipe modeling code, such as Sockeye, is also provided. The performance of two heat pipe modeling techniques is compared, one a more accurate approach which explicitly tracks heat pipe temperatures, and the other an approximation which simplifies the thermal hydraulic model development. One-way coupling is used where the Serpent neutronics code is used to generate a power distribution which is applied in an OpenFOAM model to calculate a temperature distribution. After a detailed convergence analysis, the core temperature distribution resulting from a core with control drums facing outward, or fully withdrawn, is compared with one having the control drums facing inward, or fully inserted. Finally, a parametric analysis was performed where the thermal resistances associated with the heat pipe model were varied and core temperatures were tracked. It was observed that the relationship between average and maximum core temperatures had a highly linear relationship to the thermal resistances used in the heat pipe model.",
    keywords: ["Thermal Modeling", "Heat Pipe Microreactor", "OpenFOAM"],
    doi: "https://doi.org/10.1016/j.nucengdes.2023.112709",
    group: "reactors",
    imageUrl: "/research-directory/reactors/reactors-3.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0029549323005587?via%3Dihub",
    isRecent: true,
  },
  {
    id: "reactors-4",
    type: "publication",
    title:
      "NEORL: NeuroEvolution Optimization with Reinforcement Learning—Applications to carbon-free energy systems",
    authors: [
      "Majdi I. Radaideh",
      "Katelin Du",
      "Paul Seurin",
      "Devin Seyler",
      "Xubo Gu",
      "Haijia Wang",
      "Koroush Shirvan",
    ],
    journal: "Nuclear Engineering and Design",
    year: 2023,
    timestamp: 1689318000,
    abstract:
      "We present an open-source Python framework for NeuroEvolution Optimization with Reinforcement Learning (NEORL) developed at the Massachusetts Institute of Technology. NEORL offers a global optimization interface of state-of-the-art algorithms in the field of evolutionary computation, neural networks through reinforcement learning, and hybrid neuroevolution algorithms. NEORL features diverse set of algorithms, user-friendly interface, parallel computing support, automatic hyperparameter tuning, detailed documentation, and demonstration of applications in mathematical and real-world engineering optimization. NEORL encompasses various optimization problems from combinatorial, continuous, mixed discrete/continuous, to high-dimensional, expensive, and constrained engineering optimization. In this paper, NEORL is tested in a variety of engineering applications relevant to low carbon energy research in addressing solutions to climate change. The examples include nuclear reactor control, nuclear fuel optimization, mechanical and structural design optimization, and fuel cell power production. The results demonstrate NEORL competitiveness against other algorithms and optimization frameworks in the literature, and a potential tool to solve large-scale optimization problems. More details about NEORL can be found here: https://neorl.readthedocs.io/en/latest/index.html.",
    keywords: [
      "NeuroEvolution Optimization",
      "Reinforcement Learning",
      "Carbon-free energy systems",
    ],
    doi: "https://doi.org/10.1016/j.nucengdes.2023.112423",
    group: "reactors",
    imageUrl: "/research-directory/reactors/reactors-4.png",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0029549323002728?via%3Dihub",
    isRecent: true,
  },
  {
    id: "reactors-5",
    type: "publication",
    title:
      "Multiobjective optimization of nuclear microreactor reactivity control system operation with swarm and evolutionary algorithms",
    authors: ["Dean Price", "Majdi I. Radaideh", "Brendan Kochunas"],
    journal: "Nuclear Engineering and Design",
    year: 2022,
    timestamp: 1651302000,
    abstract:
      "To improve the marketability of novel microreactor designs, there is a need for automated and optimal control of these reactors. This paper presents a methodology for performing multiobjective optimization of control drum operation for a microreactor under normal and off-nominal conditions. Two different case studies are used where the control drum configuration is optimized for the reactor to be critical with some desired power distribution that would satisfy peaking limits. A surrogate model for power distribution is developed based on a feedforward neural network. The process for determining weights for scalarization of the multiobjective optimization problem is also detailed. Six optimization algorithms: evolutionary strategies, differential evolution, grey wolf optimization, Harris hawks optimization, moth flame optimization and particle swarm optimization, are all applied to these cases and the results analyzed. Although all these algorithms will demonstrate optima-seeking behavior, for real-time control it is necessary to identify the best algorithm to efficiently provide reasonable optima without operator interference. The moth flame optimization algorithm was found to perform particularly well on both cases. Overall, it was found that the algorithms capable of supplying the best optima were also the most consistent. Finally, the found optima were verified with the original model used to train surrogates.",
    keywords: [
      "Multiobjective optimization",
      "Nuclear microreactor reactivity",
      "Swarm and evolutionary algorithms",
    ],
    doi: "https://doi.org/10.1016/j.nucengdes.2022.111776",
    group: "reactors",
    imageUrl: "/research-directory/reactors/reactors-5.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0029549322001303?via%3Dihub",
    isRecent: true,
  },
  {
    id: "reactors-6",
    type: "publication",
    title:
      "PESA: Prioritized experience replay for parallel hybrid evolutionary and swarm algorithms - Application to nuclear fuel",
    authors: ["Majdi I. Radaideh", "Koroush Shirvan"],
    journal: "Nuclear Engineering and Technology",
    year: 2022,
    timestamp: 1663830000,
    abstract:
      "We propose a new approach called PESA (Prioritized replay Evolutionary and Swarm Algorithms) combining prioritized replay of reinforcement learning with hybrid evolutionary algorithms. PESA hybridizes different evolutionary and swarm algorithms such as particle swarm optimization, evolution strategies, simulated annealing, and differential evolution, with a modular approach to account for other algorithms. PESA hybridizes three algorithms by storing their solutions in a shared replay memory, then applying prioritized replay to redistribute data between the integral algorithms in frequent form based on their fitness and priority values, which significantly enhances sample diversity and algorithm exploration. Additionally, greedy replay is used implicitly to improve PESA exploitation close to the end of evolution. PESA features in balancing exploration and exploitation during search and the parallel computing result in an agnostic excellent performance over a wide range of experiments and problems presented in this work. PESA also shows very good scalability with number of processors in solving an expensive problem of optimizing nuclear fuel in nuclear power plants. PESA's competitive performance and modularity over all experiments allow it to join the family of evolutionary algorithms as a new hybrid algorithm; unleashing the power of parallel computing for expensive optimization.",
    keywords: [
      "Nuclear fuel",
      "Particle swarm optimization",
      "Parallel computing",
    ],
    doi: "https://doi.org/10.1016/j.net.2022.05.001",
    group: "reactors",
    imageUrl: "/research-directory/reactors/reactors-6.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S1738573322002480?via%3Dihub",
    isRecent: false,
  },
  {
    id: "reactors-7",
    type: "publication",
    title: "Animorphic ensemble optimization: a large-scale island model",
    authors: ["Dean Price", "Majdi I. Radaideh"],
    journal: "Neural Computing and Applications",
    year: 2022,
    timestamp: 1666422000,
    abstract:
      "In this paper, a flexible large-scale ensemble-based optimization algorithm is presented for complex optimization problems. According to the no free lunch theorem, no single optimization algorithm demonstrates superior performance across all optimization problems. Therefore, with the animorphic ensemble optimization (AEO) algorithm presented here, a set of algorithms can be used as an ensemble which demonstrate stronger performance across a wider range of optimization problems than any standalone algorithm. AEO is a high-level ensemble designed to handle large ensembles using a well-defined stochastic migration process. The high-level nature of AEO allows for an arbitrary number of diverse standalone algorithms to interface with one another through an island model interface strategy, where various populations change size according to the performance of the algorithm associated with each population. In this study, AEO is demonstrated using ensembles of both evolutionary and swarm algorithms such as differential evolution, particle swarm, gray wolf optimization, moth-flame optimization, and more, and strong performance is observed. Quantitative diagnostics metrics to describe the migration of individuals across populations are also presented and observed with application to some test problems. In the end, AEO demonstrated strong consistent performance across more than 150 benchmark functions of 10–50 dimensions.",
    keywords: [
      "Animorphic ensemble optimization",
      "Swarm algorithms",
      "Quantitative diagnostics metrics",
    ],
    doi: "https://doi.org/10.1007/s00521-022-07878-y",
    group: "reactors",
    imageUrl: "/research-directory/reactors/reactors-7.png",
    pdfUrl: "https://link.springer.com/article/10.1007/s00521-022-07878-y",
    isRecent: false,
  },
  {
    id: "reactors-8",
    type: "publication",
    title:
      "Large-scale design optimisation of boiling water reactor bundles with neuroevolution",
    authors: ["Majdi I. Radaideh", "Benoit Forget", "Koroush Shirvan"],
    journal: "Annals of Nuclear Energy",
    year: 2021,
    timestamp: 1620889200,
    abstract:
      "We combine advances in deep reinforcement learning (RL) with evolutionary computation to perform large-scale optimisation of boiling water reactor (BWR) bundles using CASMO4/SIMULATE3 codes; capturing fine details, radial/axial fuel heterogeneity, and real-world constraints. RL constructs neural networks that learn how to assign fuel and poison enrichment by narrowing the search space into the areas where human/physics knowledge demonstrate merit. Evolution strategies diversify the search in these areas, through obtaining guidance from RL candidates. With very efficient/parallel implementation, our optimisation approach is able to solve a coupled multi-zone BWR bundle optimisation with 40 constraints. The methodology is applied to a GE14-10×10 bundle, showing the ability of neuroevolution to find 100 feasible designs. The optimal bundle has 7 axial zones with non-uniform enrichment radially and axially. The results of this work also demonstrate that our neuroevolution methodology is sufficiently generic to adapt to other assembly and reactor designs with minor adjustments.",
    keywords: [
      "Optimization",
      "Reinforcement learning",
      "Boiling water reactor",
    ],
    doi: "https://doi.org/10.1016/j.anucene.2021.108355",
    group: "reactors",
    imageUrl: "/research-directory/reactors/reactors-8.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0306454921002310?via%3Dihub",
    isRecent: false,
  },
  {
    id: "reactors-9",
    type: "publication",
    title:
      "Rule-based reinforcement learning methodology to inform evolutionary algorithms for constrained optimization of engineering applications",
    authors: ["Majdi I. Radaideh", "Koroush Shirvan"],
    journal: "Knowledge-Based Systems",
    year: 2021,
    timestamp: 1612944000,
    abstract:
      "For practical engineering optimization problems, the design space is typically narrow, given all the real-world constraints. Reinforcement Learning (RL) has commonly been guided by stochastic algorithms to tune hyperparameters and leverage exploration. Conversely in this work, we propose a rule-based RL methodology to guide evolutionary algorithms (EA) in constrained optimization. First, RL proximal policy optimization agents are trained to master matching some of the problem rules/constraints, then RL is used to inject experiences to guide various evolutionary/stochastic algorithms such as genetic algorithms, simulated annealing, particle swarm optimization, differential evolution, and natural evolution strategies. Accordingly, we develop RL-guided EAs, which are benchmarked against their standalone counterparts. RL-guided EA in continuous optimization demonstrates significant improvement over standalone EA for two engineering benchmarks. The main problem analyzed is nuclear fuel assembly combinatorial optimization with high-dimensional and computationally expensive physics. The results demonstrate the ability of RL to efficiently learn the rules that nuclear fuel engineers follow to realize candidate solutions. Without these rules, the design space is large for RL/EA to find many candidates. With imposing the rule-based RL methodology, we found that RL-guided EA outperforms standalone algorithms by a wide margin, with > 10 times improvement in exploration capabilities and computational efficiency. These insights imply that when facing a constrained problem with numerous local optima, RL can be useful in focusing the search space in the areas where expert knowledge has demonstrated merit, while evolutionary/stochastic algorithms utilize their exploratory features to improve the number of feasible solutions.",
    keywords: [
      "Reinforcement Learning",
      "Constrained optimization",
      "Evolutionary/stochastic algorithms",
    ],
    doi: "https://doi.org/10.1016/j.knosys.2021.106836",
    group: "reactors",
    imageUrl: "/research-directory/reactors/reactors-9.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S095070512100099X?via%3Dihub",
    isRecent: false,
  },
  {
    id: "reactors-10",
    type: "publication",
    title:
      "Physics-informed reinforcement learning optimization of nuclear assembly design",
    authors: [
      "Majdi I. Radaideh",
      "Isaac Wolverton",
      "Joshua Joseph",
      "James J. Tusar",
      "Uuganbayar Otgonbaatar",
      "Nicholas Roy",
      "Benoit Forget",
      "Koroush Shirvan",
    ],
    journal: "Nuclear Engineering and Design",
    year: 2021,
    timestamp: 1610870400,
    abstract:
      "Optimization of nuclear fuel assemblies if performed effectively, will lead to fuel efficiency improvement, cost reduction, and safety assurance. However, assembly optimization involves solving high-dimensional and computationally expensive combinatorial problems. As such, fuel designers’ expert judgement has commonly prevailed over the use of stochastic optimization (SO) algorithms such as genetic algorithms and simulated annealing. To improve the state-of-art, we explore a class of artificial intelligence (AI) algorithms, namely, reinforcement learning (RL) in this work. We propose a physics-informed AI optimization methodology by establishing a connection through reward shaping between RL and the tactics fuel designers follow in practice by moving fuel rods in the assembly to meet specific constraints and objectives. The methodology utilizes RL algorithms, deep Q learning and proximal policy optimization, and compares their performance to SO algorithms. The methodology is applied on two boiling water reactor assemblies of low-dimensional ( ~2 x 10⁶ combinations) and high-dimensional ( ~10³¹ combinations) natures. The results demonstrate that RL is more effective than SO in solving high dimensional problems, i.e., 10 × 10 assembly, through embedding expert knowledge in form of game rules and effectively exploring the search space. For a given computational resources and timeframe relevant to fuel designers, RL algorithms outperformed SO through finding more feasible patterns, 4–5 times more than SO, and through increasing search speed, as indicated by the RL outstanding computational efficiency. The results of this work clearly demonstrate RL effectiveness as another decision support tool for nuclear fuel assembly optimization.",
    keywords: [
      "Reinforcement Learning",
      "Nuclear assembly design",
      "Stochastic optimization",
    ],
    doi: "https://doi.org/10.1016/j.nucengdes.2020.110966",
    group: "reactors",
    imageUrl: "/research-directory/reactors/reactors-10.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S002954932030460X?via%3Dihub",
    isRecent: false,
  },
  {
    id: "reactors-11",
    type: "publication",
    title:
      "Multiphysics Modeling and Validation of Spent Fuel Isotopics Using Coupled Neutronics/Thermal-Hydraulics Simulations",
    authors: [
      "Dean Price",
      "Majdi I. Radaideh",
      "Travis Mui",
      "Mihir Katare",
      "Tomasz Kozlowski",
    ],
    journal: "Science and Technology of Nuclear Installations",
    year: 2020,
    timestamp: 1595746800,
    abstract:
      "Multiphysics coupling of neutronics/thermal-hydraulics models is essential for accurate modeling of nuclear reactor systems with physics feedback. In this work, SCALE/TRACE coupling is used for neutronic analysis and spent fuel validation of BWR assemblies, which have strong coolant feedback. 3D axial power profiles with coolant feedback are captured in these advanced simulations. The methodology is applied to two BWR assemblies (2F2DN23/SF98 and 2F2D1/F6), discharged from the Fukushima Daini-2 unit. Coupling is performed externally, where the SCALE/T5-DEPL module transfers axial power data in all axial nodes to TRACE, which in turn calculates the coolant density and temperature for each of these nodes. Within a burnup step, the data exchange process is repeated until convergence of all coupling parameters (axial power, coolant density, and coolant temperature) is observed. Analysis of axial power, criticality, and coolant properties at the assembly level is used to verify the coupling process. The 2F2D1/F6 benchmark seems to have insignificant void feedback compared to 2F2DN23/SF98 case, which experiences large power changes during operation. Spent fuel isotopic data are used to validate the coupling methodology, which demonstrated good results for uranium isotopes and satisfactory results for other actinides. This work has a major challenge of lack of documented data to build the coupled models (boundary conditions, control rod history, spatial location in the core, etc.), which encourages more advanced methods to approximate such missing data to achieve better modeling and simulation results.",
    keywords: [
      "Multiphysics Modeling",
      "Spent Fuel Isotopics",
      "Coupled Neutronics",
      "Thermal-Hydraulics Simulations",
    ],
    doi: "https://doi.org/10.1016/j.nucengdes.2020.110966",
    group: "reactors",
    imageUrl: "/research-directory/reactors/reactors-11.png",
    pdfUrl: "https://onlinelibrary.wiley.com/doi/10.1155/2020/2764634",
    isRecent: false,
  },
  {
    id: "computing-1",
    type: "publication",
    title:
      "Data efficiency assessment of generative adversarial networks in energy applications",
    authors: [
      "Umme Mahbuba Nabila",
      "Linyu Lin",
      "Xingang Zhao",
      "William L. Gurecky",
      "Pradeep Ramuhalli",
      "Majdi I. Radaideh",
    ],
    journal: "Energy and AI",
    year: 2025,
    timestamp: 1743404400,
    abstract:
      "This study investigates the data requirements of generative artificial intelligence (AI), particularly generative adversarial networks (GANs), for reliable data augmentation in energy applications. Generative AI, though seen as a solution to data limitations, requires substantial data to learn meaningful distributions—a challenge often overlooked. This study addresses the challenge through synthetic data generation for critical heat flux (CHF) and power grid demand, focusing on renewable and nuclear energy. Two variants of GAN employed are conditional GAN (cGAN) and Wasserstein GAN (wGAN). Our findings include the strong dependency of GAN on data size, with performance declining on smaller datasets and varying performance when generalizing to unseen experiments. Mass flux and heated length significantly influence CHF predictions. wGAN is more robust to feature exclusion, making it suitable for constrained synthetic data generation. In energy demand forecasting, wGAN performed well for solar, wind, and load predictions. Longer lookback hours and larger datasets improved predictions, especially for load power. Seasonal variations posed challenges, with wGAN achieving a relatively high error of Root Mean Squared Error (RMSE) of 0.32 for load power prediction, compared to RMSE of 0.07 under same-season conditions. Feature exclusions impacted cGAN the most, while wGAN showed greater robustness. This study concludes that, while generative AI is effective for data augmentation, it requires substantial data and careful training to generate realistic synthetic data and generalize to new experiments in engineering applications.",
    keywords: [
      "Generative adversarial networks",
      "Energy demand forecasting",
      "Synthetic data",
    ],
    doi: "https://doi.org/10.1016/j.egyai.2025.100501",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-1.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S2666546825000333?via%3Dihub",
    isRecent: true,
  },
  {
    id: "computing-2",
    type: "publication",
    title:
      "pyMAISE: A Python platform for automatic machine learning and accelerated development for nuclear power applications",
    authors: [
      "Patrick A. Myers",
      "Nataly Panczyk",
      "Shashank Chidige",
      "Connor Craig",
      "Jacob Cooper",
      "Veda Joynt",
      "Majdi I. Radaideh",
    ],
    journal: "Progress in Nuclear Energy",
    year: 2024,
    timestamp: 1735200000,
    abstract:
      "Despite significant advancements in artificial intelligence and machine learning (AI/ML) algorithms and their potential in nuclear engineering applications, the field still lacks a framework that automates ML model development and deployment for nuclear engineering problems. To address this, pyMAISE (Michigan Artificial Intelligence Standard Environment) is introduced, which is a Python package that features automated hyperparameter tuning, model explainability, model training, validation, postprocessing, and deployment for various ML models relevant to nuclear engineering. pyMAISE provides a platform for researchers to demonstrate new models on benchmarked datasets and currently supports nine benchmark problems across reactor physics and design, reactor control, thermal hydraulics, fuel performance, safety analysis, and anomaly detection. In this work, pyMAISE is demonstrated in three applications: critical heat flux prediction, microreactor power prediction, and fault detection in electronic signals. pyMAISE provided efficient model search and performance results that meet or exceed other studies. For critical heat flux prediction, feedforward neural networks (FNN) and random forests were the top models achieving R^2 = 0.999 when six input features were used. FNN was the best performer for predicting microreactor quadrant power R^2 = 0.97, 0.26 greater than the closest classical ML model. In fault detection, pyMAISE models achieved 81% test accuracy in detecting faulty signals using long short-term memory, which may prevent various accident scenarios that could cause facility downtime. As pyMAISE continues to develop through a multi-phase approach, the goal is to integrate uncertainty quantification and deployment tools to expedite the creation of explainable and licensable AI technologies for nuclear power plants.",
    keywords: [
      "Machine learning",
      "Nuclear power",
      "Feedforward neural networks",
    ],
    doi: "https://doi.org/10.1016/j.pnucene.2024.105568",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-2.png",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0149197024005183?via%3Dihub",
    isRecent: true,
  },
  {
    id: "computing-3",
    type: "publication",
    title:
      "A comparative analysis of text-to-image generative AI models in scientific contexts: a case study on nuclear power",
    authors: [
      "Veda Joynt",
      "Jacob Cooper",
      "Naman Bhargava",
      "Katie Vu",
      "O. Hwang Kwon",
      "Todd R. Allen",
      "Aditi Verma",
      "Majdi I. Radaideh",
    ],
    journal: "Scientific Reports",
    year: 2024,
    timestamp: 1733385600,
    abstract:
      "In this work, we propose and assess the potential of generative artificial intelligence (AI) as a tool for facilitating public engagement around potential clean energy sources. Such an application could increase energy literacy—an awareness of low-carbon energy sources among the public therefore leading to increased participation in decision-making about the future of energy systems. We explore the use of generative AI to communicate technical information about low-carbon energy sources to the general public, specifically in the realm of nuclear energy. We explored 20 AI-powered text-to-image generators and compared their individual performances on general and scientific nuclear-related prompts. Of these models, DALL-E, DreamStudio, and Craiyon demonstrated promising performance in generating relevant images from general-level text related to nuclear topics. However, these models fall short in three crucial ways: (1) they fail to accurately represent technical details of energy systems; (2) they reproduce existing biases surrounding gender and work in the energy sector; and (3) they fail to accurately represent indigenous landscapes—which have historically been sites of resource extraction and waste deposition for energy industries. This work is performed to motivate the development of specialized generative tools to improve energy literacy and effectively engage the public with low-carbon energy sources.",
    keywords: ["Generative AI", "Nuclear power", "Text-to-image"],
    doi: "https://doi.org/10.1038/s41598-024-79705-4",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-3.webp",
    pdfUrl: "https://www.nature.com/articles/s41598-024-79705-4",
    isRecent: true,
  },
  {
    id: "computing-4",
    type: "publication",
    title:
      "Sentiment analysis of the United States public support of nuclear power on social media using large language models",
    authors: [
      "O. Hwang Kwon",
      "Katie Vu",
      "Naman Bhargava",
      "Mohammed I. Radaideh",
      "Jacob Cooper",
      "Veda Joynt",
      "Majdi I. Radaideh",
    ],
    journal: "Renewable and Sustainable Energy Reviews",
    year: 2024,
    timestamp: 1717225200,
    abstract:
      "This study utilized large language models (LLMs) to analyze public sentiment in the United States (US) regarding nuclear power on social media, focusing on X/Twitter, considering climate change challenges and advancements in nuclear power technology. Approximately, 1.26 million nuclear tweets from 2008–2023 were examined to fine-tune LLMs for sentiment classification. We found the crucial role of accurate data labeling for model performance, with potential implications for a 15% improvement, achieved through high-confidence labels. LLMs demonstrated better performance compared to traditional machine learning classifiers, with reduced susceptibility to overfitting and up to 96% classification accuracy. LLMs are used to segment the US public tweets into policy and energy-related categories, revealing that 68% are politically themed. Policy tweets tended to convey negative sentiment, often reflecting opposing political perspectives and focusing on nuclear deals and international relations. Energy-related tweets covered diverse topics with predominantly neutral to positive sentiment, indicating broad support for nuclear power in 48 out of 50 US states. The US public positive sentiments toward nuclear power stemmed from its high power density, reliability regardless of weather conditions, environmental benefits, application versatility, and recent innovations and advancements in both fission and fusion technologies. Negative sentiments primarily focused on waste management, high capital costs, and safety concerns. The neutral campaign highlighted global nuclear facts and advancements, with varying tones leaning towards positivity or negativity. An interesting neutral theme was the advocacy for the combined use of renewable and nuclear energy to attain net-zero goals.",
    keywords: ["Large language models", "Sentiment Analysis", "Nuclear power"],
    doi: "https://doi.org/10.1016/j.rser.2024.114570",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-4.png",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S136403212400296X?via%3Dihub",
    isRecent: true,
  },
  {
    id: "computing-5",
    type: "publication",
    title:
      "Model calibration of the liquid mercury spallation target using evolutionary neural networks and sparse polynomial expansions",
    authors: [
      "Majdi I. Radaideh",
      "Hoang Tran",
      "Lianshan Lin",
      "Hao Jiang",
      "Drew Winder",
      "Sarma Gorti",
      "Guannan Zhang",
      "Justin Mach",
      "Sarah Cousineau",
    ],
    journal:
      "Nuclear Instruments and Methods in Physics Research Section B: Beam Interactions with Materials and Atoms",
    year: 2022,
    timestamp: 1655449200,
    abstract:
      "The mercury constitutive model predicting the strain and stress in the target vessel plays a central role in improving the lifetime prediction and future target designs of the mercury targets at the Spallation Neutron Source. We leverage the experiment strain data collected over multiple years to improve the mercury constitutive model through a combination of large scale simulations of the target behavior and the use of machine learning tools for parameter estimation. We present two interdisciplinary approaches for surrogate-based model calibration of expensive simulations using evolutionary neural networks and sparse polynomial expansions. The newly calibrated simulations achieve 7% average improvement on the prediction accuracy and 8% reduction in mean absolute error compared to previously reported reference parameters, with some individual sensors experiencing up to 30% improvement. The calibrated simulations can aid in fatigue analysis to estimate the mercury target lifetime, which reduces abrupt failure and saves tremendous amount of costs.",
    keywords: [
      "Model calibration",
      "Liquid mercury spallation target",
      "Evolutionary neural networks",
    ],
    doi: "https://doi.org/10.1016/j.nimb.2022.06.001",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-5.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0168583X2200146X?via%3Dihub",
    isRecent: true,
  },
  {
    id: "computing-6",
    type: "publication",
    title:
      "Bayesian inverse uncertainty quantification of the physical model parameters for the spallation neutron source first target station",
    authors: [
      "Majdi I. Radaideh",
      "Lianshan Lin",
      "Hao Jiang",
      "Sarah Cousineau",
    ],
    journal: "Results in Physics",
    year: 2022,
    timestamp: 1648018800,
    abstract:
      "The reliability of the mercury spallation target is mission-critical for the neutron science program of the spallation neutron source at the Oak Ridge National Laboratory. We present an inverse uncertainty quantification (UQ) study using the Bayesian framework for the mercury equation of state model parameters, with the assistance of polynomial chaos expansion surrogate models. By leveraging high-fidelity structural mechanics simulations and real measured strain data, the inverse UQ results reveal a tight posterior distribution for the tensile cutoff threshold, the mercury density, and the mercury speed of sound. The updated distributions do not necessarily represent the nominal mercury physical properties, but the ones that fit the strain data and the solid mechanics model we have used, and can be explained by three reasons. First, the limitations of the computer model or what is known as the “model-form uncertainty” that would result from numerical methods and physical approximations. Second, is the biases and errors in the experimental data. Third, is the mercury cavitation damage that also contributes to the change in mercury behavior. Consequently, the mercury equation of state model parameters try to compensate for these effects to improve fitness to the real data. The mercury target simulations using the posterior parametric values result in an excellent agreement with 88% average accuracy compared to experimental data, 6% average increase compared to reference parameters, with some sensors experiencing an increase of more than 25%. With a more accurate strain response predicted by the calibrated simulations, the component fatigue analysis can utilize the comprehensive strain history data to evaluate the target vessel’s lifetime closer to its real limit, saving tremendous target cost and improving the design of future targets as well.",
    keywords: [
      "Bayesian inverse uncertainty",
      "Accelerator physics",
      "Spallation",
    ],
    doi: "https://doi.org/10.1016/j.rinp.2022.105414",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-6.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S2211379722001759?via%3Dihub",
    isRecent: false,
  },
  {
    id: "computing-7",
    type: "publication",
    title:
      "Surrogate modeling of advanced computer simulations using deep Gaussian processes",
    authors: ["Majdi I. Radaideh", "Tomasz Kozlowski"],
    journal: "Reliability Engineering & System Safety",
    year: 2019,
    timestamp: 1573200000,
    abstract:
      "The continuous advancements in computer power and computational modeling through high-fidelity and multiphysics simulations add more challenges on assessing their predictive capability. In this work, metamodeling or surrogate modeling through deep Gaussian processes (DeepGP) is performed to construct surrogates of advanced computer simulations drawn from the nuclear engineering area. This work is centered around three major ideas: (1) surrogate modeling through deep Gaussian processes (DeepGP), (2) simulation assessment through surrogate-based uncertainty quantification (UQ) methodologies, and (3) drawing conclusions regarding the underlying uncertainty of the four simulations considered in this paper. First, DeepGP models are trained, optimized, and validated to yield variety of features: (1) achieving high accuracy (small error metrics) on the validation set, (2) automatically capturing the surrogate model uncertainty (i.e. interpolation errors), (3) fitting multiple outputs with different scales simultaneously, (4) handling high dimensional input spaces, and (5) learning from small data amounts. Second, the validated DeepGP surrogates are utilized to efficiently perform UQ tasks such as uncertainty propagation (through Monte Carlo sampling), parameter screening (through Morris screening), and variance decomposition (through Sobol Indices) to investigate the selected simulations. Third, the thermal-hydraulics (fluid flow) results demonstrate the importance of inlet temperature uncertainty in void fraction predictions. For the reactor physics application (fuel depletion/consumption), DeepGP accurately captures the uncertainty in criticality calculations, which is about 0.6% (i.e. a considerable value for this application). For the application of kinetic parameters (nuclear data), DeepGP successfully explains 95% or more of the variance in all 12 outputs. Finally, DeepGP-based UQ analysis of the fuel performance application (materials science) shows the importance of the clad surface temperature, fuel porosity, and linear heat rate in explaining the variance of the maximum fuel centerline and surface temperatures.",
    keywords: ["Surrogate modeling", "Simulation", "Gaussian processes"],
    doi: "https://doi.org/10.1016/j.ress.2019.106731",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-7.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0951832019301711?via%3Dihub",
    isRecent: false,
  },
  {
    id: "computing-8",
    type: "publication",
    title:
      "Integrated framework for model assessment and advanced uncertainty quantification of nuclear computer codes under Bayesian statistics",
    authors: ["Majdi I. Radaideh", "Katarzyna Borowiec", "Tomasz Kozlowski"],
    journal: "Reliability Engineering & System Safety",
    year: 2019,
    timestamp: 1557817200,
    abstract:
      "A framework for model evaluation and uncertainty quantification (UQ) is presented with applications oriented to nuclear engineering simulation codes. Our framework is inspired by the previous research on Bayesian statistics and model averaging. The methodology is demonstrated by performing UQ of three thermal-hydraulic computer codes used for two-phase flow simulation inside nuclear reactors, and conclusions regarding their performance are drawn. The complexity of the framework implementation depends upon the information to be drawn about the models as well as the nature of the models and the data. Uncertainties inherent in the input parameters and experimental data, along with predictive and model-form uncertainty can be quantified in this methodology. A composite (average) model based on the competent models can be created for improved response prediction. Two benchmarks featuring steady-state void fraction data in full-scale light water reactor (LWR) channels are used to demonstrate the methodology. The results show that the three models/codes demonstrate variable competitiveness in reproducing the data (i.e. goodness of fit with the data). There is no consistent trend at which each code excels. The predictive uncertainty (representing individual model deficiency or discrepancy) dominates the model-form uncertainty for many cases in this study due to two reasons: (1) presence of a single competent model for a specific response and (2) poor agreement with experimental data for certain responses at which nuclear codes struggle, such as low pressure and subcooled boiling conditions. In general, improvements in composite predictions (based on posterior model weights) are observed for BFBT data, while slight improvement is found for PSBT. For PSBT, the predictive uncertainty of RELAP5 and TRACE dominates the response uncertainty causing weak improvement. Additional efforts are needed to improve the closure models of these codes in future to reduce the model discrepancy contribution. This framework can be utilized for this purpose at which various closure models for the same code can be assessed in terms of their effect on the final response uncertainty. The proposed framework is flexible and extendable to other types of physics, models, and data. Developing the underlying methodology of calculating the model weights is the main focus in the subsequent studies.",
    keywords: [
      "Integrated framework",
      "Nuclear computer codes",
      "Bayesian statistics",
    ],
    doi: "https://doi.org/10.1016/j.ress.2019.04.020",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-8.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0951832018313772?via%3Dihub",
    isRecent: false,
  },
  {
    id: "computing-9",
    type: "publication",
    title:
      "Design optimization under uncertainty of hybrid fuel cell energy systems for power generation and cooling purposes",
    authors: ["Majdi I. Radaideh", "Mohammed I. Radaideh", "Tomasz Kozlowski"],
    journal: "International Journal of Hydrogen Energy",
    year: 2020,
    timestamp: 1577952000,
    abstract:
      "Reliance on point estimates when developing hybrid energy systems can over/underestimate system performance. Analyzing the sensitivity and uncertainty of large-scale hybrid systems can be a challenging task due to the large number of design parameters to be explored. In this work, a comprehensive and efficient sensitivity/uncertainty methodology is applied on two fuel cell hybrid systems to help analysts to investigate hybrid systems more efficiently. This methodology also includes a step-by-step approach to perform design optimization under uncertainty of energy systems. The two hybrid systems are: molten carbonate fuel cell with thermoelectric generator (MCFC-TEG) and phosphoric acid fuel cell with refrigerator (PAFC-REF). Various sensitivity and uncertainty methods are utilized to analyze the design parameters and their effect on the performance of these two systems. These methods perform local and regression-based sensitivity analysis, Monte Carlo uncertainty propagation, parameter screening, and variance decomposition. Detailed approach is adopted to identify and rank the influential design parameters for each system. Results demonstrate that the optimum power output of the MCFC-TEG has 10% uncertainty, driven mainly by the operating temperature, cahtode activation energy, TEG figure of merit, and TEG thermal conductivity. However, PAFC-REF is more reliable with larger power output and 1.4% uncertainty, driven by the charge transfer coefficient, heat transfer in the refrigeration cycle, cold reservoir temperature, and operating temperature. Based on this identification, design optimization under uncertainty is performed using these sensitive parameters to improve the system performance through increasing the power output and reducing its uncertainty.",
    keywords: [
      "Design optimization",
      "Hybrid fuel cell energy systems",
      "Monte Carlo",
    ],
    doi: "https://doi.org/10.1016/j.ijhydene.2019.11.046",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-9.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0360319919342272?via%3Dihub",
    isRecent: false,
  },
  {
    id: "computing-10",
    type: "publication",
    title:
      "Efficient analysis of parametric sensitivity and uncertainty of fuel cell models with application to SOFC",
    authors: ["Majdi I. Radaideh", "Mohammed I. Radaideh", "Tomasz Kozlowski"],
    journal: "International Journal of Energy Research",
    year: 2020,
    timestamp: 1579075200,
    abstract:
      "Sensitivity analysis (SA) and uncertainty quantification (UQ) are used to assess and improve engineering models. SA of fuel cell models can be challenging because of the large number of design parameters to optimize. Following the regular approach of manually testing the fuel cell outputs under changing each design parameter one at a time can be tedious. In this work, a framework of SA and UQ methods is applied with a purpose of efficiently analysing fuel cell models. The SA and UQ methods are also compared to increase the confidence in the results. In this methodology, all design parameters and their effects can be analysed in an integrated form, where model variance, sensitivity, linearity/nonlinearity, parameter interactions, and importance ranking can be assessed. This paper highlights and compares between local SA (one-at-a-time linear perturbation), parameter screening (Morris screening), variance decomposition (Sobol indices), and regression-based SA. For UQ, stochastic methods (Monte Carlo sampling) and deterministic methods (using SA profiles) are used. All methods are applied to solid oxide fuel cell (SOFC) to analyse the power output and system efficiency under 21 uncertain design parameters. Using different methods, the uncertainty in the SOFC responses (maximum power and efficiency) is about 11%, when the current density is about 13 200 A m−2. In addition, analysis shows that operating temperature (T), length of grain contact (X), grain size (Ds), porosity (ϵ), and electrolyte thickness (Le) contribute to more than 97% of the SOFC's maximum power variance, with individual contributions as follows: 63.3%, 13.1%, 12.5%, 5.4%, and 3.6%, respectively. The previous conclusions are subjective to the simplified SOFC model used in this study to demonstrate the methods. Benchmarking the UQ methods in capturing the response uncertainty and the SA methods in raking the design parameters demonstrate very good agreement between them. The methods applied in this paper can be used to achieve a comprehensive mathematical understanding of more advanced fuel cell or energy models, which can lead to better performance.",
    keywords: [
      "Parametric sensitivity",
      "Solid oxide fuel cell",
      "Sobol indices",
    ],
    doi: "https://doi.org/10.1002/er.4837",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-10.jpg",
    pdfUrl: "https://onlinelibrary.wiley.com/doi/10.1002/er.4837",
    isRecent: false,
  },
  {
    id: "computing-11",
    type: "publication",
    title:
      "Shapley effect application for variance-based sensitivity analysis of the few-group cross-sections",
    authors: [
      "Majdi I. Radaideh",
      "Stuti Surani",
      "Daniel O’Grady",
      "Tomasz Kozlowski",
    ],
    journal: "Annals of Nuclear Energy",
    year: 2019,
    timestamp: 1549958400,
    abstract:
      "Analyzing the variance of complex computer models is an essential practice to assess and improve that model by identifying the influential parameters that cause the output variance. Variance-based sensitivity analysis is the process of decomposing the output variance into components associated with each input parameter. In this study, we applied a new concept of variance-based sensitivity analysis inspired by the game theory proposed by Shapley. The technique is called the Shapley effect, and it investigates the contribution of each input parameter as well as its interactions with every other parameter in the system by exploring all possible permutations between them. The Shapley effect is compared to the common Sobol indices technique (first order and total effects) to investigate their performance under correlated and uncorrelated parameters. The Shapley effect demonstrated superior performance when compared to the Sobol indices for correlated input parameters. Shapley effect captured the correlation between the input parameters, expressing the variance contribution in a single index instead of two indices, and normalization of the fractional indices is preserved without over or underestimation. On the other hand, the two algorithms we selected to calculate Sobol indices under correlated inputs experienced different issues including: over/underestimating the output variance, first order effect could be larger than the total effect, possibility of negative indices, unnormalized fractional indices, and difficulty to interpret the results. However, Sobol showed satisfactory performance when the inputs are uncorrelated as the numerical values and input ranking were in good agreement with Shapley effect. The main disadvantage of Shapley effect is its large computational cost especially for high dimensional problems where the number of possible input subsets becomes very large. The results of our tests showed that the thermal fission cross-section carried most of the uncertainty at BOL, and its contribution declines after fuel burnup, which is replaced by the uncertainty contribution of the fast cross-section parameters.",
    keywords: ["Game theory", "Shapley effect", "Lattice depletion"],
    doi: "https://doi.org/10.1016/j.anucene.2019.02.002",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-11.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0306454919300714?via%3Dihub",
    isRecent: false,
  },
  {
    id: "computing-12",
    type: "publication",
    title:
      "Fairness and social bias quantification in Large Language Models for sentiment analysis",
    authors: ["Mohammed I. Radaideh", "O. Hwang Kwon", "Majdi I. Radaideh"],
    journal: "Knowledge-Based Systems",
    year: 2025,
    timestamp: 1746514800,
    abstract:
      "Large Language Models (LLMs) have enhanced various Natural Language Processing (NLP) tasks, including text generation and classification. However, studies reveal that LLMs exhibit social biases, such as associating certain occupations with specific genders. While previous research has focused on bias in text generation, limited attention has been given to text classification, such as sentiment analysis. This study quantifies social bias in sentiment analysis using five open-source LLMs: BERT, GPT-2, LLaMA-2, Falcon, and MistralAI, fine-tuned on two large social media datasets, the first one is related to nuclear energy, while the second dataset is general and contains tweets related to various subjects. We conducted approximately 1,500 prompt experiments with variations in words reflecting energy source, gender, politics, age, and ethnicity. A fair language model should provide the same sentiment for both prompts; differing sentiments would indicate bias. Explainable methods were employed to analyze how words related to the five subjects (energy, gender, politics, age, ethnicity) contributed to the sentiment. Findings show that social bias persists in LLMs for sentiment analysis, and while fine-tuning can enhance fairness, it does not always eliminate bias, particularly regarding age groups.",
    keywords: [
      "Large Language Models (LLM)",
      "Natural Language Processing (NLP)",
      "Sentiment Analysis",
    ],
    doi: "https://doi.org/10.1016/j.knosys.2025.113569",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-12.png",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S095070512500615X",
    isRecent: true,
  },
  {
    id: "computing-13",
    type: "publication",
    title:
      "Efficient sampling of polycyclic aromatic compounds for free energy predictions through active learning",
    authors: [
      "Mohammed I. Radaideh",
      "Matt Raymond",
      "Paolo Elvati",
      "Jacob C. Saldinger",
      "Majdi I. Radaideh",
      "Angela Violi",
    ],
    journal: "Energy and AI",
    year: 2025,
    timestamp: 1750230000,
    abstract:
      "The physical growth of Polycyclic Aromatic Compounds (PACs) to soot particles plays a significant role in understanding the chemistry of soot formation. Insights into the process can be gained from PACs’ free energy of dimerization landscape. However, because the infeasibly large space of possible PAC dimers cannot be exhaustively simulated, researchers must train machine learning models on a subset of data to impute the rest. To this end, we propose and assess an active learning approach to discovering the optimal PACs for training a machine learning model to predict PACs’ association and dissociation free energies. The comparison between active learning and random sampling showed that active learning has faster loss convergence, requiring fewer training samples to reach the same level of accuracy. The trained model accurately modeled unseen PACs and exhibited robustness against changes in the sampling space used to train the model. More broadly, this work shows how active learning can optimize the design and improve the understanding of more expensive models in specific domains.",
    keywords: [
      "Polycyclic Aromatic Compounds (PACs)",
      "Free energy predictions",
      "Active learning",
    ],
    doi: "https://doi.org/10.1016/j.egyai.2025.100528",
    group: "computing",
    imageUrl: "/research-directory/computing/computing-13.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S2666546825000606?via%3Dihub",
    isRecent: true,
  },
  {
    id: "computing-14",
    type: "publication",
    title:
      "Opening the AI black-box: Symbolic regression with Kolmogorov–Arnold Networks for advanced energy applications",
    authors: ["Nataly R. Panczyk", "Omer F. Erdem", "Majdi I. Radaideh"],
    journal: "Energy and AI",
    year: 2025,
    timestamp: 1757649600,
    doi: "https://doi.org/10.1016/j.egyai.2025.100595",
    group: "computing",
    abstract:
      "While most modern machine learning methods offer speed and accuracy, few promise interpretability or explainability—two key features necessary for highly sensitive industries, like medicine, finance, and engineering. Using eight datasets representative of one especially sensitive industry, nuclear power, this work compares a traditional feedforward neural network (FNN) to a Kolmogorov–Arnold Network (KAN). We consider not only model performance and accuracy, but also interpretability through model architecture and explainability through a post-hoc SHapley Additive exPlanations (SHAP) analysis, a game-theory-based feature importance method. In terms of accuracy, we find KANs and FNNs comparable across all datasets when output dimensionality is limited. KANs, which transform into symbolic equations after training, yield perfectly interpretable models, while FNNs remain black-boxes. Finally, using the post-hoc explainability results from Kernel SHAP, we find that KANs learn real, physical relations from experimental data, while FNNs simply produce statistically accurate results. Overall, this analysis finds KANs a promising alternative to traditional machine learning methods, particularly in applications requiring both accuracy and comprehensibility.",
    imageUrl: "/research-directory/computing/computing-14.png",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S2666546825001272?via%3Dihub",
    isRecent: true,
  },
  {
    id: "computing-15",
    type: "publication",
    title:
      "A Bayesian ensemble approach for improved sustainable aviation fuel modeling",
    authors: ["Mohammed I. Radaideh", "Majdi I. Radaideh", "Angela Violi"],
    journal: "Energy Conversion and Management: X",
    year: 2025,
    timestamp: 1759550400,
    doi: "https://doi.org/10.1016/j.nucengdes.2025.114510",
    group: "computing",
    abstract:
      "In this work, we introduce a new methodology to combine the available methods to predict the properties of complex hydrocarbon mixtures such as aviation fuels. Due to the complexity of aviation fuels, the available methods perform well individually on some of the experimental observations and vice versa on others when a surrogate aviation fuel is defined and used. To this end, we introduce a new ensemble model based on the existing methods that combine and weigh their predictions. We employ the probabilistic Bayesian approach to predict aviation fuel properties with confidence levels. This is necessary because the available experimental data for aviation fuels is generally limited, which leads to overfitting. We adopt both “interpretable” Bayesian regression and a more “black-box” approach to Bayesian neural networks. An ensemble of predictive methods provided better predictions than the individual methods with robust confidence levels for three properties considered: mass density, kinematic viscosity, and flash point. A significant reduction in the mean absolute percentage error was obtained for mass density predictions, from 1.25% to 0.57% and 0.42%, using the Bayesian linear regression (BLR) and Bayesian Neural Network (BNN), respectively. The error in kinematic viscosity predictions was reduced from 17.25% to 9.02% and 6.79% using BLR and BNN, respectively. The error in flash point predictions is reduced from 9.04% to 5.83% by BLR and to 5.51% by BNN. The importance of the methods in the ensemble did not fully follow their individual performance, where the accurate models may not be the most important. The ensemble approach allows for the inclusion of new methods, even if they are slightly less accurate. This methodology can be extended to predict other aviation fuel properties and incorporate any predictive model. It also offers a way to generate valid training data for generative Artificial Intelligence (AI) models, helping to address the scarcity of aviation fuel data.",
    imageUrl: "/research-directory/computing/computing-15.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S2666546825001272?via%3Dihub",
    isRecent: true,
  },
  {
    id: "controls-1",
    type: "publication",
    title:
      "A load following reactivity control system for nuclear microreactors",
    authors: [
      "Kamal K. Abdulraheem",
      "Sooyoung Choi",
      "Qicang Shen",
      "Brendan Kochunas",
      "Majdi I. Radaideh",
    ],
    journal: "Progress in Nuclear Energy",
    year: 2025,
    timestamp: 1740988800,
    abstract:
      "Microreactors are scaled-down versions of small modular nuclear reactors designed to simplify the deployment and reduce the cost of nuclear energy. One of the key requirements for achieving these goals is the development of reliable load-following control systems. In this study, we designed and analyzed three load-following control systems for a microreactor design. The microreactor core is modeled using a nonlinear point kinetics model coupled with thermal-hydraulic, fission product poison, and reactivity models. The first control method implemented was a nonlinear second-order super-twisting sliding mode control system (STC), enhanced with a moving average filter to mitigate chattering—a high-frequency phenomenon that can damage actuators. The second approach utilized a nonlinear model predictive control (NMPC) scheme with an extended Kalman filter for improved state estimation. The final design was a PID controller, optimized with anti-windup compensation for the integral term and a filter for the derivative component to handle noise. We evaluated these control systems through simulation experiments, focusing on their stability, tracking performance, and control effort. The results show that all three control systems achieved the desired load-following capability. While the PID controller required the least control effort, error analysis metrics such as integral absolute error (IAE) and integral time absolute error (ITAE) revealed that its performance deteriorates over time due to its linear nature. In contrast, the second-order sliding mode controller (STC) and NMPC demonstrated superior error handling and robustness than PID concerning accuracy and stability. Nonetheless, unlike the nonlinear model predictive controller, the second-order sliding mode control system still suffers from chattering.",
    keywords: [
      "Microreactor",
      "Sliding mode control system",
      "Nonlinear model predictive control",
    ],
    doi: "https://doi.org/10.1016/j.pnucene.2025.105676",
    group: "controls",
    imageUrl: "/research-directory/controls/controls-1.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0149197025000745?via%3Dihub",
    isRecent: true,
  },
  {
    id: "controls-2",
    type: "publication",
    title:
      "Multistep Criticality Search and Power Shaping in Nuclear Microreactors with Deep Reinforcement Learning",
    authors: [
      "Majdi I. Radaideh",
      "Leo Tunkle",
      "Dean Price",
      "Kamal Abdulraheem",
      "Linyu Lin",
      "Moutaz Elias",
    ],
    journal: "Nuclear Science and Engineering",
    year: 2025,
    timestamp: 1739347200,
    abstract:
      "Reducing operation and maintenance costs is a key objective for advanced reactors in general and microreactors in particular. To achieve this reduction, developing robust autonomous control algorithms is essential to ensure safe and autonomous reactor operation. Recently, artificial intelligence and machine learning algorithms, specifically reinforcement learning (RL) algorithms, have seen rapid increased application to control problems, such as plasma control in fusion tokamaks and building energy management. In this work, we introduce the use of RL for intelligent control in nuclear microreactors. The RL agent is trained using Proximal Policy Optimization (PPO) and Advantage Actor-Critic (A2C), cutting-edge deep RL techniques, based on a high-fidelity simulation of a microreactor design inspired by the Westinghouse eVinciTM design. We utilized a Serpent model to generate data on drum positions, core criticality, and core power distribution for training a feedforward neural network surrogate model. This surrogate model was then used to guide a PPO and A2C control policies in determining the optimal drum position across various reactor burnup states, ensuring critical core conditions and symmetrical power distribution across all six core portions. The results demonstrate the excellent performance of PPO in identifying optimal drum positions, achieving a hexant power tilt ratio of approximately 1.002 (within the limit of <1.02), and maintaining criticality within a 10 pcm range. A2C did not provide as competitive of a performance as PPO in terms of performance metrics for all burnup steps considered in the cycle. Additionally, the results highlight the capability of well-trained RL control policies to quickly identify control actions, suggesting a promising approach for enabling real-time autonomous control through digital twins.",
    keywords: [
      "Multistep Criticality Search",
      "Power Shaping",
      "Reinforcement Learning",
    ],
    doi: "https://doi.org/10.1080/00295639.2024.2447012",
    group: "controls",
    imageUrl: "/research-directory/controls/controls-2.jpg",
    pdfUrl:
      "https://www.tandfonline.com/doi/full/10.1080/00295639.2024.2447012",
    isRecent: true,
  },
  {
    id: "controls-3",
    type: "publication",
    title:
      "Simplified matching pursuits applied to 3D nuclear reactor temperature distribution construction",
    authors: ["Dean Price", "Majdi I. Radaideh", "Brendan Kochunas"],
    journal: "Applied Mathematical Modelling",
    year: 2024,
    timestamp: 1712905200,
    abstract:
      "Autonomous control systems can enhance the economic viability of complex systems such as nuclear microreactors. Advanced forms of these control systems benefit from techniques for high-resolution field data reconstruction from sensor data. Basis projection methods present a useful set of methodologies for nonparametric reconstruction of these field data. In this work, high fidelity multiphysics simulations are used to generate microreactor temperature distributions that are then used to evaluate the viability of a basis projection method which employs a generalized set of basis functions, or dictionaries. Additionally, metrics for evaluating the accuracy of the temperature distribution are presented that are motivated both from the fields of traditional signal processing and statistics. The performance of a method based on matching pursuits is compared to a method that uses the sequential ordering of basis functions. The matching pursuits-based method gives improved performance for highly sparse representations of temperature distributions. Additionally, accuracy is analyzed for multiple temperature distributions which represent different potential reactor operation configurations. Overall, the results from this work should be considered as an upper bound on the performance of basis projection methods which employ generalized basis functions for real time reactor control.",
    keywords: [
      "Nuclear reactor temperature distribution",
      "Matching pursuits-based method",
      "Nuclear microreactor economic viability",
    ],
    doi: "https://doi.org/10.1016/j.apm.2024.04.011",
    group: "controls",
    imageUrl: "/research-directory/controls/controls-3.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0307904X24001616?via%3Dihub#se0020",
    isRecent: true,
  },
  {
    id: "controls-4",
    type: "publication",
    title:
      "Early Fault Detection in Particle Accelerator Power Electronics Using Ensemble Learning",
    authors: [
      "Majdi I. Radaideh",
      "Chris Pappas",
      "Mark Wezensky",
      "Pradeep Ramuhalli",
      "Sarah Cousineau",
    ],
    journal: "International Journal of Prognostics and Health Management",
    year: 2023,
    timestamp: 1686466800,
    abstract:
      "Early fault detection and fault prognosis are crucial to ensure efficient and safe operations of complex engineering systems such as the Spallation Neutron Source (SNS) and its power electronics (high voltage converter modulators). Following an advanced experimental facility setup that mimics SNS operating conditions, the authors successfully conducted 21 early fault detection experiments, where fault precursors are introduced in the system to a degree enough to cause degradation in the waveform signals, but not enough to reach a real fault. Nine different machine learning techniques based on ensemble trees, convolutional neural networks, support vector machines, and hierarchical voting ensembles are proposed to detect the fault precursors. Although all 9 models have shown a perfect and identical performance during the training and testing phase, the performance of most models has decreased in the next test phase once they got exposed to realworld data from the 21 experiments. The hierarchical voting ensemble, which features multiple layers of diverse models, maintains a distinguished performance in early detection of the fault precursors with 95% success rate (20/21 tests), followed by adaboost and extremely randomized trees with 52% and 48% success rates, respectively. The support vector machine models were the worst with only 24% success rate (5/21 tests). The study concluded that a successful implementation of machine learning in the SNS or particle accelerator power systems would require a major upgrade in the controller and the data acquisition system to facilitate streaming and handling big data for the machine learning models. In addition, this study shows that the best performing models were diverse and based on the ensemble concept to reduce the bias and hyperparameter sensitivity of individual models.",
    keywords: [
      "Early Fault Detection",
      "Ensemble Learning",
      "Spallation Neutron Source",
    ],
    doi: "https://doi.org/10.36001/ijphm.2023.v14i1.3419",
    group: "controls",
    imageUrl: "/research-directory/controls/controls-4.png",
    pdfUrl: "https://papers.phmsociety.org/index.php/ijphm/article/view/3419",
    isRecent: true,
  },
  {
    id: "controls-5",
    type: "publication",
    title:
      "Time series anomaly detection in power electronics signals with recurrent and ConvLSTM autoencoders",
    authors: [
      "Majdi I. Radaideh",
      "Chris Pappas",
      "Jared Walden",
      "Dan Lu",
      "Lasitha Vidyaratne",
      "Thomas Britton",
      "Kishansingh Rajput",
      "Malachi Schram",
      "Sarah Cousineau",
    ],
    journal: "Digital Signal Processing",
    year: 2022,
    timestamp: 1662706800,
    abstract:
      "The anomalies in the high voltage converter modulator (HVCM) remain a major down time for the spallation neutron source facility, that delivers the most intense neutron beam in the world for scientific materials research. In this work, we propose neural network architectures based on Recurrent AutoEncoders (RAE) to detect anomalies ahead of time in the power signals coming from the HVCM. Bi-directional gated recurrent unit, bi-directional long-short term memory (LSTM), and convolutional LSTM (ConvLSTM) are developed, trained, and tested using real experimental signals from the HVCM module. The results show a good performance of the proposed RAE models, achieving precision up to 91%, recall up to 88%, false omission rate as low as 20% (i.e. 80% of the anomalies were detected), and area under the ROC curve up to 0.9. The three RAE models provide very comparable performance, with LSTM showing slightly better performance than GRU and ConvLSTM. The RAE models are benchmarked against other anomaly detection methods, including isolation forest, support vector machine, local outlier factor, feedforward and convolutional autoencoders, and others; showing a better performance. The results of this study demonstrate the promising potential of RAE in anomaly detection for real-world power systems, and for increasing the reliability of the HVCM modules in the spallation neutron source.",
    keywords: [
      "High voltage converter modulator",
      "Long-short term memory",
      "Recurrent AutoEncoders",
    ],
    doi: "https://doi.org/10.1016/j.dsp.2022.103704",
    group: "controls",
    imageUrl: "/research-directory/controls/controls-5.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S1051200422003219?via%3Dihub",
    isRecent: true,
  },
  {
    id: "controls-6",
    type: "publication",
    title:
      "Multi-module-based CVAE to predict HVCM faults in the SNS accelerator",
    authors: [
      "Yasir Alanazi",
      "Malachi Schram",
      "Kishansingh Rajput",
      "Steven Goldenberg",
      "Lasitha Vidyaratne",
      "Chris Pappas",
      "Majdi I. Radaideh",
      "Dan Lu",
      "Pradeep Ramuhalli",
      "Sarah Cousineau",
    ],
    journal: "Machine Learning with Applications",
    year: 2023,
    timestamp: 1690959600,
    abstract:
      "We present a multi-module framework based on Conditional Variational Autoencoder (CVAE) to detect anomalies in the power signals coming from multiple High Voltage Converter Modulators (HVCMs). We condition the model with the specific modulator type to capture different representations of the normal waveforms and to improve the sensitivity of the model to identify a specific type of fault when we have limited samples for a given module type. We studied several Artificial Neural Network (ANN) architectures for our CVAE model and evaluated the model performance by looking at their loss landscape for stability and generalization. Our results for the Spallation Neutron Source (SNS) experimental data show that the trained model generalizes well to detecting multiple fault types for several HVCM module types. The results of this study can be used to improve the HVCM reliability and overall SNS uptime.",
    keywords: [
      "Conditional Variational Autoencoder",
      "High Voltage Converter Modulators",
      "Artificial Neural Network",
    ],
    doi: "https://doi.org/10.1016/j.mlwa.2023.100484",
    group: "controls",
    imageUrl: "/research-directory/controls/controls-6.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S2666827023000373?via%3Dihub",
    isRecent: false,
  },
  {
    id: "controls-7",
    type: "publication",
    title:
      "Real electronic signal data from particle accelerator power systems for machine learning anomaly detection",
    authors: ["Majdi I. Radaideh", "Chris Pappas", "Sarah Cousineau"],
    journal: "Data in Brief",
    year: 2022,
    timestamp: 1658559600,
    abstract:
      "This article describes real time series datasets collected from the high voltage converter modulators (HVCM) of the Spallation Neutron Source facility. HVCMs are used to power the linear accelerator klystrons, which in turn produce the high-power radio frequency to accelerate the negative hydrogen ions (H−). Waveform signals have been collected from the operation of more than 15 HVCM systems categorized into four major subsystems during the years 2020-2022. The data collection process occurred in the Spallation Neutron Source facility of Oak Ridge, Tennessee in the United States. For each of the four subsystems, there are two datasets. The first one contains the waveform signals, while the second contains the label of the waveform, whether it has a normal or faulty signal. A variety of waveforms are included in the datasets including insulated-gate bipolar transistor (IGBT) currents in three phases, magnetic flux in the three phases, modulator current and voltage, cap bank current and voltage, and time derivative change of the modulator voltage. The datasets provided are useful to test and develop machine learning and statistical algorithms for applications related to anomaly detection, system fault detection and classification, and signal processing.",
    keywords: [
      "Electronic signals",
      "High Voltage Converter Modulators",
      "Insulated-gate bipolar transistor",
    ],
    doi: "https://doi.org/10.1016/j.dib.2022.108473",
    group: "controls",
    imageUrl: "/research-directory/controls/controls-7.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S2352340922006679?via%3Dihub",
    isRecent: false,
  },
  {
    id: "controls-8",
    type: "publication",
    title:
      "Application of Convolutional and Feedforward Neural Networks for Fault Detection in Particle Accelerator Power Systems",
    authors: [
      "Majdi Radaideh",
      "Chris Pappas",
      "Pradeep Ramuhalli",
      "Sarah Cousineau",
    ],
    journal: "Annual Conference of the PHM Society",
    year: 2022,
    timestamp: 1666940400,
    abstract:
      "High voltage converter modulators (HVCM) provide power to the accelerating cavities of the Spallation Neutron Source (SNS) facility. HVCMs experience catastrophic failures, which increase the downtime of the SNS and reduce beam time. The faults may occur due to different reasons including failures of the resonant capacitor, core saturation due to the magnetic flux, insulated-gate bipolar transistor (IGBT) failures, and others. We recently have setup a HVCM test stand to develop and test machine learning models for anomaly detection and fault prognostics. In this work, we propose binary classifiers and autoencoder architectures based on convolutional (CNN) and feedforward neural networks (FNN) to facilitate distinguishing normal from faulty waveforms coming from the HVCM during operation. The results indicate that the CNN binary classifier is the best model among the four showing very stable performance in the training and testing sets with impressive precision and recall metrics, reaching up to 99% with a very small uncertainty. The FNN classifier shows the least performance with a large uncertainty in its metrics. The performances of the two autoencoders based on CNN and FNN were in between, showing very good performance nonetheless.",
    keywords: [
      "Feedforward neural networks",
      "High Voltage Converter Modulators",
      "Particle Accelerator Power Systems",
    ],
    doi: "https://doi.org/10.36001/phmconf.2022.v14i1.3270",
    group: "controls",
    imageUrl: "/research-directory/controls/controls-8.png",
    pdfUrl: "https://papers.phmsociety.org/index.php/phmconf/article/view/3270",
    isRecent: false,
  },
  {
    id: "controls-9",
    type: "publication",
    title:
      "Distance preserving machine learning for uncertainty aware accelerator capacitance predictions",
    authors: [
      "Steven Goldenberg",
      "Malachi Schram",
      "Kishansingh Rajput",
      "Thomas Britton",
      "Chris Pappas",
      "Dan Lu",
      "Jared Walden",
      "Majdi I Radaideh",
      "Sarah Cousineau",
      "Sudarshan Harave",
    ],
    journal: "Machine Learning: Science and Technology",
    year: 2024,
    timestamp: 1728370800,
    abstract:
      "Accurate uncertainty estimations are essential for producing reliable machine learning models, especially in safety-critical applications such as accelerator systems. Gaussian process models are generally regarded as the gold standard for this task; however, they can struggle with large, high-dimensional datasets. Combining deep neural networks with Gaussian process approximation techniques has shown promising results, but dimensionality reduction through standard deep neural network layers is not guaranteed to maintain the distance information necessary for Gaussian process models. We build on previous work by comparing the use of the singular value decomposition against a spectral-normalized dense layer as a feature extractor for a deep neural Gaussian process approximation model and apply it to a capacitance prediction problem for the High Voltage Converter Modulators in the Oak Ridge Spallation Neutron Source. Our model shows improved distance preservation and predicts in-distribution capacitance values with less than 1% error.",
    keywords: [
      "Gaussian process",
      "High Voltage Converter Modulators",
      "Deep neural networks",
    ],
    doi: "https://doi.org/10.1088/2632-2153/ad7cbf",
    group: "controls",
    imageUrl: "/research-directory/controls/controls-9.png",
    pdfUrl: "https://iopscience.iop.org/article/10.1088/2632-2153/ad7cbf/meta",
    isRecent: false,
  },
  {
    id: "controls-10",
    type: "publication",
    title:
      "Operational data for fault prognosis in particle accelerators with machine learning",
    authors: [
      "Majdi I. Radaideh",
      "Chris Pappas",
      "Mark Wezensky",
      "Sarah Cousineau",
    ],
    journal: "Data in Brief",
    year: 2023,
    timestamp: 1697871600,
    abstract:
      "This paper presents real operational data collected from the power systems of the Spallation Neutron Source facility, which provides the most intense neutron beam in the world. The authors have used a radio-frequency test facility (RFTF) and simulated system failures in the lab without causing a catastrophic system failure. Waveform signals have been collected from the RFTF normal operation as well as during fault induction efforts. The dataset provides a significant amount of normal and faulty signals for the training of statistical or machine learning models. Then, the authors performed 21 test experiments, where the faults are slowly induced into the RFTF system for the purpose of testing the models in fault prognosis to detect and prevent impending faults. The test experiments include interesting combinations of magnetic flux compensation and start pulse width adjustments, which cause gradual deterioration in the waveforms (e.g., system output voltage, system output current, insulated-gate bipolar transistor currents, magnetic fluxes), which mimic the fault scenarios. Accordingly, this dataset can be valuable for developing models to predict impending fault scenarios in power systems in general and in particle accelerators in specific. All experiments occurred in the Spallation Neutron Source facility of Oak Ridge National Laboratory in Oak Ridge, Tennessee of the United States in July 2022.",
    keywords: [
      "Radio-frequency test facility",
      "Particle accelerators",
      "Magnetic flux compensation",
    ],
    doi: "https://doi.org/10.1016/j.dib.2023.109658",
    group: "controls",
    imageUrl: "/research-directory/controls/controls-10.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S2352340923007436?via%3Dihub",
    isRecent: false,
  },
  {
    id: "controls-11",
    type: "publication",
    title:
      "Neural-based time series forecasting of loss of coolant accidents in nuclear power plants",
    authors: [
      "Majdi I. Radaideh",
      "Connor Pigg",
      "Tomasz Kozlowski",
      "Yujia Deng",
      "Annie Qu",
    ],
    journal: "Expert Systems with Applications",
    year: 2020,
    timestamp: 1595228400,
    abstract:
      "In the last few years, deep learning in neural networks demonstrated impressive successes in the areas of computer vision, speech and image recognition, text generation, and many others. However, sensitive engineering areas such as nuclear engineering benefited less from these efficient techniques. In this work, deep learning expert systems are utilized to model and predict time series progression of a design-basis nuclear accident, featuring a loss of coolant accident. Two major findings are accomplished in this work. First, the ability to train expert systems with high accuracy, which could help nuclear power plant operators to figure out plant responses during the accident. Second, building fast, efficient, and accurate deep models to simulate nuclear phenomena, which could be valuable to nuclear computational science. In this work, large amount of time series data is obtained from simulation tools by simulating different conditions of the base-case/nominal accident scenario. Four critical outputs/responses are monitored during the accident (e.g. temperature, pressure, break flow rate, water level). Two approaches are adopted in this work. The first approach is to use feedforward deep neural networks (DNN) to fit all time steps and outputs in a single model. The second approach is to use long short-term memory (LSTM) to fit all time steps together for each reactor response separately. Both DNN and LSTM demonstrate very good performance in predicting the test and base-case scenarios, with accuracy as low as 92% and as high as 99%, where these test scenarios are unknown to the expert systems and are not included in the model training. In addition, both approaches demonstrate a significant reduction in computational costs, as the deep expert system is able to accurately predict the accident 100,000 times faster than the original simulation tool. Given sufficient data, the methodology adopted in this study demonstrates that DNN/LSTM expert systems can be used as a decision support system to model advanced time series phenomena within nuclear power plants with high accuracy and negligible computational costs.",
    keywords: [
      "Deep neural networks",
      "Long short-term memory",
      "Nuclear power plants",
    ],
    doi: "https://doi.org/10.1016/j.eswa.2020.113699",
    group: "controls",
    imageUrl: "/research-directory/controls/controls-11.jpg",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S0957417420305236?via%3Dihub",
    isRecent: false,
  },
  {
    id: "controls-12",
    type: "publication",
    title:
      "Nuclear microreactor transient and load-following control with deep reinforcement learning",
    authors: [
      "Leo Tunkle",
      "Kamal Abdulraheem",
      "Linyu Lin",
      "Majdi I. Radaideh",
    ],
    journal: "Energy Conversion and Management: X",
    year: 2025,
    timestamp: 1751342400,
    abstract:
      "The economic feasibility of nuclear microreactors will depend on minimizing operating costs through advancements in autonomous control, especially when these microreactors are operating alongside other types of energy systems (e.g., renewable energy). This study explores the application of deep reinforcement learning (RL) for real-time drum control in microreactors, exploring performance in regard to load-following scenarios. By leveraging a point kinetics model with thermal and xenon feedback, we first establish a baseline using a single-output RL agent, then compare it against a traditional proportional–integral–derivative (PID) controller. This study demonstrates that RL controllers, including both single- and multi-agent RL (MARL) frameworks, can achieve load-following performance similar or even superior to traditional PID control across a range of load-following scenarios. In short transients, the RL agent was able to reduce the tracking error rate in comparison to PID by one half to one third. Over extended 300 min load-following scenarios in which xenon feedback becomes a dominant factor, PID maintained better accuracy, but RL still remained within a 1% error margin despite being trained only on short-duration scenarios. This highlights RL’s strong ability to generalize and extrapolate to longer, more complex transients, affording substantial reductions in training costs and reduced overfitting. Furthermore, when control was extended to multiple drums, MARL enabled independent drum control as well as maintained reactor symmetry constraints without sacrificing performance—an objective that standard single-agent RL could not learn. We also found that the RL controllers were able to maintain lower error rates than PID, despite increasing levels of Gaussian noise being added to the power measurements, doing so with at least 10% and upwards of 150% less control effort. These findings illustrate RL’s potential for autonomous nuclear reactor control, laying the groundwork for future integration into high-fidelity simulations and experimental validation efforts.",
    keywords: [
      "Nuclear microreactor",
      "Multi-agent RL (MARL)",
      "Reactivity control",
    ],
    doi: "https://doi.org/10.1016/j.ecmx.2025.101090",
    group: "controls",
    imageUrl: "/research-directory/controls/controls-12.png",
    pdfUrl:
      "https://www.sciencedirect.com/science/article/pii/S2590174525002223",
    isRecent: true,
  },
];

// project copy + paste
// {
//   id: "2",
//   type: "project",
//   title: "Title",
//   description: "Description",
//   status: "Ongoing",
//   startYear: 2022,
//   endYear: 2025,
//   fundingSource: "Funding Source",
//   collaborators: ["Collaborators"],
//   group: "reactors",
//   imageUrl: "/research-focus/software.png",
//   websiteUrl: "#",
//   isRecent: true
// },