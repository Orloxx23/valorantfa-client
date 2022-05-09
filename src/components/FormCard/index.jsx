import React, { useEffect, useState } from "react";
import Button from "../Button";
import axios from "axios";
import "./formcard.css";

export default function FormCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [type, setType] = useState("sugerencia");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const open = () => {
    setIsOpen(!isOpen);
  };

  const handleEmail = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    console.log(email);
  };

  const handleDescription = (event) => {
    const desc = event.target.value;
    setDescription(desc);
    console.log(description);
  };

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setType("bug");
    } else {
      setType("sugerencia");
    }
    console.log(type);
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (email.length !== "" && description.length !== "") {
      await axios.post("http://localhost:8800/api/sugerencias", {
        email: email,
        sugerencia: description,
        type: type,
      });
    } else {
      console.log("NO");
    }
  };

  return (
    <>
      <div
        className={
          isOpen ? "formcard-container formcard-open" : "formcard-container"
        }
      >
        <div className="box red">
          <div className="formcard-header">
            <h2>Sugerencia / Reportar bug</h2>
            <div className="formcard-action" onClick={() => open()}>
              {isOpen ? (
                <i className="fa-solid fa-xmark"></i>
              ) : (
                <i className="fa-solid fa-angle-up"></i>
              )}
            </div>
          </div>
          <form onSubmit={(e) => enviar(e)} className="formcard-form">
            <input
              placeholder="Email"
              type="email"
              className="input"
              onChange={(text) => handleEmail(text)}
              required
            />
            <textarea
              placeholder="Descripción"
              type="text"
              className="input"
              onChange={(text) => handleDescription(text)}
              required
            />
            <div className="formcard-type">
              <p className="mr">Sugerencia</p>
              <label className="switch">
                <input type="checkbox" onChange={() => handleOnChange()} />
                <span className="slider"></span>
              </label>
              <p className="ml">Bug</p>
            </div>
            <Button text="enviar" />
          </form>
        </div>
      </div>
    </>
  );
}
