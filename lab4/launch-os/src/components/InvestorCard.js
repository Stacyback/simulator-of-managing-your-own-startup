import React from "react";

function InvestorCard({ investor }) {
  let badgeClass = "badge-amber";

  if (investor.stage.includes("Seed")) {
    badgeClass = "badge-green";
  } else if (investor.stage.includes("B") || investor.stage.includes("C")) {
    badgeClass = "badge-ember";
  }

  return (
    <div className="investor-card">
      <div className="investor-body">
        <div className="investor-avatar">{investor.initials}</div>

        <div>
          <p className="investor-name">{investor.name}</p>
          <p className="investor-focus">Фокус: {investor.focus}</p>
        </div>

        <ul
          className="info-list"
          style={{ borderTop: "1px solid var(--ash)", paddingTop: ".8rem" }}
        >
          <li>
            <span className="info-key">Етап</span>
            <span className={`badge ${badgeClass}`}>{investor.stage}</span>
          </li>
          <li>
            <span className="info-key">Чек</span>
            <span className="info-val">{investor.ticket}</span>
          </li>
        </ul>

        <div className="investor-portfolio">
          <p className="inv-port-label">Об'єм портфелю</p>
          <p className="inv-port-val">{investor.portfolio}</p>
        </div>
      </div>
    </div>
  );
}

export default InvestorCard;