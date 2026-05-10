/* ==============================================
   Авторизация (мок-версия)

   Как это работает:
   1. Есть 3 встроенных демо-аккаунта (студент, преподаватель, админ)
   2. Пользователь может зарегистрировать новый аккаунт
   3. Все данные хранятся в localStorage (без сервера)
   4. При входе данные пользователя сохраняются в localStorage
   5. При выходе данные удаляются из localStorage
   6. Каждая страница кабинета проверяет роль при загрузке

   Ключи localStorage:
   - 'learndot-auth'  — текущий пользователь (или null)
   - 'learndot-users' — массив зарегистрированных пользователей

   Роли: student, teacher, admin
   Пароль для демо: password
   ============================================== */

(function () {

  // ===== Ключи для localStorage =====
  var AUTH_KEY = 'learndot-auth';
  var USERS_KEY = 'learndot-users';


  // ===== Встроенные демо-аккаунты =====
  // Эти аккаунты всегда доступны, даже если localStorage пустой
  var demoAccounts = [
    {
      id: 'u1',
      avatar: 'images/avatars/anna-student.png',
      name: 'Анна Студент',
      email: 'student@demo.com',
      password: 'password',
      role: 'student'
    },
    {
      id: 'u2',
      avatar: 'images/avatars/mark-teacher.png',
      name: 'Марк Преподаватель',
      email: 'teacher@demo.com',
      password: 'password',
      role: 'teacher'
    },
    {
      id: 'u3',
      avatar: 'images/avatars/david-admin.png',
      name: 'Давид Админ',
      email: 'admin@demo.com',
      password: 'password',
      role: 'admin'
    }
  ];


  // ==========================================================
  //   Вспомогательные функции для работы с localStorage
  // ==========================================================

  // Читаем JSON из localStorage
  // Если ключа нет или произошла ошибка — возвращаем fallback
  function readJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (raw) {
        return JSON.parse(raw);
      }
      return fallback;
    } catch (e) {
      return fallback;
    }
  }

  // Записываем JSON в localStorage
  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // Может не сработать в приватном режиме браузера
    }
  }


  // ==========================================================
  //   Работа с пользователями
  // ==========================================================

  // Получаем полный список пользователей
  // Объединяем демо-аккаунты + зарегистрированных через форму
  function getAllUsers() {

    // Читаем зарегистрированных пользователей
    var registeredUsers = readJSON(USERS_KEY, []);

    // Начинаем с копии демо-аккаунтов
    var allUsers = demoAccounts.slice();

    // Добавляем зарегистрированных (если email не дублируется)
    for (var i = 0; i < registeredUsers.length; i++) {
      var user = registeredUsers[i];
      var alreadyExists = false;

      // Проверяем, нет ли уже такого email
      for (var j = 0; j < allUsers.length; j++) {
        if (allUsers[j].email === user.email) {
          alreadyExists = true;
          break;
        }
      }

      if (!alreadyExists) {
        allUsers.push(user);
      }
    }

    return allUsers;
  }

  // Получаем текущего авторизованного пользователя
  // Возвращает объект {id, name, email, role} или null
  function getCurrentUser() {
    return readJSON(AUTH_KEY, null);
  }


  // ==========================================================
  //   Вход в аккаунт
  // ==========================================================

  // Принимает email и пароль
  // Возвращает { success: true/false, user/error }
  function loginLocal(email, password) {

    // Убираем пробелы и приводим к нижнему регистру
    var trimmedEmail = email.trim().toLowerCase();

    // Получаем всех пользователей
    var users = getAllUsers();

    // Ищем пользователя с подходящим email и паролем
    var found = null;
    for (var i = 0; i < users.length; i++) {
      if (users[i].email.toLowerCase() === trimmedEmail && users[i].password === password) {
        found = users[i];
        break;
      }
    }

    // Если не нашли — возвращаем ошибку
    if (!found) {
      return { success: false, error: 'Неверный email или пароль.' };
    }

   // Сохраняем данные пользователя (без пароля)
    var safeUser = {
      id: found.id,
      avatar: found.avatar || '',
      name: found.name,
      email: found.email,
      role: found.role
    };
    writeJSON(AUTH_KEY, safeUser);

    return { success: true, user: safeUser };
  }


  // ==========================================================
  //   Регистрация нового аккаунта
  // ==========================================================

  // Принимает имя, email, пароль и роль
  // Возвращает { success: true/false, user/error }
  function registerLocal(name, email, password, role) {

    // Убираем пробелы
    var trimmedEmail = email.trim().toLowerCase();

    // Проверяем, нет ли уже аккаунта с таким email
    var users = getAllUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].email.toLowerCase() === trimmedEmail) {
        return { success: false, error: 'Аккаунт с таким email уже существует.' };
      }
    }

    // Создаём нового пользователя
    var newUser = {
      id: 'u' + Date.now(),    // Уникальный ID на основе времени
      name: name.trim(),
      email: trimmedEmail,
      password: password,
      role: role || 'student'   // По умолчанию — студент
    };

    // Добавляем в список зарегистрированных
    var registeredUsers = readJSON(USERS_KEY, []);
    registeredUsers.push(newUser);
    writeJSON(USERS_KEY, registeredUsers);

    // Сразу авторизуем нового пользователя
    var safeUser = {
      id: newUser.id,
      avatar: newUser.avatar || '',
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
    writeJSON(AUTH_KEY, safeUser);

    return { success: true, user: safeUser };
  }


  // ==========================================================
  //   Работа с Netlify Functions и Blobs
  // ==========================================================

  function apiRequest(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function (response) {
      return response.json().then(function (json) {
        if (!response.ok) {
          return {
            success: false,
            error: json.error || 'Ошибка сервера.'
          };
        }

        return json;
      });
    });
  }

  function login(email, password) {
    return apiRequest('/api/login', {
      email: email,
      password: password
    }).then(function (result) {
      if (result.success) {
        writeJSON(AUTH_KEY, result.user);
      }

      return result;
    }).catch(function () {
      return loginLocal(email, password);
    });
  }

  function register(name, email, password, role) {
    return apiRequest('/api/register', {
      name: name,
      email: email,
      password: password,
      role: role
    }).then(function (result) {
      if (result.success) {
        writeJSON(AUTH_KEY, result.user);
      }

      return result;
    }).catch(function () {
      return registerLocal(name, email, password, role);
    });
  }


  // ==========================================================
  //   Выход из аккаунта
  // ==========================================================

  // Просто удаляем данные пользователя из localStorage
  function logout() {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {}
  }


  // ==========================================================
  //   Проверки авторизации и ролей
  // ==========================================================

  // Проверяем, авторизован ли пользователь
  // Возвращает true или false
  function isAuthenticated() {
    var user = getCurrentUser();
    if (user) {
      return true;
    }
    return false;
  }

  // Получаем URL личного кабинета по роли
  // student → student-dashboard.html
  // teacher → teacher-dashboard.html
  // admin   → admin-dashboard.html
  function getDashboardUrl(role) {
    if (role === 'student') return 'student-dashboard.html';
    if (role === 'teacher') return 'teacher-dashboard.html';
    if (role === 'admin') return 'admin-dashboard.html';
    return 'index.html';
  }

  // Защита страницы — проверяем роль пользователя
  // Вызывается в начале каждой страницы кабинета
  //
  // Пример использования:
  //   if (!LearnDot.auth.requireRole(['student'])) return;
  //
  // Что делает:
  // - если не авторизован → перенаправляет на login.html
  // - если роль не подходит → перенаправляет на access-denied.html
  // - если всё ок → возвращает true
  function requireRole(allowedRoles) {
    var user = getCurrentUser();

    // Не авторизован — на страницу входа
    if (!user) {
      window.location.href = 'login.html';
      return false;
    }

    // Роль не подходит — на страницу «Доступ запрещён»
    if (allowedRoles && allowedRoles.indexOf(user.role) === -1) {
      window.location.href = 'access-denied.html';
      return false;
    }

    // Всё хорошо — пропускаем
    return true;
  }


  // ==========================================================
  //   Делаем функции доступными глобально
  // ==========================================================
  //
  // После этого можно вызывать:
  //   LearnDot.auth.login(email, password)
  //   LearnDot.auth.register(name, email, password, role)
  //   LearnDot.auth.logout()
  //   LearnDot.auth.getCurrentUser()
  //   LearnDot.auth.isAuthenticated()
  //   LearnDot.auth.getDashboardUrl(role)
  //   LearnDot.auth.requireRole(['student'])

  window.LearnDot = window.LearnDot || {};
  window.LearnDot.auth = {
    login: login,
    register: register,
    logout: logout,
    getCurrentUser: getCurrentUser,
    isAuthenticated: isAuthenticated,
    getDashboardUrl: getDashboardUrl,
    requireRole: requireRole
  };

})();
