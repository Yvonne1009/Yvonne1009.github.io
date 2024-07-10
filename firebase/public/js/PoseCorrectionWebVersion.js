const videoElement = document.createElement("video");
const canvasElement = document.getElementById("output");
const canvasCtx = canvasElement.getContext("2d");
const messageElement = document.getElementById("message");
const stepCounterElement = document.getElementById("stepCounter");

let stepCounter = 0;
let l_stage = "DOWN";
let r_stage = "DOWN";
const STAGE_DOWN = "DOWN";
const STAGE_UP = "UP";

const numFramesToAnalyze = 30;
const leftWristPositions = [];
const rightWristPositions = [];

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  videoElement.srcObject = stream;

  return new Promise((resolve) => {
    videoElement.onloadedmetadata = () => {
      resolve(videoElement);
    };
  });
}

function calculateAngle(a, b, c) {
  const radians =
    Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
}

function calculateDistance(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

async function main() {
  await setupCamera();
  videoElement.play();

  const net = await posenet.load();

  async function detect() {
    const pose = await net.estimateSinglePose(videoElement, {
      flipHorizontal: false,
    });

    const landmarks = pose.keypoints.map((k) => [k.position.x, k.position.y]);

    const leftWrist = landmarks[9];
    const rightWrist = landmarks[10];

    leftWristPositions.push(leftWrist);
    rightWristPositions.push(rightWrist);
    if (leftWristPositions.length > numFramesToAnalyze)
      leftWristPositions.shift();
    if (rightWristPositions.length > numFramesToAnalyze)
      rightWristPositions.shift();

    const shoulderLeft = landmarks[5];
    const shoulderRight = landmarks[6];
    const hipLeft = landmarks[11];
    const hipRight = landmarks[12];
    const kneeLeft = landmarks[13];
    const kneeRight = landmarks[14];
    const ankleLeft = landmarks[15];
    const ankleRight = landmarks[16];
    const nose = landmarks[0];

    const l_angle = calculateAngle(hipLeft, kneeLeft, ankleLeft);
    const r_angle = calculateAngle(hipRight, kneeRight, ankleRight);

    const shoulder_hip_angle_left = calculateAngle(nose, shoulderLeft, hipLeft);
    const shoulder_hip_angle_right = calculateAngle(
      nose,
      shoulderRight,
      hipRight
    );
    const hunchback_detected =
      (shoulder_hip_angle_left < 145 || shoulder_hip_angle_left > 170) &&
      (shoulder_hip_angle_right < 145 || shoulder_hip_angle_right > 170);

    if (hunchback_detected) {
      messageElement.innerText = "Straighten your back and keep your head up";
    } else {
      messageElement.innerText = "";

      if (l_angle < 150 && l_stage === STAGE_DOWN) {
        l_stage = STAGE_UP;
      }
      if (r_angle < 150 && r_stage === STAGE_DOWN) {
        r_stage = STAGE_UP;
      }

      if (l_angle >= 160 && l_stage === STAGE_UP) {
        l_stage = STAGE_DOWN;
        stepCounter++;
      }
      if (r_angle >= 160 && r_stage === STAGE_UP) {
        r_stage = STAGE_DOWN;
        stepCounter++;
      }
    }

    if (leftWristPositions.length === numFramesToAnalyze) {
      const leftMovement = leftWristPositions
        .slice(1)
        .reduce(
          (acc, curr, i) =>
            acc + calculateDistance(curr, leftWristPositions[i]),
          0
        );
      const rightMovement = rightWristPositions
        .slice(1)
        .reduce(
          (acc, curr, i) =>
            acc + calculateDistance(curr, rightWristPositions[i]),
          0
        );

      const minMovementThreshold = 0.1;
      const maxMovementThreshold = 0.5;

      if (
        leftMovement < minMovementThreshold ||
        rightMovement < minMovementThreshold
      ) {
        messageElement.innerText = "Swing your arms more";
      } else if (
        leftMovement > maxMovementThreshold ||
        rightMovement > maxMovementThreshold
      ) {
        messageElement.innerText = "Reduce arm swing";
      }
    }

    stepCounterElement.innerText = `Steps: ${stepCounter}`;

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      videoElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    pose.keypoints.forEach((point) => {
      canvasCtx.beginPath();
      canvasCtx.arc(point.position.x, point.position.y, 5, 0, 2 * Math.PI);
      canvasCtx.fillStyle = "red";
      canvasCtx.fill();
    });

    requestAnimationFrame(detect);
  }

  detect();
}

main();
