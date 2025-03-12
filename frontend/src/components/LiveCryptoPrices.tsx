"use client";
import { useEffect, useState } from "react";

const LiveCryptoPrices = ({ tokenSymbol = "BTCUSDT" }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${tokenSymbol.toLowerCase()}@trade`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(data.p); // 'p' is the price from Binance API
    };

    ws.onerror = (error) => console.error("WebSocket Error:", error);
    ws.onclose = () => console.log("WebSocket Disconnected");

    return () => ws.close(); // Cleanup on unmount
  }, [tokenSymbol]);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-lg font-bold">Live {tokenSymbol} Price</h2>
      <p className="text-2xl font-semibold">${price || "Loading..."}</p>
    </div>
  );
};

export default LiveCryptoPrices;