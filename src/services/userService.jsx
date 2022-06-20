export const setLocalUser = user => {
	localStorage.setItem('user', JSON.stringify(user))
}

export const getLocalUser = () => {
	const user = localStorage.getItem('user')
	return user ? JSON.parse(user) : {}
}
