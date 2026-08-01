const { Sequelize, DataTypes, Op } = require("sequelize")

module.exports = (App, db) => {
  App.db = new Sequelize(db)
  App.db.Op = Op

  App.db.QuestShare = App.db.define("MQuestShare", {
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
      type: DataTypes.TEXT("medium"),
      allowNull: false,
    },
  })

  App.db.LegacyShare = App.db.define("MShare", {
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

  App.db.PersistentEvent = App.db.define("PersistentEvent", {
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
}
