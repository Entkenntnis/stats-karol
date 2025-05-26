const App = {}

require('./modules/secrets.js')(App)
require('./modules/db.js')(App)
require('./modules/express.js')(App)
require('./modules/io.js')(App)
require('./modules/cache.js')(App)

require('./routes/submit.js')(App)
require('./routes/submitSolution.js')(App)
require('./routes/highscore.js')(App)
require('./routes/mod.js')(App)
require('./routes/share_quest.js')(App)
require('./routes/quest-load.js')(App)
require('./routes/load.js')(App)
require('./routes/export.js')(App)
require('./routes/exportSolutions.js')(App)
require('./routes/kpi.js')(App)
require('./routes/random.js')(App)

require('./routes/load_image.js')(App)
require('./routes/share_image.js')(App)

if (process.env.SAVE2LOCAL) {
  require('./save2local.js')(App)
} else {
  require('./app.js')(App)
}
