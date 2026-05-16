# SYSTEM ATLAS FRAMEWORK — Руководство пользователя

## ВАЖНО: Модульная архитектура CSS (2026)

Atlas Framework теперь использует модульную структуру стилей:

- **atlas-core.css** — глобальные переменные, шрифты, reset. Не изменяется LLM, подключается всегда.
- **atlas-typography.css** — только типографика для `.content-block`. Можно редактировать LLM, не влияет на глобальные токены.
- **atlas-framework.css** — точка входа, подключается через CDN и импортирует оба модуля абсолютными ссылками.

**Пример содержимого `atlas-framework.css`:**
```css
@import url('https://cdn.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-core.css');
@import url('https://cdn.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-typography.css');
```

**Как подключать CSS в шаблоне:**

В `<head>` поста подключай только `atlas-framework.css` через CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-framework.css?v=1.0.2">
```
> Меняй параметр `?v=...` при каждом обновлении CSS, чтобы сбросить кэш jsDelivr.

**Структура контента:**

Весь контент поста должен быть внутри:

```html
<main id="atlas-body" class="content-block">
  <h2>Заголовок секции</h2>
  <p>Текст...</p>
  <!-- ... -->
</main>
```
> Только так гарантируется применение всех правил из `atlas-typography.css`.

**FAQ: Почему не применяются стили?**

- Проверь, что используешь актуальную ссылку на `atlas-framework.css` с новым параметром версии.
- Убедись, что контент находится внутри блока с классом `.content-block`.
- Не добавляй инлайновые стили к заголовкам, спискам и параграфам.

**Про purge CDN:**

Для мгновенного обновления стилей после коммита в GitHub:
- Измени версию в ссылке на CSS (`?v=...`)
- Или вручную вызови purge:
  ```
  https://purge.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-framework.css
  https://purge.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-core.css
  https://purge.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-typography.css
  ```
сделать purge CDN после каждого изменения стилей, чтобы обновить кэш:
Invoke-RestMethod "https://purge.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-framework.css"
Invoke-RestMethod "https://purge.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-typography.css"
Invoke-RestMethod "https://purge.jsdelivr.net/gh/pavelzosim/atlas-framework@master/cdn/atlas-core.css"
```
╔══════════════════════════════════════════════════════════════════╗
║  SYSTEM_ATLAS // R&D_LOG                    [STABLE] [—] [□] [✕] ║
╠══════════════════════════════════════════════╦═══════════════════╣
║  PROJECT   atlas_framework                  ║  VERSION  3.0.0   ║
║  MODULE    user_guide                       ║  LOG_ID   #001    ║
╠══════════════════════════════════════════════╩═══════════════════╣
║  AUTH: P_ZOSIM  LOC: KIV_MD  CREATED: 2025.07.09  READ: ~10 MIN ║
╠══════════════════════════════════════════════════════════════════╣
║  [Wix]  [Custom Code]  [HTML Embed]  [Engineering Docs]          ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Структура репозитория

Каждая папка = одно место в Wix. Открываешь папку — видишь ровно то, что туда нужно скопировать.

```
wix-custom-code/
  head/
    atlas-head-custom-code.html      → Wix Custom Code → Head
  body-end/
    atlas-body-end-part1.html        → Wix Custom Code → Body-end  (добавить 1-м)
    atlas-body-end-part2.html        → Wix Custom Code → Body-end  (добавить 2-м)

wix-backend/
  http-functions.js                  → Wix Editor → Dev Mode → Backend → http-functions.js

wix-embeds/
  atlas-site-header.html             → HTML iframe (паспорт/хедер)
  atlas-site-footer.html             → HTML iframe (футер)
  atlas-post-embed-template.html     → HTML iframe (шаблон поста, ОРИГИНАЛ — не трогать)

cdn/
  atlas-framework.css                → GitHub → jsDelivr CDN (авто)
  atlas-site-footer-config.json      → GitHub → jsDelivr CDN (авто)

ATLAS-FRAMEWORK-GUIDE.md            → этот файл
```

> **Важно:** Wix HTML iframe изолирован от Body-End скриптов — `window.AtlasFramework` внутри iframe недоступен. Пост-шаблон всегда использует встроенный `buildFallbackFramework()`.

---

## Часть 1 — Первоначальная настройка Wix (делается один раз)

### Шаг 1 — Вставить JS Part 1 в Body-end

1. Открой **Wix Dashboard → Settings → Custom Code**
2. Нажми **+ Add Custom Code**
3. Вставь содержимое `atlas-body-end-part1.html`
4. Настройки:
   - **Name:** `Atlas Framework — Part 1`
   - **Add Code to:** `Body - end`
   - **Load code on each new page:** ✅ All Pages
