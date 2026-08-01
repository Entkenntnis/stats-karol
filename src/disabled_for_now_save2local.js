// "save2local": "cross-env UBERSPACE=1 SAVE2LOCAL=1 node src/index.js"

//   "devDependencies": {
//     "cross-env": "^10.0.0"
//   },

// module.exports = (App) => {
//   console.log('Save production database to local dev environment')

//   void (async () => {
//     await App.db.sync()

//     const LOCALAPP = {}

//     require('./lib/dbModel')(LOCALAPP, {
//       dialect: 'sqlite',
//       storage: './db.sqlite',
//       logging: false,
//     })

//     console.log('Move db to backup')
//     require('fs').renameSync('./db.sqlite', './db_backup.sqlite')

//     await LOCALAPP.db.sync()

//     console.log('Loading events ...')
//     const events = await App.db.Event.findAll({ raw: true })
//     console.log(`  ${events.length} rows loaded`)

//     console.log('  Saving events ...')
//     for (let i = 0; i < events.length; i += 10000)
//       await LOCALAPP.db.Event.bulkCreate(events.slice(i, i + 10000), {
//         silent: true,
//       })

//     console.log('Loading shares ...')
//     const shares = await App.db.QuestShare.findAll({ raw: true })
//     console.log(`  ${shares.length} rows loaded`)

//     console.log('  Saving shares ...')
//     await LOCALAPP.db.QuestShare.bulkCreate(shares, { silent: true })

//     // console.log('Loading solutions ...')
//     // const solutions = await App.db.SolutionLog.findAll({ raw: true })
//     // console.log(`  ${solutions.length} rows loaded`)

//     // console.log('  Saving solutions ...')
//     // await LOCALAPP.db.SolutionLog.bulkCreate(solutions, { silent: true })

//     console.log('Loading legacyShares ...')
//     const legacyShares = await App.db.LegacyShare.findAll({ raw: true })
//     console.log(`  ${legacyShares.length} rows loaded`)

//     console.log('  Saving legacyShares ...')
//     await LOCALAPP.db.LegacyShare.bulkCreate(legacyShares, { silent: true })

//     console.log('done')
//     process.exit()
//   })()
// }
