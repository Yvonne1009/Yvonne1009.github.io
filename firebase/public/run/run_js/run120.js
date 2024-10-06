// ------------------ Video Stream Handling ------------------

// Function to get video stream from the user's webcam
async function getVideoStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElement = document.getElementById("video");
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("取得視訊失敗:", error);
  }
}

// Initialize video stream when the page loads
window.addEventListener("load", getVideoStream);

// ------------------ Countdown Timer Section ------------------

let currentItemIndex = 0;
const items = [
  "120BPM/10分鐘",
  "120BPM/15分鐘",
  "120BPM/20分鐘",
  "120BPM/30分鐘",
  "120BPM/40分鐘",
  "120BPM/50分鐘",
  "120BPM/60分鐘",
]; // 替換為您的選項

let countdownInterval; // For countdown updates
let countdownEndTime; // Time when countdown will end
let remainingTime; // Remaining time in seconds
let paused = false; // Is the countdown paused?
let isFirstMinutePassed = false;
const audio = new Audio("BPM/120bpm.mp3");

// Function to start the countdown timer
function startCountdown(index) {
  const minutes = [10, 15, 20, 30, 40, 50, 60]; // 對應到每個選項的分鐘數
  const selectedMinutes = minutes[index];
  countdownEndTime = new Date().getTime() + selectedMinutes * 60 * 1000; // Calculate end time
  remainingTime = selectedMinutes * 60; // Set remaining time in seconds
  updateCountdown(); // Update the countdown immediately
  countdownInterval = setInterval(updateCountdown, 1000); // Update countdown every second

  // Play music based on countdown state
  playPauseMusic();

  // Optionally start image rotation or other actions (not defined here)
  if (!imageRotationInterval) {
    startImageRotation(); // 語音導覽 // 启动图片轮播
  }
}

// Play or pause the music based on countdown state
function playPauseMusic() {
  const pauseIcon = document.getElementById("pauseIcon");
  if (!paused && countdownEndTime > Date.now()) {
    playMusic();
    pauseIcon.classList.remove("fa-play");
    pauseIcon.classList.add("fa-pause");
  } else {
    stopMusic();
    pauseIcon.classList.remove("fa-pause");
    pauseIcon.classList.add("fa-play");
  }
}

// Function to play the music
function playMusic() {
  audio.play();
}

// Function to stop the music
function stopMusic() {
  audio.pause();
}

// Pause or resume the countdown
function pauseResumeCountdown() {
  const pauseIcon = document.getElementById("pauseIcon");
  if (!paused) {
    clearInterval(countdownInterval); // Pause the countdown
    stopMusic(); // Stop the music
  } else {
    countdownEndTime = new Date().getTime() + remainingTime * 1000; // Update end time for resuming
    countdownInterval = setInterval(updateCountdown, 1000); // Restart countdown
    playMusic(); // Resume music
  }
  paused = !paused; // Toggle pause state
  playPauseMusic(); // Update the music icon
}

// Update countdown timer display
function updateCountdown() {
  if (!paused) {
    const now = new Date().getTime();
    const distance = countdownEndTime - now;

    if (distance >= 0) {
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById(
        "countdownTimer"
      ).innerHTML = `${minutes} 分 ${seconds} 秒`;
      remainingTime = Math.ceil(distance / 1000); // Update remaining time
    } else {
      clearInterval(countdownInterval); // Clear countdown when finished
      document.getElementById("countdownTimer").innerHTML = "計時結束"; // Display end message
      stopMusic(); // Stop music when countdown finishes
    }
  } else {
    stopMusic(); // Stop music if paused
  }
}

// Update the currently selected countdown item
function updateItem() {
  const itemButton = document.getElementById("itemButton");
  itemButton.textContent = items[currentItemIndex];
}

// Move to the previous countdown item
function previousItem() {
  currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
  updateItem();
  clearInterval(countdownInterval); // Clear countdown when switching items
  paused = false; // Reset pause state when switching items
  pauseResumeCountdown(); // Pause or resume countdown
}

// Move to the next countdown item
function nextItem() {
  currentItemIndex = (currentItemIndex + 1) % items.length;
  updateItem();
  clearInterval(countdownInterval); // Clear countdown when switching items
  paused = false; // Reset pause state
  pauseResumeCountdown(); // Pause or resume countdown
}

