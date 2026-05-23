/* ==========================================================================
   atlas-toc.js — Авто-генератор Table of Contents для Atlas Framework
   
   ПОДКЛЮЧЕНИЕ в iframe поста:
     <div class="content-block">
       <div id="atlas-toc"></div>   ← сюда вставится TOC
       ... контент ...
     </div>
   
   РАБОТА:
     1. Находит все h2/h3/h4 внутри .content-block (кроме тех что в самом TOC)
     2. Назначает каждому уникальный id на основе текста
     3. Строит разметку .atlas-toc и вставляет в #atlas-toc
   
   КАСТОМИЗАЦИЯ:
     atlasTOC({ 
       target:  '#atlas-toc',          // куда вставить (default: '#atlas-toc')
       scope:   '.content-block',      // где искать заголовки
       levels:  ['h2', 'h3', 'h4'],   // какие уровни включать
       label:   '[ TABLE_OF_CONTENTS // NAVIGATION ]'  // текст шапки
     });
   ========================================================================== */

(function() {
  'use strict';

  function atlasTOC(opts) {
    opts = opts || {};
    var targetSel = opts.target  || '#atlas-toc';
    var scopeSel  = opts.scope   || '.content-block';
    var levels    = opts.levels  || ['h2', 'h3', 'h4'];
    
    var target = document.querySelector(targetSel);
    if (!target) return;

    /* Собираем все заголовки нужных уровней внутри scope,
       исключая те что внутри самого TOC-контейнера          */
    var selector = levels.map(function(l) {
      return scopeSel + ' ' + l + ':not(' + targetSel + ' ' + l + ')';
    }).join(', ');

    var headings = Array.from(document.querySelectorAll(selector));
    if (!headings.length) return;

    /* Утилита: текст → slug для id */
    function toSlug(text) {
      return text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .substring(0, 60);
    }

    /* Счётчик для уникальности id */
    var slugCount = {};

    /* Назначаем id каждому заголовку */
    headings.forEach(function(h) {
      var base = 'atlas-' + h.tagName.toLowerCase() + '-' + toSlug(h.textContent);
      var slug = base;
      if (slugCount[base] !== undefined) {
        slugCount[base]++;
        slug = base + '-' + slugCount[base];
      } else {
        slugCount[base] = 0;
      }
      if (!h.id) h.id = slug;
    });

    /* Номера для H2 — автоинкремент */
    var h2count = 0;

    /* Строим HTML */
    var items = headings.map(function(h) {
      var level = h.tagName.toLowerCase(); // h2 / h3 / h4
      var text  = h.textContent.trim();
      var href  = '#' + h.id;

      var num;
      if (level === 'h2') {
        h2count++;
        num = (h2count < 10 ? '0' : '') + h2count;
      } else if (level === 'h3') {
        num = '—';
      } else {
        num = '·';
      }

      return [
        '<li class="atlas-toc__item atlas-toc__item--' + level + '">',
          '<a href="' + href + '" target="_self">',
            '<span class="atlas-toc__num">' + num + '</span>',
            '<span class="atlas-toc__row">',
              '<span class="atlas-toc__title">' + text + '</span>',
              '<span class="atlas-toc__dots"></span>',
            '</span>',
          '</a>',
        '</li>'
      ].join('');
    }).join('');

    target.innerHTML =
      '<div class="atlas-toc">' +
        '<ul class="atlas-toc__list">' + items + '</ul>' +
      '</div>';

    /* Плавный скролл к якорю */
    target.querySelectorAll('.atlas-toc__item a').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var href = a.getAttribute('href');
        if (!href || href[0] !== '#') return;
        var dest = document.getElementById(href.slice(1));
        if (!dest) return;
        e.preventDefault();
        dest.scrollIntoView({ behavior: 'smooth', block: 'start' });
        /* Небольшой офсет чтобы заголовок не прятался за шапку */
        setTimeout(function() { window.scrollBy(0, -8); }, 350);
      });
    });
  }

  /* Авто-запуск после DOMContentLoaded */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { atlasTOC(); });
  } else {
    atlasTOC();
  }

  /* Экспорт для ручного вызова с параметрами */
  window.atlasTOC = atlasTOC;

}());