5. Нажми **Apply**

### Шаг 2 — Вставить JS Part 2 в Body-end

1. Снова нажми **+ Add Custom Code**
2. Вставь содержимое `atlas-body-end-part2.html`
3. Настройки:
   - **Name:** `Atlas Framework — Part 2`
   - **Add Code to:** `Body - end`
   - **Load code on each new page:** ✅ All Pages
4. Нажми **Apply**

> Part 2 содержит retry-логику и дожидается инициализации Part 1 автоматически.

---

## Часть 2 — Создание нового поста

### Шаг 1 — Скопировать шаблон

```
atlas-post-embed-template.html   ← оригинал, не трогать
gpu-memory-hierarchy.html        ← копия для конкретного поста
sun-surface-ue5.html             ← копия для другого поста
```

### Шаг 2 — Заполнить POST_CONFIG

```javascript
var POST_CONFIG = {
  // ── ПАСПОРТ ПОСТА ──────────────────────────────────────────
  prefix:    'SYSTEM_ATLAS // R&D_LOG',  // статичный префикс
  project:   'SUN_SURFACE_UE5',          // название проекта (без пробелов)
  module:    'compute_shaders',          // подсистема / модуль
  version:   '0.8.4-ALPHA',             // версия документа
  logId:     '#042',                     // порядковый номер лога

  // Статус → цвет бейджа:
  // DRAFT | IN_PROGRESS | EXPERIMENTAL | STABLE | COMPLETED | DEPRECATED
  status:    'EXPERIMENTAL',

  // ── МЕТА-ДАННЫЕ ────────────────────────────────────────────
  author:    'P_ZOSIM',
  created:   '2025.07.09',
  modified:  '2025.07.11',   // null — не показывать
  wordCount: 1600,            // readTime вычисляется автоматически (~200 слов/мин)

  // ── ТЕГИ ───────────────────────────────────────────────────
  tags: ['ComputeShaders', 'HLSL', 'UE5', 'GPU'],

  // ── ФУТЕР ──────────────────────────────────────────────────
  footerLabel:  'End of Technical Report',
  footerAuthor: 'Pavel Zosim',
  footerYear:   '2025',

  // ── ТЕРМИНАЛ — **жирный**, !!красный!!, ~~зелёный~~ ────────
  terminalLines: [
    '**[GPU_NSIGHT_REPORT]**',
    '> Initiating Warp Occupancy analysis...',
    '> Spill to Local Memory: !!TRUE (4.2MB)!!',
    '> Status: ~~OK~~'
  ]
};
```

### Шаг 3 — Написать контент внутри `<div id="atlas-body">`

### Шаг 4 — Вставить в Wix Blog

1. Открой пост → добавь **HTML iframe** (`+` → Embed → HTML)
2. Вставь весь HTML файла
3. Сохрани и опубликуй

---

## Часть 3 — Компоненты (Справочник)

### Arch Flow — поток архитектуры

```html
<div class="atlas-arch-flow">
  <div class="atlas-node"><b>System RAM</b><span>~50 GB/s</span></div>
  <div class="atlas-flow-arrow">→</div>
  <div class="atlas-node atlas-node--critical"><b>PCIe x16</b><span>16 GB/s</span></div>
  <div class="atlas-flow-arrow">→</div>
  <div class="atlas-node"><b>VRAM</b><span>900 GB/s</span></div>
</div>
```

---

### Metric Bars — полосы метрик

```html
<div class="atlas-metric-group">
  <div class="atlas-bar-label"><span>VRAM</span><span>900 GB/s</span></div>
  <div class="atlas-bar-track">
    <div class="atlas-bar-fill" style="width: 15%;"></div>
  </div>
  <div class="atlas-bar-label"><span>Registers</span><span>20,000+ GB/s</span></div>
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

Инлайн-формула в тексте: `\( f_r \)` прямо в `<p>`.

---

### Code Cards — сравнение кода

```html
<div class="atlas-code-grid">
  <div class="atlas-code-card atlas-code-card--alert">
    <div class="atlas-card-label">Неэффективно</div>
    <div class="atlas-code-container">
<pre><span class="atlas-hl-com">// branch divergence</span>
<span class="atlas-hl-key">if</span> (x > 0) { ... }</pre>
    </div>
  </div>
  <div class="atlas-code-card atlas-code-card--standard">
    <div class="atlas-card-label">Предпочтительно</div>
    <div class="atlas-code-container">
<pre><span class="atlas-hl-type">float</span> t = <span class="atlas-hl-func">step</span>(<span class="atlas-hl-num">0.0</span>, x);</pre>
    </div>
  </div>
