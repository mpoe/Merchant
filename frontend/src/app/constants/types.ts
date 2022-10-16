type User = {
	id: string;
	username: string;
}

type Room = {
	name: string,
	users: Array<User>,
	password: string,
	host: User,
	id: number,
}

export {
	Room,
	User,
}