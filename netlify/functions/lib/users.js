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

  if (!raw) {
    const demoUsers = makeDemoUsers();
    await saveUsers(demoUsers);
    return demoUsers;
  }

  try {
    return JSON.parse(raw);
  } catch (e) {
    const demoUsers = makeDemoUsers();
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
  publicUser,
  hashPassword,
  json
};
