from flask import Flask, render_template, Response, request
import cv2
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import io
import mss

app = Flask(__name__)

def capture_screen():
    with mss.mss() as sct:
        monitor = sct.monitors[1]  # Capture the first monitor
        screen_shot = sct.grab(monitor)
        img = np.array(screen_shot)
        img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR) # Convert to BGR format for OpenCV
        img = cv2.resize(img, (800,600)) # Convert to BGR format for OpenCV
        return img

def add_text_to_image(image, text):
    pil_img = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(pil_img)
    font = ImageFont.truetype("arial.ttf", 50)
    text_position = (50, 50)
    draw.text(text_position, text, font=font, fill=(255, 0, 0))
    return cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

@app.route('/')
def index():
    return render_template('index.html')

def generate_feed(number):
    while True:
        frame = capture_screen()
        frame_with_text = add_text_to_image(frame, str(number))
        _, buffer = cv2.imencode('.jpg', frame_with_text)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    number = request.args.get('number', '0')  # Default number is '0' if not provided
    return Response(generate_feed(number), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
