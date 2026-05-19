const { getStore } = require('@netlify/blobs');
const { connectBlobs, getUsers, saveUsers, json } = require('./lib/users');

const STORE_NAME = 'learndot-auth';
const ENROLLMENTS_KEY = 'enrollments.json';

async function getAllEnrollments() {
  const store = getStore(STORE_NAME);
  const raw = await store.get(ENROLLMENTS_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

async function saveAllEnrollments(enrollments) {
  const store = getStore(STORE_NAME);
  await store.set(ENROLLMENTS_KEY, JSON.stringify(enrollments));
}

async function updateUserCourseCount(email, userId) {
  const users = await getUsers();
  const enrollments = await getAllEnrollments();
  let count = 0;

  for (let i = 0; i < enrollments.length; i++) {
    if (enrollments[i].email === email || enrollments[i].userId === userId) {
      count++;
    }
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email || users[i].id === userId) {
      users[i].courses = count;
      break;
    }
  }

  await saveUsers(users);
}

exports.handler = async function (event) {
  connectBlobs(event);

  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters || {};
    const email = String(params.email || '').trim().toLowerCase();
    const userId = String(params.userId || '').trim();
    const enrollments = await getAllEnrollments();

    const list = enrollments.filter(function (item) {
      return (email && item.email === email) || (userId && item.userId === userId);
    });

    return json({ success: true, enrollments: list });
  }

  if (event.httpMethod !== 'POST') {
    return json({ success: false, error: 'Метод не поддерживается.' }, 405);
  }

  const data = JSON.parse(event.body || '{}');
  const email = String(data.email || '').trim().toLowerCase();
  const userId = String(data.userId || '').trim();
  const courseId = String(data.courseId || '').trim();

  if (!email || !courseId) {
    return json({ success: false, error: 'Не хватает данных для записи.' }, 400);
  }

  const enrollments = await getAllEnrollments();
  const enrollment = {
    userId: userId,
    email: email,
    courseId: courseId,
    enrolledDate: data.enrolledDate || new Date().toISOString().slice(0, 10),
    progress: Number(data.progress || 0),
    status: data.status || 'in-progress'
  };

  let found = false;
  for (let i = 0; i < enrollments.length; i++) {
    if (enrollments[i].email === email && enrollments[i].courseId === courseId) {
      enrollments[i] = enrollment;
      found = true;
      break;
    }
  }

  if (!found) {
    enrollments.push(enrollment);
  }

  await saveAllEnrollments(enrollments);
  await updateUserCourseCount(email, userId);

  return json({ success: true, enrollment: enrollment });
};
