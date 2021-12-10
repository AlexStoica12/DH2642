import firebase from "firebase/compat/app";

// Import needed firebase modules
import "firebase/compat/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArcGpQyuPDskDbOwMyJtlkP90zuiJOWjY",
  authDomain: "dh2632-project.firebaseapp.com",
  projectId: "dh2632-project",
  storageBucket: "dh2632-project.appspot.com",
  messagingSenderId: "742190588231",
  appId: "1:742190588231:web:49f243ddee6982b088ac62",
  measurementId: "${config.measurementId}",
};

firebase.initializeApp(firebaseConfig);
