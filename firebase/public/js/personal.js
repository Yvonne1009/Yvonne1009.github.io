// Initialize Firebase
import { auth, db } from './init-firebase.js';  // 從 init-firebase.js 中引入 auth 和 db

auth.onAuthStateChanged(async (user) => {
  if (user) {
    const userEmail = user.email;

    const userRef = db.collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (doc.exists) {
      const userData = doc.data();

      // 檢查 username 是否存在，若不存在則提示並跳轉
      if (!userData.username) {
        alert("請補充使用者名稱！");
        window.location.href = "補充資料頁面.html";  // 按下「確定」後跳轉
      }

      document.getElementById('username').value = userData.username || userEmail;
      document.getElementById('name').value = userData.name || "";
      document.getElementById('email').value = userEmail;
      // 其他自定義資料處理邏輯
    } else {
      alert("無法找到使用者資料");
      window.location.href = "login.html";  // 按下「確定」後跳轉
    }
  } else {
    window.location.href = "login/login.html";
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
