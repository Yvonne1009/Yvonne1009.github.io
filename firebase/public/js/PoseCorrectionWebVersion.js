// Import TensorFlow.js and PoseNet model
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";

// Initialize video capture
const video = document.createElement("video");
video.width = 1080;
video.height = 1080;
document.body.appendChild(video);

navigator.mediaDevices
  .getUserMedia({
    video: true,
  })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error("Error accessing webcam:", err);
  });

// Utility functions to calculate angles and distances
function calculateAngle(a, b, c) {
  const atan2 = Math.atan2;
  const angle =
    (Math.abs(
      atan2(c[1] - b[1], c[0] - b[0]) - atan2(a[1] - b[1], a[0] - b[0])
    ) *
      180) /
    Math.PI;
  return angle > 180 ? 360 - angle : angle;
}

function calculateDistance(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

// Initialize PoseNet
let poseNet;
posenet.load().then((net) => {
  poseNet = net;
  detectPose();
});

// Variables to track wrist positions and steps
let leftWristPositions = [];
let rightWristPositions = [];
const numFramesToAnalyze = 30;
let counter = 0;
const STAGE_DOWN = "DOWN";
const STAGE_UP = "UP";
let r_stage = STAGE_DOWN;
let l_stage = STAGE_DOWN;

// Setup canvas for drawing
const canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);
const context = canvas.getContext("2d");

async function detectPose() {
  const pose = await poseNet.estimateSinglePose(video, {
    flipHorizontal: false,
  });

  const landmarks = pose.keypoints.map((point) => [
    point.position.x,
    point.position.y,
  ]);
  const leftWrist = landmarks[posenet.POSE_LANDMARKS.LEFT_WRIST];
  const rightWrist = landmarks[posenet.POSE_LANDMARKS.RIGHT_WRIST];
  const leftShoulder = landmarks[posenet.POSE_LANDMARKS.LEFT_SHOULDER];
  const rightShoulder = landmarks[posenet.POSE_LANDMARKS.RIGHT_SHOULDER];
  const leftElbow = landmarks[posenet.POSE_LANDMARKS.LEFT_ELBOW];
  const rightElbow = landmarks[posenet.POSE_LANDMARKS.RIGHT_ELBOW];
  const hipLeft = landmarks[posenet.POSE_LANDMARKS.LEFT_HIP];
  const hipRight = landmarks[posenet.POSE_LANDMARKS.RIGHT_HIP];
  const kneeLeft = landmarks[posenet.POSE_LANDMARKS.LEFT_KNEE];
  const kneeRight = landmarks[posenet.POSE_LANDMARKS.RIGHT_KNEE];
  const ankleLeft = landmarks[posenet.POSE_LANDMARKS.LEFT_ANKLE];
  const ankleRight = landmarks[posenet.POSE_LANDMARKS.RIGHT_ANKLE];
  const nose = landmarks[posenet.POSE_LANDMARKS.NOSE];

  leftWristPositions.push(leftWrist);
  rightWristPositions.push(rightWrist);
  if (leftWristPositions.length > numFramesToAnalyze)
    leftWristPositions.shift();
  if (rightWristPositions.length > numFramesToAnalyze)
    rightWristPositions.shift();

  const l_angle = calculateAngle(hipLeft, kneeLeft, ankleLeft);
  const r_angle = calculateAngle(hipRight, kneeRight, ankleRight);

  const shoulder_hip_angle_left = calculateAngle(nose, leftShoulder, hipLeft);
  const shoulder_hip_angle_right = calculateAngle(
    nose,
    rightShoulder,
    hipRight
  );
  const hunchback_detected =
    (shoulder_hip_angle_left < 145 || shoulder_hip_angle_left > 170) &&
    (shoulder_hip_angle_right < 145 || shoulder_hip_angle_right > 170);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  if (hunchback_detected) {
    context.fillStyle = "red";
    context.font = "20px Arial";
    context.fillText("Straighten your back and keep your head up", 10, 100);
  } else {
    if (l_angle < 150 && l_stage === STAGE_DOWN) {
      l_stage = STAGE_UP;
    }
    if (r_angle < 150 && r_stage === STAGE_DOWN) {
      r_stage = STAGE_UP;
    }

    if (l_angle >= 160 && l_stage === STAGE_UP) {
      l_stage = STAGE_DOWN;
      counter += 1;
    }
    if (r_angle >= 160 && r_stage === STAGE_UP) {
      r_stage = STAGE_DOWN;
      counter += 1;
    }
  }

  if (leftWristPositions.length === numFramesToAnalyze) {
    const leftMovement = leftWristPositions
      .slice(1)
      .map((pos, i) => calculateDistance(pos, leftWristPositions[i]))
      .reduce((a, b) => a + b, 0);
    const rightMovement = rightWristPositions
      .slice(1)
      .map((pos, i) => calculateDistance(pos, rightWristPositions[i]))
      .reduce((a, b) => a + b, 0);

    const minMovementThreshold = 0.1;
    const maxMovementThreshold = 0.5;

    if (
      leftMovement < minMovementThreshold ||
      rightMovement < minMovementThreshold
    ) {
      context.fillStyle = "red";
      context.font = "20px Arial";
      context.fillText("Swing your arms more", 10, 140);
    } else if (
      leftMovement > maxMovementThreshold ||
      rightMovement > maxMovementThreshold
    ) {
      context.fillStyle = "red";
      context.font = "20px Arial";
      context.fillText("Reduce arm swing", 10, 180);
    }
  }

  context.fillStyle = "black";
  context.font = "30px Arial";
  context.fillText(`Steps: ${counter}`, 10, 60);

  drawLandmarks(context, landmarks);

  requestAnimationFrame(detectPose);
}

function drawLandmarks(context, landmarks) {
  context.strokeStyle = "cyan";
  context.lineWidth = 2;
  landmarks.forEach(([x, y], i) => {
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.fill();
  });

  posenet.POSE_CONNECTIONS.forEach(([i, j]) => {
    context.beginPath();
    context.moveTo(landmarks[i][0], landmarks[i][1]);
    context.lineTo(landmarks[j][0], landmarks[j][1]);
    context.stroke();
  });
}

// Cleanup function to stop video and release resources
function stopVideo() {
  const stream = video.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach((track) => track.stop());
  video.srcObject = null;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "q") {
    stopVideo();
  }
});
