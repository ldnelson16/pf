import boxstyles from '../styles/boxes.module.css';
import {useState,useCallback,useEffect} from 'react';

var projects = [
  {
    title: 'Resume',
    link: '/',
    image: "images/resume.jpg",
    editdate: "8.19.2023",
    description: "My Current Resume" ,
    skills: "Available in resume",
    tools: "Available in resume",
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'images/football.jpg',
    editdate: "8.01.2023",
    description: "CFB Recruiting Composite Builder and Recruit Data Analyzer" ,
    skills: "Front-end development, Webscraping, Python, HTML/CSS/JS",
    tools: "Next.js, React, Chromium",
  }
];

export default function Boxes(){
  const type = "Luke Nelson - Personal Portfolio";
  const [cursor,setCursor] = useState("_");
  const [aboutmeinfo, setAboutInfo] = useState(false);
  projects.map((project)=>{project["showDiv"]=false});
  const [projectData,setProjectData] = useState(projects);
  const [truth,settrue] = useState(true);
  const infoHandleOn = useCallback((title) => {
    console.log(title);
    const newprojects = projects;
    setProjectData((prevProjects) =>
      prevProjects.map((project) =>
        project.title === title ? { ...project, showDiv: true } : project
      )
    );
  });
  const infoHandleOff = useCallback((title) => {
    console.log(title);
    const newprojects = projects;
    setProjectData((prevProjects) =>
      prevProjects.map((project) =>
        project.title === title ? { ...project, showDiv: false } : project
      )
    );
    console.log(projectData);
  });
  const [typewritten,setType] = useState("");
  
  useEffect(() => {
    typewrite();
  }, []);
  async function typewrite() {
    await new Promise(resolve => setTimeout(resolve,2000));
    setCursor("");
    for(let i=0;i<type.length-1;++i){
      setType(type.slice(0,i+1)+"|"+"\u{0020}".repeat(type.length-i));
      await new Promise(resolve => setTimeout(resolve, 90));
    }
    setType(type);
    setCursor("_");
  }
  async function typewrite2() {
    console.log(2);
    setCursor("");
    for(let i=0;i<type.length-1;++i){
      setType(type.slice(0,i+1)+"|"+"\u{0020}".repeat(type.length-i));
      await new Promise(resolve => setTimeout(resolve, 90));
    }
    setType(type);
    setCursor("_");
  }
  return(
    <>
      <div className={boxstyles.table}>
        <div className={boxstyles.sticky}>
          <div className={boxstyles.hamburger}>&#9776;</div>
          <div onClick={typewrite2} className={boxstyles.title}>{typewritten}<span className={boxstyles.cursor}>{cursor}</span></div>
          <div className={boxstyles.logo}>Im</div>
        </div>
        <a key="About Me" href={""} className={boxstyles.aboutmeelement}><span style={{backgroundColor: 'rgba(1,1,1,.7)',padding: '5px'}}>About Me</span>
          {aboutmeinfo ? <div className={boxstyles.infographic}>
                <span style={{display: 'block',marginTop: '160px',fontSize: '1.4rem'}}>Learn about me, including my experience, hobbies, and my programming journey map.</span>
              </div> : <></>}
            <div onMouseOver={()=>setAboutInfo(true)} onMouseLeave={()=>setAboutInfo(false)} className={boxstyles.info}>&#9432;</div>
          </a>
        {projectData.map((project, index) => (
          <a
            key={index}
            href={project.link}
            className={boxstyles.element}
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          > 
            <div className={boxstyles.label}>{project.title}</div>
            {project.showDiv ? <div className={boxstyles.infographic}>
                <span style={{display: 'block',marginBottom: '5px'}}>Last Edited: {project.editdate}</span>
                <span style={{display: 'block',marginBottom: '5px'}}>Description: {project.description}</span>
                <span style={{display: 'block',marginBottom: '5px'}}>Skills: {project.skills}</span>
                <span style={{display: 'block',marginBottom: '5px'}}>Tools: {project.tools}</span>
              </div> : <></>}
            <div onMouseOver={()=>infoHandleOn(project.title)} onMouseLeave={()=>infoHandleOff(project.title)} className={boxstyles.info}>&#9432;</div>
          </a>
        ))}
      </div>
    </>
  );
}