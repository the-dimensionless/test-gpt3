from flask import Flask, request
import openai
openai.api_key = "key"
app = Flask(__name__)

@app.route('/generate_text', methods=['POST'])
def generate_text():
    input_text = request.form['input_text']
    response = openai.Completion.create(engine="text-ada-003", prompt=input_text, max_tokens=1024)["choices"][0]["text"]
    return response

if __name__ == '__main__':
    app.run(debug=True)



'''
curl --location --request POST 'http://localhost:5000/generate_text' \
--form 'input_text="Hello, GPT-3!"'
'''