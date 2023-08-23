import cfbstyles from '../../styles/ldnrecruits/cfbplayertable.module.css';
import pagestyles from '../../styles/stickynavpagesetup.module.css';
import {useState} from 'react';
import * as classdata from '../../data/recruitingdata.json';
import { typewrite2 } from '../animations';
import {navlinks} from './cfbhome.js';
import Link from 'next/link';

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
            <h2>
                Recruiting Site Data from {date}
            </h2>
            <select className={cfbstyles.dropdown} onChange={handleDateSelection}>
                {dates.map((date,i)=>(<option value={i}>{date}</option>))}
            </select>
            <select className={cfbstyles.dropdown} onChange={handleYearSelection}>
                {years.map((year)=>(<option value={year}>{year}</option>))}
            </select>
        </>
    );
}

const CompositeWeight = ({percentdata,setPercent}) => {
    const handlePercentages = () => {
        console.log("Percentages submitted");
        const {ron3,r247,respn,rrivals} = percentdata;
        var total = Number(ron3)+Number(r247)+Number(respn)+Number(rrivals);
        total = total.toFixed(2);
        if(total==100){console.log("Percents Valid");}
        else{console.log("Percents Invalid");}
    }
    const percentChange = (event) => {
        console.log("Percent changed");
        const{name,value}=event.target;
        setPercent((percentdata)=>({...percentdata,[name]:value}));
        console.log("% Data after percentChange ");
        console.log(percentdata);
    }

    return(
        <>
            <div className={cfbstyles.weightSelection}>
                <input type="number" id="ON3 Weight" name="ron3" min="0" max="100" step="0.1" placeholder="ON3" onChange={percentChange}></input>
                <input type="number" id="247 Weight" name="r247" min="0" max="100" step="0.1" placeholder="247" onChange={percentChange}></input>
                <input type="number" id="ESPN Weight" name="respn" min="0" max="100" step="0.1" placeholder="ESPN" onChange={percentChange}></input>
                <input type="number" id="Rivals Weight" name="rrivals" min="0" max="100" step="0.1" placeholder="Rivals" onChange={percentChange}></input>
                <button onClick={handlePercentages}>Submit</button>
            </div>
        </>
    );
}

const HeaderCell = ({setSort}) => {
    const handleClick = (event) => {
        console.log("Now sorting based on "+event.currentTarget.dataset.value);
        setSort(event.currentTarget.dataset.value);
    }
    const sortComposite = () => {
        console.log("Sorting by composite");
        setSort("Composite");
    }
    return(
        <div className={cfbstyles.headerCell} id="header">
            <div className={cfbstyles.playerInfo} data-value="name" onClick={handleClick}>
                <em>Player Info</em>
            </div>
            <div className={cfbstyles.ron3} data-value="ON3 Rating" onClick={handleClick}>
                <em>ON3</em>
            </div>
            <div className={cfbstyles.r247} data-value="247 Rating" onClick={handleClick}>
                <em>247</em>
            </div>
            <div className={cfbstyles.respn} data-value="ESPN Rating" onClick={handleClick}>
                <em>ESPN</em>
            </div>
            <div className={cfbstyles.rrivals} data-value="Rivals Rating" onClick={handleClick}>
                <em>Rivals</em>
            </div>
            <div className={cfbstyles.commitInfo}>
                <em>Commit Status</em>
            </div>
            <div className={cfbstyles.compositeInfo} onClick={sortComposite}>
                <em>Composite</em>
            </div>
        </div>
    );
} 

function calculateComposite(percentdata,ranks,mins){
    const {ron3,r247,respn,rrivals} = percentdata;
    var total = Number(ron3)+Number(r247)+Number(respn)+Number(rrivals);
    total = total.toFixed(2);
    if(total!=100){return "";}
    ranks.map((ele,i)=>{if((ele)=="-"){if(i!=3){ranks[i]=mins[i]-1;}else{ranks[i]=mins[i]-.1}}});
    const val = ranks[0]*ron3/100+ranks[1]*r247/100+ranks[2]*respn/100+(ranks[3]-2.1)*rrivals/4;
    return val.toFixed(3);
}

