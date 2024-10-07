// 初始化 Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbujMaNQH4-KIuNbSglH2SriVqvvRRa1g",
  authDomain: "leisurepace-a3d51.firebaseapp.com",
  projectId: "leisurepace-a3d51",
  storageBucket: "leisurepace-a3d51.appspot.com",
  messagingSenderId: "955257567601",
  appId: "1:955257567601:web:2e06661d84707065fe9ed0",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// 獲取使用者資料並顯示個人圖片
function fetchUserProfileData() {
  const user = auth.currentUser;

  if (!user) {
    console.log("没有用户登录");
    return;
  }

  const uid = user.uid;

  db.collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        // 獲取資料
        const data = doc.data();
        const profileImageURL = data.profileImageURL || "default-avatar.png";

        // 更新圖片
        document.getElementById("profileImage").src = profileImageURL;
      } else {
        console.log("用户文档不存在");
      }
    })
    .catch((error) => {
      console.log("獲取資料出錯:", error);
    });
}

// 當使用者登入時，調用獲取資料的函數
auth.onAuthStateChanged(function (user) {
  if (user) {
    fetchUserProfileData();
  } else {
    // 如果未登入，可以設定一個默認圖片
    document.getElementById("profileImage").src = "default-avatar.png";
  }
});
