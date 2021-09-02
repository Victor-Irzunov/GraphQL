
new Vue({
	el: '#app',
	data() {
		return {
			isDark: true,
			show: true,
			todoTitle: '',
			todos: []
		}
	},
	created() {
		//const query - описываем обычныйjs обьект
		//query{ запрос а не мутацию
		const query = `
		query {
			getTodos {
				id title done createdAt updatedAt
			}
		}
	`
		fetch('/graphql', {                   //всегда только '/graphql' др роутов нет graphql
			method: 'post',                   //всегда только метод post это правило graphql
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ query: query })      //{ query: query } обязат правило graphql
		})
			.then(res => res.json())
			.then(response => {
				this.todos = response.data.getTodos
			})
	},
	methods: {
		addTodo() {
			const title = this.todoTitle.trim()          //todoTitle input
			if (!title) {
				return
			}
			const query = `
		mutation {
			createTodo (todo: {title: "${title}"}){
				id title done createdAt updatedAt
			}
		}
	`
			fetch('/graphql', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({ query })
			})
				.then(res => res.json())                //fetch вернет нам
				.then(response => {
					const todo = response.data.createTodo
					this.todos.push(todo)
					this.todoTitle = ''
				})
				.catch(e => console.log(e))
		},
		//++ удаление
		removeTodo(id) {
			const query = `
			mutation {
				deleteTodo(id: "${id}")
			}
			`
			fetch('/graphql', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({ query })
			})
				.then(() => {
					this.todos = this.todos.filter(t => t.id !== id)
				})
				.catch(e => console.log(e))
		},
		//++ изменение
		completeTodo(id) {
			const query = `
			mutation {
				completeTodo (id: "${id}"){
					updatedAt
				}
			}
		`
			fetch('/graphql', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({ query })
			})
				.then(res => res.json())
				.then(response => {                                    //ф-цию описыаю и забераю одно поле todo
					const idx = this.todos.findIndex(t => t.id === id)
					this.todos[idx].updatedAt = response.data.completeTodo.updatedAt
				})
				.catch(e => console.log('Витя ошибка: ', e, '---измнение------app'))
		}
	},
	filters: {
		capitalize(value) {
			return value.toString().charAt(0).toUpperCase() + value.slice(1)
		},
		date(value, withTime) {
			const options = {
				year: 'numeric',
				month: 'long',
				day: '2-digit'
			}

			if (withTime) {
				options.hour = '2-digit'
				options.minute = '2-digit'
				options.second = '2-digit'
			}
			return new Intl.DateTimeFormat('ru-RU', options).format(new Date(+value))
		}
	}
})