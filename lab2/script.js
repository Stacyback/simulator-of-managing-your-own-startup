/* ═══════════════════════════════════════════════════════
   LaunchOS — Симулятор Стартапу | script.js
   Лабораторна робота №2: Основи JavaScript
   Варіант 16
═══════════════════════════════════════════════════════ */

/* ── 1. ДАНІ ─────────────────────────────────────────
   Масиви конкурентів та інвесторів для рендерингу
   через Array.map() (завдання 1)
──────────────────────────────────────────────────────*/
const competitors = [
  { name: 'Cognify Labs',   sector: 'Штучний інтелект',   size: 120, revenue: 3200000, markets: 'США · ЄС',  growth: 34  },
  { name: 'DataMind Co.',   sector: 'Аналітика даних',    size: 85,  revenue: 1800000, markets: 'США',       growth: 5   },
  { name: 'Synaptic AG',    sector: 'Машинне навчання',   size: 210, revenue: 8500000, markets: 'ЄС · АТР',  growth: 61  },
  { name: 'Orion Dynamics', sector: 'SaaS / ШІ',         size: 44,  revenue: 620000,  markets: 'США',       growth: -8  },
  { name: 'VectorEdge',     sector: 'Глибоке навчання',   size: 67,  revenue: 1100000, markets: 'ЄС · США',  growth: 22  },
  { name: 'PulseAI Inc.',   sector: 'НЛП / Автоматизація',size: 31,  revenue: 390000,  markets: 'АТР',       growth: 2   },
];

const investors = [
  { initials: 'AV', name: 'Apex Ventures',      focus: 'ШІ · Глибокі технології',    stage: 'Серія A–B',    ticket: '$2M – $15M',   portfolio: '$340M' },
  { initials: 'SC', name: 'Sequoia Capital',    focus: 'SaaS · Споживчий ринок',     stage: 'Seed – Серія C',ticket: '$500K – $100M', portfolio: '$8.5B' },
  { initials: 'NF', name: 'NordFund',           focus: 'Європейські технології',     stage: 'Серія A',      ticket: '$1M – $8M',    portfolio: '$210M' },
  { initials: 'TA', name: 'TechAlpha Partners', focus: 'МН · Дані',                  stage: 'Pre-A – A',    ticket: '$750K – $5M',  portfolio: '$95M'  },
  { initials: 'GV', name: 'GreenValley VC',     focus: 'Impact · Етика ШІ',          stage: 'Seed – B',     ticket: '$200K – $12M', portfolio: '$180M' },
  { initials: 'HR', name: 'HorizonRise Fund',   focus: 'Розширення в АТР',           stage: 'Серія B–C',    ticket: '$5M – $50M',   portfolio: '$1.2B' },
];

/* Реальні поточні параметри стартапу */
const realParams = {
  revenue:   142000,
  expenses:  98000,
  employees: 14,
  marketShare: 4.2,
  satisfaction: 87,
};

/* Змодельовані параметри (змінюються через форму) */
let simParams = { ...realParams };

/* Масив для графіка (історія симуляцій) */
let simHistory = [{ label: 'Реальні', ...realParams }];


/* ══════════════════════════════════════════════════════
   ЗАВДАННЯ 1 — map() для рендерингу конкурентів
   та інвесторів у DOM
══════════════════════════════════════════════════════ */

/**
 * Рендеринг сітки конкурентів через Array.map()
 * Демонструє: map(), querySelector, innerHTML, if/else для тренду
 */
