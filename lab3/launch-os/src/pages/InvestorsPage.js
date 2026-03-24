import React from "react";
import InvestorCard from "../components/InvestorCard";
import InvestorsReport from "../components/InvestorsReport";

function InvestorsPage({ investors = [] }) {
  return (
    <main>
      <section id="investors">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">Інвестори</h2>
          </div>

          <p className="investors-intro">
            Список потенційних інвесторів.
          </p>

          <InvestorsReport investors={investors} />

          <div className="investors-grid">
            {investors.length > 0 ? (
              investors.map((investor) => (
                <InvestorCard key={investor.id} investor={investor} />
              ))
            ) : (
              <p style={{ color: "var(--basalt)" }}>Інвесторів не знайдено.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default InvestorsPage;