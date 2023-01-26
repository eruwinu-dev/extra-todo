import prisma from "@/prisma/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
	deleted: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { todoId } = req.body
	const todo = await prisma.todo.delete({
		where: { id: todoId },
	})
	res.status(200).json({ deleted: Boolean(todo) })
}

export default handler