function renderCompetitors() {
  const grid = document.getElementById('competitorGrid');
  if (!grid) return;

  // map() — перетворює масив об'єктів у масив HTML-рядків
  const cards = competitors.map((c, index) => {
    // if/else для визначення класу тренду (завдання 1, крок 3)
    let trendClass, trendSymbol;
    if (c.growth > 20) {
      trendClass  = 'trend-up';
      trendSymbol = '↑';
    } else if (c.growth > 0) {
      trendClass  = 'trend-flat';
      trendSymbol = '→';
    } else {
      trendClass  = 'trend-down';
      trendSymbol = '↓';
    }

    const revenueFormatted = (c.revenue / 1000000).toFixed(1) + 'M';

    return `
      <article class="competitor-card" data-index="${index}">
        <div class="comp-body">
          <p class="comp-name">${c.name}</p>
          <p class="comp-sector">${c.sector}</p>
          <div class="comp-metrics">
            <div><p class="comp-metric-label">Розмір</p><p class="comp-metric-val">${c.size} осіб</p></div>
            <div><p class="comp-metric-label">Дохід</p><p class="comp-metric-val ${trendClass}">${trendSymbol} $${revenueFormatted}</p></div>
            <div><p class="comp-metric-label">Ринки</p><p class="comp-metric-val">${c.markets}</p></div>
            <div><p class="comp-metric-label">Зростання</p><p class="comp-metric-val ${trendClass}">${trendSymbol} ${c.growth}%</p></div>
          </div>
        </div>
      </article>`;
  });

  grid.innerHTML = cards.join('');

  // Завдання 2 — додаємо hover-ефект через querySelectorAll + forEach
  addCompetitorHover();
}

/**
 * Рендеринг сітки інвесторів через Array.map()
 */
function renderInvestors() {
  const grid = document.getElementById('investorGrid');
  if (!grid) return;

  const cards = investors.map((inv) => {
    // if/else для класу бейджа (завдання 1, крок 3)
    let badgeClass;
    if (inv.stage.includes('Seed')) {
      badgeClass = 'badge-green';
    } else if (inv.stage.includes('B') || inv.stage.includes('C')) {
      badgeClass = 'badge-ember';
    } else {
      badgeClass = 'badge-amber';
    }

    return `
      <div class="investor-card">
        <div class="investor-body">
          <div class="investor-avatar">${inv.initials}</div>
          <div>
            <p class="investor-name">${inv.name}</p>
            <p class="investor-focus">Фокус: ${inv.focus}</p>
          </div>
          <ul class="info-list" style="border-top:1px solid var(--ash);padding-top:.8rem">
            <li><span class="info-key">Етап</span><span class="badge ${badgeClass}">${inv.stage}</span></li>
            <li><span class="info-key">Чек</span><span class="info-val">${inv.ticket}</span></li>
          </ul>
          <div class="investor-portfolio">
            <p class="inv-port-label">Об'єм портфелю</p>
            <p class="inv-port-val">${inv.portfolio}</p>
          </div>
        </div>
      </div>`;
  });

  grid.innerHTML = cards.join('');
}


/* ══════════════════════════════════════════════════════
   ЗАВДАННЯ 2 — Обробка подій та динамічні оновлення
══════════════════════════════════════════════════════ */

/**
 * Hover-ефект на картках конкурентів
 * Демонструє: querySelectorAll, forEach, addEventListener,
 *             mouseover/mouseout, if/else (завдання 2, крок 4)
 */
function addCompetitorHover() {
  const cards = document.querySelectorAll('.competitor-card');

  // for loop для додавання обробників до кількох елементів (завдання 2, крок 3)
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    card.addEventListener('mouseover', function () {
      // if/else: додаємо або прибираємо підсвітку
      if (!this.classList.contains('hovered')) {
        this.classList.add('hovered');
        this.style.outline = '2px solid var(--ember)';
      }
    });

    card.addEventListener('mouseout', function () {
      if (this.classList.contains('hovered')) {
        this.classList.remove('hovered');
        this.style.outline = 'none';
      }
    });
  }
}

/**
 * Перемикач видимості секцій через nav-посилання
 * Демонструє: addEventListener click, if/else видимість (завдання 2, крок 1–2)
 */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';

    // while loop для перебору секцій (демонстрація while)
    let i = 0;
    while (i < sections.length) {
      if (window.scrollY >= sections[i].offsetTop - 80) {
        current = sections[i].id;
      }
      i++;
    }

    links.forEach(a => {
      // if/else для активного посилання
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  });
}

/**
 * Бургер-меню для мобільних
 */
