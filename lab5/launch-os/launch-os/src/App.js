import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import StartupPage from "./pages/StartupPage";
import MarketPage from "./pages/MarketPage";
import InvestorsPage from "./pages/InvestorsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import { initialStartup, competitors, investors } from "./data";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [startup, setStartup] = useState(initialStartup);
  const [history, setHistory] = useState([{ label: "Реальні", ...initialStartup }]);
  const [simulationCount, setSimulationCount] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  const handleLogout = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    await signOut(auth).catch(() => {});
    alert("Ви вийшли з акаунта");
    window.location.href = "/login";
  } catch (error) {
    alert("Помилка виходу: " + error.message);
  }
};

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2>Завантаження...</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />

        <Route
          path="/market"
          element={<MarketPage competitors={competitors} />}
        />

        <Route
          path="/investors"
          element={<InvestorsPage investors={investors} />}
        />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
        path="/startup"
        element={
        <ProtectedRoute>
        <StartupPage
        startup={startup}
        setStartup={setStartup}
        history={history}
        setHistory={setHistory}
        simulationCount={simulationCount}
        setSimulationCount={setSimulationCount}
        onSimulate={runSimulation}
        onReset={resetSimulation}
        />
      </ProtectedRoute>
    }
  />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;