import React, { useState } from "react";

function SimulationForm({ onSimulate, onReset }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    revenue: "",
    expenses: "",
    employees: "",
    marketShare: "",
    satisfaction: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const fieldMap = {
      simRevenue: "revenue",
      simExpenses: "expenses",
      simEmployees: "employees",
      simMarketShare: "marketShare",
      simSatisfaction: "satisfaction",
    };

    setForm({
      ...form,
      [fieldMap[e.target.id]]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(form).every((v) => v === "");
    if (isEmpty) {
      setError("⚠ Введіть хоча б одну зміну параметра.");
      return;
    }

    setError("");
    onSimulate(form);
  };

  const handleReset = () => {
    setForm({
      revenue: "",
      expenses: "",
      employees: "",
      marketShare: "",
      satisfaction: "",
    });
    setError("");
    onReset();
  };

  return (
    <>
      <button className="sim-toggle-btn" onClick={() => setOpen(!open)}>
        {open ? "▲ Сховати форму симуляції" : "▼ Відкрити форму симуляції"}
      </button>

      {open && (
        <div id="simPanel" style={{ display: "block" }}>
          <p className="sim-panel-title">⚙ Параметри симуляції</p>
          <p className="sim-panel-sub">
            Вкажіть зміни відносно поточних значень. Позитивні числа збільшують
            параметр, від’ємні — зменшують.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="sim-fields">
              <div className="sim-field">
                <label htmlFor="simRevenue">Зміна доходу (тис. $)</label>
                <input
                  id="simRevenue"
                  type="number"
                  value={form.revenue}
                  onChange={handleChange}
                />
              </div>

              <div className="sim-field">
                <label htmlFor="simExpenses">Зміна витрат (тис. $)</label>
                <input
                  id="simExpenses"
                  type="number"
                  value={form.expenses}
                  onChange={handleChange}
                />
              </div>

              <div className="sim-field">
                <label htmlFor="simEmployees">Зміна кількості працівників</label>
                <input
                  id="simEmployees"
                  type="number"
                  value={form.employees}
                  onChange={handleChange}
                />
              </div>

              <div className="sim-field">
                <label htmlFor="simMarketShare">Зміна частки ринку (%)</label>
                <input
                  id="simMarketShare"
                  type="number"
                  step="0.1"
                  value={form.marketShare}
                  onChange={handleChange}
                />
              </div>

              <div className="sim-field">
                <label htmlFor="simSatisfaction">Зміна задоволеності (%)</label>
                <input
                  id="simSatisfaction"
                  type="number"
                  value={form.satisfaction}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div className="sim-error" style={{ display: "block" }}>
                {error}
              </div>
            )}

            <div className="sim-actions">
              <button type="submit" className="btn-primary">
                ▶ Запустити симуляцію
              </button>
              <button type="button" className="btn-secondary" onClick={handleReset}>
                ↺ Скинути до реальних значень
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default SimulationForm;