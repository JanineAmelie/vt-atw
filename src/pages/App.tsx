import React from "react";
import "./App.css";

import HeaderBar from "../components/header";

const App: React.FC = () => {
  return (
    <div className="App">
      <HeaderBar name={"vt-atw"} />
    </div>
  );
};

export default App;
