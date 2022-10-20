import firebase from "firebase/compat/app"; // @TODO: what is this
import { DataItem } from "../types/types";
import { FIREBASE_COLLECTION_USERS } from "../utils/constants";
const db = firebase.firestore();

const dbGetAllUsers = (): Promise<void | DataItem[]> => {
  const results: DataItem[] = [];

  return db
    .collection(FIREBASE_COLLECTION_USERS)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((user) => {
        const data = user.data();
        results.push(data as DataItem);
      });
    })
    .then(() => {
      return results;
    })
    .catch(function (error) {
      console.error("Error fetching users: ", error);
    });
};

const dbAddUser = (obj: DataItem): Promise<void | DataItem> => {
  return db
    .collection(FIREBASE_COLLECTION_USERS)
    .doc(obj.id)
    .set(obj)
    .catch((error) => {
      console.error("Error adding user: ", error);
    });
};

const dbUpdateUserLocation = (
  id: string,
  latitude: string,
  longitude: string,
  location: string
): Promise<void> => {
  return db
    .collection(FIREBASE_COLLECTION_USERS)
    .doc(id)
    .update({
      latitude,
      longitude,
      location
    })
    .catch((error) => {
      console.error("Error updating user location: ", error);
    });
};

//@TODO: fix typings Firebase Firestore DocumentReference
const dbGetUserDataById = (id: string): Promise<void | any> => {
  return db
    .collection(FIREBASE_COLLECTION_USERS)
    .doc(id)
    .get()
    .catch((error) => {
      console.error("Error fetching user data: ", error);
    });
};

export { dbGetAllUsers, dbAddUser, dbUpdateUserLocation, dbGetUserDataById };