// ------------------ Image Gallery Section ------------------

let isGalleryVisible = false; // Track image gallery visibility

// Toggle the gallery display
function toggleGallery() {
  const gallery = document.getElementById("imageGallery");
  const categoryMenu = document.getElementById("categoryMenu");

  if (!isGalleryVisible) {
    gallery.innerHTML = ""; // Clear the gallery content
    gallery.style.display = "block"; // Show the gallery

    // Create category buttons
    const categories = ["何木火", "莫內", "雷諾瓦", "畢卡索", "弗里德里希"];
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category;
      button.addEventListener("click", function () {
        showCategory(category);
      });
      gallery.appendChild(button);
    });

    categoryMenu.style.display = "block"; // Show the category menu
    isGalleryVisible = true; // Update visibility state
  } else {
    hideGallery(); // Hide gallery if it's already visible
  }
}

// Display a selected image as the background
function displayImage(imageSrc) {
  document.body.style.backgroundImage = `url("${imageSrc}")`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center 160px"; // Adjust position
  document.body.style.backgroundRepeat = "no-repeat";
  hideGallery(); // Hide gallery after selecting an image
}

// Hide the gallery and category menu
function hideGallery() {
  document.getElementById("imageGallery").style.display = "none";
  document.getElementById("categoryMenu").style.display = "none";
  isGalleryVisible = false; // Update visibility state
}

// Show images for a specific category
function showCategory(category) {
  const gallery = document.getElementById("imageGallery");
  gallery.innerHTML = ""; // Clear current images

  const images = getImagesByCategory(category); // Retrieve category-specific images
  images.forEach((img) => {
    const button = document.createElement("button");
    const image = document.createElement("img");
    image.src = img;
    image.style.width = "100px";
    image.style.height = "100px";

    button.addEventListener("click", function () {
      displayImage(img);
    });
    button.appendChild(image);
    gallery.appendChild(button);
  });
}

// Retrieve images based on the category
function getImagesByCategory(category) {
  switch (category) {
    case "何木火":
      return [
        "何木火/一葉知秋.jpg",
        "何木火/月世界之歌.jpg",
        "何木火/紅塵夢.png",
      ];
    case "莫內":
      return ["莫內/Impression Sunrise.jpg", "莫內/The Water-Lily Pond.jpg"];
    case "畢卡索":
      return ["畢卡索/格爾尼卡.jpg", "畢卡索/The Kiss.jpg"];
    case "弗里德里希":
      return ["弗里德里希/Two Men Contemplating the Moon.jpg"];
    case "雷諾瓦":
      return ["雷諾瓦/Field of Banana Trees.jpg", "雷諾瓦/The Rose Garden.jpg"];
    default:
      return [];
  }
}

// ------------------ Calories Tracker Section ------------------

let isTimerRunning = true; // Track if the timer is running
let totalCaloriesBurned = 0; // Total calories burned

// Function to update the burned calories every minute
function updateNumberEveryMinute() {
  if (isTimerRunning) {
    const weight = parseFloat(document.getElementById("weight").value);
    const exerciseTime = 1; // The function is called every minute
    const calories = (6 * exerciseTime * weight) / 60; // Calculate burned calories
    totalCaloriesBurned += calories; // Update total
    document.getElementById("numberElement").textContent =
      totalCaloriesBurned.toFixed(2); // Display updated calories
  }
}

// Start the timer to track calories
function startTimer() {
  isTimerRunning = true;
}

// Pause the timer to stop calorie tracking
function pauseTimer() {
  isTimerRunning = false;
}

// Call the calorie updating function every minute
const timerInterval = setInterval(updateNumberEveryMinute, 60000);

// Confirm weight input and disable the input field once confirmed
function confirmWeight() {
  const weightInput = document.getElementById("weight");
  const confirmButton = document.getElementById("confirmButton");
  const weight = parseFloat(weightInput.value);

  if (!isNaN(weight) && weight > 0) {
    weightInput.disabled = true;
    confirmButton.disabled = true;
  } else {
    alert("請输入有效的體重！");
  }
}

// BPM Dropdown functionality
function toggleDropdown() {
  const dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
}

// Close dropdown if the user clicks outside
window.onclick = function (event) {
  if (!event.target.matches(".item")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
