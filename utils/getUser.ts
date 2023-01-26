import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"

import prisma from "../prisma/prisma"

type Props = {}

const getUser = async (context: GetServerSidePropsContext) => {
	const session = await getSession(context)
	if (!session || !session.user) return null

	const user = await prisma.user.findUnique({
		where: { email: session.user.email || "" },
	})

	return user
}

export default getUser

