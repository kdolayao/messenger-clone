import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //put your firebase config here
});

const db = firebaseApp.firestore();

export default db;
