import React from "react";
import "./button.css";

export default function Button(props) {
  const click = () => {
    if (props.onClick != null) {
      props.onClick();
    }
  };

  return (
    <>
      <div className="button-borders">
        <button className="primary-button" onClick={() => click()}>{props.text}</button>
      </div>
    </>
  );
}
