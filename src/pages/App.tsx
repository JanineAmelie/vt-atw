import React, { useEffect, useState } from "react";
import "firebase/compat/firestore";
import { auth } from "../config/firebase";
import { IApplicationProps } from "../types/interfaces";
import HeaderBar from "../components/HeaderBar";
import GlobeMap from "../components/GlobeMap";
import "mapbox-gl/dist/mapbox-gl.css";
import { intl } from "../utils/intl";

const App: React.FunctionComponent<IApplicationProps> = () => {
  const mapBoxToken = process?.env.REACT_APP_MAPBOX_TOKEN || "";
  const mapBoxStyleURL = process?.env.REACT_APP_MAPBOX_STYLE_URL || "";
  const [loading, setLoading] = useState<boolean>(false);
  const { en } = intl;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(en.api.successUserDetected);
        console.log(auth.currentUser);
      } else {
        console.log(en.api.errorNoUserDetected);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <HeaderBar name={en.global.appTitle} loginText={en.global.login} />
      <GlobeMap id="vtw-atw" mapboxToken={mapBoxToken} mapStyleURL={mapBoxStyleURL} />
      {loading ? <div>{en.global.loading}</div> : ""}
    </div>
  );
};

export default App;
