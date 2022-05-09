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
      <div class="button-borders">
        <button class="primary-button" onClick={() => click()}>{props.text}</button>
      </div>
    </>
  );
}
