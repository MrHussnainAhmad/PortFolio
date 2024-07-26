import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import mybook from "../assets/Book.pdf";

function NavBar() {
  return (
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
        <Link
          to="https://www.linkedin.com/in/hussnain-ahamd-sahi/"
          className={`${styles.Hirebtn} ${styles.customHirebtn}`}
        >
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
  );
}

export default NavBar;
