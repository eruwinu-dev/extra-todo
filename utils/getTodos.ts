import prisma from "../prisma/prisma"

type Props = {}

const getTodos = async (userId: string) => {
	const todos = await prisma.todo.findMany({
		where: { userId },
	})
	return todos
}

export default getTodos

