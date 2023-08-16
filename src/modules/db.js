// Don't ask why tables are named this way ... keeping

module.exports = (App) => {
  const isUberspace = !!process.env.UBERSPACE

  if (isUberspace) {
    console.log('INFO: using live database')
  }

  const db = isUberspace
    ? {
        database: 'arrrg_stats_karol',
        username: 'arrrg',
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
        logging: false,
      }

  require('../lib/dbModel.js')(App, db)
}
