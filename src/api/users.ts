import firebase from "firebase/compat/app"; // @TODO: what is this
import { DataItem } from "../types/types";
import { FIREBASE_COLLECTION_USERS } from "../utils/constants";
const db = firebase.firestore();

const dbGetAllUsers = () => {
  const results: any[] = [];

  return db
    .collection(FIREBASE_COLLECTION_USERS)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((user) => {
        results.push(user.data());
      });
    })
    .then(() => {
      return results;
    })
    .catch(function (error) {
      console.error("Error fetching users: ", error);
    });
};

const dbAddUser = (obj: DataItem) => {
  return db
    .collection(FIREBASE_COLLECTION_USERS)
    .doc(obj.id)
    .set(obj)
    .catch(function (error) {
      console.error("Error adding user: ", error);
    });
};

export { dbGetAllUsers, dbAddUser };
