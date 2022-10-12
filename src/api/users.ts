import firebase from "firebase/compat/app"; // @TODO: what is this
import { DataItem } from "../types/types";
import { FIREBASE_COLLECTION_USERS } from "../utils/constants";

const fetchUsers = () => {
  firebase
    .firestore()
    .collection(FIREBASE_COLLECTION_USERS)
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

const setUser = (obj: DataItem) => {
  firebase
    .firestore()
    .collection(FIREBASE_COLLECTION_USERS)
    .doc(obj.id)
    .set(obj)
    .then(() => fetchUsers())
    .catch(function (error) {
      console.error("Error adding user: ", error);
    });
};

export { fetchUsers, setUser };
