import { useState } from "react";

const tokenList = ["BTCUSDT", "ETHUSDT", "ZETAUSDT", "MATICUSDT", "BNBUSDT"];

interface SidebarProps {
    selectedToken: string;
    setSelectedToken: (token: string) => void;
  }

export default function Sidebar({ selectedToken, setSelectedToken }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 text-white h-full p-4 fixed left-0 top-0">
      <h2 className="text-xl font-bold mb-4">Select a Token</h2>
      <ul className="space-y-2">
        {tokenList.map((token) => (
          <li
            key={token}
            className={`cursor-pointer p-2 rounded ${
              selectedToken === token ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
            onClick={() => setSelectedToken(token)}
          >
            {token}
          </li>
        ))}
      </ul>
    </div>
  );
}
