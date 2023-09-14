import {useState,useEffect} from 'react';

import homestyles from '../../styles/ldnrecruits/cfbhome.module.css';
import playerstyles from '../../styles/ldnrecruits/cfbplayertable.module.css';
import pagestyles from '../../styles/stickynavpagesetup.module.css';
import {typewrite2,typewritten,setType} from '../animations.js';
import ContactForm from '../ContactForm';
import Link from 'next/link';

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

  const [screenSize,setScreenSize] = useState("false");
  useEffect(() => {
    const containers = [document.querySelector(`.${homestyles.button1}`),document.querySelector(`.${homestyles.button2}`)];
    const content = document.querySelector(`.${homestyles.buttoncontent}`);

    const handleResize = () => {
      if (window.innerWidth >= 800) {
        setScreenSize(last=>"computer");
        console.log("computer");
      }
      else if (window.innerWidth <= 500) {
        setScreenSize(last=>"mobile");
        console.log("mobile");
      }
      else {
        setScreenSize(last=>"tablet");
        console.log("tablet");
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize',handleResize);
    };
  }, [screenSize]);

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
          <Link href="/ldnrecruits/recruits" className={homestyles.button1}><span className={homestyles.buttoncontent}>Recruit Data</span></Link>
          <Link href="/ldnrecruits/byo" className={homestyles.button2}><span className={homestyles.buttoncontent}>Build a Composite Ranking</span></Link>
          <div className={homestyles.searchdiv}>
            <input className={homestyles.searchbar} type="search" placeholder="search for a player . . ." pattern=".*\S.*" required></input>
          </div>
          <div className={homestyles.div4}>
            <ContactForm></ContactForm>
          </div>
          <div style={{backgroundImage:"url(/images/footballfield.jpg)",backgroundSize:"cover",backgroundPosition:"center",opacity:"0.2"}} className={homestyles.div5}></div>
          <div className={homestyles.div5}><div className={homestyles.welcome}>Welcome to the Home of LDN Recruiting!</div></div>
          <div className={homestyles.div6} style={{backgroundImage:"url(/images/lnlogowhitebig.png)",backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}></div>
        </div>)}
        {screenSize=="tablet" && (<div className={homestyles.grid}>
          <div className={homestyles.searchdiv}>
            <input className={homestyles.searchbar} type="text" placeholder="search for a player"></input>
          </div>
          <div className={homestyles.div4}>
            <ContactForm></ContactForm>
          </div>
          <div style={{backgroundImage:"url(/images/footballfield.jpg)",backgroundSize:"cover",backgroundPosition:"center",opacity:"0.2"}} className={homestyles.div5}></div>
          <div className={homestyles.div5}><div className={homestyles.welcome}>Welcome to the Home of LDN Recruiting!</div></div>
          <div className={homestyles.div6} style={{backgroundImage:"url(/images/lnlogowhitebig.png)",backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}></div>
        </div>)}
        {screenSize=="mobile"?(<div className={homestyles.grid}>
          <div className={homestyles.searchdiv}>
            <input className={homestyles.searchbar} type="text" placeholder="search for a player"></input>
          </div>
          <div className={homestyles.div4}>
            <ContactForm></ContactForm>
          </div>
          <div style={{backgroundImage:"url(/images/footballfield.jpg)",backgroundSize:"cover",backgroundPosition:"center",opacity:"0.2"}} className={homestyles.div5}></div>
          <div className={homestyles.div5}><div className={homestyles.welcome}>Welcome to the Home of LDN Recruiting!</div></div>
          <div className={homestyles.div6} style={{backgroundImage:"url(/images/lnlogowhitebig.png)",backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}></div>
        </div>):<></>}
      </div>
    </>
  );
}