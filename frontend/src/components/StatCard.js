import React from "react";
import CountUp from "react-countup";

export default function StatCard({ title, value, icon: Icon, gradient }) {
  return (
    <div
      className={`rounded-lg shadow p-4 flex items-center space-x-4 text-white ${gradient}`}
    >
      <div className="p-3 rounded-full bg-white bg-opacity-20">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-lg font-bold">
          <CountUp end={value || 0} decimals={2} duration={1.5} />
        </p>
      </div>
    </div>
  );
}
