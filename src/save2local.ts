import fs from 'node:fs'
import initSecrets from './modules/secrets.ts'
import initDb from './modules/db.ts'
import initDbModel from './lib/dbModel.ts'
import sqlite3Compat from './lib/sqlite3-compat.ts'
import type { App } from './types.ts'

const App = {} as App

initSecrets(App)
initDb(App)

const MODELS = [
  'QuestShare',
  'LegacyShare',
  'PersistentEvent',
  'ExperimentEvent',
] as const

interface CopyableModel {
  findAll: (options?: object) => Promise<Record<string, unknown>[]>
  bulkCreate: (
    rows: Record<string, unknown>[],
    options?: object,
  ) => Promise<unknown>
}

void (async () => {
  if (!process.env.UBERSPACE) {
    console.error('This script pulls from the production database.')
    console.error('Run it with UBERSPACE=1, e.g. via npm run save2local.')
    process.exit(1)
  }

  console.log('Save production database to local dev environment')

  await App.db.Sequelize.sync()

  const LOCALAPP = {} as App

  initDbModel(LOCALAPP, {
    dialect: 'sqlite',
    storage: './db.sqlite',
    dialectModule: sqlite3Compat,
    logging: false,
  })

  if (fs.existsSync('./db.sqlite')) {
    console.log('Move db to backup')
    fs.renameSync('./db.sqlite', './db_backup.sqlite')
  }

  await LOCALAPP.db.Sequelize.sync()

  for (const name of MODELS) {
    const source = App.db[name] as unknown as CopyableModel
    const target = LOCALAPP.db[name] as unknown as CopyableModel

    console.log(`Loading ${name} ...`)
    const rows = await source.findAll({ raw: true })
    console.log(`  ${rows.length} rows loaded`)

    console.log(`  Saving ${name} ...`)
    for (let i = 0; i < rows.length; i += 10000) {
      await target.bulkCreate(rows.slice(i, i + 10000), { silent: true })
    }
  }

  console.log('done')
  process.exit()
})()
