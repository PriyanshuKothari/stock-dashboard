import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChartPanel from "./components/ChartPanel";
import { getCompanies, getCompanyData, getPrediction } from "./services/api";

function App() {
  const [companies, setCompanies] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCompanies().then(setCompanies).catch(console.error);
  }, []);

  const handleSelect = async (symbol) => {
    setSelectedSymbol(symbol);
    setLoading(true);
    setError(null);
    try {
      const data = await getCompanyData(symbol);
      setStockData(data);
      const pred = await getPrediction(symbol);
      setPrediction(pred);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data.");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar companies={companies} onSelect={handleSelect} selectedSymbol={selectedSymbol} />
      <div className="flex-1 p-4 overflow-auto">
        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && stockData && (
          <ChartPanel
            company={companies.find(c => c.symbol === selectedSymbol)}
            stockData={stockData}
            prediction={prediction}
          />
        )}
        {!loading && !stockData && <p>Select a company from the left to view stock data.</p>}
      </div>
    </div>
  );
}

export default App;
