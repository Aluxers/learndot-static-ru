


















(function () {

  
  var AUTH_KEY = 'learndot-auth';
  var USERS_KEY = 'learndot-users';


  
  
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

  
  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      
    }
  }


  
  
  

  
  
  function getAllUsers() {

    
    var registeredUsers = readJSON(USERS_KEY, []);

    
    var allUsers = demoAccounts.slice();

    
    for (var i = 0; i < registeredUsers.length; i++) {
      var user = registeredUsers[i];
      var alreadyExists = false;

      
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

  
  
  function getCurrentUser() {
    return readJSON(AUTH_KEY, null);
  }


  
  
  

  
  
  function loginLocal(email, password) {

    
    var trimmedEmail = email.trim().toLowerCase();

    
    var users = getAllUsers();

    
    var found = null;
    for (var i = 0; i < users.length; i++) {
      if (users[i].email.toLowerCase() === trimmedEmail && users[i].password === password) {
        found = users[i];
        break;
      }
    }

    
    if (!found) {
      return { success: false, error: 'Неверный email или пароль.' };
    }

   
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


  
  
  

  
  
  function registerLocal(name, email, password, role) {

    
    var trimmedEmail = email.trim().toLowerCase();

    
    var users = getAllUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].email.toLowerCase() === trimmedEmail) {
        return { success: false, error: 'Аккаунт с таким email уже существует.' };
      }
    }

    
    var newUser = {
      id: 'u' + Date.now(),    
      name: name.trim(),
      email: trimmedEmail,
      password: password,
      role: role || 'student'   
    };

    
    var registeredUsers = readJSON(USERS_KEY, []);
    registeredUsers.push(newUser);
    writeJSON(USERS_KEY, registeredUsers);

    
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
    function tryLogin() {
      return apiRequest('/api/login', {
        email: email,
        password: password
      });
    }

    return tryLogin().then(function (result) {
      if (!result.success) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve(tryLogin());
          }, 500);
        });
      }

      return result;
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


  
  
  

  
  function logout() {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {}
  }


  
  
  

  
  
  function isAuthenticated() {
    var user = getCurrentUser();
    if (user) {
      return true;
    }
    return false;
  }

  
  
  
  
  function getDashboardUrl(role) {
    if (role === 'student') return 'student-dashboard.html';
    if (role === 'teacher') return 'teacher-dashboard.html';
    if (role === 'admin') return 'admin-dashboard.html';
    return 'index.html';
  }

  
  
  
  
  
  
  
  
  
  
  function requireRole(allowedRoles) {
    var user = getCurrentUser();

    
    if (!user) {
      window.location.href = 'login.html';
      return false;
    }

    
    if (allowedRoles && allowedRoles.indexOf(user.role) === -1) {
      window.location.href = 'access-denied.html';
      return false;
    }

    
    return true;
  }


  
  
  
  
  
  
  
  
  
  
  
  

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
