import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

import HeaderBar from "../components/header";
import Map from "../components/map";

export interface IApplicationProps {
  name?: string;
}
const App: React.FunctionComponent<IApplicationProps> = (props) => {
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
    <div className="App">
      <div>
        <Map id="vtw-atw" mapboxToken={mapBoxToken} mapStyleURL={mapBoxStyleURL} />
      </div>
      {/* {loading ? <div>Loading...</div> : ""} */}
      {/* <SignUp /> */}
    </div>
  );
};

export default App;
