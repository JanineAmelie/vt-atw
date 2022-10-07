import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

import Map from "../components/map";
import { IApplicationProps } from "../types/interfaces";
import HeaderBar from "../components/header";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "../themes/themes";

const App: React.FunctionComponent<IApplicationProps> = () => {
  const mapBoxToken = process?.env.REACT_APP_MAPBOX_TOKEN || "";
  const mapBoxStyleURL = process?.env.REACT_APP_MAPBOX_STYLE_URL || "";
  const [loading, setLoading] = useState<boolean>(false);
  // Monitor and Update user state.
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User detected.");
        console.log(auth.currentUser);
      } else {
        console.log("No user detected");
      }
      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <HeaderBar name="VT-ATW" />
        <Map id="vtw-atw" mapboxToken={mapBoxToken} mapStyleURL={mapBoxStyleURL} />
        {loading ? <div>Loading...</div> : ""}
      </div>
    </ThemeProvider>
  );
};

export default App;
