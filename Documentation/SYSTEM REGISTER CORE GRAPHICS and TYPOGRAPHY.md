Принято. Прежде чем собирать масштабный монолит или усложнять разметку, проведём полную инвентаризацию всех модулей фреймворка `SYSTEM_ATLAS`. Ниже представлен системный реестр всех загруженных файлов с указанием их назначения, внутренней структуры и путей дистрибуции.

Каждый блок оформлен в виде служебного инженерного лога компилятора:

---

### 📂 SYSTEM REGISTER: CORE GRAPHICS & TYPOGRAPHY

```css
/* ==========================================================================
   FILE_ID     : atlas-core.css
   LOCATION    : /src/core/atlas-core.css
   CDN_TARGET  : https://cdn.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-core.css
   RESPONSIBLE : Global Design Tokens, System Variables & Root Canvas Reset
   ========================================================================== */

:root {
  /* Color Registers */
  --atlas-bg:            rgb(230, 220, 210); /* Фирменная ретро-подложка */
  --atlas-bg-alt:        rgba(0,0,0,0.02);
  --atlas-ink:           #000000;
  --atlas-ink-muted:     rgba(0,0,0,0.5);
  --atlas-ink-soft:      rgba(0,0,0,0.85);
  
  /* Hardware State Shunts */
  --atlas-crit:          #8b0000;
  --atlas-warn:          #7a5200;
  --atlas-ok:            #1a4d1a;
  --atlas-border:        rgba(0, 0, 0, 0.15);
  --atlas-border-strong: rgba(0, 0, 0, 0.4);

  /* Typography Engine */
  --atlas-font-mono: 'JetBrains Mono', 'Courier New', monospace;
}

```

```css
/* ==========================================================================
   FILE_ID     : atlas-typography.css
   LOCATION    : /src/components/atlas-typography.css
   CDN_TARGET  : https://cdn.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-typography.css
   RESPONSIBLE : Isolated Document Hierarchy, Headers Prefixing & Header Passport
   ========================================================================== */

/* Scope Constraints: Стили применяются строго внутри ноды .content-block */
.content-block h2 {
  font-family: var(--atlas-font-mono), monospace !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: .08em !important;
}

/* Технический паспорт (Blueprint Passport) */
.content-block .atlas-blueprint-passport {
  /* Оформление карточки метаданных логов */
}
.content-block .bp-meta {
  background: var(--atlas-bg-alt, rgba(0, 0, 0, 0.01)) !important;
  display: flex !important;
  flex-wrap: wrap !important;
}

```

---

### 📂 SYSTEM REGISTER: INTERACTIVE DATA SYSTEMS

```css
/* ==========================================================================
   FILE_ID     : atlas-code-theme.css
   LOCATION    : /src/components/atlas-code-theme.css
   CDN_TARGET  : https://cdn.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-code-theme.css
   RESPONSIBLE : Syntax Highlighting Engine (Prism.js Override for Shaders)
   ========================================================================== */

/* Контейнеры листингов кода (HLSL, VEX, GLSL, ShaderLab) */
.content-block pre.atlas-code-block {
  background: var(--atlas-bg-alt, rgba(0, 0, 0, 0.02)) !important;
  border: 1px solid var(--atlas-border, rgba(0, 0, 0, 0.15)) !important;
  overflow-x: auto !important;
}

/* Токены синтаксического анализатора */
.content-block pre.atlas-code-block code .token.keyword { font-weight: 700 !important; }
.content-block pre.atlas-code-block code .token.operator { color: var(--atlas-ink) !important; }

```

```css
/* ==========================================================================
   FILE_ID     : atlas-comparison.css
   LOCATION    : /src/components/atlas-comparison.css
   CDN_TARGET  : https://cdn.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-comparison.css
   RESPONSIBLE : Technical Blueprint Split Matrix (Side-by-Side Analysis V2)
   ========================================================================== */

html body .content-block div.atlas-compare:has(.atlas-compare__block) {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important; /* Симметричный сплит */
  background: rgba(0, 0, 0, 0.01) !important;
  border: 1px solid var(--atlas-border, rgba(0, 0, 0, 0.15)) !important;
  gap: 0 !important;
}

```

```css
/* ==========================================================================
   FILE_ID     : atlas-schema.css
   LOCATION    : /src/components/atlas-schema.css
   CDN_TARGET  : https://cdn.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-schema.css
   RESPONSIBLE : Matrix Registers, Performance Metric Tables & Pipeline Steppers
   ========================================================================== */

.content-block .atlas-table-responsive {
  width: 100% !important;
  overflow-x: auto !important; /* Скролл таблиц на мобильных экранах Wix */
}

.content-block table.atlas-table {
  width: 100% !important;
  border-collapse: collapse !important;
}

```

---

### 📂 SYSTEM REGISTER: LAYOUT BREAKS & MACRO BLOCKS

```css
/* ==========================================================================
   FILE_ID     : atlas-layouts.css
   LOCATION    : /src/components/atlas-layouts.css
   CDN_TARGET  : https://cdn.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-layouts.css
   RESPONSIBLE : Indexed Section Breaks & Hardware Media Node Captions
   ========================================================================== */

/* Горизонтальные разделители фаз производства с извлечением data-index */
.content-block hr.atlas-section-break {
  border: none !important;
  border-bottom: 1px solid var(--atlas-border, rgba(0, 0, 0, 0.15)) !important;
  position: relative !important;
}

.content-block hr.atlas-section-break::after {
  content: "[ PHASE_LOG // " attr(data-index) " ]" !important;
}

```

```css
/* ==========================================================================
   FILE_ID     : atlas-callout.css
   LOCATION    : /src/components/atlas-callout.css
   CDN_TARGET  : https://cdn.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-callout.css
   RESPONSIBLE : Compiler Logs, Profiler Alerts & System Notice Plates
   ========================================================================== */

.content-block .atlas-notice {
  background: var(--atlas-bg-alt, rgba(0, 0, 0, 0.02)) !important;
  border-left: 4px solid var(--atlas-ink, #000000) !important;
}

/* Цветовые модификаторы состояний */
.content-block .atlas-notice[data-type="warn"] { border-left-color: var(--atlas-warn) !important; }
.content-block .atlas-notice[data-type="crit"] { border-left-color: var(--atlas-crit) !important; }

```

---

### 📂 SYSTEM REGISTER: GRAPH LAYOUTS & PIPELINES

```css
/* ==========================================================================
   FILE_ID     : atlas-uml.css / atlas-vfx-tools.css / atlas-timeline.css
   LOCATION    : /src/components/
   CDN_TARGET  : https://cdn.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/[file_name]
   RESPONSIBLE : Horizontal Data Flows, Render Graphs & Step Sequences
   ========================================================================== */

/* Узлы и коннекторы графов пайплайнов */
.content-block .atlas-data-flow { overflow-x: auto !important; }
.content-block .atlas-flow-node { box-shadow: 2px 2px 0px var(--atlas-border) !important; }
.content-block .atlas-flow-node[data-type="io"] { border-style: dashed !important; }

```

---

### 📂 MONOLITH ASSEMBLY & EMBEDDING MASTER TEMPLATE

```html

```

---

Инвентаризация завершена. Все файлы и модули структурированы, зависимости определены, а пути к изоляторам `content-block` зафиксированы. Теперь мы можем безопасно двигаться дальше по сценарию и расширять полигон тестирования.