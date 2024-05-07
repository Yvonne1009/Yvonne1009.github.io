import { initializeApp } from "https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/8.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkMa2jz6kDse8j3BSsXYKru8LYA_Sb2M0",
  authDomain: "leisurepace-a3d51.firebaseapp.com",
  databaseURL: "https://leisurepace-a3d51-default-rtdb.firebaseio.com",
  projectId: "leisurepace-a3d51",
  storageBucket: "leisurepace-a3d51.appspot.com",
  messagingSenderId: "955257567601",
  appId: "1:955257567601:web:2e06661d84707065fe9ed0",
  measurementId: "G-MHZ967Y676",
};

// initializeApp firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-log-btn");
googleLogin.addEventListener("click", function () {
  alert(5);
});
