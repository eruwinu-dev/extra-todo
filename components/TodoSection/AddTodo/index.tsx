import useAppContext from "@/context/AppState"
import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { TodoForm } from "@/types/form"

type Props = {}

const addTodoSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
})

const addTodoInitial: TodoForm = {
	name: "",
}

const AddTodo = (props: Props) => {
	const { addTodo } = useAppContext()
	return (
		<Formik
			initialValues={addTodoInitial}
			validationSchema={addTodoSchema}
			onSubmit={async (values, { resetForm }) => {
				const todoId = await addTodo(values)
				if (!todoId) return
				resetForm()
			}}
		>
			{({ values, errors, touched }) => (
				<Form className="w-full space-y-2">
					<div className="w-full grid grid-cols-6 grid-flow-row gap-4">
						<Field
							as="input"
							type="text"
							name="name"
							placeholder="Your Todo"
							className={[
								"col-span-5 p-2 border-2 rounded-lg",
								touched.name && errors.name
									? "border-red-500 focus:outline-none focus:border-red-500"
									: "",
							].join(" ")}
						/>
						<button
							type="submit"
							className="w-full rounded-lg px-2 py-1.5 font-semibold border-2 border-green-700 text-green-700"
						>
							Add
						</button>
					</div>
					<ErrorMessage
						name="name"
						render={(msg) => (
							<div>
								<span className="text-red-700">{msg}</span>
							</div>
						)}
					/>
				</Form>
			)}
		</Formik>
	)
}

export default AddTodo

