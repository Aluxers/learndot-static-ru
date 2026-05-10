const { connectBlobs, getUsers, saveUsers, publicUser, hashPassword, json } = require('./lib/users');

exports.handler = async function (event) {
  connectBlobs(event);

  if (event.httpMethod !== 'POST') {
    return json({ success: false, error: 'Метод не поддерживается.' }, 405);
  }

  const data = JSON.parse(event.body || '{}');
  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim().toLowerCase();
  const password = String(data.password || '');
  let role = String(data.role || 'student');

  if (!name || !email || !password) {
    return json({ success: false, error: 'Заполните все поля.' }, 400);
  }

  if (['student', 'teacher', 'admin'].indexOf(role) === -1) {
    role = 'student';
  }

  const users = await getUsers();

  for (let i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === email) {
      return json({ success: false, error: 'Аккаунт с таким email уже существует.' }, 409);
    }
  }

  const newUser = {
    id: 'u' + Date.now(),
    avatar: '',
    name: name,
    email: email,
    passwordHash: hashPassword(password),
    role: role,
    status: 'active',
    joinDate: new Date().toISOString().slice(0, 10),
    courses: 0
  };

  users.push(newUser);
  await saveUsers(users);

  return json({
    success: true,
    user: publicUser(newUser)
  });
};
