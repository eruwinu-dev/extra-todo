import useAppContext from "@/context/AppState"
import React, { MouseEvent } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { TodoForm } from "@/types/form"

type Props = {}

const editTodoSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
})

const EditTodo = (props: Props) => {
	const { editTodo, selectedTodoId, findTodo, selectTodo } = useAppContext()

	const selectedTodo = selectedTodoId ? findTodo(selectedTodoId) : undefined

	const editTodoInitial: TodoForm = {
		name: selectedTodo ? selectedTodo.name : "",
	}

	const deSelectHandler = (event: MouseEvent<HTMLButtonElement>) => selectTodo(null)

	return (
		<Formik
			initialValues={editTodoInitial}
			validationSchema={editTodoSchema}
			onSubmit={async (values, { resetForm }) => {
				const completed = await editTodo(values)
				if (!completed) return
				resetForm()
			}}
		>
			{({ values, errors, touched }) => (
				<Form className="w-full space-y-2 pr-8">
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
						<div className="col-span-1 inline-flex space-x-4">
							<button
								type="submit"
								className="rounded-lg px-2 py-1.5 font-semibold border-2 border-cyan-700 text-cyan-700"
							>
								Save
							</button>
							<button
								type="button"
								className="rounded-lg px-2 py-1.5 font-semibold border-2 border-gray-700 text-gray-700"
								onClick={deSelectHandler}
							>
								Cancel
							</button>
						</div>
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

export default EditTodo

