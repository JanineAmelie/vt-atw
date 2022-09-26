import React from "react";
import logo from "../assets/logo.svg";
// import { Link } from "react-router-dom";
interface IHeaderProps {
  name: string;
}

const HeaderBar: React.FunctionComponent<IHeaderProps> = ({ name }) => {
  return (
    <div>
      <header className="App-header">
        {name}
        <img src={logo} className="App-logo" alt="logo" />

        <h1> hi mods</h1>
      </header>
    </div>
  );
};

export default HeaderBar;
