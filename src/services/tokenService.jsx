export const setToken = newToken => {
	localStorage.setItem('accessToken', newToken)
}
export const getToken = () => {
	return localStorage.getItem('accessToken') ?? false
}
