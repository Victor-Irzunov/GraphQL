const { Sequelize } = require('sequelize')


const SCHEMA_DB_NAME = 'node-todo'
const USER_NAME = 'root_root'
const PASSWORD = '1qaz-2wsx-3edc'

const sequelize = new Sequelize(SCHEMA_DB_NAME, USER_NAME, PASSWORD, {         //инициализируемм БД
	host: 'localhost',
	dialect: 'mysql'
})


module.exports = sequelize