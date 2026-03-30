import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      alert("Реєстрація успішна!");
      navigate("/startup");
    } catch (error) {
      alert("Помилка реєстрації: " + error.message);
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