function initBurger() {
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/**
 * Оновлення смуг параметрів на панелі стартапу
 * Демонструє: querySelector, setAttribute, DOM manipulation
 */
function updateParamBars(params) {
  const maxRevenue    = 500000;
  const maxExpenses   = 300000;
  const maxEmployees  = 50;

  // forEach для оновлення кількох елементів (завдання 1, крок 4)
  const barConfigs = [
    { id: 'barEmployees',   value: (params.employees  / maxEmployees)  * 100 },
    { id: 'barRevenue',     value: (params.revenue    / maxRevenue)    * 100 },
    { id: 'barExpenses',    value: (params.expenses   / maxExpenses)   * 100 },
    { id: 'barMarket',      value: params.marketShare * 10                    },
    { id: 'barSatisfaction',value: params.satisfaction                        },
  ];

  barConfigs.forEach(cfg => {
    const el = document.getElementById(cfg.id);
    if (el) {
      const pct = Math.min(Math.round(cfg.value), 100);
      el.style.width = pct + '%';
    }
  });

  // Оновлення текстових значень
  const valueMap = {
    'valEmployees':   params.employees + ' / 50',
    'valRevenue':     '$' + (params.revenue / 1000).toFixed(0) + 'K',
    'valExpenses':    '$' + (params.expenses / 1000).toFixed(0) + 'K',
    'valMarket':      params.marketShare.toFixed(1) + '%',
    'valSatisfaction': params.satisfaction + '%',
  };

  for (const [id, text] of Object.entries(valueMap)) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // Оновлення героя
  const heroRevenue = document.getElementById('heroRevenue');
  const heroEmp     = document.getElementById('heroEmployees');
  if (heroRevenue) heroRevenue.textContent = '$' + (params.revenue / 1000).toFixed(0) + 'K';
  if (heroEmp)     heroEmp.textContent     = params.employees;
}


/* ══════════════════════════════════════════════════════
   ЗАВДАННЯ 2 + 3 — Форма "Моделювання бізнес процесу"
   та динамічний звіт
══════════════════════════════════════════════════════ */

/**
 * Ініціалізація форми симуляції
 * Демонструє: addEventListener submit, preventDefault,
 *             if/else валідація, DOM manipulation (завдання 3)
 */
function initSimForm() {
  const form = document.getElementById('simForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // зупиняємо стандартну відправку форми

    // Збір даних з форми (завдання 3, крок 2)
    const revenueChange   = parseInt(document.getElementById('simRevenue').value)   || 0;
    const expensesChange  = parseInt(document.getElementById('simExpenses').value)  || 0;
    const employeesChange = parseInt(document.getElementById('simEmployees').value) || 0;
    const marketChange    = parseFloat(document.getElementById('simMarket').value)  || 0;
    const satChange       = parseInt(document.getElementById('simSatisfaction').value) || 0;

    // Валідація if/else (завдання 3, крок 2)
    const errEl = document.getElementById('simError');
    let hasError = false;

    if (revenueChange === 0 && expensesChange === 0 && employeesChange === 0
        && marketChange === 0 && satChange === 0) {
      errEl.textContent = '⚠ Введіть хоча б одну зміну параметра.';
      errEl.style.display = 'block';
      hasError = true;
    } else {
      errEl.style.display = 'none';
    }

    if (hasError) return;

    // Розрахунок нових параметрів
    simParams = {
      revenue:      Math.max(0, realParams.revenue   + revenueChange   * 1000),
      expenses:     Math.max(0, realParams.expenses  + expensesChange  * 1000),
      employees:    Math.max(1, realParams.employees + employeesChange),
      marketShare:  Math.max(0, Math.min(100, realParams.marketShare + marketChange)),
      satisfaction: Math.max(0, Math.min(100, realParams.satisfaction + satChange)),
    };

    // Додаємо в історію для графіка
    const label = 'Симуляція ' + simHistory.length;
    simHistory.push({ label, ...simParams });

    // Обмежуємо історію до 5 записів (while демонстрація)
    while (simHistory.length > 5) {
      simHistory.shift();
    }

    // Оновлюємо DOM
    updateParamBars(simParams);
    renderReport();
    renderChart();

    // Показуємо блок звіту (завдання 2, крок 1–2)
    const reportSection = document.getElementById('reportSection');
    if (reportSection.style.display === 'none' || reportSection.style.display === '') {
      reportSection.style.display = 'block';
      reportSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    showNotification('✅ Симуляцію виконано! Звіт оновлено.');
  });

  // Кнопка скидання
  const resetBtn = document.getElementById('resetSim');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      simParams  = { ...realParams };
      simHistory = [{ label: 'Реальні', ...realParams }];
      updateParamBars(realParams);
      renderReport();
      renderChart();
      form.reset();
      document.getElementById('simError').style.display = 'none';
      showNotification('🔄 Параметри скинуто до реальних значень.');
    });
  }
}

