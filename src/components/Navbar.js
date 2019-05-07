import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("");
  const toggleNav = evt => {
    // evt.preventDefault();
    if (active != "") {
      setActive("");
    } else {
      setActive("is-active");
    }
  };

  const closeNav = () => {
    setActive("");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link onClick={closeNav} className="navbar-item" to="/">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: Free, open source, & modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </Link>

        <a
          role="button"
          onClick={toggleNav}
          className={`navbar-burger ${active}`}
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div className={`navbar-menu ${active}`}>
        <div className="navbar-start">
          <Link onClick={closeNav} className="navbar-item" to="/">
            Home
          </Link>
          <Link
            onClick={closeNav}
            activeClassName="is-active"
            className="navbar-item"
            to="/create-task"
          >
            Create
          </Link>
          <Link
            onClick={closeNav}
            activeClassName="is-active"
            className="navbar-item"
            to="/tasks"
          >
            Tasks
          </Link>

          {/* <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                    More
                    </a>

                    <div className="navbar-dropdown">
                    <a className="navbar-item">
                        About
                    </a>
                    <a className="navbar-item">
                        Jobs
                    </a>
                    <a className="navbar-item">
                        Contact
                    </a>
                    <hr className="navbar-divider" />
                    <a className="navbar-item">
                        Report an issue
                    </a>
                    </div>
                </div> */}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <Link onClick={closeNav} className="button is-light" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
