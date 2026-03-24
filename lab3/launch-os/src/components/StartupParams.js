import React from "react";

function StartupParams({ startup }) {
  const revenuePercent = Math.min((startup.revenue / 500000) * 100, 100);
  const expensesPercent = Math.min((startup.expenses / 300000) * 100, 100);
  const employeesPercent = Math.min((startup.employees / 50) * 100, 100);
  const marketPercent = Math.min(startup.marketShare * 10, 100);
  const satisfactionPercent = Math.min(startup.satisfaction, 100);

  return (
    <div className="startup-grid">
      <div className="startup-card">
        <p className="card-title">{startup.name}</p>
        <ul className="info-list">
          <li>
            <span className="info-key">Сфера</span>
            <span className="info-val">{startup.industry}</span>
          </li>
          <li>
            <span className="info-key">Заснована</span>
            <span className="info-val">{startup.founded}</span>
          </li>
          <li>
            <span className="info-key">Етап</span>
            <span className="badge badge-amber">{startup.stage}</span>
          </li>
          <li>
            <span className="info-key">Статус</span>
            <span className="badge badge-green">{startup.status}</span>
          </li>
          <li>
            <span className="info-key">Ринки збуту</span>
            <span className="info-val">{startup.markets.join(" · ")}</span>
          </li>
          <li>
            <span className="info-key">Офіси</span>
            <span className="info-val">
              {startup.offices.length} ({startup.offices.join(", ")})
            </span>
          </li>
          <li>
            <span className="info-key">Кількість працівників</span>
            <span className="info-val">{startup.employees}</span>
          </li>
        </ul>
      </div>

      <div className="startup-card">
        <p className="card-title">Параметри бізнесу</p>
        <div className="param-list">
          <div className="param-item">
            <div className="param-header">
              <span className="param-name">Співробітники</span>
              <span className="param-val">{startup.employees} / 50</span>
            </div>
            <div className="param-bar">
              <div
                className="param-fill amber"
                style={{ width: `${employeesPercent}%` }}
              />
            </div>
          </div>

          <div className="param-item">
            <div className="param-header">
              <span className="param-name">Місячний дохід</span>
              <span className="param-val">
                ${(startup.revenue / 1000).toFixed(0)}K
              </span>
            </div>
            <div className="param-bar">
              <div
                className="param-fill green"
                style={{ width: `${revenuePercent}%` }}
              />
            </div>
          </div>

          <div className="param-item">
            <div className="param-header">
              <span className="param-name">Місячні витрати</span>
              <span className="param-val">
                ${(startup.expenses / 1000).toFixed(0)}K
              </span>
            </div>
            <div className="param-bar">
              <div
                className="param-fill amber"
                style={{ width: `${expensesPercent}%` }}
              />
            </div>
          </div>

          <div className="param-item">
            <div className="param-header">
              <span className="param-name">Частка ринку</span>
              <span className="param-val">{startup.marketShare.toFixed(1)}%</span>
            </div>
            <div className="param-bar">
              <div
                className="param-fill green"
                style={{ width: `${marketPercent}%` }}
              />
            </div>
          </div>

          <div className="param-item">
            <div className="param-header">
              <span className="param-name">Задоволеність клієнтів</span>
              <span className="param-val">{startup.satisfaction}%</span>
            </div>
            <div className="param-bar">
              <div
                className="param-fill green"
                style={{ width: `${satisfactionPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="startup-card startup-card-full">
        <p className="card-title">Ринки збуту — Розбивка доходів</p>
        <ul
          className="info-list"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: ".5rem 1.5rem" }}
        >
          <li>
            <span className="info-key">США</span>
            <span className="badge badge-green">
              ${(startup.revenue * 0.52 / 1000).toFixed(0)}K / міс
            </span>
          </li>
          <li>
            <span className="info-key">Європа</span>
            <span className="badge badge-amber">
              ${(startup.revenue * 0.32 / 1000).toFixed(0)}K / міс
            </span>
          </li>
          <li>
            <span className="info-key">Азійсько-Тихоокеанський</span>
            <span className="badge badge-ember">
              ${(startup.revenue * 0.16 / 1000).toFixed(0)}K / міс
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StartupParams;