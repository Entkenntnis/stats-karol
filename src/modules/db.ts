import sqlite3Compat from '../lib/sqlite3-compat.ts'
import initDbModel from '../lib/dbModel.ts'
import type { App } from '../types.ts'
import type { Options } from 'sequelize'

export default (App: App) => {
  const isUberspace = !!process.env.UBERSPACE

  if (isUberspace) {
    console.log('INFO: using live database')
  }

  const db: Options = isUberspace
    ? {
        database: 'karol_stats_karol',
        username: 'karol',
        password: App.secrets.db_password,
        dialect: 'mariadb',
        dialectOptions: {
          timezone: 'Europe/Berlin',
        },
        logging: false,
      }
    : {
        dialect: 'sqlite',
        storage: './db.sqlite',
        dialectModule: sqlite3Compat,
        logging: false,
      }

  initDbModel(App, db)
}
