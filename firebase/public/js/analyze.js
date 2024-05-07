// 假設這是用於呈現折線圖的JavaScript庫，例如Chart.js
// 創建一個函數來動態添加圖表
function addChart() {
  // 創建一個canvas元素
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 200;

  // 將canvas添加到頁面中的chart-container div中
  document.getElementById("chart-container").appendChild(canvas);

  // 獲取canvas的上下文
  const ctx = canvas.getContext("2d");

  // 創建圖表實例並設置數據
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["一月", "二月", "三月", "四月", "五月", "六月"],
      datasets: [
        {
          label: "步數",
          data: [5000, 6000, 5500, 7000, 6500, 7500],
          borderColor: "blue",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

// 在頁面加載時調用addChart函數，以添加圖表
window.onload = addChart;
