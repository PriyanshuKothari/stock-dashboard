import React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function Navbar({ company, darkMode, setDarkMode }) {
  const now = new Date().toLocaleTimeString();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <div>
        <h1 className="text-lg font-bold dark:text-white">
          {company ? company.name : "Select a company"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {now}
        </p>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      >
        {darkMode ? (
          <SunIcon className="h-5 w-5 text-yellow-400" />
        ) : (
          <MoonIcon className="h-5 w-5 text-gray-800" />
        )}
      </button>
    </div>
  );
}
