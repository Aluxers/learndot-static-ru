const { connectBlobs, getUsers, publicUser, json } = require('./lib/users');

exports.handler = async function (event) {
  connectBlobs(event);

  const users = await getUsers();

  return json({
    success: true,
    users: users.map(publicUser)
  });
};
