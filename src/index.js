const App = {}

require("./modules/secrets.js")(App)
require("./modules/db.js")(App)
require("./modules/express.js")(App)
require("./modules/io.js")(App)

require("./routes/share_quest.js")(App)
require("./routes/quest-load.js")(App)
require("./routes/load.js")(App)

require("./app.js")(App)

// if (process.env.SAVE2LOCAL) {
//   require("./save2local.js")(App)
// } else {
// }