const PlayerCell = ({data,dateindex,yearindex,percentdata,mins}) => {
    return(
        <div className={cfbstyles.playerCell} key={data["key"]}>
            <div className={cfbstyles.playerInfo}>
                <div className={cfbstyles.posInfo}>
                    {data["Pos"]}
                </div>
                <div className={cfbstyles.locationInfo}>
                    {data["City"]+", "+data["State"]}
                </div>
                <Link href={{ pathname: '/ldnrecruits/player', query: { playerId: data["key"], dateIndex: dateindex, year: yearindex } }}>
                    <div className={cfbstyles.nameInfo}>{data["name"]}</div>
                </Link>
            </div>
            
            <div className={cfbstyles.ron3}>
                {data["ON3 Rating"][dateindex]}
            </div>
            <div className={cfbstyles.r247}>
                {data["247 Rating"][dateindex]}
            </div>
            <div className={cfbstyles.respn}>
                {data["ESPN Rating"][dateindex]}
            </div>
            <div className={cfbstyles.rrivals}>
                {data["Rivals Rating"][dateindex]}
            </div>
            {data["Commit Status"][dateindex]==false?<div className={cfbstyles.commitInfo}>Uncommitted</div>:data["Commit Status"][dateindex]=="No Data Yet"?<div className={cfbstyles.commitInfo}>No Data</div>:<div className={cfbstyles.commitInfo}><b>{data["Commit Status"][dateindex]}</b></div>}
            <div className={cfbstyles.compositeInfo}>
                {calculateComposite(percentdata,[data["ON3 Rating"][dateindex],data["247 Rating"][dateindex],data["ESPN Rating"][dateindex],data["Rivals Rating"][dateindex]],mins)}
            </div>
        </div>
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

const PlayerData = ({data,value,sort,percentdata,year}) => {
    //Find mins for composite processing
    var mins = [100,100,100,6.1];
    ["ON3 Rating","247 Rating","ESPN Rating","Rivals Rating"].map((item,i)=>{
        data.map((ele)=>{
            if(ele[item][value]!="-"&&Number(ele[item][value])<mins[i]){mins[i]=Number(ele[item][value]);}
        })
    });
    if(sort!="Composite"){var newdata = data.slice().sort((a,b)=>playersort(a,b,sort,value));}
    else{var newdata=data.slice().sort((a,b)=>calculateComposite(percentdata,[b["ON3 Rating"][value],b["247 Rating"][value],b["ESPN Rating"][value],b["Rivals Rating"][value]],mins)-calculateComposite(percentdata,[a["ON3 Rating"][value],a["247 Rating"][value],a["ESPN Rating"][value],a["Rivals Rating"][value]],mins))}
    newdata=newdata.filter((obj)=>obj["ON3 Rating"][value]!="-"||obj["247 Rating"][value]!="-"||obj["ESPN Rating"][value]!="-"||obj["Rivals Rating"][value]!="-");
    console.log("Sorted by "+sort);
    console.log("% Data in PlayerData");

    return(
        <>
            {newdata.map((element)=>(<PlayerCell data={element} dateindex={value} yearindex={year} percentdata={percentdata} mins={mins}></PlayerCell>))}
        </>
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
              <CompositeWeight percentdata={percentdata} setPercent={setPercent}></CompositeWeight>
              {console.log("DATA processing from JSON file")}
              <HeaderCell setSort={setSort}></HeaderCell>
              <PlayerData data={classdata["Class"+String(recclass)]["players"]} value={value} sort={sorttype} percentdata={percentdata} year={recclass}></PlayerData>
            </div>
          </div>
        </>
    )    
}