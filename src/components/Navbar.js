import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { connect } from "react-redux";

const Navbar = ({ auth,user }) => {
  const [active, setActive] = useState("");
  const toggleNav = evt => {
    // evt.preventDefault();
    if (active !== "") {
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
            alt="task-organiser"
            title="task organiser"
            width="112"
            height="28"
          />
        </Link>

        <button
          onClick={toggleNav}
          className={`navbar-burger ${active}`}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div className={`navbar-menu ${active}`}>
        {auth ? (
          <div className="navbar-start">
            <Link onClick={closeNav} className="navbar-item" to="/">
              Home
            </Link>
            <Link
              onClick={closeNav}
              activeClassName="is-active"
              className="navbar-item"
              to="/tasks"
            >
              Tasks
            </Link>
            <Link
              onClick={closeNav}
              activeClassName="is-active"
              className="navbar-item"
              to="/groups"
            >
              Groups
            </Link>
            <Link
              onClick={closeNav}
              activeClassName="is-active"
              className="navbar-item"
              to="/members"
            >
              Members
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
        ) : (
          ""
        )}
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              
              {auth ? <button className="button is-primary">
                <strong>{user.name|| "Account"}</strong>
              </button>:""
              }
              {auth ? (
                <LogoutBtn />
              ) : (
                <Link
                  onClick={closeNav}
                  className="button is-light"
                  to="/login"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => {
  return { 
      auth: auth.authenticated,
      user:auth.user
    };
};

export default connect(mapStateToProps)(Navbar);
