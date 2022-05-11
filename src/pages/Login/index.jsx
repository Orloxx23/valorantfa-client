import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  let navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const getUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const getContraseña = (e) => {
    setContraseña(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8800/api/auth/login", {
        usuario: usuario,
        contraseña: contraseña,
      })
      .then((res) => {
        const usuario = res.data;
        localStorage.setItem("token", usuario.data.token);
        navigate("/admin");
      })
      .catch((error) => {
        notify("Algo anda mal, intentalo de nuevo");
      });
  };

  const notify = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // const getToken = () => {
  //   if (localStorage.getItem("token")) {
  //     return localStorage.getItem("token");
  //   } else {
  //     return null;
  //   }
  // };

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
      <div className="back-arrow" onClick={() => navigate("/")}>
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <form onSubmit={(e) => login(e)}>
        <div className="login-wrap">
          <div className="login-html">
            <input
              id="tab-1"
              type="radio"
              name="tab"
              className="sign-in"
              checked
              readOnly
            />
            <label className="tab">Administración</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up"/>
            <label className="tab"></label>
            <div className="login-form">
              <div className="sign-in-htm">
                <div className="group">
                  <label className="label">Username</label>
                  <input
                    onChange={(e) => getUsuario(e)}
                    id="user"
                    type="text"
                    className="input"
                    required
                  />
                </div>
                <div className="group">
                  <label className="label">Password</label>
                  <input
                    onChange={(e) => getContraseña(e)}
                    id="pass"
                    type="password"
                    className="input"
                    data-type="password"
                    required
                  />
                </div>
                {/* <div className="group">
                <input id="check" type="checkbox" className="check" checked />
                <label for="check">
                  <span className="icon"></span> Keep me Signed in
                </label>
              </div> */}
                <div className="group">
                  <input
                    type="submit"
                    className="button"
                    value="Acceder"
                  />
                </div>
                <div className="hr"></div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
