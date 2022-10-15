/*
contains logic for authenticating users using social login providers.
**/
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { auth } from "../config/firebase";

const SignInWithSocialMedia = (
  provider: firebase.auth.AuthProvider
): Promise<firebase.auth.UserCredential> =>
  new Promise<firebase.auth.UserCredential>((resolve, reject) => {
    auth
      .signInWithPopup(provider)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });

const SignOut = (): Promise<void> =>
  new Promise((resolve, reject) => {
    auth
      .signOut()
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });

export { SignInWithSocialMedia, SignOut };
