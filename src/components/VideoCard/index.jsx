import React from "react";
import "./videocard.css";
import { Link } from "react-router-dom";

export default function VideoCard(props) {
  return (
    <>
      <Link to="" className="card">
        <img
          src={props.img}
          className="card__image"
          alt=""
        />
        <div className="card__overlay">
          <div className="card__header">
            <div className="card__header-text">
              <h3 className="card__title">{props.title}</h3>
            </div>
          </div>
          <p className="card__description">{props.autor}</p>
        </div>
      </Link>
    </>
  );
}
