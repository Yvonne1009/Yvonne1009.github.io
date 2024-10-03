// TODO: Replace the following with your app's Firebase project configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


var firebaseConfig = {
  apiKey: "AIzaSyCkMa2jz6kDse8j3BSsXYKru8LYA_Sb2M0",
  authDomain: "leisurepace-a3d51.firebaseapp.com",
  databaseURL: "https://leisurepace-a3d51-default-rtdb.firebaseio.com/",
  projectId: "leisurepace-a3d51",
  storageBucket: "gs://leisurepace-a3d51.appspot.com/",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 获取对数据库的引用
const database = firebase.database();
// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 將 auth 和 db 輸出，供其他檔案使用
export { auth, db };