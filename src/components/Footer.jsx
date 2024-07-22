import React from 'react';
import footerStyles from './Footer.module.css';
import twitter from '../assets/icons/twitter.svg';
import linkedin from '../assets/icons/linkedin.svg';
import github from '../assets/icons/github.svg';

function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <div className={footerStyles.row}>
          <div className={footerStyles.col}>
            <h4 className={footerStyles.title}>Connect With Me</h4>
            <div className={footerStyles.socialLinks}>
              <a href="https://x.com/HussnainAhmad_" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <img src={twitter} alt="Twitter" /> 
              </a>
              <a href="https://www.linkedin.com/in/hussnain-ahamd-sahi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src={linkedin} alt="LinkedIn" />
              </a>
              <a href="https://github.com/MrHussnainAhmad" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img src={github} alt="GitHub" />
              </a>
            </div>
          </div>
          <div className={footerStyles.col}>
            <h4 className={footerStyles.title1}>Urgent Contact Information</h4>
            <ul className={footerStyles.contactInfo}>
              <li>Email: mrhussnainahmad@gmail.com</li>
              <li>Phone: +923-1717232380</li>
              <li>Location: Dunyapur, Pakistan</li>
            </ul>
          </div>
        </div>
        <div className={footerStyles.copy}>
          &copy; {new Date().getFullYear()} Hussnain Ahmad. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
