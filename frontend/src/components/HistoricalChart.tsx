"use client"
import { useEffect, useState } from "react";
import { getHistoricalData } from "../utils/fetchHistoricalData";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Define types for historical data points
interface HistoricalDataPoint {
  date: string;
  price: number;
}

interface HistoricalChartProps {
  tokenAddress: string;
}

export default function HistoricalChart({ tokenAddress }: HistoricalChartProps) {
  const [data, setData] = useState<HistoricalDataPoint[]>([]);

  useEffect(() => {
    async function fetchData() {
      const historicalData = await getHistoricalData(tokenAddress);
      setData(
        historicalData.map((d: { date: number; priceUSD: number }) => ({
          date: new Date(d.date * 1000).toLocaleDateString(),
          price: d.priceUSD,
        }))
      );
    }
    fetchData();
  }, [tokenAddress]);

  return (
    <div className="p-4 border rounded-md shadow">
      <h3 className="text-lg font-bold">Price Trend (Last 7 Days)</h3>
      {data.length > 0 ? (
        <LineChart width={400} height={200} data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <CartesianGrid stroke="#eee" />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}