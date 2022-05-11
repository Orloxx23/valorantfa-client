import React from "react";
import "./home.css";
import "../../assets/css/styles.css";
import { Brimstone, Kayo, Viper } from "../../assets/img";
import { Button, Card, Footer, Nav } from "../../components";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
  const goTo = (to) => {
    navigate(to);
  };
  return (
    <>
    <Nav/>
      <div className="coverpage">
        <div className="coverpage-left">
          <div className="left-content">
            <h1>Valorant for all</h1>
            <p>Recopilación de videos para mejorar en valorant</p>
            <Button text="ver" onClick={() => goTo("videos")} />
          </div>
        </div>
        <div className="coverpage-right">
          <img src={Brimstone} alt="Brimstone valorant" />
        </div>
      </div>
      <div className="section1">
        <Card text="guias" personaje={Viper}/>
        <Card text="consejos" personaje={Kayo}/>
      </div>
      <Footer/>
    </>
  );
}
