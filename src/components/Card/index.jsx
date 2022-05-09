import React from "react";
import "./card.css";

export default function Card(props) {
  const personaje = {
    width: "100%",
    height: "100%",
    transition: ".3s",
    "background-image": `url(${props.personaje})`,
    "background-repeat": "no-repeat",
    "background-position": "15rem -3rem",
    "background-size": "cover",
  };

  const click = () => {
    if(props.onClick != null){
      props.onClick();
    }
  }

  return (
    <>
      <div className="card-container hover-effect" onClick={() => click()}>
        <div className="card-bg">
          <div style={personaje}>
            <div className="card-text">{props.text}</div>
          </div>
        </div>
      </div>
    </>
  );
}
