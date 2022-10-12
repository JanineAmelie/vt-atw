import React, { useEffect, useState } from "react";
import "firebase/compat/firestore";
import { auth } from "../config/firebase";
import { IApplicationProps } from "../types/interfaces";
import HeaderBar from "../components/HeaderBar";
import GlobeMap from "../components/GlobeMap";
import "mapbox-gl/dist/mapbox-gl.css";
import { intl } from "../utils/intl";
import { AddMarkerDialog } from "../components/AddMarkerDialog";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { SignInWithSocialMedia } from "../modules/auth";
import { Providers } from "../config/firebase";
import { normalizeTwitterAuthResponse } from "../utils/data-normalization-utils";

const App: React.FunctionComponent<IApplicationProps> = () => {
  const mapBoxToken = process?.env.REACT_APP_MAPBOX_TOKEN || "";
  const mapBoxStyleURL = process?.env.REACT_APP_MAPBOX_STYLE_URL || "";
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [user, setUser] = React.useState<any>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { en } = intl;

  const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== "") setError("");

    setLoading(true);

    SignInWithSocialMedia(provider)
      .then((result) => {
        console.log("LOGGED IN!");
        console.log(result);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(en.api.successUserDetected);
        console.log(auth.currentUser?.uid);

        //handle cases when user is recurring :( no user
        // new user
        // normalize existing data

        // returning user
        // fetch data

        const normalizedData = normalizeTwitterAuthResponse(user);
        console.log(normalizedData);
        setUser(normalizedData);
      } else {
        console.log(en.api.errorNoUserDetected);
      }
      setLoading(false);
    });
  }, []);

  const handleHeaderButtonClick = () => {
    // if loggedIn show settings menu
    if (user) {
      setDialogOpen(true);
    } else {
      signInWithSocialMedia(Providers.twitter);
    }
  };

  return (
    <div className="App">
      <AddMarkerDialog handleClose={() => setDialogOpen(false)} open={dialogOpen} />

      <HeaderBar user={user} onButtonClick={() => handleHeaderButtonClick()} />
      <GlobeMap id="vtw-atw" mapboxToken={mapBoxToken} mapStyleURL={mapBoxStyleURL} />
      {loading ? <div>{en.global.loading}</div> : ""}
    </div>
  );
};

export default App;