</div>
```

Классы карточки: `atlas-code-card--alert` (красная полоса), `atlas-code-card--standard` (чёрная).

---

### Syntax Highlight Tokens

Используются внутри `<pre>` через `<span class="atlas-hl-*">`:

| Класс | Назначение | Пример |
|---|---|---|
| `atlas-hl-com` | Комментарии | `// # /* */` |
| `atlas-hl-key` | Ключевые слова | `if for return void` |
| `atlas-hl-type` | Типы / хранилище | `float int bool uint3 List<T>` |
| `atlas-hl-str` | Строковые литералы | `"text" 'c'` |
| `atlas-hl-num` | Числа | `0.5 42 0xFF` |
| `atlas-hl-func` | Вызовы функций | `lerp() Dispatch()` |
| `atlas-hl-macro` | Препроцессор | `#define #pragma kernel` |
| `atlas-hl-attr` | Атрибуты / декораторы | `[numthreads] [SerializeField]` |
| `atlas-hl-ns` | Namespace / класс | `System.Math MyClass` |
| `atlas-hl-op` | Операторы | `-> :: => +=` |

---

### Terminal — системный лог

Через `POST_CONFIG.terminalLines` (разметка: `**жирный**`, `!!красный!!`, `~~зелёный~~`).

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
  <thead><tr><th>Parameter</th><th>Value</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>Instruction Latency</td><td>4 cycles</td><td>Nominal</td></tr>
    <tr><td>Memory Stall</td><td>~200 cycles</td><td>Critical</td></tr>
  </tbody>
</table>
```

---

### atlas-param — инлайн-параметр

```html
<p>Тест на <span class="atlas-param">NVIDIA_RTX_3080</span> при
нагрузке <span class="atlas-param">OCCUPANCY_12.5%</span>.</p>
```

---

### Callout — критические замечания

```html
<!-- Варианты: atlas-callout--critical | --warning | --note -->
<div class="atlas-callout atlas-callout--critical">
  <div class="atlas-callout__label">CRITICAL</div>
  <div class="atlas-callout__body">
    Shared memory bank conflicts деградируют throughput до <strong>32×</strong>.
  </div>
</div>
```

---

### UML Diagram — диаграмма зависимостей

```html
<div class="atlas-uml atlas-uml--row">
  <div class="atlas-uml-node atlas-uml-node--interface">
    <div class="atlas-uml-node__stereo">«interface»</div>
    <div class="atlas-uml-node__name">IStorage</div>
    <div class="atlas-uml-node__member">+ read(key)</div>
  </div>
  <div class="atlas-uml-arrow atlas-uml-arrow--right">──────▶</div>
  <div class="atlas-uml-node">
    <div class="atlas-uml-node__name">FileCache</div>
    <div class="atlas-uml-node__member">+ read(key)</div>
    <div class="atlas-uml-node__member">+ write(key, val)</div>
  </div>
  <div class="atlas-uml-arrow atlas-uml-arrow--dashed">- - -▶</div>
  <div class="atlas-uml-node atlas-uml-node--critical">
    <div class="atlas-uml-node__name">SharedMemPool</div>
  </div>
</div>
```

Лейауты: `atlas-uml--row` (горизонтально), `atlas-uml--col` (вертикально).  
Модификаторы ноды: `--interface` (пунктирная рамка), `--critical` (красная).  
Стрелки: `--right` (→ сплошная), `--dashed` (- - -▶ зависимость).

---

### Timeline — последовательность шагов

```html
<div class="atlas-timeline">
  <div class="atlas-timeline__item">
    <div class="atlas-timeline__marker">01</div>
    <div class="atlas-timeline__content">
      <div class="atlas-timeline__title">Cull &amp; Gather</div>
      <div class="atlas-timeline__detail">Frustum + occlusion culling.</div>
    </div>
  </div>
  <!-- ...повторить для каждого шага... -->
</div>
```

---

### Comparison — сравнение подходов

```html
<div class="atlas-comparison">
  <div class="atlas-comparison__col atlas-comparison__col--before">
    <div class="atlas-comparison__label">❌ Before</div>
    <div class="atlas-comparison__body">Старый подход...</div>
  </div>
  <div class="atlas-comparison__col atlas-comparison__col--after">
    <div class="atlas-comparison__label">✓ After</div>
    <div class="atlas-comparison__body">Новый подход...</div>
  </div>
