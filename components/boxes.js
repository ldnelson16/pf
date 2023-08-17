import boxstyles from '../styles/boxes.module.css';

const projects = [
  {
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },
  {
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },
  {
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  },{
    title: 'Project 1',
    link: 'link-to-project-1',
    image: 'project-1-image-url',
  },
  {
    title: 'Project 2',
    link: 'link-to-project-2',
    image: 'project-2-image-url',
  }
];

export default function Boxes(){
  return(
    <>
      <div className={boxstyles.table}>
        <div className={boxstyles.sticky}>
          <div className={boxstyles.hamburger}>&#9776;</div>
        </div>
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            className={boxstyles.element}
            style={{ backgroundImage: `url(${project.image})` }}
          >
            {project.title}
          </a>
        ))}
      </div>
    </>
  );
}