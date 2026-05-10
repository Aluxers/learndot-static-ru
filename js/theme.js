/* ==============================================
   Переключение темы (светлая / тёмная)

   Как это работает:
   1. При загрузке страницы читаем тему из localStorage
   2. Устанавливаем атрибут data-theme на <html>
   3. Все цвета в CSS привязаны к переменным из variables.css
   4. При смене data-theme все цвета меняются автоматически
   5. Выбранная тема сохраняется в localStorage

   Ключ в localStorage: 'learndot-theme'
   Значения: 'light' или 'dark'
   ============================================== */

(function () {

  // ===== Ключ для хранения темы =====
  var STORAGE_KEY = 'learndot-theme';


  // ===== Читаем сохранённую тему из localStorage =====
  // Если ничего не сохранено — возвращаем 'light'
  function getSavedTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);

      // Проверяем что значение корректное
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (e) {
      // localStorage может быть недоступен (приватный режим)
    }

    return 'light';
  }


  // ===== Применяем тему к странице =====
  // Устанавливаем атрибут data-theme и обновляем иконки кнопок
  function applyTheme(theme) {

    // Устанавливаем атрибут — CSS сразу подхватывает новые цвета
    document.documentElement.setAttribute('data-theme', theme);

    // Сохраняем выбор в localStorage
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}

    // Обновляем иконки на всех кнопках переключения темы
    // (их может быть несколько — в шапке и в мобильном меню)
    var buttons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < buttons.length; i++) {
      if (theme === 'dark') {
        buttons[i].textContent = '☀️';
        buttons[i].setAttribute('title', 'Светлая тема');
      } else {
        buttons[i].textContent = '🌙';
        buttons[i].setAttribute('title', 'Тёмная тема');
      }
    }
  }


  // ===== Переключаем тему =====
  // Если сейчас светлая — ставим тёмную, и наоборот
  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';

    if (current === 'light') {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }


  // ===== Применяем тему сразу при загрузке скрипта =====
  // (до загрузки DOM, чтобы не было мигания)
  applyTheme(getSavedTheme());


  // ===== Делаем функции доступными глобально =====
  window.LearnDot = window.LearnDot || {};
  window.LearnDot.toggleTheme = toggleTheme;
  window.LearnDot.applyTheme = applyTheme;


  // ===== Обработчик кликов по кнопкам темы =====
  // Используем делегирование — один обработчик на весь документ
  document.addEventListener('DOMContentLoaded', function () {

    // Повторно применяем тему (на случай если DOM перерисовался)
    applyTheme(getSavedTheme());

    // Слушаем клики на всём документе
    document.addEventListener('click', function (e) {
      // Проверяем, кликнули ли по кнопке переключения темы
      var button = e.target.closest('.theme-toggle');
      if (button) {
        toggleTheme();
      }
    });
  });

})();
