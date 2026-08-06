import initSecrets from './modules/secrets.ts'
import initDb from './modules/db.ts'
import initExpress from './modules/express.ts'
import initIo from './modules/io.ts'
import initMetrics from './modules/metrics.ts'

import initShareQuest from './routes/share_quest.ts'
import initQuestLoad from './routes/quest-load.ts'
import initLoad from './routes/load.ts'
import initPersistentEvent from './routes/persistent_event.ts'
import initMetricsRoutes from './routes/metrics.ts'
import initExperimentEvent from './routes/experiment_event.ts'
import type { App } from './types.ts'

const preApp: any = {}

initSecrets(preApp)
initDb(preApp)
initExpress(preApp)
initIo(preApp)
initMetrics(preApp)

const App: App = preApp

initShareQuest(App)
initQuestLoad(App)
initLoad(App)
initPersistentEvent(App)
initMetricsRoutes(App)
initExperimentEvent(App)

void (async function start() {
  await App.db.sync()
  App.server.listen(3006, () => {
    console.log('server started on port 3006')
  })
})()

// if (process.env.SAVE2LOCAL) {
//   import('./save2local.js').then(({ default: initSave2local }) => initSave2local(App))
// } else {
// }
