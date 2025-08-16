import React, { useState } from "react";

export default function Sidebar({ companies, onSelect, selectedSymbol }) {
  const [search, setSearch] = useState("");

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white shadow-lg flex flex-col">
      <div className="p-4 border-b border-blue-600 flex items-center space-x-2">
        <span className="text-xl font-bold">📈 JarNox</span>
      </div>
      <div className="p-3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded text-black"
        />
      </div>
      <ul className="flex-1 overflow-y-auto">
        {filteredCompanies.map((c) => (
          <li
            key={c.symbol}
            onClick={() => onSelect(c.symbol)}
            className={`p-3 cursor-pointer transition-colors duration-200 ${
              selectedSymbol === c.symbol
                ? "bg-blue-500 font-semibold"
                : "hover:bg-blue-600"
            }`}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
