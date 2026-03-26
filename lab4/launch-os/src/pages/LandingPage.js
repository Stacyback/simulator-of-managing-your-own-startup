import React from "react";
import { Link } from "react-router-dom";

function LandingPage({ user, investors = [] }) {
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

      <section id="investors">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">Інвестори</h2>
            <span className="section-tag">Funding</span>
          </div>

          <p className="investors-intro">
            Обери потенційних інвесторів для масштабування стартапу.
          </p>

          <div className="investors-grid">
            {investors.map((item, index) => (
              <div key={item.id || index} className="investor-card">
                <img
                  src={item.image || "https://via.placeholder.com/300x100"}
                  alt={item.name}
                  className="investor-img"
                />

                <div className="investor-body">
                  <div className="investor-name">{item.name}</div>
                  <div className="investor-focus">
                    {item.focus || item.stage || "Venture Capital"}
                  </div>

                  <div className="investor-portfolio">
                    <div className="inv-port-label">Портфель / бюджет</div>
                    <div className="inv-port-val">
                      {item.budget || item.checkSize || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;