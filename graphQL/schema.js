const { buildSchema } = require('graphql')


module.exports = buildSchema(`
	
	type TestType{
		count: Int!
		users: [User!]!
	}
	type User{
		name: String!
		email: String!
		age: Int!
}

	type Todo{
		id: ID!
		title: String!
		done: Boolean!
		createdAt: String
		updatedAt: String
	}


	type Query{
		test: TestType!
		random(min: Int!, max: Int!, count: Int!): [Float!]!
		getTodos: [Todo!]!
	}

	input UserInput{
		name: String!
		email: String!
	}

	input TodoInput{
		title: String!
	}


	type Mutation{
		addTestUser(user: UserInput!): User!
		createTodo(todo: TodoInput!): Todo!
		completeTodo(id: ID!) : Todo!
		deleteTodo(id: ID!) : Boolean!
	}
`)
 //Query - это когда получение какихто данных аналог GET запроса
 //ID - тип в Graphql