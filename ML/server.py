from flask import Flask, request, jsonify
import pandas as pd
import os
import random
import string
import torchaudio
from speechbrain.inference.speaker import EncoderClassifier
import shutil
app = Flask(__name__)

classifier = EncoderClassifier.from_hparams(source="speechbrain/spkrec-ecapa-voxceleb")
import os
from google.oauth2 import service_account

def authenticate_with_service_account(service_account_key_path):
    credentials = service_account.Credentials.from_service_account_file(service_account_key_path)
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = service_account_key_path

# Replace `service_account_key_path` with the path to your service account key JSON file.
service_account_key_path = r'C:\Users\Fabiha\Desktop\server hio\nitthack-417c447790a1.json'
authenticate_with_service_account(service_account_key_path)
import vertexai
from vertexai.preview.language_models import TextGenerationModel

def predict_large_language_model_sample(
    project_id: str,
    model_name: str,
    temperature: float,
    max_decode_steps: int,
    top_p: float,
    top_k: int,
    content: str,
    location: str = "us-central1",
    tuned_model_name: str = "",
    ) :
    """Predict using a Large Language Model."""
    vertexai.init(project=project_id, location=location)
    model = TextGenerationModel.from_pretrained(model_name)
    if tuned_model_name:
      model = model.get_tuned_model(tuned_model_name)
    response = model.predict(
        content,
        temperature=temperature,
        max_output_tokens=max_decode_steps,
        top_k=top_k,
        top_p=top_p,)
    return response.text
def answer(question):
    res = predict_large_language_model_sample("nitthack", "text-bison@001", 0.6, 256, 0.8, 40, f'Pretend You are a financial advisor and help me with my question by giving a sound financial advice, enclose your advice in **. my question is {question}', "us-central1")
    return res

li = []
import pandas as pd
import numpy as np
from pycaret.regression import *

# Set random seed for reproducibility
np.random.seed(42)

# Number of samples
num_samples = 500

# Generate random values for features
age = np.random.normal(loc=45, scale=10, size=num_samples)
income = np.random.normal(loc=60000, scale=15000, size=num_samples)
dependents = np.random.normal(loc=2, scale=1, size=num_samples)

# Ensure generated values are non-negative
age = np.clip(age, a_min=20, a_max=70)
income = np.clip(income, a_min=20000, a_max=100000)
dependents = np.clip(dependents, a_min=0, a_max=5)

# Generate random values for target variable (max loan amount)
max_loan_amount = np.random.normal(loc=750, scale=250, size=num_samples)
max_loan_amount = np.clip(max_loan_amount, a_min=0, a_max=1500)

# Create a DataFrame
data = pd.DataFrame({
    'Age': age.astype(int),
    'Income': income.astype(int),
    'Dependents': dependents.astype(int),
    'Max_Loan_Amount': max_loan_amount.astype(int)
})


setup(data = data, target = 'Max_Loan_Amount', session_id = 123)
best_model = compare_models(exclude=['dummy'])
model = create_model(best_model)
import pandas as pd

# Create a DataFrame with government scheme attributes
schemes_data = {
    'Scheme': ['Atal Pension Yojana', 'Ayushman Bharat Yojana', 'Grameen Kaushalya Yojana or DDU-GKY','Deen Dayal Upadhyaya Antyodaya Yojana','Pradhan Mantri Adarsh Gram Yojana'],
    'Min_Income': [5000, 240000, 10000,50000,5000],
    'Min_Age': [18, 16, 18,15,0],
    'Max_Age':[40,1000,35,1000,1000],
    'Urban_Rural': ['Both', 'Both', 'Rural','Both','Rural']  # 'Both' indicates scheme applicable to both urban and rural
}

schemes_df = pd.DataFrame(schemes_data)

def find_applicable_schemes(income, age, urban_rural):
    # Filter schemes based on user input
    applicable_schemes = schemes_df[
         (schemes_df['Min_Income'] >= income) & 
         (schemes_df['Min_Age'] <= age) & 
         (schemes_df['Max_Age'] >= age) &
         (schemes_df['Urban_Rural'].isin([urban_rural, 'Both']))
    ]
    return applicable_schemes
def predict_maxloan(age, income, dependents):
    data = pd.DataFrame({'Age': [age], 'Income': [income], 'Dependents': [dependents]}, index=[0])
    
    res= predict_model(model, data=data)['prediction_label'][0]
    return res

def return_embedding(file_path):
    signal, fs = torchaudio.load(file_path)
    embeddings = classifier.encode_batch(signal)
    embeddings = embeddings.squeeze(0)
    return embeddings

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
@app.route('/answer',methods= ['POST'])
def answer_question():
    question = request.json['question']
    res = answer(question)
    return jsonify({'answer': res}), 200
@app.route('/get_schemes',methods= ['POST'])
def get_schemes():
    income = request.json['income']
    age = request.json['age']
    urban_rural = request.json['urban_rural']
    applicable_schemes = find_applicable_schemes(income, age, urban_rural).reset_index(drop=True)
    return jsonify({'applicable_schemes': applicable_schemes.to_dict()}), 200
@app.route('/max_loan',methods=['POST'])
def max_loan():
    #take json input of age, income and dependents
    age = request.json['age']
    income = request.json['income']
    dependents = request.json['dependents']
    max_loan = predict_maxloan(age,income,dependents)
    return jsonify({'max_loan': max_loan}), 200

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
    app.run(port = 9001)
