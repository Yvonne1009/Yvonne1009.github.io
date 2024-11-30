firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;
    // Get ID Token
    user.getIdToken().then(function (token) {
      console.log("User token:", token);
    });

    if (user != null) {
      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "User : " + email_id;
    }
  } else {
    // No user is signed in
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  // Attempt login with email and password
  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .then(function () {
      // Redirect to home page on successful login
      window.location.href = "../index.html";
    })
    .catch(function (error) {
      var errorMessage = error.message;
      window.alert("Error: " + errorMessage);
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Successful logout
      alert("You have successfully logged out.");
      window.location.href = "../index.html"; // Redirect to login page or home
    })
    .catch(function (error) {
      console.error("Error signing out:", error);
    });
}
