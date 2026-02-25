// ========= Helpers =========
const $ = (sel) => document.querySelector(sel);
const fmtMoney = (n) => {
  const num = Number(n) || 0;
  return "$" + num.toLocaleString("en-US");
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// ========= State =========
let state = {
  startupName: "",
  industry: "SaaS",
  stage: "Idea",
  employees: 5,
  revenue: 0, // MRR
  costs: 0,   // monthly costs
  cash: 0,
  markets: [],
  offices: [],
};

let competitors = [
  { name: "NovaCore", industry: "AI", share: 18, price: "High", strength: "Brand" },
  { name: "PulseOps", industry: "SaaS", share: 12, price: "Mid", strength: "UX" },
  { name: "Finora", industry: "FinTech", share: 9, price: "Mid", strength: "Partnerships" },
  { name: "DataNest", industry: "Big Data", share: 7, price: "Low", strength: "Speed" },
];

let investors = [
  { name: "Alpha Ventures", focus: ["AI", "SaaS"], portfolio: 65000000 },
  { name: "Seedline Capital", focus: ["FinTech"], portfolio: 22000000 },
  { name: "North Star Angels", focus: ["SaaS", "EdTech"], portfolio: 12000000 },
  { name: "Purple Growth Fund", focus: ["AI", "Big Data"], portfolio: 90000000 },
];

// ========= DOM refs =========
const competitorsGrid = $("#competitorsGrid");
const investorsGrid = $("#investorsGrid");

const startupForm = $("#startupForm");
const startupNameEl = $("#startupName");
const industryEl = $("#industry");
const stageEl = $("#stage");
const employeesEl = $("#employees");
const revenueEl = $("#revenue");
const costsEl = $("#costs");
const cashEl = $("#cash");
const marketsEl = $("#markets");
const officesEl = $("#offices");

const kpiRevenue = $("#kpiRevenue");
const kpiCosts = $("#kpiCosts");
const kpiProfit = $("#kpiProfit");
const kpiRunway = $("#kpiRunway");
const kpiRevenueHint = $("#kpiRevenueHint");
const kpiCostsHint = $("#kpiCostsHint");
const kpiProfitHint = $("#kpiProfitHint");

const readinessBar = $("#readinessBar");
const readinessList = $("#readinessList");
const stagePill = $("#stagePill");
const riskPill = $("#riskPill");

const investorSearch = $("#investorSearch");
const investorSort = $("#investorSort");
const addInvestorBtn = $("#addInvestorBtn");
const openAddInvestor = $("#openAddInvestor");

const investorModal = $("#investorModal");
const investorForm = $("#investorForm");
const closeModal = $("#closeModal");
const cancelModal = $("#cancelModal");

const invName = $("#invName");
const invPortfolio = $("#invPortfolio");
const invFocus = $("#invFocus");

const simulateBtn = $("#simulateBtn");

const generateReportBtn = $("#generateReport");
const reportText = $("#reportText");
const copyReportBtn = $("#copyReport");

const themeBtn = $("#themeBtn");
const resetBtn = $("#resetBtn");

// ========= Render: Competitors (map) =========
function renderCompetitors(list) {
  if (!competitorsGrid) return;

  competitorsGrid.innerHTML = list.map((c) => `
    <div class="item">
      <div class="item__top">
        <div class="item__title">${c.name}</div>
        <span class="badge">${c.industry}</span>
      </div>
      <div class="item__meta">
        <div><b>Частка ринку:</b> ${c.share}%</div>
        <div><b>Ціна:</b> ${c.price}</div>
        <div><b>Сила:</b> ${c.strength}</div>
      </div>
    </div>
  `).join("");
}

// ========= Render: Investors (map + search + sort) =========
function getVisibleInvestors() {
  const q = (investorSearch?.value || "").trim().toLowerCase();
  let list = investors.filter((inv) => {
    const inName = inv.name.toLowerCase().includes(q);
    const inFocus = inv.focus.join(",").toLowerCase().includes(q);
    return q === "" ? true : (inName || inFocus);
  });

  const mode = investorSort?.value || "PORTFOLIO_DESC";
  list.sort((a, b) => {
    if (mode === "PORTFOLIO_DESC") return b.portfolio - a.portfolio;
    if (mode === "PORTFOLIO_ASC") return a.portfolio - b.portfolio;
    if (mode === "NAME_ASC") return a.name.localeCompare(b.name);
    if (mode === "NAME_DESC") return b.name.localeCompare(a.name);
    return 0;
  });

  return list;
}

function renderInvestors() {
  if (!investorsGrid) return;
  const list = getVisibleInvestors();

  investorsGrid.innerHTML = list.map((inv) => `
    <div class="item">
      <div class="item__top">
        <div class="item__title">${inv.name}</div>
        <span class="badge">${fmtMoney(inv.portfolio)}</span>
      </div>
      <div class="item__meta">
        <div><b>Фокус:</b> ${inv.focus.join(", ")}</div>
        <div><b>Портфель:</b> ${fmtMoney(inv.portfolio)}</div>
      </div>
      <div class="item__actions">
        <button class="smallbtn" data-action="contact" data-name="${inv.name}">Написати</button>
        <button class="smallbtn smallbtn--danger" data-action="remove" data-name="${inv.name}">Видалити</button>
      </div>
    </div>
  `).join("");
}

// ========= KPI + Readiness =========
function computeRisk() {
  const profit = (Number(state.revenue) || 0) - (Number(state.costs) || 0);
  const runway = profit >= 0 ? Infinity : (Number(state.cash) || 0) / Math.abs(profit);

  if ((Number(state.cash) || 0) === 0 && (Number(state.costs) || 0) > 0) return "High";
  if (runway !== Infinity && runway < 3) return "High";
  if (runway !== Infinity && runway < 6) return "Medium";
  return "Low";
}

function computeReadiness() {
  // 0..100 (проста модель)
  const stageScore = { Idea: 20, MVP: 45, Growth: 70, Scale: 90 }[state.stage] ?? 20;

  const revenueScore = clamp((Number(state.revenue) || 0) / 2000, 0, 30); // до 30
  const teamScore = clamp((Number(state.employees) || 0) * 2, 0, 20);     // до 20
  const marketsScore = clamp((state.markets?.length || 0) * 5, 0, 20);    // до 20
  const total = clamp(stageScore * 0.5 + revenueScore + teamScore * 0.5 + marketsScore * 0.5, 0, 100);

  return Math.round(total);
}

function updateKPI() {
  const revenue = Number(state.revenue) || 0;
  const costs = Number(state.costs) || 0;
  const profit = revenue - costs;

  kpiRevenue.textContent = fmtMoney(revenue);
  kpiCosts.textContent = fmtMoney(costs);
  kpiProfit.textContent = (profit >= 0 ? "+" : "") + fmtMoney(profit).replace("$", "$");

  kpiRevenueHint.textContent = revenue >= 10000 ? "Сильний MRR" : "Потрібен ріст";
  kpiCostsHint.textContent = costs <= revenue ? "Витрати контрольовані" : "Перевитрати";
  kpiProfitHint.textContent = profit >= 0 ? "Прибутково ✅" : "Збитково ⚠️";

  // runway
  if (profit >= 0) {
    kpiRunway.textContent = "∞";
  } else {
    const cash = Number(state.cash) || 0;
    const months = cash > 0 ? Math.floor(cash / Math.abs(profit)) : 0;
    kpiRunway.textContent = months + " міс";
  }

  // readiness panel
  const readiness = computeReadiness();
  readinessBar.style.width = readiness + "%";
  $(".meter")?.setAttribute("aria-valuenow", String(readiness));

  const risk = computeRisk();
  stagePill.textContent = `Stage: ${state.stage}`;
  riskPill.textContent = `Risk: ${risk}`;

  const bullets = [];
  if (state.stage === "Idea") bullets.push("Сформуй MVP та перевір гіпотези.");
  if (state.stage === "MVP") bullets.push("Покращуй конверсію та retention.");
  if (state.stage === "Growth") bullets.push("Скейл канали продажів і команду.");
  if (state.stage === "Scale") bullets.push("Оптимізуй процеси та unit-economics.");

  if ((Number(state.revenue) || 0) < (Number(state.costs) || 0)) bullets.push("Зменш витрати або збільш дохід.");
  if ((state.markets?.length || 0) === 0) bullets.push("Додай ринки збуту.");
  if ((Number(state.cash) || 0) === 0) bullets.push("Додай cash-резерв для runway.");

  readinessList.innerHTML = bullets.map((t) => `<li>${t}</li>`).join("");
}

// ========= Form handling =========
function readFormToState() {
  state.startupName = startupNameEl.value.trim();
  state.industry = industryEl.value;
  state.stage = stageEl.value;
  state.employees = Number(employeesEl.value) || 0;
  state.revenue = Number(revenueEl.value) || 0;
  state.costs = Number(costsEl.value) || 0;
  state.cash = Number(cashEl.value) || 0;

  state.markets = marketsEl.value
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  state.offices = officesEl.value
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
}

startupForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  readFormToState();
  updateKPI();
});

