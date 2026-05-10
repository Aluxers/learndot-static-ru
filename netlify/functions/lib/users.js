const crypto = require('crypto');
const { connectLambda, getStore } = require('@netlify/blobs');

const STORE_NAME = 'learndot-auth';
const USERS_KEY = 'users.json';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function connectBlobs(event) {
  connectLambda(event);
}

function makeDemoUsers() {
  return [
    {
      id: 'u1',
      avatar: 'images/avatars/anna-student.png',
      name: 'Анна Студент',
      email: 'student@demo.com',
      passwordHash: hashPassword('password'),
      role: 'student',
      status: 'active',
      joinDate: '2026-01-01',
      courses: 4
    },
    {
      id: 'u2',
      avatar: 'images/avatars/mark-teacher.png',
      name: 'Марк Преподаватель',
      email: 'teacher@demo.com',
      passwordHash: hashPassword('password'),
      role: 'teacher',
      status: 'active',
      joinDate: '2026-01-01',
      courses: 6
    },
    {
      id: 'u3',
      avatar: 'images/avatars/david-admin.png',
      name: 'Давид Админ',
      email: 'admin@demo.com',
      passwordHash: hashPassword('password'),
      role: 'admin',
      status: 'active',
      joinDate: '2026-01-01',
      courses: 0
    }
  ];
}

function getDemoUser(email, password) {
  const users = makeDemoUsers();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanHash = hashPassword(String(password || ''));

  for (let i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === cleanEmail && users[i].passwordHash === cleanHash) {
      return users[i];
    }
  }

  return null;
}

function publicUser(user) {
  return {
    id: user.id,
    avatar: user.avatar || '',
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status || 'active',
    joinDate: user.joinDate || '',
    courses: user.courses || 0
  };
}

async function getUsers() {
  const store = getStore(STORE_NAME);
  const raw = await store.get(USERS_KEY);
  const demoUsers = makeDemoUsers();

  if (!raw) {
    await saveUsers(demoUsers);
    return demoUsers;
  }

  try {
    const users = JSON.parse(raw);
    let changed = false;

    for (let i = 0; i < users.length; i++) {
      if (!users[i].passwordHash && users[i].password) {
        users[i].passwordHash = hashPassword(users[i].password);
        delete users[i].password;
        changed = true;
      }
    }

    for (let i = 0; i < demoUsers.length; i++) {
      const demoUser = demoUsers[i];
      let found = false;

      for (let j = 0; j < users.length; j++) {
        if (users[j].email.toLowerCase() === demoUser.email.toLowerCase()) {
          users[j].passwordHash = demoUser.passwordHash;
          users[j].role = demoUser.role;
          users[j].status = 'active';
          found = true;
          changed = true;
          break;
        }
      }

      if (!found) {
        users.push(demoUser);
        changed = true;
      }
    }

    if (changed) {
      await saveUsers(users);
    }

    return users;
  } catch (e) {
    await saveUsers(demoUsers);
    return demoUsers;
  }
}

async function saveUsers(users) {
  const store = getStore(STORE_NAME);
  await store.set(USERS_KEY, JSON.stringify(users));
}

function json(data, statusCode) {
  return {
    statusCode: statusCode || 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  };
}

module.exports = {
  connectBlobs,
  getUsers,
  saveUsers,
  getDemoUser,
  publicUser,
  hashPassword,
  json
};
