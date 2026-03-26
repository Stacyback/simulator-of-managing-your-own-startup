import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function MarketPage({ competitors = [] }) {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const snapshot = await getDocs(collection(db, "markets"));

        if (snapshot.empty) {
          setMarkets(competitors);
        } else {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMarkets(data);
        }
      } catch (error) {
        console.error("Помилка завантаження ринків:", error);
        setMarkets(competitors);
      }
    };

    fetchMarkets();
  }, [competitors]);

  return (
    <section id="market">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Ринки</h2>
          <span className="section-tag">Market Analysis</span>
        </div>

        <p className="market-intro">
          Досліджуй конкурентів, їхню динаміку та позицію на ринку.
        </p>

        <div className="market-grid">
          {markets.map((item, index) => (
            <div key={item.id || index} className="competitor-card">
              <img
                src={item.image}
                alt={item.name}
                className="comp-img"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x160?text=Market";
                }}
              />

              <div className="comp-body">
                <div className="comp-name">{item.name}</div>
                <div className="comp-sector">
                  {item.region || item.sector || "AI / Tech"}
                </div>

                <div className="comp-metrics">
                  <div>
                    <div className="comp-metric-label">Ріст</div>
                    <div className="comp-metric-val">
                      {item.growth ?? item.score ?? "N/A"}
                    </div>
                  </div>

                  <div>
                    <div className="comp-metric-label">Сфера</div>
                    <div className="comp-metric-val">
                      {item.industry || item.market || "Digital"}
                    </div>
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

export default MarketPage;