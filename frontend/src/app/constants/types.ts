type User = {
	id: String;
	username: String;
}

type Room = {
	name: String,
	users: Array<User>,
	password: String,
	host: String,
}

export {
	Room,
	User,
}