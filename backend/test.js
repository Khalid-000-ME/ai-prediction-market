import { TextGeneration } from "deepinfra";
import dotenv from "dotenv";

dotenv.config();

const DEEPINFRA_API_KEY = process.env.DEEPINFRA_API_KEY;
const MODEL_URL = 'https://api.deepinfra.com/v1/inference/Qwen/Qwen2.5-Coder-32B-Instruct';

async function main() {
  const client = new TextGeneration(MODEL_URL, DEEPINFRA_API_KEY);
  const res = await client.generate({
    "input": "Answer only 'Yes' or 'No'. Should I proceed with this bet? 'The price of ETH will drop to 1904 dollars tonight'",
    "stop": ["."], // Stops at the first sentence
    "parameters": {
      "max_new_tokens": 2, // Limit output length
        "temperature": 0.01,
        "top_p": 0.01,
        "repetition_penalty": 5.0
    }
  });

  console.log(res.results[0].generated_text);
  console.log(res.inference_status.tokens_input, res.inference_status.tokens_generated)
}

main();