/**
 * Відображає сповіщення вгорі екрана
 * Демонструє: createElement, appendChild, setTimeout
 */
function showNotification(msg) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id            = 'toast';
  toast.textContent   = msg;
  toast.style.cssText = `
    position:fixed; top:80px; left:50%; transform:translateX(-50%);
    background:var(--basalt); color:var(--chalk);
    font-family:var(--mono); font-size:.8rem;
    padding:.7rem 1.4rem; border-radius:4px;
    border-left:3px solid var(--ember);
    box-shadow:0 4px 16px rgba(0,0,0,.3);
    z-index:9999; opacity:0;
    transition:opacity .3s ease;
  `;
  document.body.appendChild(toast);

  // Fade-in
  requestAnimationFrame(() => { toast.style.opacity = '1'; });

  // Fade-out після 3 секунд
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


/* ══════════════════════════════════════════════════════
   ЗАВДАННЯ 3 — Динамічний звіт: таблиця + графік
══════════════════════════════════════════════════════ */

/**
 * Рендеринг таблиці порівняння реальних і змодельованих параметрів
 * Демонструє: createElement, for loop, if/else для різниці (завдання 3, крок 3–4)
 */
function renderReport() {
  const tbody = document.getElementById('reportTbody');
  if (!tbody) return;

  const rows = [
    { label: 'Дохід ($/міс)',          real: realParams.revenue,      sim: simParams.revenue,      format: v => '$' + (v/1000).toFixed(0) + 'K' },
    { label: 'Витрати ($/міс)',         real: realParams.expenses,     sim: simParams.expenses,     format: v => '$' + (v/1000).toFixed(0) + 'K' },
    { label: 'Прибуток ($/міс)',        real: realParams.revenue - realParams.expenses, sim: simParams.revenue - simParams.expenses, format: v => '$' + (v/1000).toFixed(0) + 'K' },
    { label: 'Кількість працівників',  real: realParams.employees,    sim: simParams.employees,    format: v => v + ' осіб' },
    { label: 'Частка ринку (%)',        real: realParams.marketShare,  sim: simParams.marketShare,  format: v => v.toFixed(1) + '%' },
    { label: 'Задоволеність клієнтів',  real: realParams.satisfaction, sim: simParams.satisfaction, format: v => v + '%' },
  ];

  // for loop для рендерингу рядків таблиці (завдання 3, крок 4)
  let html = '';
  for (let i = 0; i < rows.length; i++) {
    const row  = rows[i];
    const diff = row.sim - row.real;

    // if/else для класу різниці
    let diffClass, diffText;
    if (diff > 0) {
      diffClass = 'diff-positive';
      diffText  = '+' + row.format(diff).replace('$', '').trim();
    } else if (diff < 0) {
      diffClass = 'diff-negative';
      diffText  = row.format(diff);
    } else {
      diffClass = 'diff-neutral';
      diffText  = '—';
    }

    html += `
      <tr>
        <td>${row.label}</td>
        <td>${row.format(row.real)}</td>
        <td>${row.format(row.sim)}</td>
        <td class="${diffClass}">${diffText}</td>
      </tr>`;
  }

  tbody.innerHTML = html;
}

/**
 * Рендеринг SVG-графіка порівняння (без зовнішніх бібліотек)
 * Демонструє: динамічне створення SVG, map(), for loop
 */