</div>
```

---

### Schema / Layers — архитектурные слои

```html
<div class="atlas-schema">
  <div class="atlas-schema__title">System Stack</div>

  <div class="atlas-schema__layer atlas-schema__layer--top">
    <span class="atlas-schema__layer-label">Frontend</span>
    <span class="atlas-schema__layer-sub">React / Wix</span>
  </div>
  <div class="atlas-schema__arrow">▼</div>

  <div class="atlas-schema__layer atlas-schema__layer--ok">
    <span class="atlas-schema__layer-label">API</span>
    <span class="atlas-schema__layer-sub">REST / GraphQL</span>
  </div>
  <div class="atlas-schema__arrow">▼</div>

  <div class="atlas-schema__layer atlas-schema__layer--crit">
    <span class="atlas-schema__layer-label">Database</span>
    <span class="atlas-schema__layer-sub">PostgreSQL</span>
  </div>
</div>
```

Акценты слоя: `--top` (чёрный), `--ok` (зелёный), `--warn` (янтарный), `--crit` (красный), `--bottom` (серый).

---

### Footnotes — сноски

Инлайн-ссылка в тексте:
```html
<p>Текст<sup class="atlas-fn-ref" id="fnref-1">[1]</sup> с референсом.</p>
```

Блок сносок (в конце секции):
```html
<div class="atlas-footnotes">
  <div class="atlas-footnotes__title">Notes</div>
  <ol class="atlas-footnotes__list">
    <li id="fn-1">Текст первой сноски.</li>
    <li id="fn-2">Текст второй сноски.</li>
  </ol>
</div>
```

---

## Часть 4 — Статусы

| Статус | Значение | Цвет бейджа |
|---|---|---|
| `DRAFT` | Черновик | Серый |
| `IN_PROGRESS` | В работе | Чёрный |
| `EXPERIMENTAL` | R&D, нестабильно | Янтарный |
| `STABLE` | Проверено | Зелёный |
| `COMPLETED` | Финальный отчёт | Зелёный |
| `DEPRECATED` | Устарело | Тёмно-красный |

---

## Часть 5 — Быстрый старт нового поста (чеклист)

```
□  1. Скопировать atlas-post-embed-template.html → my-post-name.html
□  2. Заполнить POST_CONFIG (project, version, status, author, tags...)
□  3. Написать контент в <div id="atlas-body">
□  4. Открыть локально в браузере — проверить внешний вид
□  5. Скопировать весь HTML → вставить в Wix HTML iframe
□  6. Проверить в режиме превью Wix
□  7. Опубликовать
```

---

## Часть 6 — Частые вопросы

**Q: Паспорт не отображается, div пустой.**  
A: Проверь в консоли браузера, что нет JS-ошибок. Паспорт рендерится через `buildFallbackFramework()` — он встроен в сам файл поста и не зависит от Wix Custom Code.

**Q: Body-End скрипты не влияют на iframe?**  
A: Верно. Wix iframe полностью изолирован. `window.AtlasFramework` из Body-End недоступен внутри embed. Весь рендеринг поста идёт через инлайн-fallback.

**Q: Хочу другой префикс в title-bar.**  
A: Измени `prefix` в POST_CONFIG:
```javascript
prefix: 'PROJECT_SOLARIS // SHADER_LAB',
```

**Q: Не хочу показывать дату изменения.**  
A: `modified: null`

**Q: Хочу задать readTime вручную.**  
A: Убери `wordCount`, добавь `readTime: '~12 MIN'`.

**Q: Новые стили 07–12 не применяются.**  
A: CDN кэш. Запусти purge и обнови страницу:
```
https://purge.jsdelivr.net/gh/pavelzosim/atlas-framework@master/atlas-framework.css
```

---

## Часть 7 — Структура файлов

См. раздел **Структура репозитория** в начале документа.

---

```
// END OF DOCUMENT
// AUTH: P_ZOSIM // LOC: KIV_MD // 2025
// SYSTEM_ATLAS FRAMEWORK v3.0 — Full Component Edition
```


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
| `atlas-body-end-part1.html` | JS-фреймворк часть 1 | **Body - end** Custom Code |
| `atlas-body-end-part2.html` | JS-фреймворк часть 2 (retry, autoMount) | **Body - end** Custom Code |
| `wix-http-functions.js` | Backend endpoint для метаданных поста | **Backend/http-functions.js** в Wix |
| `atlas-site-header.html` | Standalone passport embed | **HTML iframe** |
| `atlas-site-footer.html` | Standalone footer embed | **HTML iframe** |
| `atlas-post-embed-template.html` | Шаблон каждого поста | **HTML iframe** внутри поста |

---

## Часть 1 — Первоначальная настройка Wix (делается один раз)

### Шаг 1 — CSS в Head

Файл: **`wix-custom-code/head/atlas-head-custom-code.html`**

1. Wix Dashboard → **Settings → Custom Code → + Add Custom Code**
2. Вставь содержимое файла
3. Name: `Atlas Framework — Styles` · Place: `Head` · Pages: All Pages
4. **Apply**

### Шаг 2 — JS Part 1 в Body-end

Файл: **`wix-custom-code/body-end/atlas-body-end-part1.html`**

1. **+ Add Custom Code**
2. Вставь содержимое файла
3. Name: `Atlas Framework — Part 1` · Place: `Body - end` · Pages: All Pages
4. **Apply**

### Шаг 3 — JS Part 2 в Body-end

Файл: **`wix-custom-code/body-end/atlas-body-end-part2.html`**

1. **+ Add Custom Code**
2. Вставь содержимое файла
3. Name: `Atlas Framework — Part 2` · Place: `Body - end` · Pages: All Pages
4. **Apply**

> Part 2 ждёт инициализации Part 1 автоматически. После этих шагов `window.AtlasFramework` доступен на всех страницах.

### Шаг 4 — Backend endpoint (1 раз на сайт)

Файл: **`wix-backend/http-functions.js`**

1. Wix Editor → включи **Dev Mode**
2. В панели слева откройся раздел **Backend**
3. Создай файл с точным именем: **`http-functions.js`**
4. Вставь содержимое файла из `wix-backend/http-functions.js`
5. **Publish**

После публикации endpoint доступен:
```
https://www.pavelzosim.com/_functions/getPostData?slug=my-post-slug
```

---

## Часть 2 — Создание нового поста

### Шаг 1 — Скопировать шаблон

Оригинал: **`wix-embeds/atlas-post-embed-template.html`** — не трогать.
Скопируй его в папку `wix-embeds/posts/` и переименуй по теме поста:

```
wix-embeds/
  atlas-post-embed-template.html   ← оригинал, не трогать
  posts/
    gpu-memory-hierarchy.html      ← пост #001
    sun-surface-ue5.html           ← пост #002
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
A: Проверь, что в Wix подключены `atlas-body-end-part1.html` и `atlas-body-end-part2.html` в Body-end. В автономном iframe паспорт отображается через встроенный fallback.

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

