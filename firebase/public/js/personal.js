// Initialize Firebase
import { auth, db } from './init-firebase.js';  // 從 init-firebase.js 中引入 auth 和 db

auth.onAuthStateChanged(async (user) => {
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (doc.exists) {
      const userData = doc.data();
      //document.getElementById('username').value = userData.username || user.email;
      //document.getElementById('name').value = userData.name || "";
      document.getElementById('email').value = user.email;
      //document.getElementById('phone').value = userData.phone || "";
      //document.getElementById('birthday').value = userData.birthday || "";

      //if (userData.gender === "male") {
      //  document.getElementById('male').checked = true;
      //} else if (userData.gender === "female") {
      //  document.getElementById('female').checked = true;
      //} else {
      //  document.getElementById('other').checked = true;
      //}
    }
  } else {
    window.location.href = "login.html";
  }
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