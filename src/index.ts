import restify from 'restify'
import RouterManager from './routes'
import { Router } from 'restify-router'
import logger from 'morgan'
import corsMiddleware  from 'restify-cors-middleware2'
const router = new Router()
// authorization Bearer
const cors = corsMiddleware({
  preflightMaxAge: 5, // Optional
  origins        : [ 'http://localhost:3000', 'http://localhost:3001' ],
  allowHeaders   : [ 'API-Token', 'Authorization', 'ApiService' ], // explicarselos detalladamente el viernes ->
  exposeHeaders  : [ 'API-Token-Expiry' ]
})
const server = restify.createServer()

server.pre(cors.preflight)
server.use(cors.actual)
server.use(logger('dev'))
server.use(restify.plugins.queryParser())

server.use(restify.plugins.bodyParser({
  maxBodySize: 5000
}))

router.get('/', (req, res) => res.json({ status: 'available' }))

router.add('/api/v1', RouterManager)
router.applyRoutes(server)

server.listen(process.env.PORT, function() {
  console.log('%s listening at %s', process.env.APPLICATION_NAME, `http://localhost:${process.env.PORT}`)
})
