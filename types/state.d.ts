import { Todo, User } from "@prisma/client"
import { TodoForm } from "./form"

export interface StateContextType {
	user: User | null
	setUser: Dispatch<SetStateAction<User | null>>
	todos: Todo[]
	setTodos: Dispatch<SetStateAction<Todo[]>>
	selectedTodoId: string | null
	addTodo: (values: TodoForm) => Promise<string | undefined>
	toggleTodo: (todoId: string, completed: boolean) => Promise<boolean | undefined>
	editTodo: (values: TodoForm) => Promise<boolean | undefined>
	deleteTodo: (todoId: string) => Promise<boolean | undefined>
	selectTodo: (todoId: string | null) => void
	findTodo: (todoId: string) => Todo | undefined
}

