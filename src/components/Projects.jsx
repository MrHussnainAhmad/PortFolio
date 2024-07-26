// src/components/Projects.js

import React from 'react';
import styles from './Projects.module.css';
import NavBar from './Navbar';
import Footer from './Footer';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';

const projects = [
  {
    title: 'Self-Portfolio',
    description: 'A cutting-edge project using the latest technologies.',
    link: 'https://hussnainahmad.me/',
    image: img1
  },
  {
    title: 'HidayaPortal',
    description: 'A site for Muslims, to connect Muslims.',
    link: '/indev',
    image: img2
  },
];

function Projects({name}) {
  return ( <>
  <NavBar />
    <div className={styles.projectsContainer}>
      <div className={styles.welcomeContainer}>
        <h1 className={styles.welcomeHeading}>Welcome {name} to My Projects</h1>
        <p className={styles.welcomeMessage}>Here you can explore some of the projects that showcase my skills and passion.</p>
        <p className={styles.welcomeDescription}>Each project represents a milestone in my journey, reflecting my dedication and creativity.</p>
      </div>
      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <img src={project.image} alt={project.title} className={styles.projectImage} />
            <div className={styles.projectContent}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Projects;
