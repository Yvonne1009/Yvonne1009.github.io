const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const calculateAngle = (a, b, c) => {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
};

const calculateDistance = (a, b) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

let leftWristPositions = [];
let rightWristPositions = [];
const numFramesToAnalyze = 30;
let counter = 0;
let lStage = "DOWN";
let rStage = "DOWN";

const setupCamera = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
};

const detectPose = async () => {
  const net = await posenet.load();
  while (true) {
    const pose = await net.estimateSinglePose(video, {
      flipHorizontal: false,
    });
    drawPose(pose);
    await tf.nextFrame();
  }
};

const drawPose = (pose) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const keypoints = pose.keypoints;

  const leftWrist = keypoints.find(
    (point) => point.part === "leftWrist"
  ).position;
  const rightWrist = keypoints.find(
    (point) => point.part === "rightWrist"
  ).position;
  const shoulderLeft = keypoints.find(
    (point) => point.part === "leftShoulder"
  ).position;
  const shoulderRight = keypoints.find(
    (point) => point.part === "rightShoulder"
  ).position;
  const hipLeft = keypoints.find((point) => point.part === "leftHip").position;
  const hipRight = keypoints.find(
    (point) => point.part === "rightHip"
  ).position;
  const kneeLeft = keypoints.find(
    (point) => point.part === "leftKnee"
  ).position;
  const kneeRight = keypoints.find(
    (point) => point.part === "rightKnee"
  ).position;
  const ankleLeft = keypoints.find(
    (point) => point.part === "leftAnkle"
  ).position;
  const ankleRight = keypoints.find(
    (point) => point.part === "rightAnkle"
  ).position;
  const nose = keypoints.find((point) => point.part === "nose").position;

  leftWristPositions.push(leftWrist);
  rightWristPositions.push(rightWrist);
  if (leftWristPositions.length > numFramesToAnalyze)
    leftWristPositions.shift();
  if (rightWristPositions.length > numFramesToAnalyze)
    rightWristPositions.shift();

  const lAngle = calculateAngle(hipLeft, kneeLeft, ankleLeft);
  const rAngle = calculateAngle(hipRight, kneeRight, ankleRight);
  const shoulderHipAngleLeft = calculateAngle(nose, shoulderLeft, hipLeft);
  const shoulderHipAngleRight = calculateAngle(nose, shoulderRight, hipRight);
  const hunchbackDetected =
    (shoulderHipAngleLeft < 145 || shoulderHipAngleLeft > 170) &&
    (shoulderHipAngleRight < 145 || shoulderHipAngleRight > 170);

  if (hunchbackDetected) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Straighten your back and keep your head up", 10, 100);
  } else {
    if (lAngle < 150 && lStage === "DOWN") lStage = "UP";
    if (rAngle < 150 && rStage === "DOWN") rStage = "UP";
    if (lAngle >= 160 && lStage === "UP") {
      lStage = "DOWN";
      counter++;
    }
    if (rAngle >= 160 && rStage === "UP") {
      rStage = "DOWN";
      counter++;
    }
  }

  if (leftWristPositions.length === numFramesToAnalyze) {
    const leftMovement = leftWristPositions
      .slice(1)
      .reduce(
        (acc, pos, i) => acc + calculateDistance(pos, leftWristPositions[i]),
        0
      );
    const rightMovement = rightWristPositions
      .slice(1)
      .reduce(
        (acc, pos, i) => acc + calculateDistance(pos, rightWristPositions[i]),
        0
      );
    const minMovementThreshold = 10;
    const maxMovementThreshold = 50;
    if (
      leftMovement < minMovementThreshold ||
      rightMovement < minMovementThreshold
    ) {
      ctx.font = "30px Arial";
      ctx.fillStyle = "red";
      ctx.fillText("Swing your arms more", 10, 140);
    } else if (
      leftMovement > maxMovementThreshold ||
      rightMovement > maxMovementThreshold
    ) {
      ctx.font = "30px Arial";
      ctx.fillStyle = "red";
      ctx.fillText("Reduce arm swing", 10, 180);
    }
  }

  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Steps: ${counter}`, 10, 40);

  keypoints.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.position.x, point.position.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  });
};

setupCamera().then(detectPose);
