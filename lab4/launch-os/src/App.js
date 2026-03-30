import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyStartup from "./pages/MyStartup";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Завантаження...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/startup" element={user ? <MyStartup user={user} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/startup" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;