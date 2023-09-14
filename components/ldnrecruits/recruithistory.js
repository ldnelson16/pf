"use client";
import cfbstyles from '../../styles/ldnrecruits/cfbplayertable.module.css';
import pagestyles from '../../styles/stickynavpagesetup.module.css';
import {useState} from 'react';
import * as classdata from '../../data/recruitingdata.json';
import { typewrite2 } from '../animations';
import {navlinks} from './cfbhome.js';
import Link from 'next/link';
import {useRouter} from 'next/router';

const DatesDropdown = ({dates,setValue,setRecclass,date,years}) => {
    const handleDateSelection = (event) => {
        console.log("Changed date dropdown selection to collect data from "+event.target.options[event.target.selectedIndex].text);
        setValue(event.target.value);
    }
    const handleYearSelection = (event) => {
        console.log("Changed dropdown year selection to collect data from the class of "+event.target.options[event.target.selectedIndex].text);
        setRecclass(event.target.value);
    }
    return(
        <>
            <h2 className={cfbstyles.heading}>
                Recruiting Data from {date}
            </h2>
            <div><select className={cfbstyles.dropdown} onChange={handleDateSelection}>
                {dates.map((date,i)=>(<option value={i}>{date}</option>))}
            </select>
            <select className={cfbstyles.dropdown} onChange={handleYearSelection}>
                {years.map((year)=>(<option value={year}>{year}</option>))}
            </select></div>
        </>
    );
}

const HeaderCell = ({setSort}) => {
    const handleClick = (event) => {
        console.log("Now sorting based on "+event.currentTarget.dataset.value);
        setSort(event.currentTarget.dataset.value);
    }
    return (
    <thead>
        <tr className={cfbstyles.headerCell} id="header">
        <th className={cfbstyles.playerInfo} data-value="name" onClick={handleClick}>
            <em>Player Info</em>
        </th>
        <th className={cfbstyles.ron3} data-value="ON3 Rating" onClick={handleClick}>
            <em>ON3<span style={{fontSize:"10px"}}>&#9660;</span></em>
        </th>
        <th className={cfbstyles.r247} data-value="247 Rating" onClick={handleClick}>
            <em>247<span style={{fontSize:"10px"}}>&#9660;</span></em>
        </th>
        <th className={cfbstyles.respn} data-value="ESPN Rating" onClick={handleClick}>
            <em>ESPN<span style={{fontSize:"10px"}}>&#9660;</span></em>
        </th>
        <th className={cfbstyles.rrivals} data-value="Rivals Rating" onClick={handleClick}>
            <em>Rivals<span style={{fontSize:"10px"}}>&#9660;</span></em>
        </th>
        <th className={cfbstyles.commitInfo}>
            <em>Commit Status</em>
        </th>
        </tr>
    </thead>
    );
} 

function calculateComposite(percentdata,ranks,mins){
    var {ron3,r247,respn,rrivals} = percentdata;
    var total = Number(ron3)+Number(r247)+Number(respn)+Number(rrivals);
    total = total.toFixed(2);
    if(total!=100){
        var mult = 100/total;
        ron3*=mult;
        r247*=mult;
        respn*=mult;
        rrivals*=mult;
}
    ranks.map((ele,i)=>{if((ele)=="-"){if(i!=3){ranks[i]=mins[i]-1;}else{ranks[i]=mins[i]-.1}}});
    const val = ranks[0]*ron3/100+ranks[1]*r247/100+ranks[2]*respn/100+(ranks[3]-2.1)*rrivals/4;
    return val.toFixed(3);
}

