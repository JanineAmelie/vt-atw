import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { SignInWithSocialMedia } from "../modules/auth";
import { Providers } from "../config/firebase";

const SignUp: React.FunctionComponent = () => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== "") setError("");

    setAuthenticating(true);

    SignInWithSocialMedia(provider)
      .then((result) => {
        console.log("LOGGED IN!");
        console.log(result);
      })
      .catch((error) => {
        setAuthenticating(false);
        setError(error.message);
      });
  };

  return (
    <div className="AuthLogin">
      <div className="auth-main-container">
        <div className="auth-btn-wrapper">
          <button
            disabled={authenticating}
            onClick={() => signInWithSocialMedia(Providers.twitter)}>
            SignUp with Twitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
