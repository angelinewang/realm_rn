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
  // apiKey is the same as one in GoogleService-Info.plist
  apiKey: "AIzaSyAxCmJwm2tIvHEiUnMy1c9AH3T85zgNQgQ",
  authDomain: "your-auth-domain-b1234.firebaseapp.com", // TODO AFTER Frontend Link Deployment
  databaseURL: "https://your-database-name.firebaseio.com", // TODO AFTER Backend deployment
  projectId: "realm-rn-dj",
  // Firebase project id is the same as Google Cloud Console project id
  storageBucket: "realm-rn-dj.appspot.com",
  messagingSenderId: "1169578510116",
  appId: "1:169578510116:ios:c8c758a749199a448d25b1",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
