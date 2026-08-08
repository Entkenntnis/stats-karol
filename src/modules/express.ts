import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import http from 'http'
import type { App } from '../types.ts'

export function initExpress(App: App) {
  App.express = express()
  // socket.io needs dedicated http server
  App.server = http.createServer(App.express)

  App.express.use(express.json({ limit: '1mb' }))
  App.express.use(express.urlencoded({ extended: true, limit: '1mb' })) // for parsing application/x-www-form-urlencoded

  // manage CORS
  App.express.use(function (req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Methods',
      'GET, PUT, POST, DELETE, OPTIONS',
    )
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With',
    )

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      res.sendStatus(200)
    } else {
      next()
    }
  })
}
