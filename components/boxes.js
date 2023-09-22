import boxstyles from '../styles/boxes.module.css';
import pagestyles from '../styles/stickynavpagesetup.module.css';
import {useState} from 'react';

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
    link: 'pdfs/goalresume.pdf',
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
    editdate: "TBD",
    description: "Custom word search creator, given height, width, word theme" ,
    skills: "REST APIs, C++, HTML/CSS/JS",
    tools: "TBD",
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
        {projectData.map((project, index) => (
          <div
            key={index}
            className={boxstyles.element}
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position:'relative'
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
      {showDropdown ? 
        <div className={pagestyles.dropdown}>
            <a href={'pdfs/goalresume.pdf'} target="_blank" className={pagestyles.dditem}><span style={{fontSize:'1rem', marginBottom:'auto'}}>&#128307;</span>Resume</a>
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