// ========= Investors interactions =========
function openModal() {
  investorModal?.showModal?.();
}
function closeModalFn() {
  investorModal?.close?.();
}

openAddInvestor?.addEventListener("click", openModal);
addInvestorBtn?.addEventListener("click", openModal);
closeModal?.addEventListener("click", closeModalFn);
cancelModal?.addEventListener("click", closeModalFn);

investorForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = invName.value.trim();
  const portfolio = Number(invPortfolio.value) || 0;
  const focus = invFocus.value.split(",").map(s => s.trim()).filter(Boolean);

  investors.push({ name, portfolio, focus });
  invName.value = "";
  invPortfolio.value = "";
  invFocus.value = "";

  closeModalFn();
  renderInvestors();
});

investorSearch?.addEventListener("input", renderInvestors);
investorSort?.addEventListener("change", renderInvestors);

investorsGrid?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const name = btn.dataset.name;

  if (action === "remove") {
    investors = investors.filter((x) => x.name !== name);
    renderInvestors();
  }
  if (action === "contact") {
    alert(`Напиши інвестору: ${name} (демо)`);
  }
});

// ========= Simulation =========
simulateBtn?.addEventListener("click", () => {
  // проста модель “крок симуляції”
  readFormToState();

  const deltaRevenue = Math.round((Math.random() * 4000 + 1000)); // +1k..+5k
  const deltaCosts = Math.round((Math.random() * 2500 + 500));    // +0.5k..+3k
  const deltaEmployees = Math.random() > 0.65 ? 1 : 0;

  state.revenue += deltaRevenue;
  state.costs += deltaCosts;
  state.employees += deltaEmployees;

  // інколи додаємо cash якщо прибуток з’явився
  const profit = state.revenue - state.costs;
  if (profit > 0 && Math.random() > 0.5) state.cash += Math.round(profit * 0.6);

  // підставляємо назад у форму
  revenueEl.value = state.revenue;
  costsEl.value = state.costs;
  employeesEl.value = state.employees;
  cashEl.value = state.cash;

  updateKPI();
});

