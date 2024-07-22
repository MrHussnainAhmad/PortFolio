import React from "react";
import eduStyles from "./Education.module.css";
import NavBar from "./Navbar";
import certificates from './certificates.json';
import Footer from "./Footer";

function Education({ name }) {
  return (
    <>
      <NavBar />
      <div className={`edu-container ${eduStyles.eduContainer}`}>
        <center>
          <h1 className={eduStyles.eduH1}>Well, {name}.</h1>
        </center>
        <p className={eduStyles.eduP}>
          Welcome to the foundation of my knowledge and expertise. This is where
          my journey as a developer truly began.
        </p>
        <p className={eduStyles.eduP}>
          Dive in to discover the academic milestones and skills that have paved
          my path.
        </p>
      </div>
      <div className={eduStyles.Education}>
        <div className={eduStyles.eduBox}>
          <h2 className={eduStyles.eduBoxHeading}>
            The Islamia University of Bahawalpur
          </h2>
          <h3 className={eduStyles.eduBoxSubHeading}>
            Bachelors in Computer Science
          </h3>
          <p className={eduStyles.eduBoxParagraph}>2023-2027</p>
        </div>
      </div>
      <div className={eduStyles.Certificates}>
        <center>
          {" "}
          <h2>Ceritfication</h2>
        </center>
        <div className={eduStyles.certificatesContainer}>
          {certificates.map((certificate, index) => (
            <div className={eduStyles.certificateCard} key={index}>
              <div className={eduStyles.certificateInfo}>
                <h4 className={eduStyles.certificateTitle}>{certificate.title}</h4>
                <p className={eduStyles.certificateIssuer}>{certificate.issuer}</p>
                <a 
                  href={certificate.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={eduStyles.certificateButton}
                >
                  Verify Certificate
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

export default Education;
