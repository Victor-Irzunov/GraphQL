const { Router } = require('express')
const Todo = require('../models/todo')
const chalk = require('chalk')
const router = Router()

//++ получение
router.get('/', async (req, res) => {
	//! проверка res.json({a:1})        //в браузере 3000/api/todo
	try {
		const todos = await Todo.findAll()
		res.status(200).json(todos)
	}
	catch (err) {
		res.status(500).json({
			message: 'Server error'
		})
	}
})

//++ создание
router.post('/', async (req, res) => {

	try {
		const todo = await Todo.create({                 //можно build().save() №92. Создание задачи
			title: req.body.title,
			done: false

		})
		res.status(201).json({ todo })       //201 по RST API клиент был создан           //{todo} чтобы по ключу туду был создан обьект  №92. Создание задачи
	}
	catch (err) {
		res.status(500).json({
			message: 'Server error'
		})
	}
})

//++ изменение
router.put('/:id', async (req, res) => {
	try {
		const todo = await Todo.findByPk(+req.params.id)               //в монгузе findById //в sequelize findByPk
		todo.done = req.body.done
		await todo.save()
		res.status(200).json({todo})
	}
	catch (err) {
		res.status(500).json({
			message: 'Server error'
		})
	}
})

//++ удаление
router.delete('/:id',async (req, res) => {
	try {
		const todos = await Todo.findAll({                 //можно было .findByPk  //.findAll возвращает массив
			where: {                                    //если нам нужно найти именно тот todo - id который передаем /:id
				id: +req.params.id
			}
		})

		const todo = todos[0]
		await todo.destroy()                   //.destroy() дестрой возвр промис
		res.status(204).json({})               //204 контента нет но всё прощло упешно
	}
	catch (err) {
		res.status(500).json({
			message: 'Server error'
		})
	}
})





module.exports = router