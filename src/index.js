import initSecrets from './modules/secrets.js'
import initDb from './modules/db.js'
import initExpress from './modules/express.js'
import initIo from './modules/io.js'

import initShareQuest from './routes/share_quest.js'
import initQuestLoad from './routes/quest-load.js'
import initLoad from './routes/load.js'
import initPersistentEvent from './routes/persistent_event.js'

import start from './app.js'

const App = {}

initSecrets(App)
initDb(App)
initExpress(App)
initIo(App)

initShareQuest(App)
initQuestLoad(App)
initLoad(App)
initPersistentEvent(App)

start(App)

// if (process.env.SAVE2LOCAL) {
//   import('./save2local.js').then(({ default: initSave2local }) => initSave2local(App))
// } else {
// }
