firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // 用戶已登入
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;
    // Get idToken
    user.getIdToken().then(function (token) {
      console.log(token);
    });
    if (user != null) {
      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "User : " + email_id;
    }
  } else {
    // 沒有使用者登入。

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  // 检查密码长度是否至少为6个字符
  if (userPass.length < 6) {
    alert("密碼必須至少包含6個字符");
    return; // 停止继续执行
  }

  // 验证电子邮件格式
  if (!validateEmail(userEmail)) {
    alert("請輸入有效的電子郵件地址");
    return; // 停止继续执行
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPass)
    .then(function (userCredential) {
      // 註冊成功
      var user = userCredential.user;
      console.log("User registered: ", user);

      // 跳轉到 fill in.html
      window.location.href =
        "https://yvonne1009.github.io/firebase/public/login/fill%20in.html";
    })
    .catch(function (error) {
      // 在这里处理错误。
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

// 验证电子邮件格式的函数
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      alert("You have successfully logged out.");
      window.location.href =
        "https://yvonne1009.github.io/firebase/public/index1.html";
    })
    .catch(function (error) {
      // An error happened.
      console.error("Error signing out: ", error);
    });
}
