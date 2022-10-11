import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import "@firebase/auth";
import "firebase/auth";
import config from "./config";

const Firebase = firebase.initializeApp(config.firebase);

// Add or Remove authentification methods here.
export const Providers = {
  twitter: new firebase.auth.TwitterAuthProvider()
};

export const auth = firebase.auth();
export { Firebase };
