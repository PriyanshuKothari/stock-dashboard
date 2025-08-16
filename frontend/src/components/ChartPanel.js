import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import StatCard from "./StatCard";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ChartBarIcon, SparklesIcon } from "@heroicons/react/24/outline";
import NewsFeed from "./NewsFeed";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChartPanel({ company, stockData, prediction }) {
  const [chartType, setChartType] = useState("line"); // 'line' or 'area'
  const [dateRange, setDateRange] = useState("6mo");

  if (!stockData || !company) return null;

  const dates = stockData.history.map((d) => d.date.split("T")[0]);
  const closes = stockData.history.map((d) => d.close);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: `${company.name} Close Price`,
        data: closes,
        borderColor: "#10b981",
        backgroundColor:
          chartType === "area"
            ? "rgba(16, 185, 129, 0.2)"
            : "transparent",
        tension: 0.3,
        fill: chartType === "area",
      },
    ],
  };

  const confidence = Math.floor(Math.random() * (95 - 80 + 1) + 80); // mock %

  return (
    <div>
      {/* Top controls */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="space-x-2">
          {["line", "area"].map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-3 py-1 rounded ${
                chartType === type
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {type === "line" ? "Line" : "Area"}
            </button>
          ))}
        </div>
        <div className="space-x-2 mt-2 sm:mt-0">
          {["1mo", "3mo", "6mo", "1y"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1 rounded ${
                dateRange === range
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <Line data={chartData} />
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="52-Week High"
          value={stockData.stats.fifty_two_week_high}
          icon={ArrowTrendingUpIcon}
          gradient="bg-gradient-to-r from-green-400 to-green-600"
        />
        <StatCard
          title="52-Week Low"
          value={stockData.stats.fifty_two_week_low}
          icon={ArrowTrendingDownIcon}
          gradient="bg-gradient-to-r from-red-400 to-red-600"
        />
        <StatCard
          title="Avg Volume"
          value={stockData.stats.avg_volume}
          icon={ChartBarIcon}
          gradient="bg-gradient-to-r from-blue-400 to-blue-600"
        />
        {prediction && (
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg shadow p-4 text-white">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-white bg-opacity-20">
                <SparklesIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm">Predicted Next Close</p>
                <p className="text-lg font-bold">
                  {prediction.prediction_next_close.toFixed(2)}
                </p>
                {/* Confidence bar */}
                <div className="w-full bg-white bg-opacity-20 rounded h-2 mt-1">
                  <div
                    className="bg-white h-2 rounded"
                    style={{ width: `${confidence}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1">{confidence}% confidence</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* News */}
      <NewsFeed />
    </div>
  );
}
