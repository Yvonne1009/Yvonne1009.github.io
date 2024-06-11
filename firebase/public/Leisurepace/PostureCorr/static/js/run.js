////計時器的部分////
var currentItemIndex = 0;
var items = ["180BPM/10分鐘", "180BPM/15分鐘", "180BPM/20分鐘", "180BPM/30分鐘"]; // 替換為您的選項

let countdownInterval; // Interval variable for countdown
let countdownEndTime; // Variable to store countdown end time
let remainingTime; // Variable to store remaining time of countdown
let paused = false; // Variable to track pause state
let isFirstMinutePassed = false;

// Start countdown
function startCountdown(index) {
    const minutes = [10, 15, 20, 30]; // 對應到每個選項的分鐘數
    const selectedMinutes = minutes[index];
    countdownEndTime = new Date().getTime() + selectedMinutes * 60 * 1000; // Calculate end time
    remainingTime = selectedMinutes * 60; // Calculate remaining time in seconds
    updateCountdown(); // Update countdown immediately
    countdownInterval = setInterval(updateCountdown, 1000); // Update countdown every second
}

// Pause or resume countdown
function pauseResumeCountdown() {
    const pauseIcon = document.getElementById('pauseIcon');
    if (!paused) {
        clearInterval(countdownInterval); // Pause countdown if running
        pauseIcon.classList.remove('fa-pause');
        pauseIcon.classList.add('fa-play');
    } else {
        countdownEndTime = new Date().getTime() + remainingTime * 1000; // Update end time for resuming countdown
        countdownInterval = setInterval(updateCountdown, 1000); // Restart countdown
        pauseIcon.classList.remove('fa-play');
        pauseIcon.classList.add('fa-pause');
    }
    paused = !paused; // Toggle pause state
}


// Call updateNumberEveryMinute function every minute
setInterval(updateNumberEveryMinute, 60000); // 每隔1分钟（60000毫秒）调用一次函数


// Update countdown
function updateCountdown() {
    if (!paused) {
        const now = new Date().getTime(); // Get current time
        const distance = countdownEndTime - now; // Calculate the remaining time
        if (distance >= 0) {
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
            const seconds = Math.floor((distance % (1000 * 60)) / 1000); // Calculate seconds
            
            // Check if a minute has passed
            if (seconds === 0 && isFirstMinutePassed) {
                // Add 8 to the number
                const numberElement = document.getElementById('numberElement');
                let currentNumber = parseInt(numberElement.textContent);
                currentNumber += 8;
                numberElement.textContent = currentNumber;
            }
            
            // Check if the first minute has passed
            if (minutes >= 1 && !isFirstMinutePassed) {
                isFirstMinutePassed = true;
            }
            
            document.getElementById("countdownTimer").innerHTML = minutes + " 分 " + seconds + " 秒"; // Display countdown
            remainingTime = Math.ceil(distance / 1000); // Update remaining time
        } else {
            clearInterval(countdownInterval); // Clear interval when countdown is finished
            document.getElementById("countdownTimer").innerHTML = "計時結束"; // Display message when countdown is finished
        }
    }
}

// Update item display
function updateItem() {
    var itemButton = document.getElementById('itemButton');
    itemButton.textContent = items[currentItemIndex];
}

// Move to previous item
function previousItem() {
    currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
    updateItem();
    clearInterval(countdownInterval); // Clear interval when switching items
    paused = false; // Reset pause state when switching items
    pauseResumeCountdown(); // Pause or resume countdown to update remaining time
}

// Move to next item
function nextItem() {
    currentItemIndex = (currentItemIndex + 1) % items.length;
    updateItem();
    clearInterval(countdownInterval); // Clear interval when switching items
    paused = false; // Reset pause state when switching items
    pauseResumeCountdown(); // Pause or resume countdown to update remaining time
}