// ========= Report =========
function buildReportText() {
  const revenue = Number(state.revenue) || 0;
  const costs = Number(state.costs) || 0;
  const profit = revenue - costs;
  const risk = computeRisk();
  const readiness = computeReadiness();

  return [
    `Startup: ${state.startupName || "—"}`,
    `Industry: ${state.industry} | Stage: ${state.stage}`,
    `Team: ${state.employees} | Markets: ${(state.markets || []).join(", ") || "—"} | Offices: ${(state.offices || []).join(", ") || "—"}`,
    ``,
    `MRR: ${fmtMoney(revenue)}`,
    `Costs: ${fmtMoney(costs)}`,
    `Net profit: ${(profit >= 0 ? "+" : "") + fmtMoney(profit).replace("$", "$")}`,
    `Cash reserve: ${fmtMoney(state.cash)}`,
    ``,
    `Readiness: ${readiness}% | Risk: ${risk}`,
    `Next steps:`,
    `- Improve conversion & retention`,
    `- Control burn rate and plan runway`,
    `- Validate growth channels and partnerships`,
  ].join("\n");
}

generateReportBtn?.addEventListener("click", () => {
  readFormToState();
  reportText.value = buildReportText();
});

copyReportBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(reportText.value || "");
    alert("Звіт скопійовано ✅");
  } catch {
    alert("Не вдалось скопіювати (дозвіл браузера) ⚠️");
  }
});

// ========= Theme & Reset (якщо лишаєш кнопки) =========
themeBtn?.addEventListener("click", () => {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  themeBtn.setAttribute("aria-pressed", next === "light" ? "true" : "false");
});

resetBtn?.addEventListener("click", () => {
  state = {
    startupName: "",
    industry: "SaaS",
    stage: "Idea",
    employees: 5,
    revenue: 0,
    costs: 0,
    cash: 0,
    markets: [],
    offices: [],
  };

  startupNameEl.value = "";
  industryEl.value = "SaaS";
  stageEl.value = "Idea";
  employeesEl.value = 5;
  revenueEl.value = 0;
  costsEl.value = 0;
  cashEl.value = 0;
  marketsEl.value = "";
  officesEl.value = "";

  reportText.value = "";
  updateKPI();
});

// ========= Init =========
renderCompetitors(competitors);
renderInvestors();
updateKPI();