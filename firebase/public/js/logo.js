//logo
document.addEventListener("DOMContentLoaded", function () {
  // DOM載入後執行

  // Anime.js動畫效果
  anime
    .timeline({
      easing: "easeInOutQuad",
      duration: 1500,
      delay: 500,
    })
    .add({
      targets: ".animation-container",
      opacity: 1,
      translateY: -50,
    })
    .add({
      targets: ".animation-container",
      translateY: ["0%", "100%"],
    });

  // 延遲一點時間後，轉場到下一個頁面
  setTimeout(function () {
    window.location.href = "start.html";
  }, 3000); // 延遲時間，這裡的3000代表3秒，可以根據需要調整
});