## Часть 6 — Автоматическая подстановка метаданных

iframe сам делает `fetch` запрос к Wix Backend HTTP Function по `slug` из `POST_CONFIG`.  
Никаких element ID, `postMessage`, или Velo page code не нужно.

### Схема работы

```
iframe загрузился
  → читает slug из POST_CONFIG
  → fetch https://pavelzosim.com/_functions/getPostData?slug=...
  → получает JSON: author, created, modified, tags
  → перерисовывает паспорт
```

> Backend уже настроен на шаге 4 установки (файл `wix-backend/http-functions.js`).

### Что заполняется автоматически

| Поле | Источник |
|---|---|
| `author` | хардкод `'Pavel Zosim'` в `wix-http-functions.js` |
| `created` | `publishedDate` из `Blog/Posts` → `YYYY.MM.DD` |
| `modified` | `lastPublishedDate` (скрыто если = created) |
| `tags` | ID тегов → названия через `Blog/Tags` |

### Что заполняется вручную (1 раз на пост)

`prefix`, `project`, `module`, `version`, `logId`, `status`, `slug`, `terminalLines`

---



```
wix-custom-code/
  head/
    atlas-head-custom-code.html        → Wix Custom Code → Head
  body-end/
    atlas-body-end-part1.html          → Wix Custom Code → Body-end (1-й)
    atlas-body-end-part2.html          → Wix Custom Code → Body-end (2-й)

wix-backend/
  http-functions.js                    → Wix Dev Mode → Backend → http-functions.js

wix-embeds/
  atlas-site-header.html               → HTML iframe (хедер/паспорт)
  atlas-site-footer.html               → HTML iframe (футер)
  atlas-post-embed-template.html       → ОРИГИНАЛ ШАБЛОНА (не трогать)
  posts/
    gpu-memory-hierarchy.html          → пост #001
    sun-surface-ue5-shaders.html       → пост #002
    ...

cdn/
  atlas-framework.css                  → jsDelivr CDN (авто через GitHub)
  atlas-site-footer-config.json        → jsDelivr CDN (авто через GitHub)

ATLAS-FRAMEWORK-GUIDE.md              → этот файл
```

---

```
// END OF DOCUMENT
// AUTH: P_ZOSIM // LOC: KIV_MD // 2025
// SYSTEM_ATLAS FRAMEWORK v3.0 — Folder Edition
```
