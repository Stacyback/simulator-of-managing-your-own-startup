import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, saveToken } from "../firebase";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        saveToken(data.token);
        alert("Вхід успішний!");
        navigate("/startup");
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Помилка підключення до сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Вхід</h2>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "8px" }} required disabled={loading} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Пароль:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "8px" }} required disabled={loading} />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#007bff", color: "white", border: "none" }} disabled={loading}>
          {loading ? "Завантаження..." : "Увійти"}
        </button>
      </form>
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Не маєш акаунта? <Link to="/register">Реєстрація</Link>
      </p>
    </div>
  );
}

export default LoginPage;