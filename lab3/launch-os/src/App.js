import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import StartupPage from "./pages/StartupPage";
import MarketPage from "./pages/MarketPage";
import InvestorsPage from "./pages/InvestorsPage";
import { initialStartup, competitors, investors } from "./data";

function App() {
  const [startup, setStartup] = useState(initialStartup);
  const [history, setHistory] = useState([
    { label: "Реальні", ...initialStartup },
  ]);
  const [simulationCount, setSimulationCount] = useState(0);

  const runSimulation = (changes) => {
    const updated = {
      ...startup,
      revenue: Math.max(
        0,
        startup.revenue + (Number(changes.revenue) || 0) * 1000
      ),
      expenses: Math.max(
        0,
        startup.expenses + (Number(changes.expenses) || 0) * 1000
      ),
      employees: Math.max(
        1,
        startup.employees + (Number(changes.employees) || 0)
      ),
      marketShare: Math.max(
        0,
        Math.min(100, startup.marketShare + (Number(changes.marketShare) || 0))
      ),
      satisfaction: Math.max(
        0,
        Math.min(100, startup.satisfaction + (Number(changes.satisfaction) || 0))
      ),
    };

    const nextCount = simulationCount + 1;
    setSimulationCount(nextCount);
    setStartup(updated);

    setHistory((prev) => {
      const next = [...prev, { label: `Симуляція ${nextCount}`, ...updated }];
      return next.length > 5 ? next.slice(next.length - 5) : next;
    });
  };

  const resetSimulation = () => {
    setStartup(initialStartup);
    setHistory([{ label: "Реальні", ...initialStartup }]);
    setSimulationCount(0);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <StartupPage
              startup={startup}
              history={history}
              onSimulate={runSimulation}
              onReset={resetSimulation}
            />
          }
        />
        <Route
          path="/market"
          element={<MarketPage competitors={competitors} />}
        />
        <Route
          path="/investors"
          element={<InvestorsPage investors={investors} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;