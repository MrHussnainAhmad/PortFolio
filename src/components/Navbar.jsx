import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import mybook from '../assets/Book.pdf';

function NavBar() {
  return (
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
                  to="/education" // Ensure this path matches your route
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
  );
}

export default NavBar;
