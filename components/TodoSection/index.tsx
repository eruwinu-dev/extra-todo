import React from "react"
import TodoList from "./TodoList"

type Props = {}

const TodoSection = ({}: Props) => {
	return (
		<div className="w-full p-4 grid lg:grid-cols-2 grid-cols-1 grid-flow-row gap-4">
			<TodoList />
		</div>
	)
}

export default TodoSection

