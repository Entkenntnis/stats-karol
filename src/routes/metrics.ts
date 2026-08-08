import type { Request, Response } from 'express'
import type { App } from '../types.ts'

export function initMetricsRoutes(App: App) {
  App.express.post('/pageview', (req: Request, res: Response) => {
    App.metrics.incrementPageview()
    res.send('ok')
  })

  App.express.get('/metrics', (req: Request, res: Response) => {
    res.set('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
    res.send(renderMetrics())
  })

  function renderMetrics() {
    const lines = []
    lines.push('# HELP pageview_total Total number of pageviews')
    lines.push('# TYPE pageview_total counter')
    lines.push(`pageview_total ${App.metrics.pageviewCounter}`)
    lines.push('# HELP hearts_total Total number of hearts spawn')
    lines.push('# TYPE hearts_total counter')
    lines.push(`hearts_total ${App.metrics.heartsCounter}`)
    return lines.join('\n') + '\n'
  }
}
