import React from "react";

function CompetitorCard({ competitor }) {
  const growthClass =
    competitor.growth > 20
      ? "trend-up"
      : competitor.growth > 0
      ? "trend-flat"
      : "trend-down";

  return (
    <article className="competitor-card">
      <div className="comp-body">
        <p className="comp-name">{competitor.name}</p>
        <p className="comp-sector">{competitor.sector}</p>

        <div className="comp-metrics">
          <div>
            <p className="comp-metric-label">Розмір</p>
            <p className="comp-metric-val">{competitor.size} осіб</p>
          </div>
          <div>
            <p className="comp-metric-label">Дохід</p>
            <p className={`comp-metric-val ${growthClass}`}>
              ${(competitor.revenue / 1000000).toFixed(1)}M
            </p>
          </div>
          <div>
            <p className="comp-metric-label">Ринки</p>
            <p className="comp-metric-val">{competitor.markets}</p>
          </div>
          <div>
            <p className="comp-metric-label">Зростання</p>
            <p className={`comp-metric-val ${growthClass}`}>
              {competitor.growth}%
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CompetitorCard;