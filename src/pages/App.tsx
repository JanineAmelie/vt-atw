import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import "./App.css";

import HeaderBar from "../components/header";
import SignUp from "../components/sign-up";
export interface IApplicationProps {
  name?: string;
}
const App: React.FunctionComponent<IApplicationProps> = (props) => {
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
      <HeaderBar name={"vt-atw"} />
      {loading ? <div>Loading...</div> : ""}
      <SignUp />
    </div>
  );
};

export default App;
