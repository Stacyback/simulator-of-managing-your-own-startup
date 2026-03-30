import React from "react";

function MyStartup({ user, startup }) {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Мій стартап</h1>
      <p><strong>Користувач:</strong> {user?.email}</p>

      <div>
        <p><strong>Назва:</strong> {startup.name}</p>
        <p><strong>Дохід:</strong> ${startup.revenue}</p>
        <p><strong>Витрати:</strong> ${startup.expenses}</p>
        <p><strong>Працівники:</strong> {startup.employees}</p>
        <p><strong>Частка ринку:</strong> {startup.marketShare}%</p>
        <p><strong>Задоволеність:</strong> {startup.satisfaction}%</p>
      </div>
    </div>
  );
}

export default MyStartup;