import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import styles from "./styles.module.css";
import resumePDF from "../assets/Resume.pdf";
import img from "../assets/image2.png";
import Welcome from "./Welcome";
import mybook from "../assets/Book.pdf";
import Footer from "./Footer";

function Home({ name }) {
  return (
    <>
      <nav class={`navbar navbar-expand-lg fixed-top ${styles.navbar1}`}>
        <div class="container-fluid">
          <a class={`navbar-brand me-auto ${styles.navbarbrand1}`} href="/">
            <b>Hussnain Ahmad</b>
          </a>
          <div
            class="offcanvas offcanvas-end text-bg-dark"
            tabindex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Hussnain Ahmad
              </h5>
              <button
                type="button"
                class={`${styles.btnClose} btn-close-white`}
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  className={`nav-link mx-lg-2 active ${styles.navlink}`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
                <li className="nav-item">
                <Link
                  className={`nav-link mx-lg-2 ${styles.navlink}`}
                  to="/education" // Ensure this path matches your route
                >
                  Education
                </Link>
              </li>

                <li className="nav-item">
                <Link
                  className={`nav-link mx-lg-2 ${styles.navlink}`}
                  to="/projects"
                >
                  Projects
                </Link>
              </li>
                <li class="nav-item">
                  <a class={`nav-link mx-lg-2 ${styles.navlink}`} href={mybook}>
                    Fantasy Writings
                  </a>
                </li>
                <li className="nav-item">
                <Link
                  className={`nav-link mx-lg-2 ${styles.navlink}`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              </ul>
            </div>
          </div>
          <Link to="https://www.linkedin.com/in/hussnain-ahamd-sahi/" className={`${styles.Hirebtn} ${styles.customHirebtn}`}>
          Hire-Now
        </Link>
          <button
            class={`navbar-toggler custom-navbar-toggler ${styles.navbartoggler}`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
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
      <Footer />
    </>
  );
}

export default Home;
