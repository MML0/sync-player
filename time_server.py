from flask import Flask, jsonify, request, send_from_directory, render_template
from datetime import datetime, timezone
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def home():
    return render_template('index.html') #"Hello World!"

@app.route('/current_time', methods=['GET'])
def get_current_time():
    current_time = datetime.now(timezone.utc)
    return '{"unixtime":'+str(int(current_time.timestamp()))+'}'
    
    response = {
        "utc_offset": "+00:00",
        "timezone": "Etc/UTC",
        "day_of_week": current_time.isoweekday(),
        "day_of_year": current_time.timetuple().tm_yday,
        "datetime": current_time.isoformat(),
        "utc_datetime": current_time.isoformat(),
        "unixtime": int(current_time.timestamp()),
        "raw_offset": 0,
        "week_number": current_time.isocalendar()[1],
        "dst": False,
        "abbreviation": "UTC",
        "dst_offset": 0,
        "dst_from": None,
        "dst_until": None,
        "client_ip": request.remote_addr
    }
    return '{"unixtime":'+int(current_time.timestamp())+'}'
    return jsonify(response)

@app.route('/files/<path:filename>')
def serve_file(filename):
    # Ensure the path to the file is valid
    file_path = os.path.join('static', filename)
    if os.path.exists(file_path):
        return send_from_directory('static', filename)
    else:
        return "File not found", 404
    
if __name__ == '__main__':
    app.run( host='0.0.0.0', port=3000)
