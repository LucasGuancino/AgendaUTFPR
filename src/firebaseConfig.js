import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyBZibNZC2wS8MMVDEXRdh01aTo3Kpf3lNs",
    authDomain: "agendautfpr-fed52.firebaseapp.com",
    databaseURL: "https://agendautfpr-fed52-default-rtdb.firebaseio.com",
    projectId: "agendautfpr-fed52",
    storageBucket: "agendautfpr-fed52.appspot.com",
    messagingSenderId: "853527752514",
    appId: "1:853527752514:web:9442cf0216462fa955a2db",
    measurementId: "G-BJHR9PQHBW"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;