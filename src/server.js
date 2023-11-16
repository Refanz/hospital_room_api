const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/api/users', (req, res, next) => {
  const emailExists = router.db.get
    .get('users')
    .some({ email: req.body.email })
    .value();

  if (emailExists) {
    return res.status(400).send('Email already exists');
  }

  next();
});

server.use('/api', router);

server.listen(3000, () => {
  console.log('JSON Server is running..');
});
