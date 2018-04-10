import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import config, { env } from './config';
import routes from './routes/v1';
import models from './models';

import socketEvents from './socket';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
socketEvents(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

models.sequelize
  .authenticate()
  .then(() => {
    console.log(
      'DB Connection has been established successfully:',
      config.db_name,
    );
  })
  .catch(err => {
    console.error('There is connection in ERROR:', config.db_name, err);
  });

// if (env === 'development') {
models.sequelize.sync();
// models.sequelize.sync({ force: true }); // for test
// }

app.use('/api/v1', routes);

if (env === 'development') {
  const swaggerDocument = YAML.load('./swagger.yml');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use('/api/*', (req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = env === 'development' ? err : {};

  res.status(err.status || 500);

  res.json({
    success: false,
    message: err.message,
    error: env === 'development' ? err : {},
  });
});

if (env === 'production') {
  const path = require('path');

  app.use(
    '/static',
    express.static(path.join(__dirname, '../src', 'client', 'build', 'static')),
  );

  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '../src', 'client', 'build', 'index.html'),
    );
  });
}

server.listen(config.port, err => {
  if (err) {
    console.log(err);
  }
  console.info(`==> Started on port ${server.address().port}`);
});

export default app;
