// import { initializeApp } from "firebase/app";

// // Optionally import the services that you want to use
// // import {...} from "firebase/auth";
// // import {...} from "firebase/database";
// // import {...} from "firebase/firestore";
// // import {...} from "firebase/functions";
// // import {...} from "firebase/storage";

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "api-key",
//   authDomain: "realm-rn-dj.firebaseapp.com",
//   databaseURL: "https://realm-rn-dj.firebaseio.com",
//   projectId: "realm-rn-dj",
//   storageBucket: "realm-rn-dj.appspot.com",
//   messagingSenderId: "sender-id",
//   appId: "app-id",
//   measurementId: "G-measurement-id",
// };

// const app = initializeApp(firebaseConfig);
// // For more information on how to access Firebase in your project,
// // see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
import * as firebase from "firebase";
// import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY_HERE_AIzaSyAOWH",
  authDomain: "your-auth-domain-b1234.firebaseapp.com",
  databaseURL: "https://your-database-name.firebaseio.com",
  projectId: "your-project-id-1234",
  storageBucket: "your-project-id-1234.appspot.com",
  messagingSenderId: "12345-insert-yourse",
  appId: "insert yours: 1:1234:web:ee873bd1234c0deb7eba61ce",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
