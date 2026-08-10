import { createHash, timingSafeEqual } from 'node:crypto'
import type { App } from '../types.ts'
import type { NextFunction, Request, Response } from 'express'

export function initExport(App: App) {
  function isAuthorized(token: string | undefined): boolean {
    if (!token) return false

    const expected = App.secrets.backend_password || ''
    const expectedHash = createHash('sha256').update(expected).digest()
    const actualHash = createHash('sha256').update(token).digest()

    return timingSafeEqual(actualHash, expectedHash)
  }

  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization
    const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined

    if (!isAuthorized(token)) {
      res.status(401).send('unauthorized')
      return
    }
    next()
  }

  App.express.get(
    '/export/persistent_events',
    requireAuth,
    async (req: Request, res: Response) => {
      try {
        const events = await App.db.PersistentEvent.findAll({
          order: [['id', 'DESC']],
          limit: 10000,
          raw: true,
        })
        res.json(events)
      } catch (e) {
        console.log(e)
        res.status(500).send('internal error')
      }
    },
  )

  App.express.get(
    '/export/shares',
    requireAuth,
    async (req: Request, res: Response) => {
      try {
        const shares = await App.db.QuestShare.findAll({
          order: [['id', 'DESC']],
          limit: 1000,
          raw: true,
        })
        res.json(shares)
      } catch (e) {
        console.log(e)
        res.status(500).send('internal error')
      }
    },
  )

  App.express.get(
    '/export/experiments',
    requireAuth,
    async (req: Request, res: Response) => {
      try {
        const experiments = await App.db.ExperimentEvent.findAll({
          raw: true,
        })
        res.json(experiments)
      } catch (e) {
        console.log(e)
        res.status(500).send('internal error')
      }
    },
  )
}
