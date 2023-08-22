import {useState} from 'react';

import cfbstyles from '../../styles/ldnrecruits/cfbhome.module.css';
import pagestyles from '../../styles/stickynavpagesetup.module.css';
import {typewrite2,typewritten,setType} from '../animations.js';

export const navlinks = [
  {
    title: 'Recruits Historical Data',
    link: '/ldnrecruits/recruits',
  },
  {
    title: 'Build Your Own Composite',
    link: '/ldnrecruits/byocomposite',
  },
]

export default function Cfbhome(){

  const title = "LDN Recruits - Home"
  const [typewritten,setType] = useState(title);
  const [cursor,setCursor] = useState("_");
  const [showDropdown, setDropdown] = useState(false);

  return (
    <>
      <div className={pagestyles.page}>
        <div className={pagestyles.navbar}>
          <div onClick={()=>setDropdown(!showDropdown)} className={pagestyles.hamburger}>&#9776;</div>
          <div onClick={()=>typewrite2(title,setType,setCursor)} className={pagestyles.title}>{typewritten}<span className={pagestyles.cursor}>{cursor}</span></div>
          <a href={"/"}><div className={pagestyles.logo}><img src="images/lnlogowhite.png"></img></div></a>
        </div>
        {showDropdown ? 
          <div className={pagestyles.dropdown}>
              {navlinks.map((project)=>(
                <a href={project.link} style={{paddingRight:'3px'}} className={pagestyles.dditem}><span>&#128307;</span>{project.title}</a>
              ))}
          </div>:<></>
        }
      </div>
    </>
  );
}