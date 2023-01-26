import TodoSection from "@/components/TodoSection"
import useAppContext from "@/context/AppState"
import getTodos from "@/utils/getTodos"
import getUser from "@/utils/getUser"
import { Todo, User } from "@prisma/client"
import { GetServerSideProps } from "next"
import { signOut } from "next-auth/react"
import Head from "next/head"
import React, { MouseEvent, useEffect, useRef } from "react"

type Props = {
	user: User
	todos: Todo[]
}

const Home = ({ user, todos }: Props) => {
	const { setUser, setTodos } = useAppContext()
	const signOutHandler = async (event: MouseEvent<HTMLButtonElement>) => await signOut()

	const calledOnce = useRef(false)

	useEffect(() => {
		if (calledOnce.current) return
		else {
			setUser(user)
			setTodos(todos)
			calledOnce.current = true
		}
		return () => {}
	}, [setUser, setTodos])

	return (
		<>
			<Head>
				<title>Home | Extra Todo</title>
			</Head>
			<section className="w-full min-h-screen">
				<div className="w-full inline-flex items-center justify-end space-x-4 p-4">
					<div>
						<span className="font-semibold my-auto">{user.name}</span>
					</div>
					<button
						type="button"
						className="w-fit rounded-lg px-2 py-1.5 font-semibold border-2 border-black"
						onClick={signOutHandler}
					>
						Sign Out
					</button>
				</div>
				<TodoSection />
			</section>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const user = await getUser(context)

	if (!user) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}
	}

	const todos = await getTodos(user.id)

	return {
		props: {
			user,
			todos,
		},
	}
}

export default Home

