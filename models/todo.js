const { Sequelize } = require('sequelize')
const sequelize = require('../utils/database')

const todo = sequelize.define('Todo', {               //второй параметр опции
  id: {
    primaryKey: true,     //ставил в бд тоже  опенсервер галачку
    autoIncrement: true,             //id авто увел
    allowNull: false,
    type: Sequelize.INTEGER
  },
  done: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = todo