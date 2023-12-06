import boxstyles from '../styles/boxes.module.css';
import pagestyles from '../styles/stickynavpagesetup.module.css';
import {useState,useEffect} from 'react';

function formatDateToMMDDYYYY(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}.${day}.${year}`;
}

const currentDate = formatDateToMMDDYYYY(new Date());

var projects = [
  {
    title: 'Resume',
    link: 'pdfs/resume.pdf',
    image: "images/resume.jpg",
    editdate: "8.20.2023",
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
    title: 'Word Search Creator',
    link: '/wordsearch',
    image: 'images/wordsearch.jpg',
    editdate: "9.25.2023",
    description: "Custom word search creator, given height, width, word theme" ,
    skills: "REST APIs, C++, HTML/CSS/JS",
    tools: "C++, CMake",
    gitlink: "https://github.com/ldnelson16/wordsearch",
  },
  {
    title: 'Chess Bot',
    link: '/chess',
    image: 'images/chess.jpg',
    editdate: "TBD",
    description: "Chess Bot using Machine Learning" ,
    skills: "Machine Learning, Neural Networks, Deep Learning, Python, HTML/CSS/JS",
    tools: "PyTorch, TensorFlow",
    gitlink: "https://github.com/ldnelson16/chess",
  },
  {
    title: 'Office Hours Queue',
    link: 'https://eecs280staff.github.io/p4-web/',
    image: 'images/queue.png',
    editdate: "11.14.2023",
    description: "Office Hours Queue" ,
    skills: "API, Doubly Linked List, C++",
    tools: "HTTP Requests, LLDB",
    gitlink: "https://github.com/aspatel262/p4-api",
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
    title: 'CFB Play Analysis',
    link: 'https://github.com/ldnelson16/cfb-machine-learning',
    image: 'images/cfb-ml-play.jpg',
    editdate: "12.1.2023",
    description: "A tool which (eventually) can analyze a football play via video feed." ,
    skills: "Computer Vision, Machine Learning, Neural Networks",
    tools: "TensorFlow, Python",
    gitlink: "https://github.com/ldnelson16/cfb-machine-learning",
  },
  {
    title: 'Euchre',
    link: 'https://eecs280staff.github.io/p3-euchre/',
    image: 'images/euchre.jpg',
    editdate: "10.16.2023",
    description: "Euchre! Playable with human and robot players." ,
    skills: "C++, Object Oriented Programming",
    tools: "",
    gitlink: "https://github.com/aspatel262/p3-euchre",
  },
  {
    title: 'Piazza Post Classifier',
    link: 'https://eecs280staff.github.io/p5-ml/',
    image: 'images/piazza.png',
    editdate: "12.2.2023",
    description: "Piazza Post Classifier using a Multi-variate Bernoulli Naive Bayes Classifier" ,
    skills: "API, Doubly Linked List, C++",
    tools: "HTTP Requests, LLDB",
    gitlink: "https://github.com/ldnelson16/p5-ml",
  },
];

export default function Boxes(){
  const type = "Luke Nelson - Personal Portfolio";
  const [cursor,setCursor] = useState("_");
  const [aboutmeinfo, setAboutInfo] = useState(false);
  const [showDropdown, setDropdown] = useState(false);
  projects.map((project)=>{project["showDiv"]=false});
  const [projectData,setProjectData] = useState(projects);
  const aboutHandle = () => {
    setAboutInfo(!aboutmeinfo);
  };
  const infoHandleOn = (title) => {
    setProjectData((prevProjects) =>
      prevProjects.map((project) =>
        project.title === title ? { ...project, showDiv: !project.showDiv } : project
      )
    );
  };
  
  const [typewritten,setType] = useState(type);
  
  async function typewrite2() {
    setCursor("");
    for(let i=0;i<type.length-1;++i){
      setType(type.slice(0,i+1)+"|"+"\u{0020}".repeat(type.length-i));
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setType(type);
    setCursor("_");
  }
  const [boxwidth, setBoxWidth] = useState(200);
  const [boxheight, setBoxHeight] = useState(200);
  useEffect(() => {
    const updateDimensions = () => {
      const windowWidth = window.innerWidth;
      let newWidth, newHeight;
      if (windowWidth < 500) {
        newWidth = 170;
        newHeight = 170;
      }
      else if (windowWidth >= 500 && windowWidth <= 1000) {
        newWidth = windowWidth/5;
        newHeight = windowWidth/5;
      }
      else {
        newWidth = windowWidth/8+50;
        newHeight = windowWidth/8+30;
      }
      setBoxWidth(newWidth);
      setBoxHeight(newHeight);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  return(
    <>
      <div className={pagestyles.page}>
        <div className={pagestyles.navbar}>
          <div onClick={()=>setDropdown(!showDropdown)} className={pagestyles.hamburger}>&#9776;</div>
          <div onClick={typewrite2} className={pagestyles.title}>{typewritten}<span className={pagestyles.cursor}>{cursor}</span></div>
          <a href={"/"}><div className={pagestyles.logo}><img src="images/lnlogowhite.png"></img></div></a>
        </div>
        <div key="About Me" className={boxstyles.aboutmeelement}>
          <span style={{backgroundColor: 'rgba(1,1,1,.7)',padding: '5px'}}>About Me</span>
          <div onMouseOver={()=>setAboutInfo(true)} onMouseLeave={()=>setAboutInfo(false)} className={boxstyles.info}>&#9432;</div>
          <a href="/aboutme" style={{position:'absolute',left:'0',top:'0',borderRadius:'15px 0px 0px 15px',width:'97.7%',height:'100%',backgroundColor:'transparent'}}></a>
          <a href="/aboutme" style={{position:'absolute',left:'0',bottom:'0',borderRadius:'0px 0px 15px 15px',width:'100%',height:'93.1%',backgroundColor:'transparent'}}></a>  
          {aboutmeinfo ? <div className={boxstyles.infographic}>
                <span style={{position:'absolute',display: 'block',fontSize: '1.2rem'}}>Learn about me, including my experience, hobbies, and my programming journey.</span>
              </div> : <></>}
          <div onClick={()=>aboutHandle()} className={boxstyles.info}>&#9432;</div>
        </div>
        <a key="Projects" className={boxstyles.projectslabel}>
          <u>Projects</u>
        </a>
        <div className={boxstyles.boxdiv}>
        {projectData.map((project, index) => (
          <div
            key={index}
            className={boxstyles.element}
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position:'relative',
              width: boxwidth,
              height: boxheight,
            }}
          > 
            <a href={project.link} target="_blank" style={{position:'absolute',left:'0',top:'0',borderRadius:'15px 0px 0px 15px',width:'140px',height:'165px',backgroundColor:'transparent'}}></a>
            <a href={project.link} target="_blank" style={{position:'absolute',left:'0',bottom:'0',borderRadius:'0px 0px 15px 15px',width:'165px',height:'140px',backgroundColor:'transparent'}}></a>
            <div className={boxstyles.label}>{project.title}</div>
            {project.showDiv && (index<2) ? <div className={boxstyles.infographic}>
                <span style={{display: 'block',marginBottom: '5px'}}>Last Edited: {project.editdate}</span>
                <span style={{display: 'block',marginBottom: '5px'}}>Description: {project.description}</span>
              </div> : <></>}
            {project.showDiv && (index>=2) ? <div className={boxstyles.infographic}>
                <span style={{display: 'block',marginBottom: '5px'}}>Last Edited: {project.editdate}</span>
                <span style={{display: 'block',marginBottom: '5px'}}>Description: {project.description}</span>
                <span style={{display: 'block',marginBottom: '5px'}}>Skills: {project.skills}</span>
                <span style={{display: 'block',marginBottom: '5px'}}>Tools: {project.tools}</span>
              </div> : <></>}
            <div onClick={()=>infoHandleOn(project.title)} className={boxstyles.info}>&#9432;</div>
            {(index>=2)?<a href={project.gitlink} className={boxstyles.gitinfo} target="_blank"><img src='images/ghlogoicon.png' style={{width: '22px',height:'22px'}}></img></a>:<></>}
          </div>
        ))}
        </div>
      </div>
      {showDropdown ? 
        <div className={pagestyles.dropdown}>
            <a href={'pdfs/resume.pdf'} target="_blank" className={pagestyles.dditem}><span style={{fontSize:'1rem', marginBottom:'auto'}}>&#128307;</span>Resume</a>
            <a href={'https://github.com/ldnelson16'} target="_blank" className={pagestyles.dditem}><span style={{fontSize:'1rem', marginBottom:'auto'}}>&#128307;</span>GitHub</a>
            <a className={pagestyles.dditem}><span style={{fontSize:'1rem', marginBottom:'auto'}}>&#128307;</span>Projects</a>
            {projectData.slice(2).map((project)=>(
              <a href={project.link} target="_blank" style={{paddingRight:'3px'}} className={pagestyles.dditem}><span style={{fontSize:'.8rem'}}>&nbsp;&nbsp;&#128307;</span><span style={{fontSize:'1rem',marginBottom:'auto',marginTop:'auto'}}>{project.title}</span></a>
            ))}
            <a href={'/aboutme'} target="_blank" className={pagestyles.dditem}><span style={{fontSize:'1rem', marginBottom:'auto'}}>&#128307;</span>About Me</a>
        </div>:<></>
      }
    </>
  );
}