const PlayerCell = ({data,dateindex,yearindex,percentdata,mins}) => {
    return (
    <tr className={cfbstyles.playerCell} key={data["key"]}>
        <td>
        <div className={cfbstyles.playerInfo}>
        <div className={cfbstyles.posInfo}>{data["Pos"]}</div>
        <div className={cfbstyles.locationInfo}>{data["City"] + ", " + data["State"]}</div>
        <Link href={{ pathname: '/ldnrecruits/player', query: { playerId: data["key"], dateIndex: dateindex, year: yearindex } }}>
            <div className={cfbstyles.nameInfo}>{data["name"]}</div>
        </Link>
        </div>
        </td>

        <td className={cfbstyles.ron3}>{data["ON3 Rating"][dateindex]}</td>
        <td className={cfbstyles.r247}>{data["247 Rating"][dateindex]}</td>
        <td className={cfbstyles.respn}>{data["ESPN Rating"][dateindex]}</td>
        <td className={cfbstyles.rrivals}>{data["Rivals Rating"][dateindex]}</td>

        {data["Commit Status"][dateindex] === false ? (
        <td className={cfbstyles.commitInfo}>Uncommitted</td>
        ) : data["Commit Status"][dateindex] === "No Data Yet" ? (
        <td className={cfbstyles.commitInfo}>No Data</td>
        ) : (
        <td className={cfbstyles.commitInfo}>
            <b>{data["Commit Status"][dateindex]}</b>
        </td>
        )}
    </tr>
    );
};

function playersort(a,b,sort,value,reverse=false){
    let ret;
    if(a[sort][value]=="-" && b[sort][value]=="-"){ret=0;}
    else if (a[sort][value]=="-"){ret=1}
    else if (b[sort][value]=="-"){ret=-1}
    else {ret=b[sort][value]-a[sort][value];}
    if(!reverse){return ret}
    else{return -ret}
}

const PlayerData = ({data,value,sort,percentdata,year,setSort}) => {
    //Find mins for composite processing
    var mins = [100,100,100,6.1];
    ["ON3 Rating","247 Rating","ESPN Rating","Rivals Rating"].map((item,i)=>{
        data.map((ele)=>{
            if(ele[item][value]!="-"&&Number(ele[item][value])<mins[i]){mins[i]=Number(ele[item][value]);}
        })
    });
    var newdata = data.slice().sort((a,b)=>playersort(a,b,sort,value));
    newdata=newdata.filter((obj)=>obj["ON3 Rating"][value]!="-"||obj["247 Rating"][value]!="-"||obj["ESPN Rating"][value]!="-"||obj["Rivals Rating"][value]!="-");
    console.log("Sorted by "+sort);
    console.log("% Data in PlayerData");

    return(
        <table className={cfbstyles.table}>
            <HeaderCell setSort={setSort}></HeaderCell>
            <tbody>
                {newdata.map((element) => (
                <PlayerCell
                    data={element}
                    dateindex={value}
                    yearindex={year}
                    percentdata={percentdata}
                    mins={mins}
                    key={element["key"]}
                ></PlayerCell>
                ))}
            </tbody>
        </table>
    );
};

export default function ByoTable(){
    const [recclass,setRecclass] = useState(new Date().getFullYear()+1);
    const [value,setValue] = useState(0);
    const [sorttype,setSort] = useState("name");
    const [percentdata,setPercent] = useState({ron3:0,r247:0,respn:0,rrivals:0});
    const [mins,setMins] = useState({ron3:100,r247:100,respn:100,rrivals:6.1});

    const title = "LDN Recruits - Home"
    const [typewritten,setType] = useState(title);
    const [cursor,setCursor] = useState("_");
    const [showDropdown, setDropdown] = useState(false);
    return(
        <>
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
            <div className={cfbstyles.playerTable}>
              <DatesDropdown dates={classdata["Class"+String(recclass)]["dates"]} setValue={setValue} setRecclass={setRecclass} date={classdata["Class"+String(recclass)]["dates"][value]} years={classdata["years"]}></DatesDropdown>
              {console.log("DATA processing from JSON file")}
              <PlayerData data={classdata["Class"+String(recclass)]["players"]} value={value} sort={sorttype} percentdata={percentdata} year={recclass} setSort={setSort}></PlayerData>
            </div>
          </div>
        </>
    )    
}