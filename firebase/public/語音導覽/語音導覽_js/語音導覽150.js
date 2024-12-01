////計時器的部分////
var currentItemIndex = 0;
var items = [
  "150BPM/10分鐘",
  "150BPM/15分鐘",
  "150BPM/20分鐘",
  "150BPM/30分鐘",
  "150BPM/40分鐘",
  "150BPM/50分鐘",
  "150BPM/60分鐘",
]; // 替換為您的選項

let countdownInterval;
let countdownEndTime;
let remainingTime;
let paused = false;
let audio = new Audio("BPM/150bpm.mp3"); // 替換為您的音樂檔案
let imageRotationInterval;
let currentImageIndex = 0;
let currentCategoryImages = [];
let currentCategoryTexts = [];
let speechSynthesisInstance;
let isSpeechPaused = false;

let stepCount = 0; // Variable to store step count
let stepInterval; // Interval variable for step counter
let distancePerStep = 0.7; // 每步的距離（公尺）
let totalDistance = 0; // 總距離

// 語音播放功能
function speakText(text) {
  if ("speechSynthesis" in window) {
    if (speechSynthesisInstance) {
      speechSynthesis.cancel(); // 取消當前的語音播放
    }
    speechSynthesisInstance = new SpeechSynthesisUtterance(text);
    speechSynthesisInstance.lang = "zh-TW";
    speechSynthesisInstance.onend = () => (isSpeechPaused = false);
    window.speechSynthesis.speak(speechSynthesisInstance);
  } else {
    alert("您的瀏覽器不支援語音合成");
  }
}
function speakText(text) {
  if ("speechSynthesis" in window) {
    if (speechSynthesisInstance) {
      speechSynthesis.cancel(); // 取消當前的語音播放
    }
    speechSynthesisInstance = new SpeechSynthesisUtterance(text);
    speechSynthesisInstance.lang = "zh-TW";

    // 當語音播放完成時切換到下一張圖片
    speechSynthesisInstance.onend = () => {
      currentImageIndex++;
      if (currentImageIndex >= currentCategoryImages.length) {
        currentImageIndex = 0; // 重頭播放
      }
      displayImage(currentCategoryImages[currentImageIndex]);
      updateText(currentCategoryTexts[currentImageIndex]);
      speakText(currentCategoryTexts[currentImageIndex]); // 播放下一句
    };

    window.speechSynthesis.speak(speechSynthesisInstance);
  } else {
    alert("您的瀏覽器不支援語音合成");
  }
}

// 開始計時器和音樂、圖片輪播
function startCountdown(index) {
  const minutes = [10, 15, 20, 30, 40, 50, 60];
  const selectedMinutes = minutes[index];
  countdownEndTime = new Date().getTime() + selectedMinutes * 60 * 1000;
  remainingTime = selectedMinutes * 60;
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
  playMusic();
  startImageRotation();
  startStepCounter();
  speakText(currentCategoryTexts[currentImageIndex]);
}

// Function to play or pause music based on countdown state
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

// 播放音樂
function playMusic() {
  audio.play();
}

// 停止音樂
function stopMusic() {
  audio.pause();
}

// Pause or resume countdown
// 切換導覽列功能時停止語音
function stopSpeechOnNavigation() {
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel(); // 停止所有語音播放
    isSpeechPaused = false; // 重置語音暫停狀態
  }
}

// 暫停計時器並暫停語音播放
function pauseResumeCountdown() {
  const pauseIcon = document.getElementById("pauseIcon");
  if (!paused) {
    clearInterval(countdownInterval);
    clearInterval(imageRotationInterval);
    clearInterval(stepInterval);
    stopMusic();
    if ("speechSynthesis" in window) {
      speechSynthesis.pause(); // 暫停語音播放
    }
    isSpeechPaused = true;
    pauseIcon.classList.remove("fa-pause");
    pauseIcon.classList.add("fa-play");
  } else {
    countdownEndTime = new Date().getTime() + remainingTime * 1000;
    countdownInterval = setInterval(updateCountdown, 1000);
    startStepCounter();
    startImageRotation();
    if (isSpeechPaused) {
      window.speechSynthesis.resume(); // 恢復語音播放
    } else {
      speakText(currentCategoryTexts[currentImageIndex]);
    }
    playMusic();
    pauseIcon.classList.remove("fa-play");
    pauseIcon.classList.add("fa-pause");
  }
  paused = !paused;
}

// 添加事件監聽器到導覽列按鈕
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", stopSpeechOnNavigation);
});

// 停止計時器和語音播放（當需要時手動呼叫）
function stopAll() {
  clearInterval(countdownInterval);
  clearInterval(stepInterval);
  stopMusic();
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel(); // 停止語音播放
  }
}
function stopSpeechOnNavigation() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel(); // 停止所有語音播放
    isSpeechPaused = false; // 重置語音暫停狀態
  }
}
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    stopSpeechOnNavigation(); // 切換頁面時停止語音
  });
});
window.addEventListener("beforeunload", () => {
  stopSpeechOnNavigation(); // 離開或刷新時停止語音
});
function navigateToPage(pageId) {
  stopSpeechOnNavigation(); // 切換頁面前停止語音
  // 其他切換頁面的邏輯...
}

