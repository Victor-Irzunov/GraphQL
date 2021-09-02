const express = require('express')
const sequelize = require('./utils/database')
const chalk = require('chalk')
const path = require('path')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphQL/schema')
const resolver = require('./graphQL/resolver')
const app = express()
const PORT = process.env.PORT || 3000


app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())                         //парсить json файлы 

app.use(graphqlHTTP({
	schema: schema,
	rootValue: resolver,
	graphiql: true
}))
app.use((req, res, next) => {
	res.sendFile(__dirname + "/index.html")    //вызвать один файл
})

async function start() {
	try {
		await sequelize.sync()           //force: true перетирать 

		app.listen(PORT, () => console.log(chalk.cyan('------------Сервер запущен---------------/graphQL')))

	}
	catch (error) {
		console.log(chalk.red('Витя ошибка:', error, '---------index start()'))
	}
}

start()


