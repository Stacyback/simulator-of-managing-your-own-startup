import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://launch-os-backend.onrender.com/api"
    : "http://localhost:5000/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Вхід успішний!");
        navigate("/startup");
      } else {
        alert(data.error || "Помилка входу");
      }
    } catch (error) {
      alert("Помилка з'єднання із сервером");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <div className="auth-card">
          <div className="section-header auth-header">
            <h2 className="section-title">Вхід</h2>
            <span className="section-tag">Login</span>
          </div>

          <p className="auth-text">
            Увійди в LaunchOS, щоб отримати доступ до свого стартапу.
          </p>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="Введи email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Пароль</label>
              <input
                id="login-password"
                type="password"
                placeholder="Введи пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-submit">
              Увійти
            </button>
          </form>

          <p className="auth-footer-text">
            Не маєш акаунта? <Link to="/register">Реєстрація</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;