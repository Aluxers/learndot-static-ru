













(function () {

  
  var STORAGE_KEY = 'learndot-theme';


  
  
  function getSavedTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);

      
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (e) {
      
    }

    return 'light';
  }


  
  
  function applyTheme(theme) {

    
    document.documentElement.setAttribute('data-theme', theme);

    
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}

    
    
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


  
  
  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';

    if (current === 'light') {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }


  
  
  applyTheme(getSavedTheme());


  
  window.LearnDot = window.LearnDot || {};
  window.LearnDot.toggleTheme = toggleTheme;
  window.LearnDot.applyTheme = applyTheme;


  
  
  document.addEventListener('DOMContentLoaded', function () {

    
    applyTheme(getSavedTheme());

    
    document.addEventListener('click', function (e) {
      
      var button = e.target.closest('.theme-toggle');
      if (button) {
        toggleTheme();
      }
    });
  });

})();
