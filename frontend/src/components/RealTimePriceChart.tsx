"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface PricePoint {
  time: string;
  price: number;
}

const RealTimePriceChart = ({ tokenSymbol = "BTCUSDT" }) => {
  const [priceData, setPriceData] = useState<PricePoint[]>([]); // ✅ Explicitly type state

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${tokenSymbol.toLowerCase()}@trade`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const pricePoint: PricePoint = {
        time: new Date(data.T).toLocaleTimeString(),
        price: parseFloat(data.p),
      };

      setPriceData((prevData) => [...prevData.slice(-49), pricePoint]); // Keep only last 50 points
    };

    return () => ws.close(); // Cleanup on unmount
  }, [tokenSymbol]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={priceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#82ca9d" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RealTimePriceChart;