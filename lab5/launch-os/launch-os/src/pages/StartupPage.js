import React from "react";
import StartupParams from "../components/StartupParams";
import SimulationForm from "../components/SimulationForm";
import Report from "../components/Report";

function StartupPage({ startup, history, onSimulate, onReset }) {
  return (
    <main>
      <div className="hero">
        <div className="hero-inner">
          <h1>
            Побудуй свою <em>імперію</em> з нуля.
          </h1>
          <p className="hero-sub">
            Керуй віртуальним стартапом — моделюй бізнес-процеси, аналізуй конкурентів та
            закривай перший раунд фінансування.
          </p>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-value green">${(startup.revenue / 1000).toFixed(0)}K</div>
              <div className="hero-stat-label">Місячний дохід</div>
            </div>
            <div>
              <div className="hero-stat-value amber">{startup.employees}</div>
              <div className="hero-stat-label">Співробітників</div>
            </div>
            <div>
              <div className="hero-stat-value red">3</div>
              <div className="hero-stat-label">Активних конкурентів</div>
            </div>
            <div>
              <div className="hero-stat-value">{startup.stage}</div>
              <div className="hero-stat-label">Поточний етап</div>
            </div>
          </div>
        </div>
      </div>

      <section id="startup">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">Мій Стартап</h2>
          </div>

          <img
            className="startup-banner"
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80"
            alt="Команда стартапу NexGen AI Solutions за роботою"
          />

          <article>
            <p className="startup-intro">
              <strong>{startup.name}</strong> — це технологічний стартап у сфері штучного
              інтелекту, заснований у {startup.founded} році. Компанія перебуває на етапі{" "}
              {startup.stage} та активно розширює присутність на ринках {startup.markets.join(", ")}.
            </p>

            <h3 className="features-title">Ключові функції платформи:</h3>
            <ul className="features-list">
              <li><strong>Автоматизація процесів</strong> — скорочення ручної роботи завдяки ШІ.</li>
              <li><strong>Аналітика в реальному часі</strong> — дашборди з миттєвим оновленням.</li>
              <li><strong>Інтеграція без коду</strong> — підключення сервісів без програмування.</li>
              <li><strong>Масштабована інфраструктура</strong> — готовність до росту навантаження.</li>
              <li><strong>Безпека</strong> — сучасні підходи до захисту даних.</li>
            </ul>
          </article>

          <StartupParams startup={startup} />
        </div>
      </section>

      <section id="simulation" style={{ background: "var(--fog)" }}>
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">Моделювання бізнес-процесу</h2>
          </div>

          <p className="market-intro">
            Введіть зміни до параметрів стартапу, щоб змоделювати різні сценарії розвитку.
          </p>

          <SimulationForm onSimulate={onSimulate} onReset={onReset} />
          <Report startup={startup} history={history} />
        </div>
      </section>
    </main>
  );
}

export default StartupPage;