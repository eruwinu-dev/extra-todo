import prisma from "@/prisma/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import { Todo } from "@prisma/client"

type Data = {
	todo: Todo
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const values = req.body
	const todo = await prisma.todo.create({
		data: values,
	})
	res.status(200).json({ todo })
}

export default handler

