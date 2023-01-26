const fetcher = async (path: string, method: string, body: string) => {
	const result = await fetch(path, {
		method,
		headers: { "Content-Type": "application/json" },
		body,
	})
	const data = await result.json()
	return data
}

export default fetcher

