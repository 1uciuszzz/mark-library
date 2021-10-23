import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="container-fluid">
      <div className="container">
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light border border-dark border-5"
          id="navbar"
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Mark Library
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item myLink">
                  <NavLink className="nav-link nes-btn is-primary" to="/marks">
                    主页
                  </NavLink>
                </li>
                <li className="nav-item myLink">
                  <NavLink className="nav-link nes-btn is-warning" to="/about">
                    关于
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
