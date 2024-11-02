// 取得視訊串流
async function getVideoStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.getElementById("video");
      videoElement.srcObject = stream;
    } catch (error) {
      console.error("取得視訊失敗:", error);
    }
  }
  
  // 頁面載入時開始取得視訊串流
  window.addEventListener("load", getVideoStream);
  //////////////////////上面不要動/////////////////////////
  
  ////計時器的部分////
  var currentItemIndex = 0;
  var items = [
    "240BPM/10分鐘",
    "240BPM/15分鐘",
    "240BPM/20分鐘",
    "240BPM/30分鐘",
    "240BPM/40分鐘",
    "240BPM/50分鐘",
    "240BPM/60分鐘",
  ]; // 替換為您的選項
  
  let countdownInterval; // Interval variable for countdown
  let countdownEndTime; // Variable to store countdown end time
  let remainingTime; // Variable to store remaining time of countdown
  let paused = false; // Variable to track pause state
  let isFirstMinutePassed = false;
  var audio = new Audio("BPM/240bpm.mp3");
  
  // Start countdown
  function startCountdown(index) {
    const minutes = [10, 15, 20, 30, 40, 50, 60]; // 對應到每個選項的分鐘數
    const selectedMinutes = minutes[index];
    countdownEndTime = new Date().getTime() + selectedMinutes * 60 * 1000; // Calculate end time
    remainingTime = selectedMinutes * 60; // Calculate remaining time in seconds
    updateCountdown(); // Update countdown immediately
    countdownInterval = setInterval(updateCountdown, 1000); // Update countdown every second
  
    // 撥放音樂
    playPauseMusic();
  
    if (!imageRotationInterval) {
      startImageRotation(); //語音導覽  // 启动图片轮播
    }
  }
  
  // Function to play or pause music based on countdown state
  function playPauseMusic() {
    const pauseIcon = document.getElementById("pauseIcon");
    if (!paused && countdownEndTime > Date.now()) {
      playMusic(); // If not paused and countdown is running, play music
      pauseIcon.classList.remove("fa-play");
      pauseIcon.classList.add("fa-pause");
    } else {
      stopMusic(); // If paused or countdown has ended, stop music
      pauseIcon.classList.remove("fa-pause");
      pauseIcon.classList.add("fa-play");
    }
  }
  
  // Function to play music
  function playMusic() {
    audio.play();
  }
  
  // Function to stop music
  function stopMusic() {
    audio.pause();
  }
  
  // Pause or resume countdown
  function pauseResumeCountdown() {
    const pauseIcon = document.getElementById("pauseIcon");
    if (!paused) {
      clearInterval(countdownInterval); // Pause countdown if running
      pauseIcon.classList.remove("fa-pause");
      pauseIcon.classList.add("fa-play");
      stopMusic(); // Pause music
    } else {
      countdownEndTime = new Date().getTime() + remainingTime * 1000; // Update end time for resuming countdown
      countdownInterval = setInterval(updateCountdown, 1000); // Restart countdown
      pauseIcon.classList.remove("fa-play");
      pauseIcon.classList.add("fa-pause");
      playMusic(); // Resume music
    }
    paused = !paused; // Toggle pause state
    playPauseMusic(); // Play or pause music
  }
  
  // Update countdown
  function updateCountdown() {
    if (!paused) {
      const now = new Date().getTime(); // Get current time
      const distance = countdownEndTime - now; // Calculate the remaining time
      if (distance >= 0) {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
        const seconds = Math.floor((distance % (1000 * 60)) / 1000); // Calculate seconds
  
        // Check if the first minute has passed
        if (minutes >= 1 && !isFirstMinutePassed) {
          isFirstMinutePassed = true;
        }
  
        document.getElementById("countdownTimer").innerHTML =
          minutes + " 分 " + seconds + " 秒"; // Display countdown
        remainingTime = Math.ceil(distance / 1000); // Update remaining time
      } else {
        clearInterval(countdownInterval); // Clear interval when countdown is finished
        document.getElementById("countdownTimer").innerHTML = "計時結束"; // Display message when countdown is finished
        stopMusic(); // Stop music when countdown is finished
      }
    } else {
      stopMusic(); // Stop music when countdown is paused or when time is paused
    }
  }
  
  // Update item display
  function updateItem() {
    var itemButton = document.getElementById("itemButton");
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
  /////////////////////////////////////////////////////////////////////////////////////////
  
  /*圖片背景按鈕*/
  var isGalleryVisible = false; // 用于追踪图片库的显示状态
  
  function toggleGallery() {
    var gallery = document.getElementById("imageGallery");
    var categoryMenu = document.getElementById("categoryMenu");
  
    if (!isGalleryVisible) {
      // 清除圖庫內容
      gallery.innerHTML = "";
  
      // 顯示畫廊
      gallery.style.display = "block";
  
       // 建立類別按鈕
      var categories = [ "雷諾瓦","莫內", "畢卡索", "弗里德里希","何木火"];
      categories.forEach((category) => {
        var button = document.createElement("button");
        button.textContent = category;
        button.addEventListener("click", function () {
          showCategory(category);
        });
        gallery.appendChild(button);
      });
  
      // 顯示類別選單
      categoryMenu.style.display = "block";
  
      // 更新 isGalleryVisible
      isGalleryVisible = true;
    } else {
      // 隱藏圖庫和類別選單
      hideGallery();
    }
  }
  
  // 背景參數
  function displayImage(imageSrc) {
    document.body.style.backgroundImage = 'url("' + imageSrc + '")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center 160px"; // 背景圖片向下移動
    document.body.style.backgroundRepeat = "no-repeat";
    hideGallery();
  }
  
  // 隐藏图片库和类别菜单
  function hideGallery() {
    var gallery = document.getElementById("imageGallery");
    var categoryMenu = document.getElementById("categoryMenu");
    gallery.style.display = "none";
    categoryMenu.style.display = "none";
    isGalleryVisible = false;
  }
  
  function showCategory(category) {
    var gallery = document.getElementById("imageGallery");
    gallery.innerHTML = "";

    var images = [];
    if (category === "雷諾瓦") {
      images = [
        "雷諾瓦/Landscape near Pont Aven.jpg",
        "雷諾瓦/Barges on the Seine.jpg",
        "雷諾瓦/Field of Banana Trees.jpg",
        "雷諾瓦/Forest Path.jpg",
        "雷諾瓦/The Laundress.jpg",
        "雷諾瓦/The Rose Garden at Wargemont.jpg",
        "雷諾瓦/青蛙塘.jpg",
        "雷諾瓦/Bouquets of Flowers.jpg",
        "雷諾瓦/The Seine at Asnieres (The Skiff).jpg",
        "雷諾瓦/Roses.jpg",
        "雷諾瓦/House and Figure among the Trees.jpg",
        "雷諾瓦/Vase Basket of Flowers and Fruit.jpg",
      ]
    } else if (category === "莫內") {
      images = [  
        "莫內/Jeanne-Marguerite Lecadre in the Garden.jpg",
        "莫內/The Church at Varengeville and the Gorge of Les Moutiers.jpg",
        "莫內/The Water-Lily Pond.jpg",
        "莫內/Garden at Sainte-Adresse.jpg",
        "莫內/Water Lilies, Evening Effect.jpg",
        "莫內/Waterloo Bridge, Gray Weather.jpg",
        "莫內/Windmills near Zaandam.jpg",
        "莫內/The Chapel Notre-Dame de Grace at Honfleur.jpg",
        "莫內/The Garden.jpg",
        "莫內/The Boat Studio.jpg",
        "莫內/Fruit Basket with Apples and Grapes.jpg",
        "莫內/Anglers.jpg",
        "莫內/In the Garden.jpg",
        "莫內/The Luncheon.jpg",
        "莫內/Chrysanthemums.jpg",
        "莫內/A Farmyard in Normandy.jpg",
        "莫內/The Bridge, Amsterdam.jpg",
        "莫內/Impression Sunrise.jpg",
      ];
    } else if (category === "畢卡索") {
      images = [
        "畢卡索/Square du Vert-Galant.jpg",
        "畢卡索/Houses on the hill.jpg",
        "畢卡索/Cafe Royan.jpg",
        "畢卡索/格爾尼卡.jpg",
        "畢卡索/Studio.jpg",
        "畢卡索/Plaster head and arm.jpg",
        "畢卡索/The sculptor.jpg",
        "畢卡索/Fairground.jpg",
        "畢卡索/Bathing.jpg",
        "畢卡索/Harlequin family.jpg",
        "畢卡索/The Kiss.jpg",
        "畢卡索/Reclining Woman.jpg",
        "畢卡索/Still life.jpg",
        "畢卡索/Beach game and rescue.jpg",
      ];
    } else if (category === "弗里德里希") {
      images = [
        "弗里德里希/Two Men Contemplating the Moon.jpg",
        "弗里德里希/Bohemian Landscape.jpg",
        "弗里德里希/Boats in the Harbour at Evening.jpg",
        "弗里德里希/Day.jpg",
        "弗里德里希/Landscape with rainbow.jpg",
        "弗里德里希/Landscape with Mountain Lake Morning.jpg",
        "弗里德里希/Hills and Ploughed Fields near Dresden.jpg",
        "弗里德里希/Landscape with Oak Trees and a Hunter.jpg",
        "弗里德里希/Rocky Reef on the Seashore.jpg",
        "弗里德里希/Solitary Tree.jpg",
        "弗里德里希/Morning in the Mountains.jpg",
        "弗里德里希/The Times Of Day：The Evening.jpg",
        "弗里德里希/The Times of Day：The Morning.jpg",
      ];
    } else if (category === "何木火") {
      images = [
        "何木火/月世界之歌.jpg",
        "何木火/月冷光寒.jpg",
        "何木火/冰天雪地.png",
        "何木火/金碧山水.jpg",
        "何木火/紅塵夢.png",
        "何木火/飛向高峰.jpg",
        "何木火/高處不勝寒.png",
        "何木火/野地清香.png",
        "何木火/尋.png",
        "何木火/絕塵.png",
        "何木火/橫越沙塵.jpg",
        "何木火/一葉知秋.jpg",
        "何木火/人止關寫生.jpg",
      ];
    }

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
  
  let isTimerRunning = true; // 标志变量，用于跟踪定时器是否正在运行
  let totalCaloriesBurned = 0; // 变量，用于跟踪总卡路里燃烧量
  
  // 每分钟更新燃烧的卡路里数
  function updateNumberEveryMinute() {
    if (isTimerRunning) {
      const weight = parseFloat(document.getElementById("weight").value); // 获取体重输入值
      const exerciseTime = 1; // 因为这个函数每分钟被调用一次，所以默认是运动了一分钟
      const calories = (6 * exerciseTime * weight) / 60; // 计算每分钟燃烧的卡路里数
      totalCaloriesBurned += calories; // 将本分钟燃烧的卡路里数添加到总数中
      const numberElement = document.getElementById("numberElement"); // 获取用于显示卡路里数的元素
      numberElement.textContent = totalCaloriesBurned.toFixed(2); // 保留两位小数更新卡路里数
    }
  }
  
  // 启动或恢复计时器
  function startTimer() {
    isTimerRunning = true;
  }
  
  // 暂停计时器
  function pauseTimer() {
    isTimerRunning = false;
  }
  
  // 每分钟调用一次updateNumberEveryMinute函数
  const timerInterval = setInterval(updateNumberEveryMinute, 60000);
  
  // 示例用法：
  // 启动计时器
  startTimer();
  
  // 在一定时间后暂停计时器（例如，30分钟）
  setTimeout(() => {
    pauseTimer();
    clearInterval(timerInterval); // 停止更新卡路里
  }, 30 * 60000); // 5分钟的毫秒数
  
  // 在 window 加载时运行的函数
  window.onload = function () {
    // 在这里添加你的其他初始化逻辑
  
    // 监听体重输入字段的值变化
    const weightInput = document.getElementById("weight");
    weightInput.addEventListener("input", function () {
      const weight = weightInput.value.trim();
      if (weight !== "") {
        disableWeightInput();
      }
    });
  };
  
  function confirmWeight() {
    const weightInput = document.getElementById("weight");
    const confirmButton = document.getElementById("confirmButton");
    const weight = parseFloat(weightInput.value);
  
    // 检查是否有效输入了体重
    if (!isNaN(weight) && weight > 0) {
      // 禁用体重输入字段和确认按钮
      weightInput.disabled = true;
      confirmButton.disabled = true;
  
      // 如果需要，在这里可以调用启动计时器函数
      // startTimer();
    } else {
      alert("請输入有效的體重！");
    }
  }
  
  //選擇BPM
  function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");
  }
  
  // 關閉下拉選單若點擊視窗外的地方
  window.onclick = function (event) {
    if (!event.target.matches(".item")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
  