// 更新計時器顯示
function updateCountdown() {
  if (!paused) {
    const now = new Date().getTime();
    const distance = countdownEndTime - now;
    if (distance >= 0) {
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("countdownTimer").innerHTML =
        minutes + " 分 " + seconds + " 秒";
      remainingTime = Math.ceil(distance / 1000);
    } else {
      clearInterval(countdownInterval);
      clearInterval(stepInterval);
      document.getElementById("countdownTimer").innerHTML = "計時結束";
      stopMusic();
    }
  } else {
    stopMusic();
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
  clearInterval(countdownInterval);
  clearInterval(stepInterval);
  paused = false;
  pauseResumeCountdown();
}

// Move to next item
function nextItem() {
  currentItemIndex = (currentItemIndex + 1) % items.length;
  updateItem();
  clearInterval(countdownInterval);
  clearInterval(stepInterval);
  paused = false;
  pauseResumeCountdown();
}

// Update text and trigger text-to-speech
function updateText(text) {
  var textBox = document.querySelector(".語音導覽120 p");
  textBox.textContent = text;
  speakText(text);
}

// 啟動圖片輪播
function startImageRotation() {
  currentImageIndex = 0; // 確保從第一張圖片開始
  displayImage(currentCategoryImages[currentImageIndex]);
  updateText(currentCategoryTexts[currentImageIndex]);
  speakText(currentCategoryTexts[currentImageIndex]);
}

// 更新文字並播放語音
function updateText(text) {
  var textBox = document.querySelector(".語音導覽120 p");
  textBox.textContent = text;
  speakText(text);
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
    var categories = ["雷諾瓦", "莫內", "畢卡索", "弗里德里希", "何木火"];
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
  if (imageRotationInterval) {
    clearInterval(imageRotationInterval);
  }
  currentImageIndex = 0;

  isGalleryVisible = false;
}

function showCategory(category) {
  var gallery = document.getElementById("imageGallery");
  gallery.innerHTML = "";

  var selectedImages = [];
  var texts = [];

  // Reset images and texts for the selected category

  // 根据类别来选择对应的图片集
  if (category === "何木火") {
    selectedImages = [
      "何木火/一葉知秋.jpg",
      "何木火/人止關寫生.jpg",
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
    ];
    texts = [
      "《一葉知秋》是何木火的著名作品之一。何木火以其獨特的畫風和對自然景觀的細膩描繪而聞名，他的作品經常以細膩的筆觸和深刻的意境展現自然的美。\n這幅作品的創作靈感來自於中國古老的諺語“一葉知秋”，這句話意指從一片葉子的變化可以預見整個秋季的到來，\n表達了微小事物中蘊含著更大的變化和預兆。何木火通過這幅畫，試圖表達自然界的微妙變化和人生的哲理。",
      "何木火的《人止關寫生》是一幅充滿自然美感和哲理意境的作品。何木火作為中國當代藝術家，以其對自然景觀的細膩描繪和對生命哲理的深刻理解而著稱。\n“人止關”是指一個具有自然和歷史意義的地點，這裡或許有著特殊的自然景觀或者歷史背景，使其成為何木火創作靈感的源泉。\n這幅作品可能描繪了何木火在這個地點的觀察和體驗，通過寫生的方式，表達了他對自然和人文的深刻理解。",
      "《月世界之歌》通過月亮和大自然的意象，展示了何木火對宇宙之美和人生哲理的深刻理解。通過月亮和自然景觀的描繪，表達了對宇宙和人生的深刻思考。\n月亮象徵著永恆和思念，而自然景觀則展示了生命的多樣性和美麗。 情感表達：作品中流露出一種寧靜和深遠的情感，讓觀者感受到夜晚的寂靜和詩意。\n每一個細節都被精心刻畫，包括月亮的光環、夜空的星辰以及地面上的陰影和光亮。",
      "《月冷光寒》這幅作品的創作靈感可能來自於中國傳統文化中的月夜意象。月亮在中國文學和藝術中常常被用來表達寂靜、冷清和深遠的意境。\n何木火通過這幅作品，試圖捕捉月夜的冷清美感以及其中蘊含的哲理意味。冷色調的選擇使得整個畫面看起來既清冷又富有詩意。\n細膩的筆觸：何木火以細膩的筆觸描繪了夜晚的景象，包括月光下的樹木、湖泊和天空。他的筆觸輕盈而精確，讓畫面中的每一個細節都顯得生動而真實。",
      "《冰天雪地》反映了何木火對寒冷季節的景象及其內在精神的獨特理解。這幅作品可能創作於他在台灣或其他有寒冷氣候的地方旅行時，受到冰雪景象的啟發。\n作品聚焦於冰雪覆蓋的景象，通過對冰雪的描繪，表現出一種寧靜、純淨的氛圍。何木火在《冰天雪地》中可能運用了大量的白色、藍色和灰色等冷色調，\n這些色彩既能表現出冰雪的質感，又能傳達出一種冷冽而寧靜的感覺。他善於運用混合媒材，使作品具有豐富的視覺層次感。",
      "《金碧山水》這幅作品可能受到中國傳統山水畫的啟發，特別是宋代和元代的山水畫。這些傳統畫作常常描繪壯麗的山川河流，並且以其細膩的筆法和豐富的層次感著稱。\n何木火在《金碧山水》中運用了類似的技法，但加入了現代藝術的元素，創造出獨特的視覺效果。\n這幅作品成功地將傳統中國山水畫的技法與現代藝術的表現手法結合在一起，創造出獨特的視覺效果，展示了何木火在藝術創作上的創新和探索。",
      "《紅塵夢》這一作品的創作背景可能與何木火對人生和社會的深刻思考有關。作品標題“紅塵夢”來自於中文成語，意指塵世的繁華和夢幻，\n反映了人類在現實生活中的追求和幻滅。這一主題可能代表了藝術家對世俗生活的觀察和對精神世界的探索。\n《紅塵夢》描繪了一個融合自然與城市景觀的場景，可能包括盛開的花朵、繁茂的樹木和遠處的城市剪影。這些元素之間的交織，表現了現實與夢幻的交錯，讓人聯想到塵世的繁華與短暫。",
      "《飛向高峰》可能通過動態的構圖來強調飛翔的感覺。飛鳥在高空中翱翔，山峰在背景中巍峨聳立，這種動態的構圖讓整個畫面充滿了活力和力量。 \n何木火可能使用了鮮明的色彩來強調飛翔的自由和高峰的壯麗。藍天、白雲和雄偉的山峰形成了強烈的色彩對比，增強了畫面的視覺衝擊力。\n雖然畫面動態十足，何木火依然保持了他一貫的細膩筆觸。飛鳥的羽毛、山峰的紋理、天空的層次都被精細地描繪出來，展示了他高超的繪畫技巧。",
      "《高處不勝寒》可能靈感來自於山岳景觀以及高海拔地區的自然環境。作品標題引用了中國古詩詞中的意象，表達了一種高處孤高、清冷的情感。\n這一主題可能反映了藝術家對於生命中孤獨和艱難時刻的深刻思考。巍峨的山峰、覆蓋的白雪和稀疏的植被。畫面中的元素表現出一種自然的壯麗與嚴酷，\n讓人感受到高山之上的清冷與孤寂。這些自然景觀通過藝術家的巧妙處理，呈現出一種深刻的視覺和情感體驗。",
      "《野地清香》描繪了一片充滿自然生機的野地景象，可能包括盛開的花朵、茂盛的草地和自由生長的植物。這些自然元素通過藝術家的巧妙處理，呈現出一種純淨、清新的感覺。\n畫面中的光影變化和色彩運用，讓人感受到自然界的美好和寧靜。不僅僅是對自然景觀的描繪，更是對自然之美和生命意義的探索，\n作品中隱含的東方哲學思想讓人深思。是他藝術創作中的一個重要代表。",
      "作品名稱《尋》表達了一種探索和追尋的過程，這既可以是對外部世界的探索，也可以是對內心世界的追尋。何木火的作品經常反映他對生命意義的思考和對精神世界的探索。\n作品名稱和內容都表達了探索和尋找的主題，這與東方哲學中的自我探索和對生命本質的追問相契合。何木火通過對自然元素和現代藝術手法的融合，\n創造出具有獨特視覺美感的作品，這些作品不僅具有裝飾性，更具有深刻的思想性。\n《尋》展示了何木火在藝術表現上的創新和實驗精神，他不斷突破傳統藝術的界限，探索新的表現形式和技法。",
      "《絕塵》是台灣藝術家何木火的一件知名作品。何木火以其對自然、環境和人類內心世界的深刻觀察和獨特表達而聞名，他的作品往往充滿了詩意和哲理，\n並透過細膩的技法和豐富的素材來表達深層的情感和思想。何木火的作品通常受到東方哲學、禪宗思想以及台灣本土文化的影響。\n他對自然的熱愛和對生命意義的探尋在《絕塵》中得到了充分的體現。這件作品的名稱《絕塵》意指脫離世俗塵囂，追求一種純淨、超脫的精神境界。",
      "與何木火其他細膩的作品不同，《橫越沙塵》可能採用了更為粗獷和強烈的筆觸，以表現沙塵暴的狂野和動感。筆觸的變化強調了畫面中的動勢和力量。\n畫作可能使用了大量的暗色調，如深褐色、沙黃色和灰色，這些顏色強調了沙漠環境的荒涼和嚴酷。暗色調的運用使得畫面更具沉重感和震撼力。\n通過其粗獷的筆觸、強烈的光影對比和深刻的情感表達，展示了自然的偉大力量和人類的堅韌精神，是一幅值得細細品味和欣賞的藝術作品。",
    ];
  } else if (category === "莫內") {
    selectedImages = [
      "莫內/Impression Sunrise.jpg",
      "莫內/Jeanne-Marguerite Lecadre in the Garden.jpg",
      "莫內/A Farmyard in Normandy.jpg",
      "莫內/The Bridge, Amsterdam.jpg",
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
    ];
    texts = [
      "《印象·日出》（Impression, Sunrise）是法國畫家克勞德·莫內於1872年創作的一幅著名畫作，這幅作品是印象派運動的命名之作。\n《印象·日出》描繪了法國勒阿弗爾港口的晨曦景象。勒阿弗爾是莫內的家鄉，這幅畫反映了他對這個港口城市的深厚情感。\n畫作於1872年完成，並於1874年首次在巴黎的印象派畫展上展出。這次展覽由一群包括莫內在內的前衛藝術家組織，被稱為“無名畫家、雕塑家、版畫家協會的首次展覽”。",
      "《在花園裡的珍妮-瑪格麗特·勒卡德爾》（Jeanne-Marguerite Lecadre in the Garden）是克勞德·莫內於1866年創作的一幅油畫。\n珍妮-瑪格麗特·勒卡德爾是莫內的堂妹，畫作創作於莫內居住在法國諾曼第地區的勒阿弗爾（Le Havre）期間。這段時間，莫內經常在戶外作畫，探索光影效果和自然景觀的變化。\n莫內使用了豐富的色彩來描繪花園中的植物和人物的服飾，色彩之間的對比和融合使得畫面充滿活力。",
      "《諾曼第的農場院》（A Farmyard in Normandy）是克勞德·莫內於1865年左右創作的一幅畫作，描繪了法國諾曼第地區一個典型的農場景象。\n這幅畫反映了莫內早期的藝術風格，與他後來的印象派作品有所不同，更加注重細節和現實主義的表現。\n莫內使用真實的色彩來表現農場的日常景象，色彩運用上較為保守，與他後期的印象派風格相比，較少使用色彩的分裂和快速筆觸。整體畫面傳達出一種寧靜和諧的鄉村生活景象。",
      "《阿姆斯特丹的橋》（The Bridge, Amsterdam）是克勞德·莫內於1874年創作的一幅畫作。莫內在1870年代中期旅行至阿姆斯特丹，\n對這座城市的獨特景觀產生了興趣。阿姆斯特丹以其運河和橋樑聞名，這些景觀成為莫內靈感的來源。在這一時期，\n莫內致力於捕捉城市景觀中的光影變化和色彩效果，這幅《阿姆斯特丹的橋》正是這一探索的體現。\n這幅畫作反映了莫內對都市景觀的獨特觀察和對印象派技法的靈活運用，對於研究莫內的藝術風格和印象派運動的發展具有重要意義。",
      "《瓦朗熱維爾的教堂和勒穆蒂埃峽谷》（The Church at Varengeville and the Gorge of Les Moutiers）是克勞德·莫內於1882年創作的作品之一。\n這幅作品展示了莫內對自然景觀的深刻理解和對光影效果的敏銳把握，體現了他成熟的印象派風格。莫內在這幅畫中運用了精湛的光影效果，特別是光線在建築和自然景觀中的變化。\n陽光照射在教堂和峽谷的不同部位，創造出豐富的光影對比。莫內使用了明亮而多變的色彩來描繪自然景觀，海洋的藍色、草地的綠色和教堂的石灰岩色調在畫中和諧融合，展現出自然的生機。",
      "《睡蓮池》（The Water-Lily Pond）是克勞德·莫內於1899年創作的一幅作品，屬於他著名的《睡蓮》系列中的一部分。\n《睡蓮池》是莫內《睡蓮》系列中最具代表性的作品之一，這些作品在藝術史上具有重要地位。莫內通過這些作品，開創了現代藝術中對光影和色彩表現的新視角，對後來的藝術家產生了深遠的影響。\n《睡蓮池》中的多幅作品被收藏在世界各地的主要博物館和美術館中，包括巴黎奧賽博物館和美國的華盛頓國家美術館等。",
      "《聖阿德列斯的花園》（Garden at Sainte-Adresse）是克勞德·莫內於1867年創作的一幅畫作，這幅作品展示了莫內早期對色彩和光線的探索\n，是他印象派風格形成過程中的重要一環，展示了莫內早期的一些風格特徵。這幅畫中使用了鮮明而對比強烈的色彩，如鮮紅色、黃色和藍色，這些色彩在陽光的照射下顯得格外鮮艷。\n畫作中對光影的表現非常突出，莫內捕捉了夏日午後陽光的照射效果，花園中的植物和人物都被光影分明地描繪出來。",
      "《睡蓮·黃昏效果》（Water Lilies, Evening Effect）是克勞德·莫內於1897年至1899年間創作的一幅重要作品，屬於他廣為人知的《睡蓮》系列。\n這一系列的作品主要描繪了他在吉維尼花園的睡蓮池，展示了他對光影變化和自然景觀的深刻理解。莫內在1890年代末至1900年代初，\n將大量時間投入到他位於吉維尼的花園中，專注於創作這些描繪睡蓮池的畫作。這些畫作不僅是自然景觀的再現，也是他對光和色彩表現的極致探索。",
      "《滑鐵盧橋，灰色天氣》（Waterloo Bridge, Gray Weather）是克勞德·莫內於1900年至1904年間創作的一系列畫作之一。\n這些畫作描繪了倫敦滑鐵盧橋在不同天氣和光線條件下的景象，展示了莫內對光影和色彩的深入探索。他在1900年至1904年間多次訪問倫敦，專注於繪製泰晤士河沿岸的景色，\n包括滑鐵盧橋、查令十字橋和國會大廈等題材。這些畫作反映了莫內對光線和天氣變化的關注，以及他對印象派技法的進一步探索。",
      "《在札安丹附近的風車》（Windmills near Zaandam）是克勞德·莫內於1871年創作的一幅畫作。\n這幅畫顯示了莫內在荷蘭札安丹（Zaandam）地區的風車景象，這是他在荷蘭旅遊期間創作的作品之一。札安丹地區以其眾多風車而聞名，\n這些風車是當地特有的景觀元素，對於當時的藝術家具有很大的吸引力。莫內在這裡創作了一系列以風車為主題的畫作，這些作品展示了他對光影和色彩的敏銳感知。",
      "《翁弗勒爾的聖母恩賜小教堂》（The Chapel Notre-Dame de Grâce at Honfleur）是克勞德·莫內於1864年創作的一幅畫作。\n翁弗勒爾以其美麗的港口和獨特的光線吸引了眾多藝術家。聖母恩賜小教堂（Chapelle Notre-Dame de Grâce）位於翁弗勒爾附近的山丘上，這是一座歷史悠久的小教堂，\n以其壯觀的海景和寧靜的氛圍著稱。這幅畫作目前收藏於美國華盛頓特區的國家藝廊。",
      "《花園》（The Garden）是克勞德·莫內於1866年創作的一幅畫作，是莫內早期作品中的重要之一，體現了他對光影和色彩表現的深刻理解。\n畫面描繪了一個花園的景象，可能包括盛開的花朵、茂盛的植被和穿梭於花園中的人物。莫內的畫作中常常出現豐富的自然元素，這些元素在他的筆下被轉化為充滿生氣的畫面。\n畫中的色彩和光影表現出一種愉悅和寧靜的氛圍，讓觀者感受到自然的美好和和諧。",
      "《畫舫》（The Boat Studio）是克勞德·莫內於1876年創作的一幅畫作，描繪了他在塞納河上使用的畫舫，這是一艘專門用來作畫的小船。\n是他印象派技法的重要範例也是印象派運動中對自然光影和瞬間印象捕捉的重要範例。\n這幅畫作目前收藏於巴黎的奧賽博物館。該館收藏了大量印象派和後印象派的經典作品，為研究和欣賞莫內的藝術創作提供了豐富的資源。",
      "《果籃中的蘋果與葡萄》（Fruit Basket with Apples and Grapes）是克勞德·莫內於1860年代創作的一幅畫作，屬於他早期的靜物畫作品。\n這幅畫展示了莫內在藝術技術上的初步探索，特別是在對光影和顏色的處理上。\n畫作中對光影的處理相對細緻，表現了光線在水果表面的反射和投影，這是莫內在後來作品中進一步發展的重要技術。",
      "《釣魚者》（Anglers）是克勞德·莫內於1868年至1869年間創作的一幅畫作。《釣魚者》是莫內早期作品中的一個重要部分，\n顯示了他在光影表現和色彩使用上的初步探索。這幅畫作雖然在風格上較為傳統，但為他後來的印象派風格奠定了基礎，\n特別是在捕捉自然景象的瞬間變化和對色彩的獨特運用方面。",
      "《在花園裡》（In the Garden）是克勞德·莫內於1866年創作的一幅畫作，也被稱為《婦女在花園裡》（Women in the Garden）。\n這幅畫展示了莫內對光影效果的探索以及他對日常生活場景的捕捉，是印象派風格的早期表現。在這一時期，他對戶外光線和自然景觀的表現產生了濃厚的興趣，\n並開始實驗如何在畫布上捕捉光影變化。畫作中的模特包括莫內的未婚妻卡米耶·多內（Camille Doncieux）和其他幾位朋友。",
      "《午餐》（The Luncheon）是克勞德·莫內於1868年創作的一幅畫作，這幅作品是莫內早期印象派風格的代表之一。\n在1860年代末期，莫內與其他印象派藝術家一起在巴黎活躍，他們對光線和色彩的研究使得他們的作品逐漸走向了一種全新的表現方式。\n這幅畫作展示了莫內對日常生活場景的細膩觀察和表現，使得他的作品在藝術史上具有獨特的價值。",
      "《菊花》（Chrysanthemums）是克勞德·莫內於1880年代創作的一系列畫作，這些畫作展示了他對花卉主題的興趣和他對自然細節的深入描繪。\n菊花是當時非常流行的園藝植物，莫內通過這些作品表達了他對色彩和光影的敏感性。莫內除了進行風景畫創作外，\n也對花卉畫有著濃厚的興趣。特別是在他位於吉維尼的花園中，菊花作為一種重要的花卉，他常常用來探索不同的色彩效果和光影變化。",
    ];
  } else if (category === "雷諾瓦") {
    selectedImages = [
      "雷諾瓦/Barges on the Seine.jpg",
      "雷諾瓦/Field of Banana Trees.jpg",
      "雷諾瓦/Forest Path.jpg",
      "雷諾瓦/Landscape near Pont Aven.jpg",
      "雷諾瓦/The Laundress.jpg",
      "雷諾瓦/The Rose Garden at Wargemont.jpg",
      "雷諾瓦/青蛙塘.jpg",
      "雷諾瓦/Bouquets of Flowers.jpg",
      "雷諾瓦/The Seine at Asnieres (The Skiff).jpg",
      "雷諾瓦/Roses.jpg",
      "雷諾瓦/House and Figure among the Trees.jpg",
      "雷諾瓦/Vase Basket of Flowers and Fruit.jpg",
    ];
    texts = [
      "《塞納河上的駁船》（Barges on the Seine）是法國印象派畫家皮埃爾-奧古斯特·雷諾阿（Pierre-Auguste Renoir）創作的一幅著名畫作。\n雷諾阿是印象派運動的重要代表，他的作品以其充滿生氣的色彩和光影效果而著稱。當時的雷諾阿和其他印象派畫家一樣，\n致力於捕捉日常生活的瞬間和自然光線的變化。塞納河是巴黎及其周邊地區的重要風景，常常成為印象派畫家們的靈感來源。",
      "《香蕉樹田》（Field of Banana Trees）是法國印象派畫家皮埃爾-奧古斯特·雷諾阿（Pierre-Auguste Renoir）的一幅作品。這幅《香蕉樹田》創作於他的一次旅行期間，\n當時他對異國風情和熱帶景觀產生了濃厚的興趣。這幅作品展示了他對熱帶植物和景觀的觀察和表現。\n雷諾阿擅長捕捉自然光線的變化。在這幅畫中，他描繪了陽光穿過香蕉樹葉的場景，創造出豐富的光影效果，使整個畫面充滿了生機和動感。",
      "《林間小徑》（Forest Path）中運用了大量的光影效果，描繪了陽光透過樹葉灑在地面上的情景。光線的變化使畫面充滿了動感和生氣。\n描繪了一條蜿蜒穿過森林的小徑。小徑兩側被茂密的樹木和植被所包圍，陽光透過樹冠灑下來，形成斑駁的光影效果。\n體現了印象派的核心特徵，包括對光影變化的關注、色彩的豐富運用和筆觸的自由表現，這些特徵對後來的藝術家產生了深遠的影響。",
      "《Pont Aven 附近的風景》（Landscape near Pont Aven）這幅作品展現了雷諾阿在布列塔尼地區的鄉村風光。\n雷諾阿的筆觸輕快且富有動感，他經常使用短小而迅速的筆觸來捕捉景物的質感和動態，使得畫面充滿了生氣和活力。\n展示了他對自然景觀的細膩描繪和真實表達，讓觀者能夠感受到自然的美麗與和諧。",
      "《洗衣女工》（The Laundress）這幅畫作展示了雷諾阿對日常生活場景的描繪，特別是對人物表現的關注。\n在其藝術生涯中，經常畫出當時社會中普通人物的日常生活，特別是勞動階層的人物。他對這些人物的描繪充滿了同情與關懷，試圖捕捉他們的真實情感和生活狀態。\n他在這幅作品中使用了柔和的色調，讓畫面顯得既自然又和諧。色彩的對比和過渡使得畫面的層次感更為分明。",
      "《Wargemont 的玫瑰花園》（The Rose Garden at Wargemont）雷諾阿在他的藝術生涯中，特別喜愛描繪花園和自然景觀。\nWargemont 是他的一個靈感來源地，這裡的花園和周邊環境為他的創作提供了豐富的題材。這幅畫作可能創作於他在Wargemont生活和工作期間，\n當時雷諾阿正致力於探索印象派的光影效果和色彩表現。通過其對花卉的細緻描繪，表達了他對自然之美的熱愛，使觀者能夠感受到花園的生動和和諧。",
      "《青蛙塘》（La Grenouillère）是由法國印象派畫家皮埃爾-奧古斯特·雷諾瓦（Pierre-Auguste Renoir）和克洛德·莫奈（Claude Monet）共同創作的一幅作品，完成於1869年。\n這幅畫描繪了巴黎近郊的塞納河上的一個熱門休閒地點——青蛙塘，這是一個人們夏季休閒、游泳和野餐的場所。\n背景中是綠樹成蔭的河岸和水面。整個場景充滿了活力和動感，展示了人們在青蛙塘的悠閒時光。",
      "《花束》（Bouquets of Flowers），雷諾阿以其明亮而和諧的色彩聞名。他在這幅畫中使用了多種顏色，包括紅色、黃色和綠色等，\n這些色彩之間的微妙過渡和對比，使得花朵顯得栩栩如生。體現了印象派的核心特徵，包括對光影變化的關注、色彩的微妙運用和自由的筆觸，\n這些特徵對後來的藝術家產生了深遠的影響。",
      "《The Seine at Asnières (The Skiff)》這幅畫的主題來自雷諾瓦對自然風光的熱愛，特別是對河流和戶外風景的描繪。Asnières 是巴黎郊區的一個小鎮，\n擁有美麗的塞納河風景，雷諾瓦在此地進行了多次創作。雷諾瓦巧妙地利用光影效果，尤其是水面上的反光，\n來增強畫面的動感和層次感。光線的流動性和反射效果使整幅畫作看起來生動且充滿活力。",
      "《玫瑰》（Roses）是皮埃爾-奧古斯特·雷諾阿（Pierre-Auguste Renoir）創作的一幅著名畫作。花朵的每一個細節都被精細描繪。\n雷諾阿特別注重捕捉玫瑰的形狀、質地和色彩變化，使得整幅畫作充滿了生命力和美感。\n畫中的玫瑰花瓣在光影的映射下顯得格外迷人，展示了雷諾阿對花卉美的深刻理解和精湛技藝。",
      "《樹林中的房屋與人物》（House and Figure among the Trees）創作於19世紀末期，這段時期的雷諾阿正積極探索印象派的技法，特別是光影效果和色彩運用。\n這幅畫作可能描繪的是法國鄉村的一個安靜角落，展示了自然與人類活動的和諧融合。\n在這幅畫中，他使用了豐富的綠色、黃色和藍色，這些色彩之間的微妙變化增強了畫面的深度和生機。",
      "《Vase Basket of Flowers and Fruit》花卉和水果的組合是靜物畫中常見的主題，雷諾瓦在這幅作品中透過豐富的色彩和精細的筆觸來展現其自然美。\n花卉的各種顏色和水果的自然色澤在畫中相得益彰，形成了一幅色彩斑斕且生動的畫面。\n雷諾瓦的色彩運用通常非常細膩，能夠捕捉到光線的變化和物體的質感。展示了他在靜物畫領域的高超造詣。",
    ];
  } else if (category === "畢卡索") {
    selectedImages = [
      "畢卡索/Houses on the hill.jpg",
      "畢卡索/Cafe Royan.jpg",
      "畢卡索/格爾尼卡.jpg",
      "畢卡索/Square du Vert-Galant.jpg",
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
    texts = [
      "《山坡上的房子》（Houses on the Hill）是一幅由巴勃羅·畢卡索創作的畫作。\n這幅作品展示了畢卡索在立體主義風格中的探索，特別是在空間和形狀的分解與重組方面的創新。在這段時間，\n畢卡索和喬治·布拉克（Georges Braque）一起發展了立體主義，這是一種通過分解和重組形狀來描繪物體的藝術風格，對20世紀藝術發展具有重要意義。",
      "《羅揚咖啡館》（Cafe Royan）是由巴勃羅·畢卡索創作的一幅作品。這幅畫作展示了畢卡索在其藝術生涯中對日常生活場景的描繪，是在他探索立體主義風格時期的表現。\nRoyan（羅揚）是法國西南部的一個海濱小鎮，畢卡索在1914年曾在那裡度過一段時間。此畫作描繪的就是當地一間咖啡館的場景。\n畫作中的場景和人物表現出自然和放鬆的情緒，畢卡索通過這幅作品表達了對日常生活和人類情感的關注。",
      "《格爾尼卡》（Guernica）是巴勃羅·畢卡索最著名的作品之一，也是20世紀藝術史上的經典之作。\n這幅畫作以其強烈的情感表達和對戰爭殘酷性的揭示，成為反戰藝術的象徵。1937年4月26日，納粹德國空軍在西班牙小鎮格爾尼卡實施了空襲，\n造成了大量平民死亡和城鎮毀壞。畢卡索受到這一事件的震撼，決定創作這幅畫作來表達對戰爭的強烈反對。\n這幅畫在1937年巴黎國際博覽會上首次公開展出，後來被送往西班牙國家博物館保存，並成為西班牙文化和反戰象徵。",
      "《維爾-加朗廣場》（Square du Vert-Galant）是由巴勃羅·畢卡索創作的一幅作品，展現了他在立體主義風格中的探索。\n在空間構造上畢卡索對空間進行了重構，打破了傳統的單一視角，創造出一種多維度的空間效果，使畫面看起來更加動態和立體。\n他在這幅畫作中展示了如何通過立體主義的技法，將日常景象轉化為具有抽象美感的藝術作品。",
      "《工作室》（Studio）是巴勃羅·畢卡索的一幅重要作品，通常指的是畢卡索在他藝術創作中所使用的空間，這些作品常常描繪他的工作室內景，\n包含了他各種創作工具和物品。這類畫作反映了畢卡索對空間布局、形狀和光影效果的探索，並且展示了他對藝術創作過程的深刻洞察。\n強調了空間的多維度特徵，通過不同視角的描繪，打破了傳統的一維或二維空間表現，使畫面看起來更加動態和立體。",
      "《Plaster Head and Arm》是一幅由巴勃羅·畢卡索創作的作品，展示了他對人體和雕塑形式的深刻理解和創新表現。\n具體創作年份不詳，但這幅作品與畢卡索的其他立體主義作品風格相近，可能創作於20世紀初期，當時畢卡索正處於立體主義的高峰期。\n畫面中展示了一個石膏頭部和手臂的形象。這些部分被分解成多個幾何形狀，並且這些形狀之間的互動形成了一種動態的視覺效果。",
      "《雕塑家》（The Sculptor）是巴勃羅·畢卡索的一幅著名畫作，通常被認為是他在多個藝術領域中展現創意和技術的代表之一。\n這幅作品通過對雕塑家創作過程的描繪，展現了畢卡索對藝術創作的深刻理解和情感表達。\n通過其獨特的立體主義風格和深刻的情感表達，展示了他在藝術創作中的創新和探索，這幅作品是現代藝術史上具有重要價值和影響力的經典之作。",
      "《遊樂場》（Fairground）是畢卡索在其藝術生涯中的一幅重要作品。這幅畫作展示了他對充滿活力和動感的場景的描繪，以及他對立體主義風格的運用。\n這幅作品通過對遊樂場場景的描繪，表達了對人類娛樂活動的觀察和記錄。畢卡索在這幅畫作中展示了他對動態場景的敏銳觀察，\n並且通過立體主義的形式表達了這種動態和活力。展示了他對動態場景和人類娛樂活動的深刻理解。",
      "《沐浴》（Bathing）是一幅展示其成熟立體主義風格的作品。沐浴作為一個平凡且充滿私密性的日常場景，成為畢卡索探索形態和空間變化的理想題材。\n他通過將人體和環境的各個角度組合在一起，展現了他對立體主義的理解和應用。將物體的各個面從不同視角呈現出來，\n這些面被重新組合在一起，形成了一種新的視覺結構。通過打破傳統的單一視角，創造出多維度的空間效果，使畫面看起來更加動態和立體。",
      "《哈里奎恩一家》（Harlequin Family）是畢卡索創作的一幅重要作品，展示了他對馬戲團生活和人物的深刻理解和表達。\n哈里奎恩（Harlequin）是馬戲團中的一個傳統角色，通常以其多彩的服裝和幽默的表演著稱。畢卡索對馬戲團和其表演者有著濃厚的興趣，\n這在他的多幅作品中有所體現。畫中的三個人物之間的互動和姿態表現出他們之間的親密關係和深厚感情。",
      "《親吻》（The Kiss）是巴勃羅·畢卡索創作的著名畫作之一。畫作創作於1900年代初期，屬於畢卡索的藍色時期。\n這一時期的作品以冷色調為主，表現了畢卡索對孤獨、悲傷和貧困的感受。這幅《The Kiss》也不例外，畫中人物的表情和姿態充滿了情感的張力。\n使用了冷色調，如藍色和灰色，這些顏色增強了畫面的情感表達，使得畫中的人物顯得更加孤獨和哀傷。",
      "《躺著的女人》（Reclining Woman）是巴勃羅·畢卡索的一幅重要作品，展示了他對女性形體的描繪和他在藝術風格上的多樣性。\n畫作中描繪了一個躺著的女人，她可能是放鬆的、沉思的或是夢幻的。她的姿態和表情傳達出一種寧靜和內省的氛圍。\n女性形體可能被扭曲和變形，表現出一種夢幻般的效果和深層次的情感。",
      "《靜物》（Still Life）是巴勃羅·畢卡索所創作的靜物系列的作品之一。\n畢卡索在靜物畫中經常通過形狀的重組和結構的變化，挑戰觀者的視覺和認知，這使得他的作品具有很強的視覺衝擊力和現代感。\n畢卡索的靜物畫不僅僅是對物品的描繪，更是他情感和思想的表達。他通過對物品的重新組合和分解，探索了形狀、空間和色彩的多樣性。",
      "《沙灘遊戲與救援》（Beach Game and Rescue）是一幅由畢卡索創作的作品。畢卡索選擇了沙灘遊戲和救援的場景，這是一個充滿活力和動感的題材。\n這樣的選擇展示了他對日常生活場景的關注，並且通過這些場景來探索光影和形態的變化。畢卡索在這幅作品中使用了鮮明且對比強烈的色彩，\n如藍色、紅色和黃色，這些色彩增強了畫面的視覺效果和情感表達。色彩的運用也使得畫面更加生動和吸引人。",
    ];
  } else if (category === "弗里德里希") {
    selectedImages = [
      "弗里德里希/Two Men Contemplating the Moon.jpg",
      "弗里德里希/Bohemian Landscape.jpg",
      "弗里德里希/Boats in the Harbour at Evening.jpg",
      "弗里德里希/Day.jpg",
      "弗里德里希/Landscape with rainbow.jpg",
      "弗里德里希/Landscape with Mountain Lake Morning.jpg",
      "弗里德里希/Morning.jpg",
      "弗里德里希/Hills and Ploughed Fields near Dresden.jpg",
      "弗里德里希/Landscape with Oak Trees and a Hunter.jpg",
      "弗里德里希/Rocky Reef on the Seashore.jpg",
      "弗里德里希/Solitary Tree.jpg",
      "弗里德里希/Morning in the Mountains.jpg",
      "弗里德里希/The Times Of Day：The Evening.jpg",
      "弗里德里希/The Times of Day：The Morning.jpg",
    ];
    texts = [
      "《兩人凝望月亮》（Two Men Contemplating the Moon）弗裡德里希通過這幅畫，表現了人類對宇宙和未知的沉思，以及人與自然之間的深刻聯繫。\n這幅作品也傳達了一種對超越現世的精神追求。畫中兩個人站在岩石上，凝望著遠處的月亮。夜空寧靜，月光灑在大地上，營造出一種神秘而安寧的氛圍。",
      "《波希米亞景觀》（Bohemian Landscape）這幅畫作展現了弗里德里希對自然的熱愛和他獨特的藝術風格，以其深刻的情感表達和細膩的景觀描繪著稱。\n波希米亞位於今天的捷克共和國西部，擁有壯麗的自然景觀和豐富的歷史文化。弗里德里希受到這些景觀的啟發，創作了這幅畫作，捕捉了波希米亞自然景觀的美麗和神秘。\n弗里德里希擅長運用光影效果來增強畫面的氛圍和情感表達。這種細膩的描繪使得畫作更加生動，讓觀眾仿佛置身於波希米亞的壯麗景色中。",
      "《傍晚港口的船隻》（Boats in the Harbour at Evening）浪漫主義時期的畫家們熱衷於描繪自然景觀，並通過自然表達內心的情感和哲思。作品描繪了一個寧靜的港口，傍晚的光線柔和地灑在水面和船隻上。\n弗里德里希以其獨特的視角和對自然的敏銳觀察，將這一場景呈現在觀眾面前。這幅畫作通過對光影的細膩處理和對自然景觀的描繪，表現出一種寧靜而深邃的氛圍。\n傍晚的光線柔和而溫暖，船隻和水面的倒影在微弱的光線中顯得格外迷人。弗里德里希巧妙地運用了光影對比，增強了畫面的深度和層次感。",
      "《一天中的時刻：傍晚》（The Times Of Day：The Evening）這幅作品描繪了一個寧靜的傍晚場景，夕陽的餘暉柔和地灑在自然景觀上。弗里德里希以其獨特的視角和對自然的敏銳觀察，將這一場景生動地呈現在觀眾面前。\n弗里德里希對自然景觀的描繪細緻入微，畫面中的每一個細節都展現了他對自然的熱愛和尊敬。山川、森林和河流共同構成了一幅和諧而壯麗的自然畫卷。\n讓觀眾在欣賞畫作的同時，感受到內心的平靜和深思。",
      "《一天中的時光：早晨》（The Times of Day: The Morning）這幅作品是弗裡德里希對一天不同時間的描繪系列之一。畫面呈現了一個平靜的早晨，陽光灑在寧靜的景色上，象徵著一天的開始和新的希望。\n通過對光線和自然環境的表現，弗裡德里希展現了人類與自然的和諧關係。",
      "《白晝》（Day）一個寧靜的白晝場景，陽光普照，景色宜人。弗里德里希以其獨特的視角和對自然的敏銳觀察，將這一場景呈現在觀眾面前。\n弗里德里希的畫作常常蘊含著哲學意義，他通過對自然的描繪，探索人與自然、個體與宇宙的關係。在這幅作品中，白晝的光線和寧靜的景觀象徵著人類對和平與安寧的追求。\n展示了畫家對自然和情感的深刻理解，是一幅具有高度藝術價值和哲學意義的經典之作。",
      "《彩虹風景》（Landscape with Rainbow）描繪了一個壯麗的自然景觀，彩虹橫跨天空，象徵著希望與和平。\n這幅作品展示了弗里德里希對大自然的崇敬和對人類希望的表達。彩虹的色彩和光線穿透雲層，照耀在整個景觀上，增強了畫面的深度和層次感，使得整個畫面顯得格外生動。\n虹象徵著人類對希望和和平的追求，展示了弗里德里希對人類未來的美好願景。",
      "《山湖風景：早晨》（Landscape with Mountain Lake: Morning）弗里德里希活躍於19世紀初期，這幅畫作創作於這一時期，是他探索自然與人類情感關係的重要作品之一。\n這幅作品描繪了一個寧靜的山湖場景，早晨的陽光剛剛升起，照耀在湖面和周圍的山脈上，營造出一種寧靜而神秘的氛圍。\n運用了光影效果來增強畫面的氛圍。早晨的光線柔和而溫暖，照耀在湖面和山脈上，增強了畫面的深度和層次感，使得整個畫面顯得格外迷人。",
      "《早晨在山間》（Morning in the Mountains）這幅畫描繪了清晨的山間景象，陽光剛剛升起，山峰在晨霧中若隱若現，給人一種寧靜而神秘的感覺。\n通過對大自然的描繪，弗裡德里希表達了人類對自然的敬畏和對崇高精神的追求。",
      "《德累斯頓附近的丘陵與犁地》（Hills and Ploughed Fields near Dresden）描繪了德累斯頓附近的農田和丘陵景觀，展現了大自然的寧靜與和諧。德累斯頓是弗里德里希生活和創作的重要地點之一，\n他經常從周邊的自然景觀中汲取靈感。運用了光影效果來增強畫面的氛圍。柔和的光線照耀在農田和丘陵上，增強了畫面的深度和層次感，使得整個畫面顯得格外生動。\n寧靜的農田和廣闊的丘陵象徵著人類對和平與安寧的追求。",
      "《橡樹與獵人風景》（Landscape with Oak Trees and a Hunter）描繪了一個寧靜的鄉村場景，畫面中的橡樹雄偉壯麗，一名獵人穿行於其間，這種場景體現了自然的偉大和人類的渺小。\n弗里德里希的畫作常常蘊含著深刻的哲學意義，他通過對自然的描繪，探索人與自然、個體與宇宙的關係。在這幅作品中，偉大的橡樹和渺小的獵人形成鮮明對比，\n象徵著自然的偉大和人類的渺小。通過其獨特的浪漫主義風格和對自然景觀的精細描繪，展示了畫家對自然和情感的深刻理解。",
      "《海岸上的岩礁》（Rocky Reef on the Seashore）幅畫描繪了一個風暴過後的海岸景象，巨大的岩礁屹立在波濤洶湧的大海中，天空烏雲密佈。\n弗裡德里希通過這種對比強烈的景象，表達了大自然的力量和人類的渺小，突顯出一種崇高的美感。",
      "《孤獨的樹》（Solitary Tree）這幅畫展示了一棵孤獨的樹，屹立在廣闊的田野中。天空中雲朵飄過，遠處是連綿的山脈。\n象徵了個體在宇宙中的孤獨和堅韌，樹的形象常被弗裡德里希用來表達生命的韌性和持久。",
    ];
  }
  currentCategoryImages = selectedImages;
  currentCategoryTexts = texts;
  currentImageIndex = 0;

  startImageRotation();

  displayImage(selectedImages[currentImageIndex]);
  updateText(texts[currentImageIndex]);
}

function displayImage(imageSrc) {
  document.body.style.backgroundImage = 'url("' + imageSrc + '")';
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center 160px"; // 背景圖片向下移動
  document.body.style.backgroundRepeat = "no-repeat";
  var img = document.createElement("img");
  img.src = imageSrc;
}

function updateText(text) {
  var textBox = document.querySelector(".text-box p");
  textBox.textContent = text;
}

function startImageRotation() {
  if (imageRotationInterval) {
    clearInterval(imageRotationInterval);
  }
}

// 每分钟更新燃烧的卡路里数
let totalCaloriesBurned = 0;
let isTimerRunning = false;

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

// Start step counter
function startStepCounter() {
  stepInterval = setInterval(() => {
    if (!paused) {
      stepCount += 1; // Increase step count by 1 every second
      totalDistance = stepCount * distancePerStep; // 計算總距離
      document.getElementById("stepCounter").innerHTML = stepCount;
      document.getElementById("distance").innerHTML =
        totalDistance.toFixed(1) + " 公尺"; // 更新顯示距離，保留兩位小數
    }
  }, 500); // Update every second
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
}, 30 * 60000); // 30分钟的毫秒数

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

  if (!isNaN(weight) && weight > 0) {
    weightInput.disabled = true;
    confirmButton.disabled = true;
  } else {
    alert("請輸入有效的體重！");
  }
}

//選擇BPM
function guidetoggleDropdown() {
  var dropdown = document.getElementById("guideDropdown");
  dropdown.classList.toggle("show");
}

// 關閉下拉選單若點擊視窗外的地方
window.onclick = function (event) {
  if (!event.target.matches(".item")) {
    var dropdowns = document.getElementsByClassName(
      "bpm-content",
      "guidebpm-content"
    );
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
