import React, { useState } from "react"

type Props = {}

const Counter = (props: Props) => {
	const [count, setCount] = useState<number>(0)
	return (
		<div className="w-1/3 mx-auto">
			Counter: {count} <br />
			<button onClick={() => setCount((count) => count + 1)}>Add</button>
			<button onClick={() => setCount((count) => count - 1)}>Subtract</button>
		</div>
	)
}

export default Counter

