import numpy as np
import mediapipe as mp
import cv2
import tensorflow as tf
import os
import warnings
from tensorflow.keras.models import load_model # type: ignore
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import base64

# Flask and SocketIO setup
app = Flask(__name__, template_folder=os.path.abspath('firebase/public/run'))
socketio = SocketIO(app, async_mode='threading')

# Set up folders and warnings
warnings = np.array(['lift your head up & keep your back straight',
                     'lift your feet higher',
                     'lower your feet',
                     'swing your arms more',
                     'reduce armswing'])

# Load the pre-trained model
try:
    model = load_model('notebooks/SlowJogging_model.keras')
except Exception as e:
    print(f"Error loading model: {e}")
    exit()

# Initialize Mediapipe models
mp_drawing = mp.solutions.drawing_utils
mp_holistic = mp.solutions.holistic

# Helper function to calculate angles
def calculate_angle(a, b, c):
    a, b, c = np.array(a), np.array(b), np.array(c)
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    return 360 - angle if angle > 180.0 else angle

# Process frame using Mediapipe
def mediapipe_detection(image, holistic_model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    results = holistic_model.process(image)
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    return image, results

# Extract keypoints from results
def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(132)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(1404)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([pose, face, lh, rh])

# Initialize step counter and knee angle threshold
left_knee_up = False
right_knee_up = False
step_count = 0
knee_angle_threshold = 160

# Update footstep counter
def update_footstep_counter(results):
    global step_count, left_knee_up, right_knee_up, knee_angle_threshold

    if results.pose_landmarks:
        landmarks = results.pose_landmarks.landmark

        left_hip = [landmarks[mp_holistic.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_holistic.PoseLandmark.LEFT_HIP.value].y]
        left_knee = [landmarks[mp_holistic.PoseLandmark.LEFT_KNEE.value].x, landmarks[mp_holistic.PoseLandmark.LEFT_KNEE.value].y]
        left_ankle = [landmarks[mp_holistic.PoseLandmark.LEFT_ANKLE.value].x, landmarks[mp_holistic.PoseLandmark.LEFT_ANKLE.value].y]

        right_hip = [landmarks[mp_holistic.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_holistic.PoseLandmark.RIGHT_HIP.value].y]
        right_knee = [landmarks[mp_holistic.PoseLandmark.RIGHT_KNEE.value].x, landmarks[mp_holistic.PoseLandmark.RIGHT_KNEE.value].y]
        right_ankle = [landmarks[mp_holistic.PoseLandmark.RIGHT_ANKLE.value].x, landmarks[mp_holistic.PoseLandmark.RIGHT_ANKLE.value].y]

        left_knee_angle = calculate_angle(left_hip, left_knee, left_ankle)
        right_knee_angle = calculate_angle(right_hip, right_knee, right_ankle)

        if left_knee_angle < knee_angle_threshold and not left_knee_up:
            left_knee_up = True
        if left_knee_angle >= knee_angle_threshold and left_knee_up:
            left_knee_up = False
            step_count += 1

        if right_knee_angle < knee_angle_threshold and not right_knee_up:
            right_knee_up = True
        if right_knee_angle >= knee_angle_threshold and right_knee_up:
            right_knee_up = False
            step_count += 1

    return step_count

# Handle video frame through SocketIO
sequence = []  # Initialize sequence to store keypoints

@socketio.on('video_frame')
def handle_video_frame(data):
    global sequence
    frame_data = base64.b64decode(data.split(',')[1])
    np_data = np.frombuffer(frame_data, np.uint8)
    frame = cv2.imdecode(np_data, cv2.IMREAD_COLOR)

    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        image, results = mediapipe_detection(frame, holistic)
        
        if results.pose_landmarks:
            keypoints = extract_keypoints(results)
            sequence.append(keypoints)
            sequence = sequence[-30:]

            if len(sequence) == 30:
                res = model.predict(np.expand_dims(sequence, axis=0))[0]
                index = np.argmax(res)
                warning = warnings[index] if res[index] > 0.5 else None
                steps = update_footstep_counter(results)
                
                emit('prediction_result', {'warning': warning, 'steps': steps})

@app.route('/')
def index():
    return render_template('run120.html')

# Run Flask server
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)