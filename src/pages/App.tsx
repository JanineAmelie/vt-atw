import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

import Map from "../components/map";
import { IApplicationProps } from "../types/interfaces";
import HeaderBar from "../components/header";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "../themes/themes";

import firebase from "firebase/compat/app"; // @TODO: what is this
// import "firebase/compat/auth";
import "firebase/compat/firestore";
import { dataItem } from "../types/types";

const App: React.FunctionComponent<IApplicationProps> = () => {
  const mapBoxToken = process?.env.REACT_APP_MAPBOX_TOKEN || "";
  const mapBoxStyleURL = process?.env.REACT_APP_MAPBOX_STYLE_URL || "";
  const [loading, setLoading] = useState<boolean>(false);
  // Monitor and Update user state.

  const fetchUsers = () => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((user) => {
          console.log(user.data());
          // this.setState({
          //   data: [...this.state.data, doc.data()]
          // });
        });
      })
      .catch(function (error) {
        console.error("Error fetching users: ", error);
      });
  };

  const setUser = (obj: dataItem) => {
    firebase
      .firestore()
      .collection("users")
      .doc(obj.id)
      .set(obj)
      .then(() => fetchUsers())
      .catch(function (error) {
        console.error("Error adding user: ", error);
      });
  };

  const mockItem = {
    id: "cvbhjdfhnb",
    name: "Setivyn",
    twitterHandle: "Setivyn",
    latitude: 55.378051,
    longitude: -3.435973,
    image: "https://pbs.twimg.com/profile_images/871689615949824000/t45YgMFe_400x400.jpg",
    url: "https://google.com"
  };

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
        <button onClick={() => fetchUsers()}> Fetch Users </button>
        <button onClick={() => setUser(mockItem)}> set User </button>
        <HeaderBar name="VT-ATW" />
        <Map id="vtw-atw" mapboxToken={mapBoxToken} mapStyleURL={mapBoxStyleURL} />
        {loading ? <div>Loading...</div> : ""}
      </div>
    </ThemeProvider>
  );
};

export default App;
