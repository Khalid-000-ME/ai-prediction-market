"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface PricePoint {
  date: string;
  price: number;
}

const HistoricalPriceChart = ({ tokenSymbol = "BTCUSDT" }) => {
  const [priceData, setPriceData] = useState<PricePoint[]>([]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${tokenSymbol}&interval=1d&limit=7`
        );
        const data = await response.json();

        const formattedData: PricePoint[] = data.map((entry: any) => ({
          date: new Date(entry[0]).toLocaleDateString(), // Convert timestamp to readable date
          price: parseFloat(entry[4]), // Closing price
        }));

        setPriceData(formattedData);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();
  }, [tokenSymbol]);

  return (
    <ResponsiveContainer width={700} height={400}>
      <LineChart data={priceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#ff7300" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoricalPriceChart;