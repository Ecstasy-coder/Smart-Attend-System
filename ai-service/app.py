from flask import Flask, request, jsonify
import face_recognition
import numpy as np
import base64 
from io import BytesIO
from PIL import Image

app = Flask(__name__)

def load_image(base64_string):
    image_data = base64.b64decode(base64_string.split(",")[1])
    image = Image.open(BytesIO(image_data))
    return np.array(image)

@app.route("/encode-face", methods=["POST"])
def encode_face():
    data = request.json or {}
    image_string = data.get("image")

    if not image_string:
        return jsonify({
            "success": False,
            "message": "Missing image data"
        }), 400

    try:
        image = load_image(image_string)
    except Exception as exc:
        return jsonify({
            "success": False,
            "message": f"Invalid image data: {str(exc)}"
        }), 400

    encodings = face_recognition.face_encodings(image)

    if len(encodings) == 0:
        return jsonify({
            "success": False,
            "message": "No face detected"
        }), 400

    encoding = encodings[0].tolist()

    return jsonify({
        "success": True,
        "encoding": encoding
    })

@app.route("/match-face", methods=["POST"])
def match_face():

    data = request.json or {}
    current_encoding = data.get("currentEncoding") or data.get("current_encoding")
    stored_encoding = data.get("storedEncoding") or data.get("stored_encoding")

    if current_encoding is None or stored_encoding is None:
        return jsonify({
            "success": False,
            "message": "Missing currentEncoding or storedEncoding"
        }), 400

    try:
        current_encoding = np.array(current_encoding)
        stored_encoding = np.array(stored_encoding)
    except Exception as exc:
        return jsonify({
            "success": False,
            "message": f"Invalid encoding format: {str(exc)}"
        }), 400

    if current_encoding.size == 0 or stored_encoding.size == 0:
        return jsonify({
            "success": False,
            "message": "Empty face encoding array"
        }), 400

    distance = face_recognition.face_distance(
        [stored_encoding],
        current_encoding
    )[0]

    match = distance < 0.5

    return jsonify({
        "success": True,
        "match": bool(match),
        "distance": float(distance)
    })

if __name__ == "__main__":
    app.run(port=5001)