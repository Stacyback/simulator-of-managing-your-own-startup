import React, { useState, useEffect } from "react";
import { authFetch } from "../firebase";

function MyStartup({ user }) {
  const [startupData, setStartupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    revenue: 0,
    employees: 1,
    marketShare: 0,
    satisfaction: 75
  });

  useEffect(() => {
    if (user) loadStartupData();
  }, [user]);

  const loadStartupData = async () => {
    setLoading(true);
    try {
      const response = await authFetch('/startup/company');
      const data = await response.json();
      if (data.success) {
        setStartupData(data.data);
        setFormData(data.data);
      }
    } catch (error) {
      setError("Помилка завантаження");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    
    // ВАЛІДАЦІЯ: назва компанії мінімум 5 символів
    if (!formData.name || formData.name.trim().length < 5) {
      setError("Назва компанії повинна містити не менше 5 символів");
      setSaving(false);
      return;
    }
    
    try {
      const response = await authFetch('/startup/company', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (data.success) {
        setStartupData(data.data);
        setSuccess("Дані збережено!");
        setEditing(false);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Помилка збереження");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'description' || name === 'industry' ? value : Number(value)
    }));
  };

  if (loading) return <div style={{ padding: "30px", textAlign: "center" }}>Завантаження...</div>;

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Мій стартап</h1>
      <p><strong>Користувач:</strong> {user?.email}</p>

      {error && <div style={{ background: "#f8d7da", color: "#721c24", padding: "10px", borderRadius: "5px", marginBottom: "20px" }}>{error}</div>}
      {success && <div style={{ background: "#d4edda", color: "#155724", padding: "10px", borderRadius: "5px", marginBottom: "20px" }}>{success}</div>}

      {!editing ? (
        <div>
          <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
            <p><strong>Назва:</strong> {startupData?.name || "Не вказано"}</p>
            <p><strong>Опис:</strong> {startupData?.description || "Не вказано"}</p>
            <p><strong>Галузь:</strong> {startupData?.industry || "Не вказано"}</p>
            <p><strong>Дохід:</strong> ${startupData?.revenue?.toLocaleString() || 0}</p>
            <p><strong>Працівники:</strong> {startupData?.employees || 1}</p>
            <p><strong>Частка ринку:</strong> {startupData?.marketShare || 0}%</p>
            <p><strong>Задоволеність:</strong> {startupData?.satisfaction || 75}%</p>
          </div>
          <button onClick={() => setEditing(true)} style={{ padding: "10px 20px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Редагувати</button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold" }}>Назва компанії <span style={{ color: "red" }}>*</span> (мін. 5 символів)</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold" }}>Опис:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold" }}>Галузь:</label>
            <input type="text" name="industry" value={formData.industry} onChange={handleChange} style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleSave} disabled={saving} style={{ padding: "10px 20px", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>{saving ? "Збереження..." : "Зберегти"}</button>
            <button onClick={() => { setEditing(false); setFormData(startupData); }} style={{ padding: "10px 20px", background: "#6c757d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Скасувати</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyStartup;