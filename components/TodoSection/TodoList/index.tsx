import useAppContext from "@/context/AppState"
import React from "react"
import AddTodo from "../AddTodo"
import TodoListItem from "./TodoListItem"

type Props = {}

const TodoList = (props: Props) => {
	const { todos } = useAppContext()
	return (
		<div className="h-full space-y-4">
			<AddTodo />
			{todos.length ? todos.map((todo) => <TodoListItem key={todo.id} todo={todo} />) : <h3>No todos.</h3>}
		</div>
	)
}

export default TodoList

