const { connectBlobs, getUsers, getDemoUser, publicUser, hashPassword, json } = require('./lib/users');

exports.handler = async function (event) {
  connectBlobs(event);

  if (event.httpMethod !== 'POST') {
    return json({ success: false, error: 'Метод не поддерживается.' }, 405);
  }

  const data = JSON.parse(event.body || '{}');
  const email = String(data.email || '').trim().toLowerCase();
  const password = String(data.password || '');
  const demoUser = getDemoUser(email, password);

  if (demoUser) {
    return json({
      success: true,
      user: publicUser(demoUser)
    });
  }

  const users = await getUsers();

  let found = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === email && users[i].passwordHash === hashPassword(password)) {
      found = users[i];
      break;
    }
  }

  if (!found) {
    return json({ success: false, error: 'Неверный email или пароль.' }, 401);
  }

  return json({
    success: true,
    user: publicUser(found)
  });
};
