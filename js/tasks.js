// ==============================================================
//   Интерактивные задания LearnDot
//   Каждый <div data-task="имя"></div> превращается в виджет
//
//   Вызовите initTasks() после рендера урока
// ==============================================================


// Вызывается после renderLesson() — инициализирует все виджеты на странице
function initTasks() {
  var widgets = document.querySelectorAll('[data-task]');
  for (var i = 0; i < widgets.length; i++) {
    var el = widgets[i];
    var name = el.getAttribute('data-task');
    if (TASKS[name]) {
      TASKS[name].render(el);
    }
  }
}


// ==============================================================
//   Вспомогательные функции для работы с цветом
// ==============================================================

// HEX → { r, g, b }
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  return {
    r: parseInt(hex.slice(0,2), 16),
    g: parseInt(hex.slice(2,4), 16),
    b: parseInt(hex.slice(4,6), 16)
  };
}

// { r, g, b } → HEX
function rgbToHex(r, g, b) {
  return '#' + toHex2(r) + toHex2(g) + toHex2(b);
}

function toHex2(n) {
  var h = Math.max(0, Math.min(255, Math.round(n))).toString(16);
  return h.length === 1 ? '0' + h : h;
}

// { r, g, b } → { h, s, l } (h: 0-360, s/l: 0-100)
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// { h, s, l } → HEX
function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s /= 100; l /= 100;
  var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  var p = 2 * l - q;

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }

  if (s === 0) {
    var v = Math.round(l * 255);
    return rgbToHex(v, v, v);
  }

  var r = Math.round(hue2rgb(p, q, h/360 + 1/3) * 255);
  var g = Math.round(hue2rgb(p, q, h/360) * 255);
  var b = Math.round(hue2rgb(p, q, h/360 - 1/3) * 255);
  return rgbToHex(r, g, b);
}

// Яркость цвета для выбора цвета текста на свотче
function getTextColor(hex) {
  var rgb = hexToRgb(hex);
  var yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return yiq >= 128 ? '#1a1a2e' : '#ffffff';
}

// Относительная яркость (WCAG)
function getLuminance(r, g, b) {
  var vals = [r, g, b];
  for (var i = 0; i < 3; i++) {
    vals[i] /= 255;
    vals[i] = vals[i] <= 0.03928 ? vals[i] / 12.92 : Math.pow((vals[i] + 0.055) / 1.055, 2.4);
  }
  return vals[0] * 0.2126 + vals[1] * 0.7152 + vals[2] * 0.0722;
}

