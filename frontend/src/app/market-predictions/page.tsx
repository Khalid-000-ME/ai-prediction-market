"use client"
import { useState } from "react";
import HistoricalPriceChart from "@/components/HistoricalPriceChart";
import Sidebar from "@/components/SideBar";
import PredictionPanel from "@/components/PredictionPanel";
import Chatbox from "@/components/ChatBox";

export default function Home() {
  const [selectedToken, setSelectedToken] = useState("BTCUSDT");

  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      {/* Sidebar with token selection */}
      <div>
      </div>
      <Sidebar selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
      
      {/* Main Content */}
      <div className="flex flex-col items-center gap-8 p-8 w-full">
        {/* Graph at the top */}
        <HistoricalPriceChart tokenSymbol={selectedToken} />
        <PredictionPanel tokenSymbol={selectedToken}/>
        <Chatbox/>
      </div>
    </div>
  );
}
