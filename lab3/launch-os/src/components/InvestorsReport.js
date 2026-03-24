import React from "react";

function InvestorsReport({ investors = [] }) {
  if (investors.length === 0) return null;

  const total = investors.length;

  const topInvestor = investors.reduce((max, inv) => {
    const currentValue = parseFloat(inv.portfolio.replace(/[$BM]/g, ""));
    const maxValue = parseFloat(max.portfolio.replace(/[$BM]/g, ""));
    return currentValue > maxValue ? inv : max;
  });

  return (
    <div className="startup-card" style={{ marginBottom: "1.5rem" }}>
      <p className="card-title">Звіт по інвесторах</p>
      <ul className="info-list">
        <li>
          <span className="info-key">Кількість інвесторів</span>
          <span className="info-val">{total}</span>
        </li>
        <li>
          <span className="info-key">Найбільший фонд</span>
          <span className="info-val">{topInvestor.name}</span>
        </li>
        <li>
          <span className="info-key">Об’єм портфелю</span>
          <span className="info-val">{topInvestor.portfolio}</span>
        </li>
        <li>
          <span className="info-key">Основний фокус</span>
          <span className="info-val">{topInvestor.focus}</span>
        </li>
      </ul>
    </div>
  );
}

export default InvestorsReport;