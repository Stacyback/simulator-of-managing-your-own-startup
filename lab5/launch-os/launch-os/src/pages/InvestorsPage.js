import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function InvestorsPage({ investors: localInvestors = [] }) {
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const snapshot = await getDocs(collection(db, "investors"));

        if (snapshot.empty) {
          setInvestors(localInvestors);
        } else {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setInvestors(data);
        }
      } catch (error) {
        console.error("Помилка завантаження інвесторів:", error);
        setInvestors(localInvestors);
      }
    };

    fetchInvestors();
  }, [localInvestors]);

  return (
    <section id="investors">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Інвестори</h2>
          <span className="section-tag">Funding</span>
        </div>

        <p className="investors-intro">
          Обери потенційних інвесторів для масштабування стартапу.
        </p>

        <div className="investors-grid">
          {investors.map((item, index) => (
            <div key={item.id || index} className="investor-card">
              <img
                src={item.image}
                alt={item.name}
                className="investor-img"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x120?text=Investor";
                }}
              />

              <div className="investor-body">
                <div className="investor-name">{item.name}</div>
                <div className="investor-focus">
                  {item.focus || item.stage || "Venture Capital"}
                </div>

                <div className="investor-portfolio">
                  <div className="inv-port-label">Портфель / бюджет</div>
                  <div className="inv-port-val">
                    {item.budget || item.checkSize || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InvestorsPage;