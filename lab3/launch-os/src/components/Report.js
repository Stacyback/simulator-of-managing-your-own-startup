import React from "react";

function Report({ startup, history }) {
  const real = history[0];

  const rows = [
    {
      label: "Дохід ($/міс)",
      real: `$${(real.revenue / 1000).toFixed(0)}K`,
      sim: `$${(startup.revenue / 1000).toFixed(0)}K`,
      diff: startup.revenue - real.revenue,
    },
    {
      label: "Витрати ($/міс)",
      real: `$${(real.expenses / 1000).toFixed(0)}K`,
      sim: `$${(startup.expenses / 1000).toFixed(0)}K`,
      diff: startup.expenses - real.expenses,
    },
    {
      label: "Прибуток ($/міс)",
      real: `$${((real.revenue - real.expenses) / 1000).toFixed(0)}K`,
      sim: `$${((startup.revenue - startup.expenses) / 1000).toFixed(0)}K`,
      diff:
        (startup.revenue - startup.expenses) -
        (real.revenue - real.expenses),
    },
    {
      label: "Кількість працівників",
      real: `${real.employees}`,
      sim: `${startup.employees}`,
      diff: startup.employees - real.employees,
    },
  ];

  const maxValue = Math.max(
    ...history.flatMap((item) => [
      item.revenue / 1000,
      item.expenses / 1000,
      item.employees * 10,
    ]),
    1
  );

  return (
    <div id="reportSection" style={{ display: "block" }}>
      <div className="section-header" style={{ marginTop: "2rem" }}>
        <h3 className="section-title" style={{ fontSize: "1.2rem" }}>
          Динамічний звіт
        </h3>
      </div>

      <div className="report-grid">
        <div className="chart-card">
          <p className="chart-card-title">📈 Графік параметрів</p>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", color: "var(--mist)", fontSize: ".8rem" }}>
            <span>🟩 Дохід</span>
            <span>🟧 Витрати</span>
            <span>🟨 Працівники ×10</span>
          </div>

          <div id="chartContainer">
            <svg width="100%" height="300" viewBox="0 0 760 300">
              <rect x="0" y="0" width="760" height="300" fill="var(--basalt)" rx="6" />

              {history.map((item, index) => {
                const x = 90 + index * 130;

                const revenueHeight = (item.revenue / 1000 / maxValue) * 150;
                const expensesHeight = (item.expenses / 1000 / maxValue) * 150;
                const employeesHeight = (item.employees * 10 / maxValue) * 150;

                return (
                  <g key={index}>
                    <text
                      x={x}
                      y="270"
                      textAnchor="middle"
                      fill="var(--mist)"
                      fontSize="11"
                    >
                      {item.label}
                    </text>

                    <rect
                      x={x - 35}
                      y={220 - revenueHeight}
                      width="22"
                      height={revenueHeight}
                      fill="#3A7D6B"
                    />
                    <rect
                      x={x - 8}
                      y={220 - expensesHeight}
                      width="22"
                      height={expensesHeight}
                      fill="#D4714A"
                    />
                    <rect
                      x={x + 19}
                      y={220 - employeesHeight}
                      width="22"
                      height={employeesHeight}
                      fill="#C89B3C"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="table-card">
          <p className="table-card-title">📊 Таблиця порівняння</p>
          <table id="reportTable">
            <thead>
              <tr>
                <th>Параметр</th>
                <th>Реальне</th>
                <th>Змодельоване</th>
                <th>Різниця</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.label}</td>
                  <td>{row.real}</td>
                  <td>{row.sim}</td>
                  <td
                    className={
                      row.diff > 0
                        ? "diff-positive"
                        : row.diff < 0
                        ? "diff-negative"
                        : "diff-neutral"
                    }
                  >
                    {row.diff > 0 ? "+" : ""}
                    {row.label.includes("Кількість")
                      ? row.diff
                      : `$${(row.diff / 1000).toFixed(0)}K`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;