function renderChart() {
  const container = document.getElementById('chartContainer');
  if (!container) return;

  const W = container.clientWidth || 600;
  const H = 260;
  const padL = 60, padR = 20, padT = 30, padB = 50;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  // Дані для двох серій
  const series = [
    { key: 'revenue',   label: 'Дохід ($K)',      color: '#3A7D6B', scale: 1000  },
    { key: 'expenses',  label: 'Витрати ($K)',     color: '#D4714A', scale: 1000  },
    { key: 'employees', label: 'Працівники (×10)', color: '#C89B3C', scale: 10    },
  ];

  // Знаходимо максимум для масштабування
  let maxVal = 0;
  simHistory.forEach(h => {
    series.forEach(s => {
      const v = h[s.key] / s.scale;
      if (v > maxVal) maxVal = v;
    });
  });
  if (maxVal === 0) maxVal = 1;

  const xStep = simHistory.length > 1 ? chartW / (simHistory.length - 1) : chartW;

  // Будуємо SVG рядок
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="font-family:var(--mono)">`;

  // Фон
  svg += `<rect width="${W}" height="${H}" fill="var(--basalt)" rx="6"/>`;

  // Сітка (for loop)
  const gridLines = 5;
  for (let g = 0; g <= gridLines; g++) {
    const y = padT + (chartH / gridLines) * g;
    const val = Math.round(maxVal - (maxVal / gridLines) * g);
    svg += `<line x1="${padL}" y1="${y}" x2="${padL + chartW}" y2="${y}" stroke="var(--ash)" stroke-dasharray="4 4"/>`;
    svg += `<text x="${padL - 6}" y="${y + 4}" text-anchor="end" fill="var(--slate)" font-size="10">${val}</text>`;
  }

  // Осі
  svg += `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}" stroke="var(--ash)"/>`;
  svg += `<line x1="${padL}" y1="${padT + chartH}" x2="${padL + chartW}" y2="${padT + chartH}" stroke="var(--ash)"/>`;

  // Мітки X (map для перетворення даних)
  simHistory.map((h, i) => {
    const x = padL + (simHistory.length > 1 ? i * xStep : chartW / 2);
    svg += `<text x="${x}" y="${H - 8}" text-anchor="middle" fill="var(--mist)" font-size="9">${h.label}</text>`;
  });

  // Лінії серій
  series.forEach(s => {
    const points = simHistory.map((h, i) => {
      const x = padL + (simHistory.length > 1 ? i * xStep : chartW / 2);
      const y = padT + chartH - (h[s.key] / s.scale / maxVal) * chartH;
      return `${x},${y}`;
    }).join(' ');

    svg += `<polyline points="${points}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;

    // Точки
    simHistory.forEach((h, i) => {
      const x = padL + (simHistory.length > 1 ? i * xStep : chartW / 2);
      const y = padT + chartH - (h[s.key] / s.scale / maxVal) * chartH;
      svg += `<circle cx="${x}" cy="${y}" r="4" fill="${s.color}" stroke="var(--basalt)" stroke-width="2"/>`;
    });
  });

  // Легенда
  series.forEach((s, i) => {
    const lx = padL + i * 150;
    svg += `<rect x="${lx}" y="${H - 18}" width="10" height="10" fill="${s.color}" rx="2"/>`;
    svg += `<text x="${lx + 14}" y="${H - 9}" fill="var(--mist)" font-size="10">${s.label}</text>`;
  });

  svg += '</svg>';
  container.innerHTML = svg;
}


/* ══════════════════════════════════════════════════════
   ЗАВДАННЯ 2 — Перемикання видимості секцій
   (показати/сховати блок симуляції)
══════════════════════════════════════════════════════ */
function initToggleSimPanel() {
  const btn   = document.getElementById('toggleSimBtn');
  const panel = document.getElementById('simPanel');
  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    // if/else для перевірки стану видимості (завдання 2, крок 2)
    if (panel.style.display === 'none' || panel.style.display === '') {
      panel.style.display = 'block';
      btn.textContent = '▲ Сховати форму симуляції';
    } else {
      panel.style.display = 'none';
      btn.textContent = '▼ Відкрити форму симуляції';
    }
  });
}


/* ══════════════════════════════════════════════════════
   ІНІЦІАЛІЗАЦІЯ — запускається після завантаження DOM
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Завдання 1: рендер через map()
  renderCompetitors();
  renderInvestors();

  // Завдання 2: обробка подій
  initNavHighlight();
  initBurger();
  initToggleSimPanel();

  // Завдання 3: форма та звіт
  initSimForm();

  // Ініціалізуємо смуги і таблицю з реальними значеннями
  updateParamBars(realParams);
  renderReport();
  renderChart();

  // Демонстрація querySelectorAll + for loop:
  // змінюємо колір кожного другого рядка таблиці (завдання 1, крок 2–3)
  const tableRows = document.querySelectorAll('#reportTable tbody tr');
  for (let i = 0; i < tableRows.length; i++) {
    if (i % 2 === 0) {
      tableRows[i].style.background = 'rgba(255,255,255,0.03)';
    }
  }
});