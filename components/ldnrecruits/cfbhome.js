import {useState,useEffect} from 'react';

import homestyles from '../../styles/ldnrecruits/cfbhome.module.css';
import playerstyles from '../../styles/ldnrecruits/cfbplayertable.module.css';
import pagestyles from '../../styles/stickynavpagesetup.module.css';
import {typewrite2,typewritten,setType} from '../animations.js';

export const navlinks = [
  {
    title: 'Recruits Historical Data',
    link: '/ldnrecruits/recruits',
  },
  {
    title: 'Build Your Own Composite',
    link: '/ldnrecruits/byo',
  },
]

export default function Cfbhome(){

  useEffect(() => {
    const containers = [document.querySelector(`.${homestyles.button1}`),document.querySelector(`.${homestyles.button2}`)];
    const content = document.querySelector(`.${homestyles.buttoncontent}`);

    function adjustAlignment() {
      if (screenSize=="computer") {
        containers.forEach((container)=>{if (content.scrollWidth > container.clientWidth) {
          container.style.justifyContent = 'flex-start';
          content.style.textAlign = 'left';
        } else {
          container.style.justifyContent = 'center';
          content.style.textAlign = 'center';
        }})
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 800) {
        setScreenSize("computer");
        console.log("computer size");
      }
      else if (window.innerWidth <= 500) {
        setScreenSize("mobile");
        console.log("mobile size");
      }
      else {
        setScreenSize("tablet");
        console.log("tablet size");
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    window.addEventListener('resize', adjustAlignment);
    adjustAlignment(); // Initial adjustment

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', adjustAlignment);
    };
  }, []);

  const [screenSize,setScreenSize] = useState(false)
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
        {screenSize=="computer" && (<div className={homestyles.grid}>
          <div className={homestyles.button1}><span className={homestyles.buttoncontent}>View Accurate Recruit Data</span></div>
          <div className={homestyles.button2}><span className={homestyles.buttoncontent}>Build Your Own Composite Ranking</span></div>
          <div className={homestyles.searchdiv}>
            <input className={homestyles.searchbar} type="text" placeholder="search for a player"></input>
          </div>
          <div className={homestyles.div4}> </div>
          <div className={homestyles.div5}>DIV5</div>
          <div className={homestyles.div6}> </div>
        </div>)}
        {screenSize=="tablet" && (<div className={homestyles.grid}>
          <div className={homestyles.searchdiv}>
            <input className={homestyles.searchbar} type="text" placeholder="search for a player"></input>
          </div>
          <div className={homestyles.div4}> </div>
          <div className={homestyles.div5}>DIV5</div>
          <div className={homestyles.div6}> </div>
        </div>)}
        {screenSize=="mobile" && (<div className={homestyles.grid}>
          <div className={homestyles.button1}><span className={homestyles.buttoncontent}>View Accurate Recruit Data</span></div>
          <div className={homestyles.button2}><span className={homestyles.buttoncontent}>Build Your Own Composite Ranking</span></div>
          <div className={homestyles.searchdiv}>
            <input className={homestyles.searchbar} type="text" placeholder="search for a player"></input>
          </div>
          <div className={homestyles.div4}> </div>
          <div className={homestyles.div5}>DIV5</div>
          <div className={homestyles.div6}> </div>
        </div>)}
      </div>
    </>
  );
}