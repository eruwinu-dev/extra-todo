import prisma from "@/prisma/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
	toggled: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { todoId, completed } = req.body
	const todo = await prisma.todo.update({
		where: { id: todoId },
		data: { completed },
	})
	res.status(200).json({ toggled: Boolean(todo) })
}

export default handler

