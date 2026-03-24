import React, { useState } from "react";
import CompetitorCard from "../components/CompetitorCard";
import MarketReport from "../components/MarketReport";

function MarketPage({ competitors = [] }) {
  const [selectedSector, setSelectedSector] = useState("Усі");

  const sectors = ["Усі", ...new Set(competitors.map((c) => c.sector))];

  const filteredCompetitors =
    selectedSector === "Усі"
      ? competitors
      : competitors.filter((c) => c.sector === selectedSector);

  return (
    <main>
      <section id="market">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">Ринок</h2>
          </div>

          <p className="market-intro">
            Ринок ШІ-інструментів для бізнесу демонструє щорічне зростання понад 35%.
            Нижче наведено аналіз основних конкурентів.
          </p>

          <MarketReport competitors={filteredCompetitors} />

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="sectorFilter"
              style={{
                marginRight: "0.8rem",
                fontFamily: "var(--mono)",
                fontSize: ".75rem",
              }}
            >
              Фільтр за сферою:
            </label>

            <select
              id="sectorFilter"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              style={{
                padding: ".5rem .8rem",
                borderRadius: "6px",
                border: "1px solid var(--mist)",
                fontFamily: "var(--mono)",
              }}
            >
              {sectors.map((sector, index) => (
                <option key={index} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          <div className="market-grid">
            {filteredCompetitors.map((competitor) => (
              <CompetitorCard key={competitor.id} competitor={competitor} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default MarketPage;