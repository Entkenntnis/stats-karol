import type { App } from '../types.ts'

export default (App: App) => {
  App.metrics = {
    pageviewCounter: 0,
    heartsCounter: 0,
    incrementPageview() {
      App.metrics.pageviewCounter += 1
    },
    incrementHearts() {
      App.metrics.heartsCounter += 1
    },
  }
}
