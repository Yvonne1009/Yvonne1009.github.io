// Your Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCkMa2jz6kDse8j3BSsXYKru8LYA_Sb2M0",
  authDomain: "leisurepace-a3d51.firebaseapp.com",
  databaseURL: "https://leisurepace-a3d51-default-rtdb.firebaseio.com",
  projectId: "leisurepace-a3d51",
  storageBucket: "leisurepace-a3d51.appspot.com",
  messagingSenderId: "955257567601",
  appId: "1:955257567601:web:2e06661d84707065fe9ed0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to your database
var database = firebase.database();

// Get DOM elements
const feedbackForm = document.getElementById("feedbackForm");
const feedbackInput = document.getElementById("feedbackInput");
const feedbackRecords = document.getElementById("feedbackRecords");

// Handle form submission
feedbackForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const message = feedbackInput.value;

  if (!message) return;

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are 0-based
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const feedbackEntry = {
    message: message,
    timestamp: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
  };

  addFeedbackToFirebase(feedbackEntry);
  feedbackInput.value = "";
});

// Add feedback entry to Firebase
function addFeedbackToFirebase(feedbackEntry) {
  database
    .ref("feedback")
    .push(feedbackEntry)
    .then(() => {
      console.log("Feedback entry added to Firebase database successfully!");
      getFeedbackFromFirebase();
    })
    .catch((error) => {
      console.error(
        "Error adding feedback entry to Firebase database: ",
        error
      );
    });
}

// Get feedback entries from Firebase
function getFeedbackFromFirebase() {
  database
    .ref("feedback")
    .once("value")
    .then(function (snapshot) {
      const feedbacks = snapshot.val();
      displayFeedback(feedbacks);
    })
    .catch(function (error) {
      console.error("The read failed: " + error.code);
    });
}

// Display feedback entries
function displayFeedback(feedbacks) {
  feedbackRecords.innerHTML = "";

  if (feedbacks) {
    const feedbackEntries = Object.values(feedbacks);
    feedbackEntries.forEach((entry) => {
      const feedbackElement = document.createElement("div");
      feedbackElement.classList.add("feedback-entry");
      feedbackElement.innerHTML = `
                  <span class="feedback-date">${entry.timestamp}:</span>
                  <span class="feedback-message">${entry.message}</span>
              `;
      feedbackRecords.appendChild(feedbackElement);
    });
  }
}

// Get feedback entries when the page loads
window.addEventListener("load", function () {
  getFeedbackFromFirebase();
});
