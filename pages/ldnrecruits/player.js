import { useRouter } from 'next/router';
import * as playerdata from '../../data/recruitingdata.json';
import cfbstyles from '../../styles/ldnrecruits/cfbhome.module.css';
import pagestyles from '../../styles/stickynavpagesetup.module.css';
import {typewrite2} from '../../components/animations.js';
import {useState} from 'react';
import {navlinks} from '../../components/ldnrecruits/cfbhome.js';

const PlayerDetailPage = () => {
  const router = useRouter();
  const { playerId, dateIndex, year } = router.query;
  let name,citystate,position;
  try {
    name = playerdata["Class"+String(year)]["players"][playerId]["name"];
    citystate = playerdata["Class"+String(year)]["players"][playerId]["City"]+", "+playerdata["Class"+String(year)]["players"][playerId]["State"];
    position = playerdata["Class"+String(year)]["players"][playerId]["Pos"];
  }
  catch(err) {
    name = "Please go back to previous page and reselect player ...";
    citystate = "";
    position = "";
  }
  const title = "LDN Recruiting";
  const [typewritten,setType] = useState(title);
  const [cursor,setCursor] = useState("_");
  const [showDropdown, setDropdown] = useState(false);

  // Fetch player data based on playerId
  // ...

  return (
    <div className={pagestyles.page}>
      <div className={pagestyles.navbar}>
        <div onClick={()=>setDropdown(!showDropdown)} className={pagestyles.hamburger}>&#9776;</div>
        <div onClick={()=>typewrite2(title,setType,setCursor)} className={pagestyles.title}>{typewritten}<span className={pagestyles.cursor}>{cursor}</span></div>
        <a href={"/"}><div className={pagestyles.logo}><img src="../images/lnlogowhite.png"></img></div></a>
      </div>
      {showDropdown ? 
      <div className={pagestyles.dropdown}>
          {navlinks.map((project)=>(
            <a href={project.link} style={{paddingRight:'3px'}} className={pagestyles.dditem}><span>&#128307;</span>{project.title}</a>
          ))}
      </div>:<></>
      }
      <div className={cfbstyles.playerbox}>
        <div className={cfbstyles.playerdemo}>
          <div className={cfbstyles.playername}>{name}</div>
          <div className={cfbstyles.playerpos}>{position}</div>
          <div className={cfbstyles.citystate}>{citystate}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailPage;