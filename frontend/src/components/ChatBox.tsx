"use client"
import { useState } from "react";

export default function Chatbox() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="w-full p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-bold mb-2">Discussion</h2>
      <div className="h-40 overflow-y-auto bg-gray-100 p-2 rounded-lg">
        {messages.map((msg, index) => (
          <p key={index} className="text-gray-800 p-1 bg-gray-200 rounded my-1">{msg}</p>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 border rounded-lg"
        />
        <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Send</button>
      </div>
    </div>
  );
}