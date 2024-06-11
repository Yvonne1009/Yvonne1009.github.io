from django.http import StreamingHttpResponse
from django.shortcuts import render
import cv2
import numpy as np
import mediapipe as mp
from collections import deque

def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    if angle > 180:
        angle = 360 - angle
    return angle

def calculate_distance(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.linalg.norm(a - b)

def frame_generator():
    pose = mp.solutions.pose.Pose()
    num_frames_to_analyze = 30
    left_wrist_positions = deque(maxlen=num_frames_to_analyze)
    right_wrist_positions = deque(maxlen=num_frames_to_analyze)
    cap = cv2.VideoCapture(0)
    
    # Using mutable objects (lists) to hold counter and stages
    counter = [0]
    stage = [None]
    STAGE_DOWN = 'DOWN'
    STAGE_UP = 'UP'
    r_stage = [STAGE_DOWN]
    l_stage = [STAGE_DOWN]

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(frame_rgb)

        if results.pose_landmarks:
            draw_pose_analysis(frame, results, left_wrist_positions, right_wrist_positions, num_frames_to_analyze, counter, stage, r_stage, l_stage, STAGE_DOWN, STAGE_UP)

        ret, jpeg = cv2.imencode('.jpg', frame)
        if not ret:
            continue
        frame = jpeg.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

    cap.release()
    pose.close()

def draw_pose_analysis(frame, results, left_wrist_positions, right_wrist_positions, num_frames_to_analyze, counter, stage, r_stage, l_stage, STAGE_DOWN, STAGE_UP):
    landmarks = results.pose_landmarks.landmark
    left_wrist = [landmarks[mp.solutions.pose.PoseLandmark.LEFT_WRIST.value].x, 
                  landmarks[mp.solutions.pose.PoseLandmark.LEFT_WRIST.value].y]
    right_wrist = [landmarks[mp.solutions.pose.PoseLandmark.RIGHT_WRIST.value].x, 
                   landmarks[mp.solutions.pose.PoseLandmark.RIGHT_WRIST.value].y]
    left_wrist_positions.append(left_wrist)
    right_wrist_positions.append(right_wrist)
    shoulder_left = [landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value].x, 
                     landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value].y]
    shoulder_right = [landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value].x, 
                      landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value].y]
    hip_left = [landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value].x, 
                landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value].y]
    hip_right = [landmarks[mp.solutions.pose.PoseLandmark.RIGHT_HIP.value].x, 
                 landmarks[mp.solutions.pose.PoseLandmark.RIGHT_HIP.value].y]
    knee_left = [landmarks[mp.solutions.pose.PoseLandmark.LEFT_KNEE.value].x, 
                 landmarks[mp.solutions.pose.PoseLandmark.LEFT_KNEE.value].y]
    knee_right = [landmarks[mp.solutions.pose.PoseLandmark.RIGHT_KNEE.value].x, 
                  landmarks[mp.solutions.pose.PoseLandmark.RIGHT_KNEE.value].y]
    ankle_left = [landmarks[mp.solutions.pose.PoseLandmark.LEFT_ANKLE.value].x, 
                landmarks[mp.solutions.pose.PoseLandmark.LEFT_ANKLE.value].y]
    ankle_right = [landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ANKLE.value].x, 
                    landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ANKLE.value].y]
    nose = [landmarks[mp.solutions.pose.PoseLandmark.NOSE.value].x, 
            landmarks[mp.solutions.pose.PoseLandmark.NOSE.value].y]

    shoulder_hip_angle = calculate_angle(nose, shoulder_left, hip_left)
    warning_y = 30
     # Calculate angles for step counting
    l_angle = calculate_angle(hip_left, knee_left, ankle_left)
    r_angle = calculate_angle(hip_right, knee_right, ankle_right)

    # Check for hunchback
    shoulder_hip_angle_left = calculate_angle(nose, shoulder_left, hip_left)
    shoulder_hip_angle_right = calculate_angle(nose, shoulder_right, hip_right)
    hunchback_detected = (shoulder_hip_angle_left < 145 or shoulder_hip_angle_left > 170) and (shoulder_hip_angle_right < 145 or shoulder_hip_angle_right > 170)
        
    if hunchback_detected:
        cv2.putText(frame, 'Straighten your back and keep your head up', (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
    else:
        # Step counter logic based on the shoulder-hip-knee angle
        if l_angle < 150 and l_stage == STAGE_DOWN:
            l_stage = STAGE_UP
            stage = STAGE_UP
        if r_angle < 150 and r_stage == STAGE_DOWN:
            r_stage = STAGE_UP
            stage = STAGE_UP
            
        if l_angle >= 160 and l_stage == STAGE_UP:
            l_stage = STAGE_DOWN
            stage = None
            counter += 1
        if r_angle >= 160 and r_stage == STAGE_UP:
            r_stage = STAGE_DOWN
            stage = None
            counter += 1

    if len(left_wrist_positions) == num_frames_to_analyze:
        left_movement = sum([calculate_distance(left_wrist_positions[i], left_wrist_positions[i-1]) for i in range(1, num_frames_to_analyze)])
        right_movement = sum([calculate_distance(right_wrist_positions[i], right_wrist_positions[i-1]) for i in range(1, num_frames_to_analyze)])

        min_movement_threshold = 0.1
        max_movement_threshold = 0.5

        if left_movement < min_movement_threshold or right_movement < min_movement_threshold:
            cv2.putText(frame, 'Swing your arms more', (5, warning_y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2, cv2.LINE_AA)
            warning_y += 40
        elif left_movement > max_movement_threshold or right_movement > max_movement_threshold:
            cv2.putText(frame, 'Reduce arm swing', (5, warning_y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2, cv2.LINE_AA)
            warning_y += 40
            
    frame_height, frame_width, _ = frame.shape
    cv2.rectangle(frame, (frame_width - 180, 0), (frame_width, 73), (245, 117, 16), -1)
    cv2.putText(frame, 'STEPS', (frame_width - 170, 12), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
    cv2.putText(frame, str(counter[0]), (frame_width - 160, 60), cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv2.LINE_AA)
    mp.solutions.drawing_utils.draw_landmarks(frame, results.pose_landmarks, mp.solutions.pose.POSE_CONNECTIONS)

def video_feed(request):
    """Video streaming route."""
    return StreamingHttpResponse(frame_generator(),
                                 content_type='multipart/x-mixed-replace; boundary=frame')

def stream_page(request):
    return render(request, "run.html")
