import React from "react";
import { Link } from "react-router-dom";

function LandingPage({ user }) {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-tag">Симулятор управління стартапом</div>

          <h1>
            Launch<em>OS</em> — платформа для розвитку твого стартапу
          </h1>

          <p className="hero-sub">
            Досліджуй ринок, аналізуй конкурентів, працюй з інвесторами та керуй
            власним цифровим стартапом у єдиному середовищі.
          </p>

          <div className="hero-actions">
            <Link to="/market" className="btn-secondary">
              Переглянути ринок
            </Link>

            {user ? (
              <Link to="/startup" className="btn-primary">
                Перейти до стартапу
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn-primary">
                  Увійти
                </Link>
                <Link to="/register" className="btn-secondary">
                  Реєстрація
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;