import prisma from "@/prisma/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
	updated: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id, name } = req.body
	const todo = await prisma.todo.update({
		where: { id },
		data: { name },
	})
	res.status(200).json({ updated: Boolean(todo) })
}

export default handler