// Коэффициент контраста между двумя HEX-цветами
function getContrastRatio(hex1, hex2) {
  var rgb1 = hexToRgb(hex1);
  var rgb2 = hexToRgb(hex2);
  var l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  var l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  var lighter = Math.max(l1, l2);
  var darker  = Math.min(l1, l2);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

// Генерация HTML свотча
function makeSwatch(hex, label) {
  return '<div class="task-swatch">' +
    '<div class="task-swatch-color" style="background:' + hex + ';"></div>' +
    '<div class="task-swatch-info">' +
      '<span class="task-swatch-hex">' + hex.toUpperCase() + '</span>' +
      '<span class="task-swatch-label">' + label + '</span>' +
    '</div>' +
  '</div>';
}

// Загрузка Google Font на лету (добавляем <link> если ещё не загружен)
var loadedFonts = {};
function loadGoogleFont(fontName) {
  if (loadedFonts[fontName]) return;
  loadedFonts[fontName] = true;
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=' + fontName.replace(/ /g, '+') + ':wght@400;600;700&display=swap';
  document.head.appendChild(link);
}


// ==============================================================
//   Универсальный движок квиза
//   Принимает массив вопросов и контейнер — рисует квиз
// ==============================================================

function renderQuiz(el, questions) {
  var current = 0;
  var score   = 0;
  var answered = false;

  function showQuestion() {
    if (current >= questions.length) {
      showScore();
      return;
    }
    var q = questions[current];
    var letters = ['А', 'Б', 'В', 'Г', 'Д'];

    var optionsHtml = '';
    for (var i = 0; i < q.options.length; i++) {
      optionsHtml +=
        '<button class="task-option" data-idx="' + i + '">' +
          '<span class="task-option-letter">' + letters[i] + '</span>' +
          q.options[i] +
        '</button>';
    }

    el.innerHTML =
      '<div class="task-quiz-question">' + q.text + '</div>' +
      '<div class="task-options">' + optionsHtml + '</div>' +
      '<div class="task-feedback" id="tqFeedback"></div>' +
      '<div class="task-quiz-footer">' +
        '<span class="task-quiz-progress">Вопрос ' + (current+1) + ' из ' + questions.length + '</span>' +
        '<button class="btn btn-primary btn-sm" id="tqNext" style="display:none;">Следующий →</button>' +
      '</div>';

    answered = false;

    var opts = el.querySelectorAll('.task-option');
    for (var i = 0; i < opts.length; i++) {
      opts[i].addEventListener('click', function() {
        if (answered) return;
        answered = true;

        var idx = parseInt(this.getAttribute('data-idx'));
        var isCorrect = idx === q.correct;
        var feedback  = el.querySelector('#tqFeedback');
        var nextBtn   = el.querySelector('#tqNext');

        // Красим все варианты
        var allOpts = el.querySelectorAll('.task-option');
        for (var j = 0; j < allOpts.length; j++) {
          allOpts[j].disabled = true;
          if (parseInt(allOpts[j].getAttribute('data-idx')) === q.correct) {
            allOpts[j].classList.add('correct');
          }
        }
        if (!isCorrect) {
          this.classList.remove('correct');
          this.classList.add('wrong');
        }

        if (isCorrect) {
          score++;
          feedback.className = 'task-feedback show correct';
          feedback.textContent = '✓ Правильно! ' + (q.explain || '');
        } else {
          feedback.className = 'task-feedback show wrong';
          feedback.textContent = '✗ Не совсем. ' + (q.explain || '');
        }

        nextBtn.style.display = 'block';
        nextBtn.addEventListener('click', function() {
          current++;
          showQuestion();
        });
      });
    }
  }

  function showScore() {
    var pct = Math.round(score / questions.length * 100);
    var msg = pct >= 80
      ? 'Отлично! Вы хорошо усвоили материал.'
      : pct >= 50
      ? 'Неплохо! Повторите темы, где ошиблись.'
      : 'Рекомендуем перечитать урок и пройти квиз снова.';

    el.innerHTML =
      '<div class="task-score-board">' +
        '<div class="task-score-circle">' + pct + '%</div>' +
        '<div class="task-score-title">' + score + ' из ' + questions.length + ' правильно</div>' +
        '<div class="task-score-text">' + msg + '</div>' +
        '<button class="btn btn-outline btn-sm" id="tqRestart">Пройти снова</button>' +
      '</div>';

    el.querySelector('#tqRestart').addEventListener('click', function() {
      current = 0; score = 0; answered = false;
      showQuestion();
    });
  }

  showQuestion();
}


// ==============================================================
//   ОБЪЕКТ ВСЕХ ЗАДАНИЙ
// ==============================================================

var TASKS = {};


// ─────────────────────────────────────────────
//  1. Генератор цветовой гармонии
// ─────────────────────────────────────────────

TASKS['color-harmony'] = {
  render: function(el) {

    var harmonyTypes = [
      { id: 'complementary',  label: 'Дополнительный' },
      { id: 'analogous',      label: 'Аналогичный'    },
      { id: 'triadic',        label: 'Триадный'        },
      { id: 'split',          label: 'Расщеплённый'   }
    ];

    var harmonyDescs = {
      complementary: 'Дополнительные цвета — противоположны на цветовом круге. Создают максимальный контраст и яркость.',
      analogous:     'Аналогичные цвета — соседи на круге. Создают гармоничный, спокойный вид.',
      triadic:       'Триадные цвета — три равноудалённых цвета. Яркие и сбалансированные.',
      split:         'Расщеплённые дополнительные — два цвета, смежных с дополнительным. Богатая, менее напряжённая контрастность.'
    };

    var tabsHtml = '';
    for (var i = 0; i < harmonyTypes.length; i++) {
      var cls = i === 0 ? ' active' : '';
      tabsHtml += '<button class="task-tab-btn' + cls + '" data-harmony="' + harmonyTypes[i].id + '">' + harmonyTypes[i].label + '</button>';
    }

    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">🎨 Практика</span>' +
          '<h4>Генератор цветовой гармонии</h4>' +
          '<p>Выберите основной цвет и изучите гармоничные сочетания по типам</p>' +
        '</div>' +
        '<div class="task-body">' +
          '<div class="task-picker-row">' +
            '<label>Основной цвет:</label>' +
            '<input type="color" class="task-color-input" id="tchPicker" value="#3b63f7">' +
          '</div>' +
          '<div class="task-tabs">' + tabsHtml + '</div>' +
          '<div id="tchPalette" class="task-palette"></div>' +
          '<div id="tchDesc" class="task-info-box"></div>' +
        '</div>' +
      '</div>';

    var picker     = el.querySelector('#tchPicker');
    var paletteEl  = el.querySelector('#tchPalette');
    var descEl     = el.querySelector('#tchDesc');
    var activeTab  = 'complementary';

    function getHarmony(hex, type) {
      var rgb = hexToRgb(hex);
      var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      var h = hsl.h, s = hsl.s, l = hsl.l;
      var swatches = [];

      if (type === 'complementary') {
        swatches = [
          { hex: hex,                         label: 'Основной'      },
          { hex: hslToHex(h+180, s, l),       label: 'Дополнительный'}
        ];
      } else if (type === 'analogous') {
        swatches = [
          { hex: hslToHex(h-30, s, l),  label: '-30°' },
          { hex: hslToHex(h-15, s, l),  label: '-15°' },
          { hex: hex,                    label: 'Основной' },
          { hex: hslToHex(h+15, s, l),  label: '+15°' },
          { hex: hslToHex(h+30, s, l),  label: '+30°' }
        ];
      } else if (type === 'triadic') {
        swatches = [
          { hex: hex,                    label: 'Основной' },
          { hex: hslToHex(h+120, s, l), label: '+120°'    },
          { hex: hslToHex(h+240, s, l), label: '+240°'    }
        ];
      } else if (type === 'split') {
        swatches = [
          { hex: hex,                    label: 'Основной'  },
          { hex: hslToHex(h+150, s, l), label: '+150°'     },
          { hex: hslToHex(h+210, s, l), label: '+210°'     }
        ];
      }

      return swatches;
    }

    function update() {
      var hex = picker.value;
      var swatches = getHarmony(hex, activeTab);
      var html = '';
      for (var i = 0; i < swatches.length; i++) {
        html += makeSwatch(swatches[i].hex, swatches[i].label);
      }
      paletteEl.innerHTML = html;
      descEl.textContent = harmonyDescs[activeTab];
    }

    picker.addEventListener('input', update);

    var tabBtns = el.querySelectorAll('.task-tab-btn');
    for (var i = 0; i < tabBtns.length; i++) {
      tabBtns[i].addEventListener('click', function() {
        activeTab = this.getAttribute('data-harmony');
        var all = el.querySelectorAll('.task-tab-btn');
        for (var j = 0; j < all.length; j++) all[j].classList.remove('active');
        this.classList.add('active');
        update();
      });
    }

    update();
  }
};


// ─────────────────────────────────────────────
//  2. Проверка контраста WCAG
// ─────────────────────────────────────────────

TASKS['contrast-checker'] = {
  render: function(el) {

    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">♿ Практика</span>' +
          '<h4>Проверка контраста (WCAG)</h4>' +
          '<p>Выберите цвет текста и фона — проверьте доступность по стандарту WCAG 2.1</p>' +
        '</div>' +
        '<div class="task-body">' +
          '<div class="task-contrast-inputs">' +
            '<div class="task-contrast-field">' +
              '<label>Цвет текста</label>' +
              '<div class="task-contrast-field-inner">' +
                '<input type="color" id="tccText" value="#161929">' +
                '<input type="text" id="tccTextHex" value="#161929" maxlength="7">' +
              '</div>' +
            '</div>' +
            '<div class="task-contrast-field">' +
              '<label>Цвет фона</label>' +
              '<div class="task-contrast-field-inner">' +
                '<input type="color" id="tccBg" value="#ffffff">' +
                '<input type="text" id="tccBgHex" value="#ffffff" maxlength="7">' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="task-contrast-preview" id="tccPreview">' +
            '<div class="task-contrast-preview-heading">Пример заголовка Aa</div>' +
            '<div class="task-contrast-preview-text">Основной текст страницы — так выглядит абзац</div>' +
          '</div>' +
          '<div class="task-contrast-result">' +
            '<div class="task-contrast-ratio-block">' +
              '<div class="task-contrast-ratio" id="tccRatio">—</div>' +
              '<div class="task-contrast-ratio-label">Коэффициент</div>' +
            '</div>' +
            '<div class="task-wcag-badges" id="tccBadges"></div>' +
          '</div>' +
        '</div>' +
      '</div>';

    var textPicker  = el.querySelector('#tccText');
    var bgPicker    = el.querySelector('#tccBg');
    var textHex     = el.querySelector('#tccTextHex');
    var bgHex       = el.querySelector('#tccBgHex');
    var preview     = el.querySelector('#tccPreview');
    var ratioEl     = el.querySelector('#tccRatio');
    var badgesEl    = el.querySelector('#tccBadges');

    function update() {
      var tc = textPicker.value;
      var bc = bgPicker.value;
      textHex.value = tc;
      bgHex.value   = bc;

      preview.style.background = bc;
      preview.style.color = tc;

      var ratio = parseFloat(getContrastRatio(tc, bc));
      ratioEl.textContent = ratio.toFixed(2) + ':1';

      var aaLarge  = ratio >= 3;
      var aaNormal = ratio >= 4.5;
      var aaaLarge = ratio >= 4.5;
      var aaaNormal= ratio >= 7;

      badgesEl.innerHTML =
        badge('AA обычный', aaNormal)  +
        badge('AA крупный', aaLarge)   +
        badge('AAA обычный', aaaNormal) +
        badge('AAA крупный', aaaLarge);

      ratioEl.style.color = ratio >= 4.5 ? 'var(--success)' : ratio >= 3 ? 'var(--warning)' : 'var(--danger)';
    }

    function badge(label, pass) {
      return '<span class="task-wcag-badge ' + (pass ? 'pass' : 'fail') + '">' +
        (pass ? '✓ ' : '✗ ') + label + '</span>';
    }

    function syncHexInput(picker, input) {
      input.addEventListener('change', function() {
        var v = this.value.trim();
        if (/^#[0-9a-fA-F]{6}$/.test(v)) {
          picker.value = v;
          update();
        }
      });
    }

    textPicker.addEventListener('input', update);
    bgPicker.addEventListener('input', update);
    syncHexInput(textPicker, textHex);
    syncHexInput(bgPicker, bgHex);

    update();
  }
};


// ─────────────────────────────────────────────
//  3. Предпросмотр типографики (подбор шрифтов)
// ─────────────────────────────────────────────

TASKS['typography-preview'] = {
  render: function(el) {

    var headingFonts = [
      { name: 'DM Sans',           stack: '"DM Sans", sans-serif',          type: 'Гротеск' },
      { name: 'Playfair Display',  stack: '"Playfair Display", serif',      type: 'Антиква' },
      { name: 'Space Grotesk',     stack: '"Space Grotesk", sans-serif',    type: 'Гротеск' },
      { name: 'Raleway',           stack: '"Raleway", sans-serif',          type: 'Гротеск' },
      { name: 'Lora',              stack: '"Lora", serif',                  type: 'Антиква' },
      { name: 'Montserrat',        stack: '"Montserrat", sans-serif',       type: 'Гротеск' }
    ];

    var bodyFonts = [
      { name: 'DM Sans',        stack: '"DM Sans", sans-serif',        type: 'Гротеск' },
      { name: 'Georgia',        stack: 'Georgia, serif',               type: 'Антиква' },
      { name: 'Merriweather',   stack: '"Merriweather", serif',        type: 'Антиква' },
      { name: 'Nunito',         stack: '"Nunito", sans-serif',         type: 'Гротеск' },
      { name: 'Inter',          stack: '"Inter", sans-serif',          type: 'Гротеск' }
    ];

    function makeOptions(fonts) {
      var html = '';
      for (var i = 0; i < fonts.length; i++) {
        html += '<option value="' + i + '">' + fonts[i].name + ' (' + fonts[i].type + ')</option>';
      }
      return html;
    }

    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">✏️ Практика</span>' +
          '<h4>Подбор шрифтовой пары</h4>' +
          '<p>Выберите шрифт для заголовка и основного текста — увидите живой предпросмотр</p>' +
        '</div>' +
        '<div class="task-body">' +
          '<div class="task-font-selects">' +
            '<div class="task-font-select-group">' +
              '<label>Шрифт заголовка</label>' +
              '<select class="input" id="ttyHead">' + makeOptions(headingFonts) + '</select>' +
            '</div>' +
            '<div class="task-font-select-group">' +
              '<label>Шрифт основного текста</label>' +
              '<select class="input" id="ttyBody">' + makeOptions(bodyFonts) + '</select>' +
            '</div>' +
          '</div>' +
          '<div class="task-typography-preview">' +
            '<div class="task-typo-heading" id="ttyHeadPreview">Дизайн начинается с типографики</div>' +
            '<div class="task-typo-body" id="ttyBodyPreview">Хорошо подобранная пара шрифтов создаёт читаемость, настроение и характер интерфейса. Заголовок привлекает внимание, тело передаёт смысл.</div>' +
          '</div>' +
          '<div class="task-font-chips" id="ttyChips"></div>' +
        '</div>' +
      '</div>';

    var headSel     = el.querySelector('#ttyHead');
    var bodySel     = el.querySelector('#ttyBody');
    var headPrev    = el.querySelector('#ttyHeadPreview');
    var bodyPrev    = el.querySelector('#ttyBodyPreview');
    var chips       = el.querySelector('#ttyChips');

    function update() {
      var hf = headingFonts[parseInt(headSel.value)];
      var bf = bodyFonts[parseInt(bodySel.value)];

      loadGoogleFont(hf.name);
      loadGoogleFont(bf.name);

      headPrev.style.fontFamily = hf.stack;
      bodyPrev.style.fontFamily = bf.stack;

      chips.innerHTML =
        '<div class="task-font-chip">Заголовок: <strong>' + hf.name + '</strong> · ' + hf.type + '</div>' +
        '<div class="task-font-chip">Текст: <strong>' + bf.name + '</strong> · ' + bf.type + '</div>';
    }

    headSel.addEventListener('change', update);
    bodySel.addEventListener('change', update);
    update();
  }
};


// ─────────────────────────────────────────────
//  4. Правило 60-30-10 (цветовые пропорции)
// ─────────────────────────────────────────────

TASKS['color-proportion'] = {
  render: function(el) {

    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">🎨 Практика</span>' +
          '<h4>Правило 60-30-10</h4>' +
          '<p>Классическое правило дизайна: 60% — основной, 30% — дополнительный, 10% — акцент. Попробуйте разные сочетания!</p>' +
        '</div>' +
        '<div class="task-body">' +
          '<div class="task-proportion-colors">' +
            '<div class="task-proportion-color-pick">' +
              '<input type="color" id="tcp1" value="#f4f6fb"><span>Основной</span>' +
            '</div>' +
            '<div class="task-proportion-color-pick">' +
              '<input type="color" id="tcp2" value="#3b63f7"><span>Доп.</span>' +
            '</div>' +
            '<div class="task-proportion-color-pick">' +
              '<input type="color" id="tcp3" value="#f0c040"><span>Акцент</span>' +
            '</div>' +
          '</div>' +
          '<div class="task-proportion-sliders">' +
            '<div class="task-proportion-row">' +
              '<label>Основной</label>' +
              '<input type="range" id="tcpR1" min="10" max="80" value="60"><span id="tcpV1">60%</span>' +
            '</div>' +
            '<div class="task-proportion-row">' +
              '<label>Дополнительный</label>' +
              '<input type="range" id="tcpR2" min="5"  max="60" value="30"><span id="tcpV2">30%</span>' +
            '</div>' +
            '<div class="task-proportion-row">' +
              '<label>Акцент</label>' +
              '<input type="range" id="tcpR3" min="2"  max="30" value="10"><span id="tcpV3">10%</span>' +
            '</div>' +
          '</div>' +
          '<div class="task-proportion-bar" id="tcpBar"></div>' +
          '<div class="task-info-box" id="tcpInfo"></div>' +
        '</div>' +
      '</div>';

    var r1 = el.querySelector('#tcpR1'), v1 = el.querySelector('#tcpV1');
    var r2 = el.querySelector('#tcpR2'), v2 = el.querySelector('#tcpV2');
    var r3 = el.querySelector('#tcpR3'), v3 = el.querySelector('#tcpV3');
    var p1 = el.querySelector('#tcp1');
    var p2 = el.querySelector('#tcp2');
    var p3 = el.querySelector('#tcp3');
    var bar  = el.querySelector('#tcpBar');
    var info = el.querySelector('#tcpInfo');

    function update() {
      var pct1 = parseInt(r1.value);
      var pct2 = parseInt(r2.value);
      var pct3 = parseInt(r3.value);
      var total = pct1 + pct2 + pct3;

      v1.textContent = pct1 + '%';
      v2.textContent = pct2 + '%';
      v3.textContent = pct3 + '%';

      var f1 = pct1 / total, f2 = pct2 / total, f3 = pct3 / total;

      bar.innerHTML =
        '<div class="task-proportion-block" style="flex:' + f1 + ';background:' + p1.value + ';color:' + getTextColor(p1.value) + ';">' + Math.round(f1*100) + '%</div>' +
        '<div class="task-proportion-block" style="flex:' + f2 + ';background:' + p2.value + ';color:' + getTextColor(p2.value) + ';">' + Math.round(f2*100) + '%</div>' +
        '<div class="task-proportion-block" style="flex:' + f3 + ';background:' + p3.value + ';color:' + getTextColor(p3.value) + ';">' + Math.round(f3*100) + '%</div>';

      var diff = Math.abs(pct1 - 60) + Math.abs(pct2 - 30) + Math.abs(pct3 - 10);
      if (diff < 10) {
        info.textContent = '✓ Идеальные пропорции! Именно так выглядит классическое правило 60-30-10.';
      } else if (diff < 25) {
        info.textContent = 'Близко к классике. Поэкспериментируйте с балансом.';
      } else {
        info.textContent = 'Нестандартные пропорции. Акцентный цвет должен быть самым маленьким — иначе теряется фокус.';
      }
    }

    r1.addEventListener('input', update);
    r2.addEventListener('input', update);
    r3.addEventListener('input', update);
    p1.addEventListener('input', update);
    p2.addEventListener('input', update);
    p3.addEventListener('input', update);

    update();
  }
};


// ─────────────────────────────────────────────
//  5. Предпросмотр easing (плавность анимации)
// ─────────────────────────────────────────────

TASKS['easing-preview'] = {
  render: function(el) {

    var easings = [
      { id: 'linear',      label: 'linear',      css: 'linear',                     desc: 'Равномерная скорость. Выглядит механически, не используется для UI.' },
      { id: 'ease-in',     label: 'ease-in',      css: 'ease-in',                    desc: 'Медленный старт, быстрый конец. Подходит для элементов, которые "улетают" с экрана.' },
      { id: 'ease-out',    label: 'ease-out',     css: 'ease-out',                   desc: 'Быстрый старт, плавная остановка. Идеально для появления элементов на экране.' },
      { id: 'ease-in-out', label: 'ease-in-out',  css: 'ease-in-out',               desc: 'Плавный старт и конец. Универсальный выбор для большинства UI-анимаций.' },
      { id: 'bounce',      label: 'bounce',       css: 'cubic-bezier(0.68,-0.55,0.27,1.55)', desc: 'Пружинный эффект. Добавляет характер, но использовать осторожно.' },
      { id: 'sharp',       label: 'sharp',        css: 'cubic-bezier(0.4,0,0.6,1)', desc: 'Резкий старт и конец. Используется в Material Design для некоторых состояний.' },
      { id: 'expo-out',    label: 'expo-out',     css: 'cubic-bezier(0.19,1,0.22,1)', desc: 'Взрывной старт, очень плавная остановка. Современный "дорогой" вид.' },
      { id: 'back-out',    label: 'back-out',     css: 'cubic-bezier(0.175,0.885,0.32,1.275)', desc: 'Небольшой откат в конце. Придаёт элементу "живость".' }
    ];

    var btnsHtml = '';
    for (var i = 0; i < easings.length; i++) {
      var cls = i === 3 ? ' active' : '';
      btnsHtml += '<button class="task-easing-btn' + cls + '" data-easing="' + i + '">' + easings[i].label + '</button>';
    }

    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">✨ Практика</span>' +
          '<h4>Плавность анимации (Easing)</h4>' +
          '<p>Выберите тип плавности — нажмите кнопку, чтобы увидеть разницу в движении</p>' +
        '</div>' +
        '<div class="task-body">' +
          '<div class="task-easing-grid">' + btnsHtml + '</div>' +
          '<div class="task-easing-stage">' +
            '<div class="task-easing-ball" id="teaBall"></div>' +
          '</div>' +
          '<button class="btn btn-outline btn-sm mb-12" id="teaPlay">▶ Запустить анимацию</button>' +
          '<div class="task-easing-desc" id="teaDesc"></div>' +
        '</div>' +
      '</div>';

    var ball      = el.querySelector('#teaBall');
    var playBtn   = el.querySelector('#teaPlay');
    var descEl    = el.querySelector('#teaDesc');
    var activeIdx = 3;
    var animating = false;

    function setActive(idx) {
      activeIdx = idx;
      var all = el.querySelectorAll('.task-easing-btn');
      for (var j = 0; j < all.length; j++) all[j].classList.remove('active');
      all[idx].classList.add('active');
      descEl.textContent = easings[idx].desc;
    }

    function play() {
      if (animating) return;
      animating = true;
      var easing = easings[activeIdx].css;
      var stageW = ball.parentElement.offsetWidth;
      var maxLeft = stageW - 64;

      ball.style.transition = 'none';
      ball.style.left = '16px';

      setTimeout(function() {
        ball.style.transition = 'left 0.8s ' + easing;
        ball.style.left = maxLeft + 'px';
        setTimeout(function() {
          ball.style.transition = 'left 0.8s ' + easing;
          ball.style.left = '16px';
          setTimeout(function() { animating = false; }, 900);
        }, 900);
      }, 30);
    }

    var easingBtns = el.querySelectorAll('.task-easing-btn');
    for (var i = 0; i < easingBtns.length; i++) {
      easingBtns[i].addEventListener('click', function() {
        setActive(parseInt(this.getAttribute('data-easing')));
        play();
      });
    }

    playBtn.addEventListener('click', play);
    setActive(3);
  }
};


// ─────────────────────────────────────────────
//  6. Flexbox-песочница
// ─────────────────────────────────────────────

TASKS['flexbox-playground'] = {
  render: function(el) {

    var directions  = ['row', 'row-reverse', 'column', 'column-reverse'];
    var justifies   = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
    var aligns      = ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'];
    var wraps       = ['nowrap', 'wrap', 'wrap-reverse'];

    function makeSelect(id, opts, val) {
      var html = '<select class="input" id="' + id + '">';
      for (var i = 0; i < opts.length; i++) {
        html += '<option' + (opts[i] === val ? ' selected' : '') + '>' + opts[i] + '</option>';
      }
      return html + '</select>';
    }

    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">💻 Практика</span>' +
          '<h4>Flexbox-песочница</h4>' +
          '<p>Меняйте свойства Flexbox и смотрите результат в реальном времени</p>' +
        '</div>' +
        '<div class="task-body">' +
          '<div class="task-flexbox-controls">' +
            '<div class="task-control-group"><label>flex-direction</label>' + makeSelect('tfxDir', directions, 'row') + '</div>' +
            '<div class="task-control-group"><label>justify-content</label>' + makeSelect('tfxJust', justifies, 'flex-start') + '</div>' +
            '<div class="task-control-group"><label>align-items</label>' + makeSelect('tfxAlign', aligns, 'flex-start') + '</div>' +
            '<div class="task-control-group"><label>flex-wrap</label>' + makeSelect('tfxWrap', wraps, 'nowrap') + '</div>' +
          '</div>' +
          '<div class="task-flexbox-demo" id="tfxDemo">' +
            '<div class="task-flex-item">1</div>' +
            '<div class="task-flex-item">2</div>' +
            '<div class="task-flex-item">3</div>' +
            '<div class="task-flex-item">4</div>' +
            '<div class="task-flex-item">5</div>' +
          '</div>' +
          '<div class="task-css-output" id="tfxCode"></div>' +
        '</div>' +
      '</div>';

    var demo   = el.querySelector('#tfxDemo');
    var code   = el.querySelector('#tfxCode');
    var selDir   = el.querySelector('#tfxDir');
    var selJust  = el.querySelector('#tfxJust');
    var selAlign = el.querySelector('#tfxAlign');
    var selWrap  = el.querySelector('#tfxWrap');

    function update() {
      var dir   = selDir.value;
      var just  = selJust.value;
      var align = selAlign.value;
      var wrap  = selWrap.value;

      demo.style.flexDirection    = dir;
      demo.style.justifyContent   = just;
      demo.style.alignItems       = align;
      demo.style.flexWrap         = wrap;
      demo.style.minHeight        = (dir === 'column' || dir === 'column-reverse') ? '240px' : '120px';

      code.innerHTML =
        '<span class="task-css-selector">.container</span> <span class="task-css-brace">{</span>\n' +
        '  <span class="task-css-prop">display</span><span class="task-css-semi">:</span> <span class="task-css-val">flex</span><span class="task-css-semi">;</span>\n' +
        '  <span class="task-css-prop">flex-direction</span><span class="task-css-semi">:</span> <span class="task-css-val">' + dir + '</span><span class="task-css-semi">;</span>\n' +
        '  <span class="task-css-prop">justify-content</span><span class="task-css-semi">:</span> <span class="task-css-val">' + just + '</span><span class="task-css-semi">;</span>\n' +
        '  <span class="task-css-prop">align-items</span><span class="task-css-semi">:</span> <span class="task-css-val">' + align + '</span><span class="task-css-semi">;</span>\n' +
        '  <span class="task-css-prop">flex-wrap</span><span class="task-css-semi">:</span> <span class="task-css-val">' + wrap + '</span><span class="task-css-semi">;</span>\n' +
        '<span class="task-css-brace">}</span>';
    }

    selDir.addEventListener('change', update);
    selJust.addEventListener('change', update);
    selAlign.addEventListener('change', update);
    selWrap.addEventListener('change', update);
    update();
  }
};


// ─────────────────────────────────────────────
//  7. Квиз: Теория цвета
// ─────────────────────────────────────────────

TASKS['color-quiz'] = {
  render: function(el) {
    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">🎨 Квиз</span>' +
          '<h4>Теория цвета: проверь знания</h4>' +
          '<p>5 вопросов по основам цветовой теории</p>' +
        '</div>' +
        '<div class="task-body" id="tcqBody"></div>' +
      '</div>';

    var questions = [
      { text: 'Какие цвета называются дополнительными (комплементарными)?',
        options: ['Соседи на цветовом круге', 'Противоположные на цветовом круге', 'Три равноудалённых цвета', 'Оттенки одного тона'],
        correct: 1, explain: 'Дополнительные цвета находятся напротив друг друга на цветовом круге и создают максимальный контраст.' },
      { text: 'Какая цветовая модель используется для экранов?',
        options: ['CMYK', 'Pantone', 'RGB', 'RAL'],
        correct: 2, explain: 'RGB (Red-Green-Blue) — аддитивная модель для экранов. CMYK — для печати.' },
      { text: 'Правило 60-30-10 означает:',
        options: ['Размер шрифта в пикселях', 'Пропорции трёх цветов в дизайне', 'Скорость анимации', 'Кол-во цветов на странице'],
        correct: 1, explain: '60% — основной цвет, 30% — дополнительный, 10% — акцент. Это классическое правило баланса.' },
      { text: 'Минимальный контраст по WCAG AA для обычного текста:',
        options: ['2:1', '3:1', '4.5:1', '7:1'],
        correct: 2, explain: 'Стандарт WCAG 2.1 требует коэффициент контраста ≥ 4.5:1 для обычного текста (уровень AA).' },
      { text: 'Какой цвет психологически ассоциируется с доверием и надёжностью?',
        options: ['Красный', 'Жёлтый', 'Синий', 'Зелёный'],
        correct: 2, explain: 'Синий ассоциируется с доверием, стабильностью и профессионализмом. Поэтому его используют банки и IT-компании.' }
    ];

    renderQuiz(el.querySelector('#tcqBody'), questions);
  }
};


// ─────────────────────────────────────────────
//  8. Квиз: UX/UI концепции
// ─────────────────────────────────────────────

TASKS['ux-quiz'] = {
  render: function(el) {
    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">💡 Квиз</span>' +
          '<h4>UX/UI: проверь знания</h4>' +
          '<p>Основные концепции UX и UI дизайна</p>' +
        '</div>' +
        '<div class="task-body" id="tuxBody"></div>' +
      '</div>';

    var questions = [
      { text: 'Что такое User Persona (персона)?',
        options: ['Логин пользователя', 'Собирательный образ целевого пользователя', 'Личный кабинет', 'Имя в системе'],
        correct: 1, explain: 'Персона — вымышленный, но реалистичный образ пользователя на основе исследований. Помогает принимать дизайнерские решения.' },
      { text: 'Что такое вайрфрейм?',
        options: ['Финальный дизайн-макет', 'Чёрно-белая схема расположения элементов', 'CSS-фреймворк', 'Шрифт'],
        correct: 1, explain: 'Вайрфрейм — это скелет интерфейса без визуального дизайна. Показывает структуру и расположение элементов.' },
      { text: '"Визуальная иерархия" в дизайне — это:',
        options: ['Очерёдность загрузки файлов', 'Расстановка элементов по важности через размер, цвет, контраст', 'Структура папок проекта', 'Порядок CSS-селекторов'],
        correct: 1, explain: 'Визуальная иерархия направляет взгляд пользователя: самое важное — крупнее, контрастнее, выделено.' },
      { text: 'Принцип "Hick\'s Law" (Закон Хика) гласит:',
        options: ['Чем больше вариантов — тем быстрее выбор', 'Чем больше вариантов — тем дольше принятие решения', 'Все элементы должны быть одного размера', 'Кнопки должны быть квадратными'],
        correct: 1, explain: 'Закон Хика: время принятия решения растёт с количеством вариантов. Поэтому в хорошем UX меньше — лучше.' },
      { text: 'Что означает "прототип" в UX?',
        options: ['Исходный код приложения', 'Интерактивная модель продукта для тестирования', 'Финальный дизайн', 'Техническое задание'],
        correct: 1, explain: 'Прототип — кликабельная модель, имитирующая поведение продукта. Позволяет тестировать до разработки.' }
    ];

    renderQuiz(el.querySelector('#tuxBody'), questions);
  }
};


// ─────────────────────────────────────────────
//  9. Квиз: Типографика и шрифты
// ─────────────────────────────────────────────

TASKS['font-quiz'] = {
  render: function(el) {
    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">✏️ Квиз</span>' +
          '<h4>Типографика: проверь знания</h4>' +
          '<p>Шрифты, засечки и принципы читаемости</p>' +
        '</div>' +
        '<div class="task-body" id="tfqBody"></div>' +
      '</div>';

    var questions = [
      { text: 'Что такое "засечки" в шрифте?',
        options: ['Пробелы между буквами', 'Небольшие штрихи на концах букв', 'Жирное начертание', 'Размер шрифта'],
        correct: 1, explain: 'Засечки (serifs) — небольшие горизонтальные штрихи на окончаниях букв. Шрифты без них — sans-serif.' },
      { text: 'Какой шрифт называется "sans-serif"?',
        options: ['Со скруглёнными буквами', 'С декоративными элементами', 'Без засечек', 'Моноширинный'],
        correct: 2, explain: '"Sans" в переводе с французского — "без". Sans-serif — шрифт без засечек (Arial, DM Sans, Helvetica).' },
      { text: 'Оптимальная длина строки текста для веба:',
        options: ['30–40 символов', '45–75 символов', '90–100 символов', '110–130 символов'],
        correct: 1, explain: '45–75 символов в строке — оптимально для читаемости. Слишком длинные строки утомляют взгляд.' },
      { text: 'Межстрочный интервал (line-height) для основного текста обычно:',
        options: ['1.0–1.1', '1.2–1.3', '1.5–1.7', '2.5–3.0'],
        correct: 2, explain: 'Line-height 1.5–1.7 создаёт комфортное расстояние между строками для чтения.' },
      { text: 'Что такое "кернинг"?',
        options: ['Размер шрифта', 'Межстрочный интервал', 'Расстояние между конкретной парой букв', 'Тип начертания'],
        correct: 2, explain: 'Кернинг — корректировка расстояния между отдельными парами символов для оптической равномерности.' }
    ];

    renderQuiz(el.querySelector('#tfqBody'), questions);
  }
};


// ─────────────────────────────────────────────
//  10. Квиз: HTML-теги
// ─────────────────────────────────────────────

TASKS['html-quiz'] = {
  render: function(el) {
    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">💻 Квиз</span>' +
          '<h4>HTML: проверь знания</h4>' +
          '<p>Основные теги и структура HTML-документа</p>' +
        '</div>' +
        '<div class="task-body" id="thqBody"></div>' +
      '</div>';

    var questions = [
      { text: 'Какой тег создаёт ссылку в HTML?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correct: 1, explain: 'Тег <a> (anchor) создаёт ссылку. Атрибут href указывает адрес: <a href="url">Текст</a>.' },
      { text: 'Что делает тег <semantic> в HTML5?',
        options: ['Создаёт анимацию', 'Такого тега нет', 'Добавляет CSS', 'Загружает скрипт'],
        correct: 1, explain: 'Тега <semantic> не существует. Но в HTML5 есть семантические теги: <header>, <main>, <article>, <footer>.' },
      { text: 'Как добавить картинку в HTML?',
        options: ['<image src="...">', '<img src="...">', '<pic src="...">', '<photo src="...">'],
        correct: 1, explain: 'Тег <img> используется для изображений. Важны атрибуты src (путь) и alt (описание).' },
      { text: 'Какой атрибут задаёт обязательное поле в форме?',
        options: ['mandatory', 'needed', 'required', 'must'],
        correct: 2, explain: 'Атрибут required делает поле обязательным: браузер не отправит форму, если оно пустое.' },
      { text: 'Что такое DOCTYPE в начале HTML?',
        options: ['Комментарий', 'Название документа', 'Объявление версии HTML для браузера', 'Подключение CSS'],
        correct: 2, explain: '<!DOCTYPE html> сообщает браузеру, что документ написан по стандарту HTML5.' }
    ];

    renderQuiz(el.querySelector('#thqBody'), questions);
  }
};


// ─────────────────────────────────────────────
//  11. Квиз: JavaScript
// ─────────────────────────────────────────────

TASKS['js-quiz'] = {
  render: function(el) {
    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">⚡ Квиз</span>' +
          '<h4>JavaScript: проверь знания</h4>' +
          '<p>Основы языка, переменные и функции</p>' +
        '</div>' +
        '<div class="task-body" id="tjsBody"></div>' +
      '</div>';

    var questions = [
      { text: 'Что выведет: console.log(typeof "hello")?',
        options: ['"hello"', '"number"', '"string"', '"object"'],
        correct: 2, explain: 'typeof возвращает тип данных в виде строки. "hello" — строка, поэтому результат "string".' },
      { text: 'Чем отличается == от === в JavaScript?',
        options: ['Ничем', '=== сравнивает без учёта типа', '== строгое, === нестрогое', '=== сравнивает значение и тип'],
        correct: 3, explain: '=== строгое сравнение: проверяет значение И тип. == приводит типы перед сравнением.' },
      { text: 'Что такое "callback" (колбэк)?',
        options: ['Вызов функции самой себя', 'Функция, переданная как аргумент другой функции', 'Возврат значения', 'Ошибка в коде'],
        correct: 1, explain: 'Колбэк — функция, которую передают как аргумент и вызывают внутри другой функции.' },
      { text: 'Как выбрать элемент по ID в DOM?',
        options: ['document.query("#id")', 'document.getElementById("id")', 'document.find("#id")', 'document.select("id")'],
        correct: 1, explain: 'document.getElementById("id") возвращает элемент с данным id. Также работает querySelector("#id").' },
      { text: 'Что хранится в localStorage?',
        options: ['Только числа', 'Только объекты', 'Строки (пары ключ-значение)', 'Файлы'],
        correct: 2, explain: 'localStorage хранит данные как строки. Объекты сначала нужно преобразовать через JSON.stringify().' }
    ];

    renderQuiz(el.querySelector('#tjsBody'), questions);
  }
};


// ─────────────────────────────────────────────
//  12. Квиз: Git
// ─────────────────────────────────────────────

TASKS['git-quiz'] = {
  render: function(el) {
    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">🔧 Квиз</span>' +
          '<h4>Git: проверь знания</h4>' +
          '<p>Основные команды и концепции Git</p>' +
        '</div>' +
        '<div class="task-body" id="tgitBody"></div>' +
      '</div>';

    var questions = [
      { text: 'Что делает команда git init?',
        options: ['Создаёт новый коммит', 'Инициализирует новый репозиторий Git', 'Загружает изменения', 'Удаляет ветку'],
        correct: 1, explain: 'git init создаёт новый локальный репозиторий — папку .git с историей изменений.' },
      { text: 'Что делает git add?',
        options: ['Создаёт ветку', 'Добавляет файлы в staging area (индекс)', 'Отправляет на GitHub', 'Создаёт коммит'],
        correct: 1, explain: 'git add переносит изменения в staging area. Это промежуточный шаг перед созданием коммита.' },
      { text: 'Как переключиться на ветку "feature"?',
        options: ['git move feature', 'git branch feature', 'git checkout feature', 'git switch-to feature'],
        correct: 2, explain: 'git checkout feature переключает на ветку. В новых версиях Git: git switch feature.' },
      { text: 'Что такое "merge conflict" (конфликт слияния)?',
        options: ['Ошибка синтаксиса', 'Ситуация, когда два разработчика изменили одно место', 'Потерянный коммит', 'Плохое соединение'],
        correct: 1, explain: 'Конфликт возникает, когда Git не может автоматически объединить изменения из двух веток в одном месте.' },
      { text: 'Команда git pull делает:',
        options: ['Только скачивает', 'Загружает изменения и сливает их с текущей веткой', 'Только сливает', 'Удаляет ветку'],
        correct: 1, explain: 'git pull = git fetch + git merge. Скачивает изменения с сервера и сразу объединяет с локальной веткой.' }
    ];

    renderQuiz(el.querySelector('#tgitBody'), questions);
  }
};


// ─────────────────────────────────────────────
//  13. Квиз: Python
// ─────────────────────────────────────────────

TASKS['python-quiz'] = {
  render: function(el) {
    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">🐍 Квиз</span>' +
          '<h4>Python: проверь знания</h4>' +
          '<p>Основы синтаксиса и структур данных Python</p>' +
        '</div>' +
        '<div class="task-body" id="tpyBody"></div>' +
      '</div>';

    var questions = [
      { text: 'Что выведет: print(type([1, 2, 3]))?',
        options: ['<class "tuple">', '<class "dict">', '<class "list">', '<class "array">'],
        correct: 2, explain: '[1,2,3] — список (list). Тип проверяется функцией type().' },
      { text: 'Как создать список из чисел от 0 до 4 в Python?',
        options: ['range[0:5]', 'list(range(5))', 'array(5)', '[0...4]'],
        correct: 1, explain: 'list(range(5)) даёт [0,1,2,3,4]. range() создаёт диапазон, list() превращает его в список.' },
      { text: 'Что делает метод .append() у списка?',
        options: ['Удаляет последний элемент', 'Добавляет элемент в конец', 'Сортирует список', 'Разворачивает список'],
        correct: 1, explain: 'append() добавляет элемент в конец списка. Например: lst.append(5) добавит 5.' },
      { text: 'Как объявить функцию в Python?',
        options: ['function my_func():', 'def my_func():', 'func my_func():', 'define my_func():'],
        correct: 1, explain: 'Функции объявляются ключевым словом def. Например: def my_func(): pass' },
      { text: 'Что такое словарь (dict) в Python?',
        options: ['Список строк', 'Множество уникальных значений', 'Набор пар ключ-значение', 'Упорядоченный список чисел'],
        correct: 2, explain: 'Словарь — коллекция пар ключ:значение. Например: {"name": "Anna", "age": 25}' }
    ];

    renderQuiz(el.querySelector('#tpyBody'), questions);
  }
};


// ─────────────────────────────────────────────
//  14. Квиз: Дизайн-мышление
// ─────────────────────────────────────────────

TASKS['design-thinking-quiz'] = {
  render: function(el) {
    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">💡 Квиз</span>' +
          '<h4>Дизайн-мышление: проверь знания</h4>' +
          '<p>5 этапов дизайн-мышления и их применение</p>' +
        '</div>' +
        '<div class="task-body" id="tdtBody"></div>' +
      '</div>';

    var questions = [
      { text: 'Первый этап дизайн-мышления:',
        options: ['Прототип', 'Определение', 'Эмпатия', 'Идеация'],
        correct: 2, explain: 'Дизайн-мышление начинается с Эмпатии — понимания потребностей и болей пользователя через исследование.' },
      { text: 'Что такое "How Might We" вопросы?',
        options: ['Технические требования', 'Вопросы для генерации идей на этапе идеации', 'Критерии оценки дизайна', 'Юзабилити-тесты'],
        correct: 1, explain: '"Как мы могли бы..." — техника переформулировки проблем в возможности для брейнсторминга.' },
      { text: 'Цель этапа "Прототип" в дизайн-мышлении:',
        options: ['Написать финальный код', 'Создать дешёвый тестируемый вариант решения', 'Нанять разработчиков', 'Сдать проект'],
        correct: 1, explain: 'Прототип — быстрая, дешёвая версия решения для проверки гипотез. Лучше провалиться на прототипе, чем в готовом продукте.' },
      { text: 'Что означает "итеративный процесс" в дизайне?',
        options: ['Сделать один раз и сдать', 'Повторять циклы: тест → улучшение → тест', 'Работать без документации', 'Избегать исследований'],
        correct: 1, explain: 'Итерация — повторение цикла улучшений. Хороший дизайн создаётся через многократные тесты и доработки.' },
      { text: 'На этапе "Идеация" главное правило:',
        options: ['Критиковать каждую идею', 'Генерировать как можно больше идей без оценки', 'Сразу выбрать лучшую', 'Сделать прототип'],
        correct: 1, explain: 'При брейнсторминге важно НЕ критиковать идеи сразу — это убивает творческое мышление. Сначала — количество.' }
    ];

    renderQuiz(el.querySelector('#tdtBody'), questions);
  }
};


// ─────────────────────────────────────────────
//  15. Квиз: Основы Figma
// ─────────────────────────────────────────────

TASKS['figma-quiz'] = {
  render: function(el) {
    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">🖥️ Квиз</span>' +
          '<h4>Figma: проверь знания</h4>' +
          '<p>Основные инструменты и концепции Figma</p>' +
        '</div>' +
        '<div class="task-body" id="tfigBody"></div>' +
      '</div>';

    var questions = [
      { text: 'Что такое Auto Layout в Figma?',
        options: ['Автоматическое выравнивание по сетке', 'Фрейм с Flexbox-подобным поведением элементов', 'Автосохранение', 'Плагин для анимации'],
        correct: 1, explain: 'Auto Layout позволяет создавать фреймы, которые автоматически изменяют размер при добавлении контента, как Flexbox в CSS.' },
      { text: 'Горячая клавиша для дублирования слоя в Figma:',
        options: ['Ctrl+C, Ctrl+V', 'Ctrl+D', 'Ctrl+G', 'Alt+Drag'],
        correct: 1, explain: 'Ctrl+D (или Cmd+D на Mac) дублирует выделенный объект. Alt+Drag также создаёт копию.' },
      { text: 'Что такое "компонент" в Figma?',
        options: ['Скриншот экрана', 'Многоразовый элемент, который можно переиспользовать', 'Файл проекта', 'Страница документа'],
        correct: 1, explain: 'Компонент — мастер-элемент. Все его "экземпляры" (instances) связаны: при изменении компонента меняются все копии.' },
      { text: 'Как сгруппировать несколько объектов в Figma?',
        options: ['Ctrl+G', 'Ctrl+K', 'Ctrl+L', 'Ctrl+M'],
        correct: 0, explain: 'Ctrl+G (Cmd+G) группирует выбранные объекты. Для фрейма — Ctrl+Alt+G.' },
      { text: 'Что такое "Variants" (варианты) компонентов?',
        options: ['Версии файла', 'Разные состояния одного компонента в одном наборе', 'Цветовые палитры', 'Слои'],
        correct: 1, explain: 'Варианты объединяют похожие компоненты (кнопка: primary/secondary/disabled) в одно свойство для удобного переключения.' }
    ];

    renderQuiz(el.querySelector('#tfigBody'), questions);
  }
};


// ─────────────────────────────────────────────
//  16. Квиз: Графический дизайн
// ─────────────────────────────────────────────

TASKS['graphic-design-quiz'] = {
  render: function(el) {
    el.innerHTML =
      '<div class="task-widget">' +
        '<div class="task-widget-header">' +
          '<span class="task-badge">🖌️ Квиз</span>' +
          '<h4>Основы графического дизайна</h4>' +
          '<p>Композиция, иерархия и принципы визуального дизайна</p>' +
        '</div>' +
        '<div class="task-body" id="tgdBody"></div>' +
      '</div>';

    var questions = [
      { text: 'Что такое "золотое сечение" в дизайне?',
        options: ['Жёлтый цвет', 'Пропорция ≈1:1.618, создающая эстетически приятные соотношения', 'Размер логотипа', 'Тип шрифта'],
        correct: 1, explain: 'Золотое сечение (φ ≈ 1.618) — математическая пропорция, встречающаяся в природе и использующаяся в дизайне для гармоничных форм.' },
      { text: 'Что означает "негативное пространство" в дизайне?',
        options: ['Тёмный фон', 'Пустое пространство вокруг и между элементами', 'Плохой дизайн', 'Отступы CSS'],
        correct: 1, explain: 'Негативное (белое) пространство — это пустота вокруг объектов. Оно помогает элементам "дышать" и улучшает читаемость.' },
      { text: 'Какой из принципов CRAP (C.R.A.P.) относится к повторению элементов?',
        options: ['C — Contrast (контраст)', 'R — Repetition (повторение)', 'A — Alignment (выравнивание)', 'P — Proximity (близость)'],
        correct: 1, explain: 'Repetition — повторение одних и тех же визуальных элементов создаёт единство и консистентность дизайна.' },
      { text: 'Что такое "кегль" шрифта?',
        options: ['Жирность шрифта', 'Наклон шрифта', 'Размер шрифта в пунктах', 'Расстояние между буквами'],
        correct: 2, explain: 'Кегль — размер шрифта в типографической единице пункт (pt). 1 pt ≈ 0.353 мм.' },
      { text: 'Правило "третей" используется для:',
        options: ['Расчёта цены', 'Гармоничного расположения элементов в кадре/макете', 'Выбора шрифта', 'Определения цвета'],
        correct: 1, explain: 'Сетка из 9 частей (3×3). Ключевые элементы располагаются на пересечениях линий — это создаёт динамичную, привлекательную композицию.' }
    ];

    renderQuiz(el.querySelector('#tgdBody'), questions);
  }
};
