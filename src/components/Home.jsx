import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import styles from "./styles.module.css";
import resumePDF from "../assets/Resume.pdf";
import img from "../assets/image2.png";
import Welcome from "./Welcome";
import mybook from '../assets/Book.pdf';

function Home({ name }) {
  return (
    <>
      <nav className={`navbar navbar-expand-lg fixed-top ${styles.navbar1}`}>
        <div className="container-fluid">
          <Link className={`navbar-brand me-auto ${styles.navbarbrand1}`} to="/">
            <b>Hussnain Ahmad</b>
          </Link>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Hussnain Ahmad
              </h5>
              <button
                type="button"
                className={`btn-close btn-close-white ${styles.btnclose}`}
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    className={`nav-link mx-lg-2 active ${styles.navlink}`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link mx-lg-2 ${styles.navlink}`}
                    to="/education"  // Ensure this path matches your route
                  >
                    Education
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link mx-lg-2 ${styles.navlink}`}
                    to="#projects"
                  >
                    Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link mx-lg-2 ${styles.navlink}`}
                    href={mybook}
                  >
                    Fantasy Writing
                  </a>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link mx-lg-2 ${styles.navlink}`}
                    to="#contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Link to="/" className={`${styles.Hirebtn} ${styles.customHirebtn}`}>
            Hire-Now
          </Link>
          <button
            className={`navbar-toggler custom-navbar-toggler ${styles.customnavbartoggler} ${styles.navbartoggler}`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target=".offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div className="home-container">
        <Welcome name={name} />
        <div className="about-section">
          <h2>About Me</h2>
          <div className="container text-center">
            <div className="row align-items-center">
              <div className="col">
                <p className="about-text">
                  I'm Hussnain Ahmad, a Front-end Developer from Pakistan,
                  aspiring to become a Full Stack Developer. Currently studying
                  at The Islamia University of Bahawalpur, I aim to attend the
                  University of Melbourne. I enjoy coding, mountain climbing,
                  cooking, and writing fantasy short stories with magical worlds
                  and adventures.
                </p>
              </div>
              <div className="col">
                <img src={img} alt="About" className="about-image" />
              </div>
            </div>
          </div>
          <a
            href={resumePDF}
            className={`btn btn-outline-primary ${styles.resumeBtn}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
