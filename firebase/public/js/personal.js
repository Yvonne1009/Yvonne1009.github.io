// Initialize Firebase
var config = {
  apiKey: "AIzaSyCkMa2jz6kDse8j3BSsXYKru8LYA_Sb2M0",
  authDomain: "leisurepace-a3d51.firebaseapp.com",
  databaseURL: "https://leisurepace-a3d51-default-rtdb.firebaseio.com",
  projectId: "leisurepace-a3d51",
  storageBucket: "leisurepace-a3d51.appspot.com",
  messagingSenderId: "955257567601",
  appId: "1:955257567601:web:2e06661d84707065fe9ed0",
  measurementId: "G-MHZ967Y676",
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// 假設已經有一個使用者登入
auth
  .signInWithEmailAndPassword("chiu60917@gmail.com", "password")
  .then(() => {
    document
      .getElementById("profileForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        // 取得表單資料
        const username = document.getElementById("username").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const gender = document.querySelector(
          'input[name="gender"]:checked'
        ).value;
        const dob = `${document.getElementById("year").value}-${
          document.getElementById("month").value
        }-${document.getElementById("day").value}`;

        // 儲存資料到 Firestore
        db.collection("users")
          .doc(auth.currentUser.uid)
          .set({
            username: username,
            name: name,
            email: email,
            phone: phone,
            gender: gender,
            dob: dob,
          })
          .then(() => {
            alert("資料已成功儲存");
          })
          .catch((error) => {
            console.error("儲存資料時發生錯誤: ", error);
          });
      });
  })
  .catch((error) => {
    console.error("登入失敗: ", error);
  });
  
  //提交表單和更新資料
  document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const birthday = document.getElementById('birthday').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
  
    try {
      await db.collection('users').doc(auth.currentUser.uid).set({
        name,
        phone,
        birthday,
        gender
      }, { merge: true });
      alert("個人資料已更新！");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  });