import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://launch-os-backend.onrender.com/api"
    : "http://localhost:5000/api";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Реєстрація успішна!");
        navigate("/startup");
      } else {
        alert(data.error || "Помилка реєстрації");
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
            <h2 className="section-title">Реєстрація</h2>
            <span className="section-tag">Sign Up</span>
          </div>

          <p className="auth-text">
            Створи акаунт у LaunchOS, щоб працювати зі своїм стартапом.
          </p>

          <form className="auth-form" onSubmit={handleRegister}>
            <div className="auth-field">
              <label htmlFor="register-name">Ім’я</label>
              <input
                id="register-name"
                type="text"
                placeholder="Введи ім’я"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">Email</label>
              <input
                id="register-email"
                type="email"
                placeholder="Введи email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">Пароль</label>
              <input
                id="register-password"
                type="password"
                placeholder="Введи пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-submit">
              Зареєструватися
            </button>
          </form>

          <p className="auth-footer-text">
            Уже маєш акаунт? <Link to="/login">Увійти</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;