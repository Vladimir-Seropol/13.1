
export async function fetchUsers(){
	const response = await fetch('http://jsonplaceholder.typicode.com/users')
	const users = await response.json()
	 console.log(users)
	return users
 }
 fetchUsers()