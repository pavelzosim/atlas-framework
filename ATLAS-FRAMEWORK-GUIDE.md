# SYSTEM ATLAS FRAMEWORK — Руководство пользователя

```
╔══════════════════════════════════════════════════════════════════╗
║  SYSTEM_ATLAS // R&D_LOG                    [STABLE] [—] [□] [✕] ║
╠══════════════════════════════════════════════╦═══════════════════╣
║  PROJECT   atlas_framework                  ║  VERSION  2.1.0   ║
║  MODULE    user_guide                       ║  LOG_ID   #001    ║
╠══════════════════════════════════════════════╩═══════════════════╣
║  AUTH: P_ZOSIM  LOC: KIV_MD  CREATED: 2025.07.09  READ: ~7 MIN  ║
╠══════════════════════════════════════════════════════════════════╣
║  [Wix]  [Custom Code]  [HTML Embed]  [Engineering Docs]          ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Файлы фреймворка

| Файл | Назначение | Куда вставлять в Wix |
|---|---|---|
| `atlas-head-custom-code.html` | CSS-манифест: все переменные, компоненты | **Head** Custom Code |
| `atlas-body-end-custom-code.html` | JS-фреймворк: все `render*()` функции | **Body - end** Custom Code |
| `atlas-post-embed-template.html` | Шаблон каждого поста | **HTML iframe** внутри поста |

---

## Часть 1 — Первоначальная настройка Wix (делается один раз)

### Шаг 1 — Вставить CSS в Head

1. Открой **Wix Dashboard → Settings → Custom Code**
2. Нажми **+ Add Custom Code**
3. Вставь всё содержимое файла `atlas-head-custom-code.html`
4. Настройки:
   - **Name:** `Atlas Framework — Styles`
   - **Add Code to:** `Head`
   - **Load code on each new page:** ✅ All Pages
5. Нажми **Apply**

### Шаг 2 — Вставить JS в Body-end

1. Снова нажми **+ Add Custom Code**
2. Вставь всё содержимое файла `atlas-body-end-custom-code.html`
3. Настройки:
   - **Name:** `Atlas Framework — Scripts`
   - **Add Code to:** `Body - end`
   - **Load code on each new page:** ✅ All Pages
4. Нажми **Apply**

> После этих двух шагов `window.AtlasFramework` доступен на всех страницах сайта.

---

## Часть 2 — Создание нового поста

### Шаг 1 — Скопировать шаблон

Скопируй файл `atlas-post-embed-template.html`, переименуй по теме поста:

```
atlas-post-embed-template.html   ← оригинал, не трогать
gpu-memory-hierarchy.html        ← копия для конкретного поста
sun-surface-ue5.html             ← копия для другого поста
```

### Шаг 2 — Заполнить POST_CONFIG

Открой файл поста, найди блок в самом низу перед `</script>` и заполни только эти поля:

```javascript
var POST_CONFIG = {
  // ── ПАСПОРТ ПОСТА ──────────────────────────────────────────
  prefix:    'SYSTEM_ATLAS // R&D_LOG',  // статичный префикс, обычно не меняешь
  project:   'SUN_SURFACE_UE5',          // название проекта (без пробелов)
  module:    'compute_shaders',          // подсистема / модуль
  version:   '0.8.4-ALPHA',             // версия документа
  logId:     '#042',                     // порядковый номер лога

  // Статус — определяет цвет бейджа автоматически:
  // DRAFT        → серый  (черновик)
  // IN_PROGRESS  → чёрный (в работе)
  // EXPERIMENTAL → янтарь (эксперимент)
  // STABLE       → зелёный (стабильно)
  // COMPLETED    → зелёный (завершено)
  // DEPRECATED   → красный (устарело)
  status:    'EXPERIMENTAL',

  // ── МЕТА-ДАННЫЕ ────────────────────────────────────────────
  author:    'P_ZOSIM',                  // инициалы / ник
  location:  'KIV_MD',                   // локация (город_страна)
  created:   '2025.07.09',              // дата создания
  modified:  '2025.07.11',             // дата обновления (null — не показывать)
  wordCount: 1600,                       // кол-во слов → readTime считается сам
  // readTime: '~8 MIN',               // или задать вручную (перекроет wordCount)

  // ── ТЕГИ ───────────────────────────────────────────────────
  tags: ['ComputeShaders', 'HLSL', 'UE5', 'GPU'],

  // ── ФУТЕР ──────────────────────────────────────────────────
  footerLabel:  'End of Technical Report',
  footerAuthor: 'Pavel Zosim',
  footerYear:   '2025',

  // ── ТЕРМИНАЛЬНЫЙ БЛОК ──────────────────────────────────────
  // Разметка: **жирный**, !!красный!!, ~~зелёный~~
  terminalLines: [
	'**[GPU_NSIGHT_REPORT]**',
	'> Initiating Warp Occupancy analysis...',
	'> Spill to Local Memory: !!TRUE (4.2MB)!!',
	'> Status: ~~OK~~'
  ]
};
```

### Шаг 3 — Написать контент поста

Найди блок `<div id="atlas-body">` в файле и пиши HTML-контент внутри него.
Вся типографика, таблицы, код-блоки — уже стилизованы автоматически.

```html
<div id="atlas-body">

  <h1>Название поста</h1>
  <p>Вводный абзац. Можно использовать <span class="atlas-param">PARAM_NAME</span> для выделения параметров.</p>

  <h2>01 // Раздел</h2>
  <p>Текст раздела...</p>

  <!-- Сюда вставляешь нужные компоненты (см. Часть 3) -->

