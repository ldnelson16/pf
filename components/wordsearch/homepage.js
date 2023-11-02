import pagestyles from '../../styles/stickynavpagesetup.module.css';
import wsstyles from '../../styles/wordsearch/home.module.css'
import { useState } from 'react';
import { typewrite2 } from '../animations';


export default function HomePage() {
  const title = "Word Search Creator"
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
      </div>
      {showDropdown ? 
        <div className={pagestyles.dropdown}>
            <a href={'https://github.com/ldnelson16'} target="_blank" className={pagestyles.dditem}><span style={{fontSize:'1rem', marginBottom:'auto'}}>&#128307;</span>GitHub</a>
            <a href={'/aboutme'} target="_blank" className={pagestyles.dditem}><span style={{fontSize:'1rem', marginBottom:'auto'}}>&#128307;</span>About Me</a>
        </div>:<></>
      }
    </>
  );
}