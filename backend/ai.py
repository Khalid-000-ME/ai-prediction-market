import openai

openai.api_key = "YOUR_OPENAI_KEY"

def predict_event_outcome(event_description):
    prompt = f"Predict the likelihood of this event happening: {event_description}"
    response = openai.Completion.create(model="gpt-4", prompt=prompt, max_tokens=50)
    return response["choices"][0]["text"].strip()
