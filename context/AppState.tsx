import fetcher from "@/lib/fetcher"
import { TodoForm } from "@/types/form"
import { StateContextType } from "@/types/state"
import { Todo, User } from "@prisma/client"
import React, { createContext, ReactNode, useContext, useState } from "react"

type Props = {
	children: ReactNode
}

const AppContext = createContext<StateContextType | null>(null)

export const AppProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null)
	const [todos, setTodos] = useState<Todo[]>([])
	const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null)

	const addTodo = async (values: TodoForm) => {
		let newTodo: Todo | undefined = undefined
		if (!user) return
		try {
			const body = { ...values, userId: user.id, completed: false }
			const { todo } = await fetcher("/api/todo/add", "POST", JSON.stringify(body))
			newTodo = todo
		} catch (error) {
			console.error(error)
		} finally {
			if (!newTodo) return
			const newTodos = [...todos, newTodo]
			setTodos(newTodos)
		}
		return newTodo.id
	}

	const toggleTodo = async (todoId: string, completed: boolean) => {
		let toggleComplete: boolean = false
		const newTodos = todos.map((todo) => (todo.id === todoId ? { ...todo, completed } : todo))
		setTodos(newTodos)
		try {
			const { toggled } = await fetcher(
				"/api/todo/toggle",
				"PATCH",
				JSON.stringify({ todoId, completed: completed })
			)
			toggleComplete = toggled
		} catch (error) {
			console.error(error)
		} finally {
			if (!toggleComplete) return
		}
		return toggleComplete
	}

	const editTodo = async (values: TodoForm) => {
		if (!selectedTodoId) return
		const newTodos = todos.map((todo) => (todo.id === selectedTodoId ? { ...todo, name: values.name } : todo))
		setTodos(newTodos)
		selectTodo(null)
		let completed: boolean = false
		try {
			const { updated } = await fetcher(
				"/api/todo/update",
				"PATCH",
				JSON.stringify({ ...values, id: selectedTodoId })
			)
			completed = updated
		} catch (error) {
			console.error(error)
		} finally {
			if (!completed) return
		}
		return completed
	}

	const deleteTodo = async (todoId: string) => {
		let completed: boolean = false
		try {
			const newTodos = todos.filter((todo) => todo.id !== todoId)
			setTodos(newTodos)
			const { deleted } = await fetcher("/api/todo/delete", "DELETE", JSON.stringify({ todoId }))
			completed = deleted
		} catch (error) {
			console.error(error)
		} finally {
			if (!completed) return
		}
		return completed
	}

	const selectTodo = (todoId: string | null) => setSelectedTodoId(todoId)

	const findTodo = (todoId: string) => todos.find((todo) => todo.id === todoId)

	const value: StateContextType = {
		user,
		setUser,
		todos,
		setTodos,
		selectedTodoId,
		addTodo,
		editTodo,
		toggleTodo,
		deleteTodo,
		selectTodo,
		findTodo,
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

const useAppContext = () => useContext(AppContext) as StateContextType

export default useAppContext

