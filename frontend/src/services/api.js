const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

export async function getCompanies() {
  const res = await fetch(`${API_BASE}/companies`);
  if (!res.ok) throw new Error("Failed to fetch companies");
  return res.json();
}

export async function getCompanyData(symbol) {
  const res = await fetch(`${API_BASE}/data/${symbol}`);
  if (!res.ok) throw new Error("Failed to fetch stock data");
  return res.json();
}

export async function getPrediction(symbol) {
  const res = await fetch(`${API_BASE}/predict/${symbol}`);
  if (!res.ok) throw new Error("Failed to fetch prediction");
  return res.json();
}
