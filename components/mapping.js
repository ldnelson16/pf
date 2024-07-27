import mappingstyles from '../styles/mapping.module.css'
import pagestyles from '../styles/stickynavpagesetup.module.css';
import { typewrite2 } from './animations';
import { useState,useEffect } from 'react';
import { projects } from './projects_list';
//import {getRoute} from '../pages/api/createRoute.js'

export default function Mapping() {
  const title = "Mapping (using A* Search)"
  const [typewritten,setType] = useState(title);
  const [cursor,setCursor] = useState("_");
  const [showDropdown, setDropdown] = useState(false);
  projects.map((project)=>{project["showDiv"]=false});
  const [projectData,setProjectData] = useState(projects);
  const [fontsize, setFontSize] = useState(18);
  const [dots, setDots] = useState([]);
  const width_pct = 99.9;
  const height_pct = 100;

  const checkDots = (dot,dots) => {
    for (const d of dots) {
      if (Math.abs(d.x-dot.x) < 1 && Math.abs(d.y - dot.y) < 1) {
        return false;
      }
    }
    return true;
  }

  const handleWindowClick = (event) => {
    const { clientX, clientY } = event;
    const { width, height } = event.currentTarget.getBoundingClientRect();
    const dot = {
      x: ((clientX-4) / width) * width_pct,
      y: ((clientY-65) / height) * height_pct,
    };
    if (checkDots(dot,dots)) {
      setDots((prevDots) => [...prevDots, dot]);
    }
  };

  const handleFormEnter = (event) => {
    event.preventDefault();
    const start = event.target.elements.start.value;
    const end = event.target.elements.end.value;

    if (start==end) {return;}
    const routeData = getRoute(dots,start,end);
  }

  return (
    <>
      <div className={pagestyles.page} style={{padding: "125px 0% 0 0%"}}>
        <div className={pagestyles.navbar}>
          <div onClick={()=>setDropdown(!showDropdown)} className={pagestyles.hamburger}>&#9776;</div>
          <div onClick={()=>typewrite2(title,setType,setCursor)} className={pagestyles.title}>{typewritten}<span className={pagestyles.cursor}>{cursor}</span></div>
          <a href={"/"}><div className={pagestyles.logo}><img src="images/lnlogowhite.png"></img></div></a>
        </div>
        <div className={mappingstyles.biggerdiv}>
          <div className={mappingstyles.resizableWindow} onClick={handleWindowClick}>
            {dots.map((dot, index) => (
              <div
                key={index}
                className={mappingstyles.dot}
                style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className={mappingstyles.floating}>
        <div className={mappingstyles.floatheader}>
          Choose Route
        </div>
        <form onSubmit={handleFormEnter} className={mappingstyles.floatform}>
          <label className={mappingstyles.floatlabel}for="start">Start Point</label>
          <select id="start" name="start" className={mappingstyles.floatdropdown}>
            {dots.map((dot, index) => (
              <option className={mappingstyles.floatdropitem}
                value={dot.x.toFixed(4)+","+dot.y.toFixed(4)}
              >{"("+dot.x.toFixed(1)+","+dot.y.toFixed(1)+")"}</option>
            ))}
          </select>
          <label className={mappingstyles.floatlabel}for="end">End Point</label>
          <select id="end" name="end" className={mappingstyles.floatdropdown}>
            {dots.map((dot, index) => (
              <option className={mappingstyles.floatdropitem}
                value={dot.x.toFixed(4)+","+dot.y.toFixed(4)}
              >{"("+dot.x.toFixed(1)+","+dot.y.toFixed(1)+")"}</option>
            ))}
          </select>
          <button type="submit" className={mappingstyles.floatsubmit}>Submit</button>
        </form>
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
