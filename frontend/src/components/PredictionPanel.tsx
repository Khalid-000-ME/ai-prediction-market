"use client"
import { useEffect, useState } from "react";

interface PredictionPanelProps {
  tokenSymbol: string;
}

export default function PredictionPanel({ tokenSymbol }: PredictionPanelProps) {
  const [targetPrice, setTargetPrice] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Event duration (60 seconds for demo)
  const [userPrediction, setUserPrediction] = useState<"YES" | "NO" | null>(null);

  useEffect(() => {
    // Fetch an optimal target price for the event
    const fetchTargetPrice = async () => {
      try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${tokenSymbol}`);
        const data = await response.json();
        setTargetPrice(parseFloat(data.price) * (1 + (Math.random() - 0.5) * 0.02)); // Slightly varied price
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    fetchTargetPrice();

    // Start the countdown timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 60)); // Reset every 60 seconds
    }, 1000);

    // Refresh target price on every new event
    const priceUpdateInterval = setInterval(fetchTargetPrice, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(priceUpdateInterval);
    };
  }, [tokenSymbol]);

  return (
    <div className="w-full p-4 border rounded-lg bg-gray-100 shadow-md text-center">
      <h2 className="text-lg font-bold">{tokenSymbol} Prediction Event</h2>
      <p className="text-gray-700">Target Price: <span className="font-semibold">{targetPrice.toFixed(2)}</span></p>
      <p className="text-red-600">Time Left: {timeLeft}s</p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          className={`px-4 py-2 rounded-lg text-white ${userPrediction === "YES" ? "bg-green-600" : "bg-green-400"}`}
          onClick={() => setUserPrediction("YES")}
        >
          Yes (Above)
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-white ${userPrediction === "NO" ? "bg-red-600" : "bg-red-400"}`}
          onClick={() => setUserPrediction("NO")}
        >
          No (Below)
        </button>
      </div>

      {userPrediction && (
        <p className="mt-2 text-blue-700">You predicted: <b>{userPrediction}</b></p>
      )}
    </div>
  );
}
