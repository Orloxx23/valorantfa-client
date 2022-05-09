import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/"><h1>VFA</h1></Link>
        </div>
        <div className="nav-items dnone">
          <i className="fa-solid fa-user"></i>
          <i className="fa-solid fa-user"></i>
        </div>
      </div>
    </>
  );
}
