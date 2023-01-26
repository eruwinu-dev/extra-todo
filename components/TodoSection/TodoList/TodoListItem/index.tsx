import useAppContext from "@/context/AppState"
import { Todo } from "@prisma/client"
import React, { ChangeEvent, MouseEvent } from "react"
import EditTodo from "../../EditTodo"

type Props = {
	todo: Todo
}

const TodoListItem = ({ todo }: Props) => {
	const { toggleTodo, deleteTodo, selectedTodoId, selectTodo } = useAppContext()

	const toggleTodoHandler = async (event: ChangeEvent<HTMLInputElement>) => await toggleTodo(todo.id, !todo.completed)

	const selectTodoHandler = (event: MouseEvent<HTMLButtonElement>) => selectTodo(todo.id)

	const deleteTodoHandler = async (event: MouseEvent<HTMLButtonElement>) => await deleteTodo(todo.id)

	if (selectedTodoId === todo.id) return <EditTodo />

	return (
		<div className="w-full grid grid-cols-6 grid-flow-row gap-4 pl-4 pr-8">
			<div className={["col-span-5 inline-flex items-center", todo.completed ? "line-through" : ""].join(" ")}>
				<input type="checkbox" checked={todo.completed} onChange={toggleTodoHandler} />
				<span className="ml-4">{todo.name}</span>
			</div>
			<div className="col-span-1 inline-flex space-x-4">
				<button
					type="button"
					className="rounded-lg px-2 py-1.5 font-semibold border-2 border-blue-700 text-blue-700"
					onClick={selectTodoHandler}
				>
					Edit
				</button>
				<button
					type="button"
					className="rounded-lg px-2 py-1.5 font-semibold border-2 border-red-700 text-red-700"
					onClick={deleteTodoHandler}
				>
					Delete
				</button>
			</div>
		</div>
	)
}

export default TodoListItem

