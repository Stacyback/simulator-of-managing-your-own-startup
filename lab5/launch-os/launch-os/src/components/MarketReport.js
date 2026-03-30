import React from "react";

function MarketReport({ competitors = [] }) {
  if (competitors.length === 0) return null;

  const total = competitors.length;

  const avgSize = Math.round(
    competitors.reduce((sum, c) => sum + c.size, 0) / competitors.length
  );

  const topRevenue = competitors.reduce((max, c) =>
    c.revenue > max.revenue ? c : max
  );

  return (
    <div className="startup-card" style={{ marginBottom: "1.5rem" }}>
      <p className="card-title">Звіт по конкурентному середовищу</p>
      <ul className="info-list">
        <li>
          <span className="info-key">Кількість конкурентів</span>
          <span className="info-val">{total}</span>
        </li>
        <li>
          <span className="info-key">Середній розмір компанії</span>
          <span className="info-val">{avgSize} осіб</span>
        </li>
        <li>
          <span className="info-key">Лідер за доходом</span>
          <span className="info-val">{topRevenue.name}</span>
        </li>
        <li>
          <span className="info-key">Максимальний дохід</span>
          <span className="info-val">
            ${(topRevenue.revenue / 1000000).toFixed(1)}M
          </span>
        </li>
      </ul>
    </div>
  );
}

export default MarketReport;