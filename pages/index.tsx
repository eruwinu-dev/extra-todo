import getUser from "@/utils/getUser"
import { GetServerSideProps } from "next"
import { signIn } from "next-auth/react"
import Head from "next/head"
import React, { MouseEvent } from "react"

type Props = {}

const Home = ({}: Props) => {
	const signInHandler = async (event: MouseEvent<HTMLButtonElement>) => await signIn("google")

	return (
		<>
			<Head>
				<title>Extra Todo</title>
			</Head>
			<section className="w-full min-h-screen">
				<div className="w-1/3 mx-auto translate-y-[25%] aspect-square border-2 rounded-lg shadow-lg p-4 space-y-4 flex flex-col items-center justify-center">
					<h1 className="text-2xl font-bold tracking-wider">Extra Todo</h1>
					<p>Just another To Do practice app.</p>
					<button
						type="button"
						className="w-fit rounded-lg px-2 py-1.5 font-semibold border-2 border-black"
						onClick={signInHandler}
					>
						Google Sign In
					</button>
				</div>
			</section>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const user = await getUser(context)

	if (!user) {
		return {
			props: {
				user,
			},
		}
	}

	return {
		redirect: {
			destination: "/home",
			permanent: false,
		},
	}
}

export default Home