</div>
```

### Шаг 4 — Вставить в Wix Blog

1. Открой пост в редакторе Wix
2. Добавь элемент **HTML iframe** (обычно через `+` → Embed → HTML)
3. Вставь **весь** HTML-код файла поста в окно редактора
4. Задай высоту iframe достаточной для контента (или используй авто-resize)
5. Сохрани и опубликуй

---

## Часть 3 — Компоненты (Справочник)

### Arch Flow — схема архитектуры

```html
<div class="atlas-arch-flow">
  <div class="atlas-node"><b>System RAM</b><span>~50 GB/s</span></div>
  <div class="atlas-flow-arrow">→</div>
  <div class="atlas-node atlas-node--critical"><b>PCIe x16</b><span>16 GB/s — узкое место</span></div>
  <div class="atlas-flow-arrow">→</div>
  <div class="atlas-node"><b>VRAM</b><span>900 GB/s</span></div>
</div>
```

> `atlas-node--critical` — выделяет узел красной рамкой.

---

### Metric Bars — полосы метрик

```html
<div class="atlas-metric-group">

  <!-- Обычная полоса -->
  <div class="atlas-bar-label">
	<span>VRAM Bandwidth</span><span>900 GB/s</span>
  </div>
  <div class="atlas-bar-track">
	<div class="atlas-bar-fill" style="width: 15%;"></div>
  </div>

  <!-- Штрихованная полоса (для экстремальных значений) -->
  <div class="atlas-bar-label">
	<span>Register Speed</span><span>20,000+ GB/s</span>
  </div>
  <div class="atlas-bar-track">
	<div class="atlas-bar-fill atlas-bar-fill--hatched" style="width: 100%;"></div>
  </div>

</div>
```

---

### Math Block — формулы (MathJax)

```html
<div class="atlas-math-block">
  \[ E = mc^2 \]
  <div class="atlas-formula-caption">Equation 1.1: Mass-energy equivalence</div>
</div>
```

> Инлайн-формула в тексте: `\( f_r \)` прямо в `<p>`.

---

### Code Cards — сравнение кода

```html
<div class="atlas-code-grid">

  <div class="atlas-code-card atlas-code-card--alert">
	<div class="atlas-card-label">Неэффективно</div>
	<div class="atlas-code-container">
<pre><span class="atlas-hl-com">// Комментарий</span>
<span class="atlas-hl-key">if</span> (x > 0) { ... }</pre>
	</div>
  </div>

  <div class="atlas-code-card atlas-code-card--standard">
	<div class="atlas-card-label">Предпочтительно</div>
	<div class="atlas-code-container">
<pre><span class="atlas-hl-key">float</span> t = step(0.0, x);</pre>
	</div>
  </div>

