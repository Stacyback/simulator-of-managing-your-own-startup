import React, { useEffect, useState } from "react";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://launch-os-backend.onrender.com/api"
    : "http://localhost:5000/api";

function StartupPage({
  startup,
  setStartup,
  history,
  setHistory,
  simulationCount,
  setSimulationCount,
  onSimulate,
  onReset,
}) {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    description: "",
    revenue: "",
    expenses: "",
    employees: "",
    marketShare: "",
    satisfaction: "",
  });

  const [simData, setSimData] = useState({
    revenue: 0,
    expenses: 0,
    employees: 0,
    marketShare: 0,
    satisfaction: 0,
  });

  const [message, setMessage] = useState("");
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [companyExists, setCompanyExists] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setMessage("Токен не знайдено. Увійди в акаунт повторно.");
          setLoadingCompany(false);
          return;
        }

        const response = await fetch(`${API_URL}/startup/company`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          const company = data.data;

          const hasRealCompany = company.name && company.name.trim() !== "";

          setCompanyExists(hasRealCompany);

          setFormData({
            name: company.name || "",
            industry: company.industry || "",
            description: company.description || "",
            revenue: hasRealCompany ? company.revenue ?? "" : "",
            expenses: hasRealCompany ? company.expenses ?? "" : "",
            employees: hasRealCompany ? company.employees ?? "" : "",
            marketShare: hasRealCompany ? company.marketShare ?? "" : "",
            satisfaction: hasRealCompany ? company.satisfaction ?? "" : "",
          });

          if (hasRealCompany) {
            setStartup((prev) => ({
              ...prev,
              ...company,
            }));

            setHistory([{ label: "Реальні", ...company }]);
          } else {
            setHistory([]);
          }
        } else {
          setMessage(data.error || "Не вдалося завантажити інформацію про компанію");
        }
      } catch (error) {
        setMessage("Помилка з'єднання із сервером");
      } finally {
        setLoadingCompany(false);
      }
    };

    fetchCompany();
  }, [setStartup, setHistory]);

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSimulationChange = (e) => {
    const { name, value } = e.target;

    setSimData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSaveCompany = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Токен не знайдено. Увійди в акаунт повторно.");
        return;
      }

      const payload = {
        ...formData,
        revenue: Number(formData.revenue) || 0,
        expenses: Number(formData.expenses) || 0,
        employees: Number(formData.employees) || 1,
        marketShare: Number(formData.marketShare) || 0,
        satisfaction: Number(formData.satisfaction) || 75,
      };

      const response = await fetch(`${API_URL}/startup/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setCompanyExists(true);

        setStartup((prev) => ({
          ...prev,
          ...data.data,
        }));

        setHistory([{ label: "Реальні", ...data.data }]);
        setSimulationCount(0);
        setMessage("Інформацію про компанію успішно збережено.");
      } else {
        setMessage(data.error || "Не вдалося зберегти компанію.");
      }
    } catch (error) {
      setMessage("Помилка з'єднання із сервером");
    }
  };

  const handleRunSimulation = () => {
    onSimulate(simData);
    setMessage("Симуляцію виконано.");

    setSimData({
      revenue: 0,
      expenses: 0,
      employees: 0,
      marketShare: 0,
      satisfaction: 0,
    });
  };

  if (loadingCompany) {
    return (
      <div className="section-inner">
        <h2>Завантаження інформації про компанію...</h2>
      </div>
    );
  }

  return (
    <section id="startup">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Мій стартап</h2>
          <span className="section-tag">Startup Control Panel</span>
        </div>

        {message && (
          <p style={{ marginBottom: "16px", color: "#7c4dff", fontWeight: "600" }}>
            {message}
          </p>
        )}

        {!companyExists && !message && (
          <p style={{ marginBottom: "16px", color: "#444", fontWeight: "600" }}>
            Компанію ще не створено. Заповни форму нижче та збережи її.
          </p>
        )}

        <div
          className="startup-grid"
          style={{ display: "grid", gap: "24px", marginTop: "20px" }}
        >
          <div className="startup-card">
            <h3>Інформація про компанію</h3>

            <div className="form-grid" style={{ display: "grid", gap: "12px" }}>
              <label>
                Назва компанії
                <input
                  type="text"
                  name="name"
                  placeholder="Введи назву компанії"
                  value={formData.name}
                  onChange={handleCompanyChange}
                />
              </label>

              <label>
                Сфера діяльності
                <input
                  type="text"
                  name="industry"
                  placeholder="Наприклад: Штучний інтелект"
                  value={formData.industry}
                  onChange={handleCompanyChange}
                />
              </label>

              <label>
                Опис компанії
                <textarea
                  name="description"
                  placeholder="Коротко опиши компанію"
                  value={formData.description}
                  onChange={handleCompanyChange}
                  rows="4"
                />
              </label>

              <label>
                Дохід
                <input
                  type="number"
                  name="revenue"
                  placeholder="Введи дохід"
                  value={formData.revenue}
                  onChange={handleCompanyChange}
                />
              </label>

              <label>
                Витрати
                <input
                  type="number"
                  name="expenses"
                  placeholder="Введи витрати"
                  value={formData.expenses}
                  onChange={handleCompanyChange}
                />
              </label>

              <label>
                Кількість працівників
                <input
                  type="number"
                  name="employees"
                  placeholder="Введи кількість працівників"
                  value={formData.employees}
                  onChange={handleCompanyChange}
                />
              </label>

              <label>
                Частка ринку (%)
                <input
                  type="number"
                  step="0.1"
                  name="marketShare"
                  placeholder="Введи частку ринку"
                  value={formData.marketShare}
                  onChange={handleCompanyChange}
                />
              </label>

              <label>
                Задоволеність клієнтів (%)
                <input
                  type="number"
                  name="satisfaction"
                  placeholder="Введи рівень задоволеності"
                  value={formData.satisfaction}
                  onChange={handleCompanyChange}
                />
              </label>
            </div>

            <button
              onClick={handleSaveCompany}
              style={{ marginTop: "16px" }}
              className="btn-primary"
            >
              Зберегти компанію
            </button>
          </div>

          <div className="startup-card">
            <h3>Симуляція змін</h3>

            <div className="form-grid" style={{ display: "grid", gap: "12px" }}>
              <label>
                Зміна доходу (тис.)
                <input
                  type="number"
                  name="revenue"
                  value={simData.revenue}
                  onChange={handleSimulationChange}
                />
              </label>

              <label>
                Зміна витрат (тис.)
                <input
                  type="number"
                  name="expenses"
                  value={simData.expenses}
                  onChange={handleSimulationChange}
                />
              </label>

              <label>
                Зміна кількості працівників
                <input
                  type="number"
                  name="employees"
                  value={simData.employees}
                  onChange={handleSimulationChange}
                />
              </label>

              <label>
                Зміна частки ринку
                <input
                  type="number"
                  step="0.1"
                  name="marketShare"
                  value={simData.marketShare}
                  onChange={handleSimulationChange}
                />
              </label>

              <label>
                Зміна задоволеності
                <input
                  type="number"
                  name="satisfaction"
                  value={simData.satisfaction}
                  onChange={handleSimulationChange}
                />
              </label>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <button onClick={handleRunSimulation} className="btn-primary">
                Запустити симуляцію
              </button>

              <button onClick={onReset} className="btn-secondary">
                Скинути
              </button>
            </div>
          </div>

          <div className="startup-card">
            <h3>Поточні показники</h3>
            {companyExists ? (
              <ul style={{ lineHeight: "1.9" }}>
                <li><strong>Назва:</strong> {startup.name}</li>
                <li><strong>Сфера:</strong> {startup.industry}</li>
                <li><strong>Дохід:</strong> {startup.revenue}</li>
                <li><strong>Витрати:</strong> {startup.expenses}</li>
                <li><strong>Працівники:</strong> {startup.employees}</li>
                <li><strong>Частка ринку:</strong> {startup.marketShare}%</li>
                <li><strong>Задоволеність:</strong> {startup.satisfaction}%</li>
              </ul>
            ) : (
              <p>Поки що дані компанії не збережені.</p>
            )}
          </div>

          <div className="startup-card">
            <h3>Історія симуляцій</h3>
            {history && history.length > 0 ? (
              <div style={{ display: "grid", gap: "10px" }}>
                {history.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "12px",
                    }}
                  >
                    <strong>{item.label}</strong>
                    <div>Дохід: {item.revenue}</div>
                    <div>Витрати: {item.expenses}</div>
                    <div>Працівники: {item.employees}</div>
                    <div>Частка ринку: {item.marketShare}%</div>
                    <div>Задоволеність: {item.satisfaction}%</div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Історія симуляцій поки порожня.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartupPage;