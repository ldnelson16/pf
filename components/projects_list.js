function formatDateToMMDDYYYY(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}.${day}.${year}`;
}

const currentDate = formatDateToMMDDYYYY(new Date());

export const projects = [
  {
    title: 'UART Transceiver - RTL',
    link: 'https://github.com/ldnelson16/UART-controller/tree/master',
    image: 'images/transceiver.png',
    editdate: "7.13.2024",
    description: "Designing a UART transceiver which can achieve full duplex 50 MBps throughput of data." ,
    skills: "RTL Design, RTL Simulation, EDA",
    tools: "FPGA, SystemVerilog, ModelSim, Synopsis",
    gitlink: "https://github.com/ldnelson16/UART-controller",
  },
  {
    title: 'PRKR - Compiler',
    link: 'https://github.com/ldnelson16/parker-language/tree/master',
    image: 'images/compiler.png',
    editdate: "5.29.2024",
    description: "Designing a compiler for a custom high-level programming language that compiles into LLVM intermediate code." ,
    skills: "RISC-V, compiler design, code generation, formal verification",
    tools: "C++, LLVM",
    gitlink: "https://github.com/ldnelson16/parker-language",
  },
  {
    title: 'RTL Four Function Calculator',
    link: 'https://drive.google.com/file/d/1dkuEB6zfRnklKqDO6hQBnfEHLxd6buBl/view?usp=sharing',
    image: 'images/calculator.png',
    editdate: "3.29.2024",
    description: "RTL design of four function calculator and synthesis onto FPGA board (code private for now, link shows overhead design of project)." ,
    skills: "RTL Design, EDA Simulation, FPGA Programming, Hardware Design",
    tools: "Verilog, ModelSim, FPGA",
    gitlink: "https://github.com/ldnelson16/FourFuncCalc-E270",
  },
  {
    title: 'FPGA - Dinosaur Game Emulator',
    link: 'https://github.com/ldnelson16/FPGA_VGA_GAME/tree/master',
    image: 'images/dinosaur.png',
    editdate: "7.27.2024",
    description: "Designing a VGA driver for the FPGA to play the dinosaur game using a handheld controller.",
    skills:"Hardware Driver Design, Logic Design",
    tools: "FPGA, SystemVerilog, ModelSim, Synopsis",
    gitlink: "https://github.com/ldnelson16/FPGA_VGA_GAME",
  },
  {
    title: 'Pipelined Processor Simulator',
    link: 'https://eecs370.github.io/project_3_spec/',
    image: 'images/soc.png',
    editdate: "3.29.2024",
    description: "Simulating a pipelined single-cycle processor using C (project code private to follow University of Michigan Honor Code)." ,
    skills: "Computer Architecture, Pipeline Design",
    tools: "C",
    gitlink: "",
  },
  {
    title: 'Cache Simulator',
    link: 'https://eecs370.github.io/project_4_spec/',
    image: 'images/cache.jpg',
    editdate: "3.29.2024",
    description: "Simulating a unified instruction / data cache for a single-cycle processor (project code private to follow University of Michigan Honor Code)." ,
    skills: "Computer Architecture, Cache Design",
    tools: "C",
    gitlink: "",
  },
  {
    title: 'Resume',
    link: 'pdfs/resume.pdf',
    image: "images/resume.jpg",
    editdate: "7.27.2024",
    description: "Recent Resume" ,
  },
  {
    title: 'GitHub',
    link: 'https://github.com/ldnelson16',
    image: "images/github.jpg",
    editdate: currentDate,
    description: "GitHub Profile" ,
  },
  {
    title: 'LDN Recruits',
    link: '/ldnrecruits',
    image: 'images/football.jpg',
    editdate: "8.01.2023",
    description: "CFB Recruiting Composite Builder and Recruit Data Analyzer" ,
    skills: "Front-end development, Webscraping, Python, HTML/CSS/JS",
    tools: "Next.js, React, Chromium",
    gitlink: "https://github.com/ldnelson16/cfbscraper",
  },
  {
    title: 'Solving the Travelling Salesman Problem',
    link: 'https://eecs281staff.github.io/p4-drones/',
    image: 'images/map.jpg',
    editdate: "4.12.2024",
    description: "Using a graph based, branching and bounding algorithm, to efficiently estimate and/or find the optimal path to a travelling salesman problem." ,
    skills: "Algorithms, Graph Theory, Object Oriented Programming",
    tools: "C++, CMake",
    gitlink: "https://github.com/ldnelson16/eecs281-p4",
  },
  {
    title: 'Relational Database System',
    link: 'https://eecs281staff.github.io/p3-sillyql/',
    image: 'images/database.jpg',
    editdate: "3.22.2024",
    description: "Designing a relational database with an API-based user interface." ,
    skills: "Database Management",
    tools: "C++, CMake, SQL",
    gitlink: "https://github.com/ldnelson16/eecs281p3-sillyql",
  },
  {
    title: 'Word Search Creator',
    link: 'https://github.com/ldnelson16/wordsearch',
    image: 'images/wordsearch.jpg',
    editdate: "9.25.2023",
    description: "Custom word search creator, given height, width, word theme" ,
    skills: "REST APIs, C++, HTML/CSS/JS",
    tools: "C++, CMake",
    gitlink: "https://github.com/ldnelson16/wordsearch",
  },
  {
    title: 'The Atlas Project',
    link: 'https://github.com/ldnelson16/atlas',
    image: 'images/atlas.jpg',
    editdate: "11.1.2023",
    description: "ATLAS Project - An app with interactive GUI to optimize your semester's workload." ,
    skills: "Webscraping, App Development",
    tools: "TKinter, Python, Selenium",
    gitlink: "https://github.com/ldnelson16/atlas",
  },
  {
    title: 'Planner',
    link: '/planner',
    image: 'images/planner.jpg',
    editdate: "In progress",
    description: "Functional planner app" ,
    skills: "Database management, Front-end development, HTML/CSS/JS",
    tools: "MySQL, Next.js, React",
    gitlink: "https://github.com/ldnelson16/planner",
  },
  {
    title: 'Euchre',
    link: 'https://eecs280staff.github.io/p3-euchre/',
    image: 'images/euchre.jpg',
    editdate: "10.16.2023",
    description: "Euchre! Playable with human and robot players.  (project code private to follow University of Michigan Honor Code)" ,
    skills: "C++, Object Oriented Programming",
    tools: "",
    gitlink: "https://github.com/aspatel262/p3-euchre",
  },
  {
    title: 'Discussion Post Classifier',
    link: 'https://eecs280staff.github.io/p5-ml/',
    image: 'images/piazza.png',
    editdate: "12.2.2023",
    description: "Piazza Post Classifier using a Multi-variate Bernoulli Naive Bayes Classifier (project code private to follow University of Michigan Honor Code)" ,
    skills: "API, Doubly Linked List, C++",
    tools: "HTTP Requests, LLDB",
    gitlink: "https://github.com/ldnelson16/p5-ml",
  },
  {
    title: 'LinkedIn',
    link: 'https://linkedin.com/in/nelsonluke',
    image: 'images/linkedin.png',
    editdate: "7.27.2024",
    description: "LinkedIn Profile" ,
    skills: "",
    tools: "",
    gitlink: "",
  },
];