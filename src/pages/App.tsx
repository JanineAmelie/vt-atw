import React, { useEffect, useState } from "react";
import "firebase/compat/firestore";
import { auth } from "../config/firebase";
import { GeoCodeResults, IApplicationProps } from "../types/interfaces";
import HeaderBar from "../components/HeaderBar";
import GlobeMap from "../components/GlobeMap";
import "mapbox-gl/dist/mapbox-gl.css";
import { intl } from "../utils/intl";
import { AddMarkerDialog } from "../components/AddMarkerDialog";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { SignInWithSocialMedia, SignOut } from "../api/auth";
import { Providers } from "../config/firebase";
import { getUserDataById, normalizeTwitterAuthResponse } from "../utils/data-normalization-utils";
import { dbGetAllUsers, dbAddUser, dbUpdateUserLocation, dbGetUserDataById } from "../api/users";
import { LoadingBackdrop } from "../components/LoadingBackdrop";
import { AuthedUser, DataItem } from "../types/types";
import { MENU_ITEMS } from "../utils/constants";

const App: React.FunctionComponent<IApplicationProps> = () => {
  const mapBoxToken = process?.env.REACT_APP_MAPBOX_TOKEN || "";
  const mapBoxStyleURL = process?.env.REACT_APP_MAPBOX_STYLE_URL || "";
  const [dialogOpen, setDialogOpen] = useState(false);
  const [users, setUsers] = useState<DataItem[]>([]);
  const [user, setUser] = useState<null | AuthedUser>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<GeoCodeResults | null | string>(null);
  const { en } = intl;

  // @TODO: Edgecase what happens when user logins with changed name?
  // @TODO: Edgecase what happens when user unlinks their accoutnt from the app, delete? keep?

  const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== "") setError("");

    setLoading(true);

    SignInWithSocialMedia(provider)
      .then((result) => {
        const normalizedData = normalizeTwitterAuthResponse(result);
        if (result.additionalUserInfo?.isNewUser) {
          dbAddUser(normalizedData)
            .then(() => dbGetAllUsers())
            .then(() => setLoading(false));
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  const handleAuthStateChange = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = auth.currentUser?.providerData[0]?.uid;
        if (uid) {
          // fetch User Data, setUser After,
          dbGetUserDataById(uid)
            .then((res) => {
              const userData = res.data() as DataItem;
              setSelectedLocation(userData.location);
            })
            .catch((error) => {
              setLoading(false);
              setError(error.message);
            });
          setUser({
            id: uid,
            image: auth.currentUser?.photoURL || "",
            name: auth.currentUser?.displayName || ""
          });
        } else {
          console.error("Error getting user UID");
        }
      } else {
        console.error(en.api.errorNoUserDetected);
      }
      setLoading(false);
    });
  };

  const handleSubmit = () => {
    if (error !== "") setError("");
    setDialogOpen(false);
    setLoading(true);

    if (selectedLocation && typeof selectedLocation !== "string" && user?.id) {
      const newLocation = {
        latitude: selectedLocation.geometry.coordinates[1],
        longitude: selectedLocation.geometry.coordinates[0]
      };

      // check if bbox property exists on object
      // get randomLocation

      if (selectedLocation?.bbox?.length) {
        // get random location
      }

      dbUpdateUserLocation(
        user.id,
        newLocation.latitude.toString(),
        newLocation.longitude.toString(),
        selectedLocation.place_name
      )
        .then(() => {
          fetchUsers();
        })
        .catch((e: Error) => {
          setError(e.message);
        });
    }
  };

  const handleLogoutClick = () => {
    setLoading(true);
    SignOut().then(() => {
      setUser(null);
      setLoading(false);
    });
  };
  useEffect(() => {
    setLoading(true);
    // Always fetch all users first
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    dbGetAllUsers()
      .then((r) => {
        const data = r as DataItem[];
        setUsers(data);
      })
      .then(() => {
        handleAuthStateChange();
      });
  };

  const handleHeaderButtonClick = (menuItem: string) => {
    // if loggedIn show settings menu
    if (user) {
      switch (menuItem) {
        case MENU_ITEMS.SETTINGS:
          setDialogOpen(true);
          break;
        case MENU_ITEMS.LOGOUT:
          handleLogoutClick();
          break;
        default:
          break;
      }
    } else {
      signInWithSocialMedia(Providers.twitter);
    }
  };

  return (
    <div className="App">
      <LoadingBackdrop loading={loading} />
      {user && (
        <AddMarkerDialog
          handleSubmit={() => handleSubmit()}
          handleClose={() => setDialogOpen(false)}
          open={dialogOpen}
          user={getUserDataById(users, user.id)}
          mapBoxToken={mapBoxToken}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}
      <HeaderBar user={user} onButtonClick={(e) => handleHeaderButtonClick(e)} />
      <GlobeMap id="vtw-atw" mapboxToken={mapBoxToken} mapStyleURL={mapBoxStyleURL} users={users} />
    </div>
  );
};

export default App;
