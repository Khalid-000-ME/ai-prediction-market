from dotenv import load_dotenv
import os
from deepinfra import text_generation
import deepinfra

print(help(deepinfra.clients.DeepInfraClient))
print(dir(deepinfra.text_generation.Dolphin.generate))
print(help(deepinfra.text_generation.Dolphin))

load_dotenv()

API_KEY = os.getenv("DEEPINFURA_KEY")

model = "meta-llama/llama-3-8b-instruct"

client = text_generation(url="https://api.deepinfra.com/v1/openai", auth_token=API_KEY)

payload = {
    "model": "meta-llama/llama-3-8b-instruct",
    "messages": [{"role": "user", "content": "What is quantum computing?"}],
    "max_tokens": 150,
}

try:
    response = client.generate({
    "input": "What is quantum computing?\n\n",
    "stop": [
      "llama"
    ]
  })
    print(response)
except Exception as e:
    print(f"Error: {e}")


def predict_event_outcome(event_description):
    prompt = f"Predict the likelihood of this event happening: {event_description}"
    response = openai.Completion.create(model="gpt-4", prompt=prompt, max_tokens=50)
    return response["choices"][0]["text"].strip()
