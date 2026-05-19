const { connectBlobs, getUsers, publicUser, json } = require('./lib/users');
const { getStore } = require('@netlify/blobs');

const STORE_NAME = 'learndot-auth';
const ENROLLMENTS_KEY = 'enrollments.json';

async function getEnrollments() {
  const store = getStore(STORE_NAME);
  const raw = await store.get(ENROLLMENTS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

exports.handler = async function (event) {
  connectBlobs(event);

  const users = await getUsers();
  const enrollments = await getEnrollments();
  const counts = {};

  for (let i = 0; i < enrollments.length; i++) {
    const email = enrollments[i].email;
    if (!email) continue;
    counts[email] = (counts[email] || 0) + 1;
  }

  for (let i = 0; i < users.length; i++) {
    if (counts[users[i].email]) {
      users[i].courses = counts[users[i].email];
    }
  }

  return json({
    success: true,
    users: users.map(publicUser)
  });
};
