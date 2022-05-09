import React, { useState } from "react";
import Button from "../Button";
import axios from "axios";
import "./formcard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Coffee from "../Coffee";

export default function FormCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const notify = (text, error) => {
    if (error) {
      toast.error(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const open = () => {
    setIsOpen(!isOpen);
  };

  const handleEmail = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handleDescription = (event) => {
    const desc = event.target.value;
    setDescription(desc);
  };

  const enviar = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email.length !== "" && description.length !== "") {
      await axios
        .post("https://valorantfa-api.herokuapp.com/api/sugerencias", {
          email: email,
          description: description,
        })
        .then(() => {
          notify("Se ha enviado correctamente", false);
        })
        .catch(() => {
          notify("Algo salio mal, intentalo mas tarde", true);
        });
    }
    setLoading(false);
    setEmail("");
    setDescription("");
    open();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      
      <div
        className={
          isOpen ? "formcard-container formcard-open" : "formcard-container"
        }
      >
        <Coffee/>
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
              value={email}
              onChange={(text) => handleEmail(text)}
              required
            />
            <textarea
              placeholder="Descripción"
              type="text"
              className="input"
              value={description}
              onChange={(text) => handleDescription(text)}
              required
            />
            <Button text="enviar" />
          </form>
        </div>
      </div>
    </>
  );

  
}
