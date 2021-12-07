import restify from 'restify';
import RouterManager from './routes';
import {Router} from 'restify-router';
import logger from 'morgan';
import mongoose from 'mongoose';
const router = new Router();

const server = restify.createServer();

server.use(logger('dev'));
server.use(restify.plugins.queryParser());

server.use(restify.plugins.bodyParser({
  maxBodySize: 5000,
}));

router.add('/api/v1', RouterManager);
router.applyRoutes(server);

console.log(process.env.APPLICATION);
server.listen(process.env.PORT, function() {
  console.log('%s listening at %s', process.env.APPLICATION_NAME, `http://localhost:${process.env.PORT}`);
});
