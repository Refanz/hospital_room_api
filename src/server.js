const jsonServer = require('json-server');
const { nanoid } = require('nanoid');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/api/users', (req, res) => {
  const usersStore = router.db.get('users').value();
  const userLogin = req.body;
  const isLogin = usersStore.some((user) => user.email === userLogin.email && user.password === userLogin.password);

  if (isLogin) {
    usersStore.map((user) => {
      if (user.email === userLogin.email && user.password === userLogin.password) {
        return res.status(200).json({
          statusCode: 200,
          messages: `Success login: ${user.email}`,
          token: nanoid(16),
        });
      }
    });
  } else {
    return res.status(400).send({
      messages: 'Login failed: email or password is not valid',
      statusCode: 400,
    });
  }
});

server.use('/api', router);

server.listen(3000, () => {
  console.log('JSON Server is running..');
});
