import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPeGd248tZfLBG-KHUwWgdQbKvrtdBZCY",
  authDomain: "realm-rn-dj.firebaseapp.com",
  projectId: "realm-rn-dj",
  storageBucket: "realm-rn-dj.appspot.com",
  messagingSenderId: "169578510116",
  appId: "1:169578510116:web:1d7524e1575689f68d25b1",
  measurementId: "G-EKHS4QFRTR",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase, firebaseConfig };
