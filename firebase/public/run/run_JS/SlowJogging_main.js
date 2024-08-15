// 引入必要的庫
import * as tf from "@tensorflow/tfjs";
import * as mp from "@mediapipe/holistic";
import * as cv from "opencv.js";

// 定義警告信息和相關參數
const warnings = [
  "lift your head up & keep your back straight",
  "lift your feet higher",
  "lower your feet",
  "swing your arms more",
  "reduce armswing",
];
const no_sequences = 30;
const sequence_length = 30;
const label_map = warnings.reduce(
  (acc, label, index) => ({ ...acc, [label]: index }),
  {}
);

// 加載模型
const model = await tf.loadLayersModel("path/to/your/model.json");

// 設置視頻捕獲
const videoElement = document.querySelector("video");
const canvasElement = document.querySelector("canvas");
const canvasCtx = canvasElement.getContext("2d");

// Mediapipe設置
const holistic = new mp.Holistic({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
});
holistic.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  smoothSegmentation: false,
  refineFaceLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

// Mediapipe偵測函數
function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  // 繪制關鍵點
  mp.drawing.drawLandmarks(
    canvasCtx,
    results.poseLandmarks,
    mp.holistic.POSE_CONNECTIONS
  );
  mp.drawing.drawLandmarks(
    canvasCtx,
    results.faceLandmarks,
    mp.holistic.FACEMESH_TESSELATION
  );
  mp.drawing.drawLandmarks(
    canvasCtx,
    results.leftHandLandmarks,
    mp.holistic.HAND_CONNECTIONS
  );
  mp.drawing.drawLandmarks(
    canvasCtx,
    results.rightHandLandmarks,
    mp.holistic.HAND_CONNECTIONS
  );

  // 提取關鍵點
  const keypoints = extractKeypoints(results);
  sequence.push(keypoints);
  sequence = sequence.slice(-30);

  if (sequence.length === 30) {
    const res = model.predict(tf.tensor([sequence])).arraySync()[0];
    const index = res.indexOf(Math.max(...res));
    console.log(warnings[index]);

    predictions.push(index);
    if (
      predictions.length > 10 &&
      new Set(predictions.slice(-10)).size === 1 &&
      res[index] > 0.5
    ) {
      if (
        sentence.length === 0 ||
        warnings[index] !== sentence[sentence.length - 1]
      ) {
        sentence.push(warnings[index]);
      }
      if (sentence.length > 5) {
        sentence = sentence.slice(-5);
      }
    }
  }

  // 可視化預測結果
  probViz(res, warnings, canvasCtx);

  // 更新步數計數器
  const steps = updateFootstepCounter(results);
  canvasCtx.fillText(`Steps: ${steps}`, canvasElement.width - 200, 40);
  canvasCtx.restore();
}

// 提取關鍵點的函數
function extractKeypoints(results) {
  const pose = results.poseLandmarks
    ? results.poseLandmarks
        .map((landmark) => [
          landmark.x,
          landmark.y,
          landmark.z,
          landmark.visibility,
        ])
        .flat()
    : new Array(132).fill(0);
  const face = results.faceLandmarks
    ? results.faceLandmarks
        .map((landmark) => [landmark.x, landmark.y, landmark.z])
        .flat()
    : new Array(1404).fill(0);
  const lh = results.leftHandLandmarks
    ? results.leftHandLandmarks
        .map((landmark) => [landmark.x, landmark.y, landmark.z])
        .flat()
    : new Array(63).fill(0);
  const rh = results.rightHandLandmarks
    ? results.rightHandLandmarks
        .map((landmark) => [landmark.x, landmark.y, landmark.z])
        .flat()
    : new Array(63).fill(0);
  return [...pose, ...face, ...lh, ...rh];
}

// 更新步數計數器的函數
function updateFootstepCounter(results) {
  // 實現與Python類似的邏輯，檢測膝蓋的角度變化以計數步數
}

// 可視化預測結果的函數
function probViz(res, warnings, canvasCtx) {
  // 實現與Python類似的邏輯，可視化預測結果
}

// 啟動視頻捕獲和處理
async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoElement.srcObject = stream;
  videoElement.play();

  videoElement.onloadeddata = async () => {
    holistic.onResults(onResults);
    await holistic.send({ image: videoElement });
  };
}

startCamera();
