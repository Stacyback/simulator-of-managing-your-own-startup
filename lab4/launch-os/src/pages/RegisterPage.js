import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, saveToken } from "../firebase";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Пароль повинен містити не менше 6 символів");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();

      if (data.success) {
        saveToken(data.token);
        alert("Реєстрація успішна!");
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
      <h2>Реєстрація</h2>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "15px" }}>
          <label>Ім'я:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "8px" }} disabled={loading} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "8px" }} required disabled={loading} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Пароль (мін. 6 символів):</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "8px" }} required disabled={loading} />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#28a745", color: "white", border: "none" }} disabled={loading}>
          {loading ? "Завантаження..." : "Зареєструватися"}
        </button>
      </form>
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Уже маєш акаунт? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
}

export default RegisterPage;