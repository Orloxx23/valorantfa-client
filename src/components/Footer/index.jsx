import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-logo">
          <Link to="/"><h1>VFA</h1></Link>
        </div>
      </div>
    </>
  );
}
