from flask import Flask, request, jsonify
import pandas as pd
import os
import random
import string
import torchaudio
from speechbrain.inference.speaker import EncoderClassifier
import shutil
app = Flask(__name__)

# Initialize the speaker embedding classifier
classifier = EncoderClassifier.from_hparams(source="speechbrain/spkrec-ecapa-voxceleb")

li = []

# Function to compute the embedding of an audio file
def return_embedding(file_path):
    signal, fs = torchaudio.load(file_path)
    embeddings = classifier.encode_batch(signal)
    embeddings = embeddings.squeeze(0)
    return embeddings

# Function to search for the best fit based on similarity of embeddings
def search_bestfit(embedding):
    cos = torch.nn.CosineSimilarity(dim=0, eps=1e-6)
    max_sim = 0
    best_fit_id = None
    for i, embedding_2 in enumerate(li):
        similarity = cos(embedding, embedding_2)
        if similarity.mean().item() > max_sim:
            max_sim = similarity.mean().item()
            best_fit_id = i
    return best_fit_id

# Route to upload audio file
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        file_path = os.path.join('uploads', 'temp.wav')  # Assuming WAV files, change extension accordingly
        file.save(file_path)
        embedding = return_embedding(file_path)
        li.append(embedding)
        os.remove(file_path)
        return jsonify({'file_id': len(li) - 1}), 200
@app.route('/search', methods=['POST'])
def search_best():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        file_path = os.path.join('uploads', 'temp.wav')  # Assuming WAV files, change extension accordingly
        file.save(file_path)
        embedding = return_embedding(file_path)
        os.remove(file_path)
        best_fit_id = search_bestfit(embedding)
        return jsonify({'best_fit_id': best_fit_id}), 200
if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(port = 5000)
