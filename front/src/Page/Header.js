import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to="/"
            className="left brand-logo"
          >
            URL Shortener
          </Link>
        </div>
      </nav>
    );
  }
}

export default Header;