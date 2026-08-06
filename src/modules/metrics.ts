import type { App } from '../types.ts'

export default (App: App) => {
  App.metrics = {
    pageviewCounter: 0,
  }

  App.metrics.incrementPageview = () => {
    App.metrics.pageviewCounter += 1
  }
}
