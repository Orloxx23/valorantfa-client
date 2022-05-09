import React from "react";
import styled from "styled-components";
import "./coffee.css";

const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2;
  position: fixed;
  z-index: 100;
  bottom: 450px;
  right: -5px;
  height: 5rem;
  width: 5rem;
  transition: 0.3s ease-in;
  text-decoration: none;
  display: inline-flex;
  color: #ffffff;
  background-color: #d13639;
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 0.7rem 1rem 0.7rem 1rem;
  font-size: 2rem;
  letter-spacing: 0.6px;
  box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5);
  transition: 0.3s all linear;
  font-family: cursive;
  &:hover {
    text-decoration: none;
    box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5);
    font-size: 50px;
    text-align: center;
  }
`;

export default function Coffee() {
  return (
    <Button
      target="_blank"
      href="https://www.buymeacoffee.com/orloxx23"
      rel="noreferrer"
    >
      🍕
    </Button>
  );
}