</div>
```

> Классы: `atlas-code-card--alert` (красная полоса), `atlas-code-card--standard` (чёрная).

---

### Terminal — системный лог

Добавляется через JS в `POST_CONFIG.terminalLines`:

```javascript
terminalLines: [
  '**[SYSTEM_LOG]**',           // **текст** → жирный белый
  '> Normal output line',
  '> Error: !!CRITICAL FAULT!!', // !!текст!! → красный
  '> Status: ~~ALL SYSTEMS OK~~' // ~~текст~~ → зелёный
]
```

Или прямо в HTML:

```html
<div class="atlas-terminal">
<b>[SYSTEM_LOG]</b>
> Normal line
> Error: <span class="red">CRITICAL FAULT</span>
> Status: <span class="ok">ALL SYSTEMS OK</span>
</div>
```

---

### Table — таблица данных

```html
<table>
  <thead>
	<tr>
	  <th>Parameter</th>
	  <th>Value</th>
	  <th>Status</th>
	</tr>
  </thead>
  <tbody>
	<tr>
	  <td>Instruction Latency</td>
	  <td>4 cycles</td>
	  <td>Nominal</td>
	</tr>
  </tbody>
</table>
```

---

### atlas-param — инлайн-параметр

```html
<p>Тест проводился на <span class="atlas-param">NVIDIA_RTX_3080</span> при
нагрузке <span class="atlas-param">OCCUPANCY_12.5%</span>.</p>
```

> Результат: красный моноширинный текст в рамке — как константа в коде.

---

## Часть 4 — Статусы и когда их использовать

| Статус | Значение | Цвет бейджа |
|---|---|---|
| `DRAFT` | Черновик, не для публикации | Серый |
| `IN_PROGRESS` | Активная разработка, регулярно меняется | Чёрный жирный |
| `EXPERIMENTAL` | R&D, результаты нестабильны | Янтарный |
| `STABLE` | Проверено, можно использовать как референс | Зелёный |
| `COMPLETED` | Финальный отчёт, изменений не будет | Зелёный |
| `DEPRECATED` | Устарело, не применять | Тёмно-красный |

---

## Часть 5 — Быстрый старт нового поста (чеклист)

```
□  1. Скопировать atlas-post-embed-template.html → my-post-name.html
□  2. Заполнить POST_CONFIG (project, version, status, author, tags...)
□  3. Написать контент в <div id="atlas-body">
□  4. Открыть файл локально в браузере — проверить внешний вид
□  5. Скопировать весь HTML → вставить в Wix HTML iframe
□  6. Проверить в режиме превью Wix
□  7. Опубликовать
```

---

## Часть 6 — Частые вопросы

**Q: Паспорт не отображается, div пустой.**
A: Проверь, что в Wix подключён `atlas-body-end-custom-code.html` в Body-end. В автономном iframe он должен отображаться всегда через fallback.

**Q: Хочу другой префикс в title-bar (не `SYSTEM_ATLAS // R&D_LOG`).**
A: Измени поле `prefix` в POST_CONFIG:
```javascript
prefix: 'PROJECT_SOLARIS // SHADER_LAB',
```

**Q: Не хочу показывать дату изменения.**
A: Установи `modified: null` в POST_CONFIG.

**Q: Хочу задать readTime вручную.**
A: Убери `wordCount` и добавь:
```javascript
readTime: '~12 MIN',
```

**Q: Хочу добавить новый раздел между кодом и терминалом.**
A: Просто пиши HTML прямо в `<div id="atlas-body">` — все `h2`, `p`, `table` стилизуются автоматически.

**Q: Можно ли использовать без Wix — просто как standalone HTML?**
A: Да. Файл `atlas-post-embed-template.html` полностью автономен. Встроенные fallback-стили активируются если глобальный CSS от Wix не найден.

---

## Часть 7 — Структура файлов (финальное дерево)

```
atlas-head-custom-code.html          ← вставить в Wix Head (1 раз)
atlas-body-end-custom-code.html      ← вставить в Wix Body-end (1 раз)
atlas-post-embed-template.html       ← ОРИГИНАЛ ШАБЛОНА (не трогать)
ATLAS-FRAMEWORK-GUIDE.md            ← этот файл

posts/
  gpu-memory-hierarchy.html          ← пост #001
  sun-surface-ue5-shaders.html       ← пост #002
  warp-occupancy-analysis.html       ← пост #003
  ...
```

---

```
// END OF DOCUMENT
// AUTH: P_ZOSIM // LOC: KIV_MD // 2025
// SYSTEM_ATLAS FRAMEWORK v2.1 — Engineering Passport Edition
```
