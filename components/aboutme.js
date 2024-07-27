import aboutmestyles from '../styles/aboutme.module.css'
import pagestyles from '../styles/stickynavpagesetup.module.css';
import { typewrite2 } from './animations';
import { useState,useEffect } from 'react';
import { projects } from './projects_list';

export default function AboutMe() {
  const title = "About Me"
  const [typewritten,setType] = useState(title);
  const [cursor,setCursor] = useState("_");
  const [showDropdown, setDropdown] = useState(false);
  projects.map((project)=>{project["showDiv"]=false});
  const [projectData,setProjectData] = useState(projects);
  const [fontsize, setFontSize] = useState(18);
  useEffect(() => {
    const updateDimensions = () => {
      const windowWidth = window.innerWidth;
      let newfontsize;
      if (windowWidth < 700) {
        newfontsize = 13;
      }
      else {
        newfontsize = 18;
      }
      setFontSize(newfontsize);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  return (
    <>
      <div className={pagestyles.page}>
        <div className={pagestyles.navbar}>
          <div onClick={()=>setDropdown(!showDropdown)} className={pagestyles.hamburger}>&#9776;</div>
          <div onClick={()=>typewrite2(title,setType,setCursor)} className={pagestyles.title}>{typewritten}<span className={pagestyles.cursor}>{cursor}</span></div>
          <a href={"/"}><div className={pagestyles.logo}><img src="images/lnlogowhite.png"></img></div></a>
        </div>
        <div className={aboutmestyles.biggerdiv}>
          <div className={aboutmestyles.aboutmediv}>
            <div className={aboutmestyles.layer}></div>
            <div className={aboutmestyles.layer}>
              <div className={aboutmestyles.big} style={{fontSize: fontsize,marginRight:'1%'}}>
                Hello! I'm Luke Nelson, and I'm on a journey to become a hardware design engineer, specifically focusing on RTL-level design and low-level programming. Currently, I'm enrolled in the Computer Science program at the University of Michigan. Some classes I will be taking this semester and the following semester are: EECS 470 (Computer Architecture & CPU Design), EECS 373 (Embedded System Design), EECS 388 (Cybersecurity), EECS 570 (Parallel Computer Architecture), EECS 573 (Microarchitecture), EECS 482 (Operating Systems Design). Beyond the classroom, I actively contribute to project teams and technology clubs, including my recent founding of the Michigan Computer Architecture Club, which has the goal of designing, engineering, and manufacturing a fully-functional computer from scratch. I'm looking to get into the field of computer architecture because I love the challenges inherent to the field, and am very interested and passionate to solve the type of problems that we find in this field. I'm interested in a internship or entry-level role to pursue these interests (as I'm not decided whether to pursue grad school yet), so please reach out if you're interested to take me on.
              </div>
              <div className={aboutmestyles.small} style={{backgroundImage: 'url(images/aboutmeimg1.jpg)',backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',position:'relative',height: 'auto',}}></div>
            </div>
            <div className={aboutmestyles.layer}>
              <img className={aboutmestyles.small} style={{backgroundImage: 'url(images/aboutmeimg2.jpg)',backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',position:'relative',height: 'auto',}}></img>
              <div className={aboutmestyles.big} style={{fontSize: fontsize,marginLeft:'1%'}}>
                I'm a Computer Science student at the University of Michigan, anticipating graduation in May 2025. I currently maintain a 3.99/4.00 GPA, my primary interest these days is to go into the field of computer architecure and hardware design,focusing on digital design. I am proficient in RTL Design, object oriented programming in various languages, scripting in Python, Linux, and computer hardware. I also have experience designing machine learning models. My GitHub (github.com/ldnelson16) showcases my projects. I am also pursuing an Electrical Engineering minor. I have experience building high-performance software solutions in C and C++. Some roles I currently have are as a Software Engineer and Data Sub-Team Programmer at SPARK Electric Racing, where I'm designing and programming a comprehensive diagnostic and data display system for our electric motorcycle. Simultaneously, at CANTOR - Coding and Trading Club, I'm a Natural Language Processing Team Programmer, applying advanced techniques to extract insights from financial news. I am also founding the Michigan Computer Architecture Club, which I talk about in the above paragraph, which I am the most interested in extracurricularly these days! Learn about my career path at my <a href= "https://linkedin.com/in/nelsonluke">LinkedIn profile</a>. 
              </div>
            </div>
            <div className={aboutmestyles.layer}>
              <div className={aboutmestyles.big} style={{fontSize: fontsize,marginRight:'1%'}}>Beyond my career goals, I have a mix of interests. I'm a proud supporter of University of Michigan athletics — you can catch me at all the games. I also enjoy climbing and reading in my quiet time. Logic puzzles keep my brain ticking, and I find them very satisfying. Outside of all that, I like a bit of friendly competition playing basketball, or spending time with my girlfriend and a good dog. </div>
              <div className={aboutmestyles.small} style={{backgroundImage: 'url(images/aboutmeimg3.png)',backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',position:'relative',height: 'auto',}}></div>
            </div>
          </div>
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
  )
}