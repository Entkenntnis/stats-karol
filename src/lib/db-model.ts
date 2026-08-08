import { Sequelize, DataTypes, Op, type Options } from 'sequelize'
import type { App } from '../types.ts'

export function initDbModel(App: App, db: Options) {
  App.db = {} as App['db']

  App.db.Sequelize = new Sequelize(db)
  App.db.Op = Op

  App.db.QuestShare = App.db.Sequelize.define('MQuestShare', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT('medium'),
      allowNull: false,
    },
  })

  App.db.LegacyShare = App.db.Sequelize.define('MShare', {
    // outdated, but we still support reading from it
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })

  App.db.PersistentEvent = App.db.Sequelize.define('PersistentEvent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })

  App.db.ExperimentEvent = App.db.Sequelize.define('ExperimentEvent', {
    id: {
      type: DataTypes.STRING(21),
      primaryKey: true,
    },
    event: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
  })
}
