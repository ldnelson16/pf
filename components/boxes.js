import boxstyles from '../styles/boxes.module.css';
import {useState} from 'react';
import {useEffect} from 'react';

const projects = [
  {
    title: 'Resume',
    link: '/',
    image: "images/resume.jpg",
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'images/galaxybackground.jpg',
  }
];

export default function Boxes(){
  const type = "Luke Nelson - Personal Portfolio";
  const [cursor,setCursor] = useState("");
  const [typewritten,setType] = useState("");
  useEffect(() => {
    console.log('Page loaded!');
    typewrite();
  }, []);
  async function typewrite() {
    console.log("in function");
    for(let i=0;i<type.length-1;++i){
      setType(type.slice(0,i+1)+"|"+"\u{0020}".repeat(type.length-i));
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setType(type);
    setCursor("_");
  }
  return(
    <>
      <div onLoad={typewrite} className={boxstyles.table}>
        <div className={boxstyles.sticky}>
          <div className={boxstyles.hamburger}>&#9776;</div>
          <div onLoad={typewrite} className={boxstyles.title}>{typewritten}<span className={boxstyles.cursor}>{cursor}</span></div>
          <div className={boxstyles.logo}>Im</div>
        </div>
        <a key="About Me" href={""} className={boxstyles.aboutmeelement}><span style={{backgroundColor: 'rgba(1,1,1,.7)',padding: '5px'}}>About Me</span></a>
        {projects.map((project, index) => (
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
            <span style={{backgroundColor: 'rgba(1,1,1,.7)',padding: '5px'}}>{project.title}</span>
          </a>
        ))}
      </div>
    </>
  );
}