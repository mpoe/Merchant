type User = {
	id: string;
	username: string;
}

type RoomState = {
	phase: String,
	round: any, // set after draft
	cardpool: any,
	playerDecks: any,
	draftpool: any,
	customers: Array<any>,
}

type Room = {
	name: string,
	users: Array<User>,
	password: string,
	host: User,
	id: number,
	state: RoomState
}

type Customer = {
	name: string,
	budget: number,
	id: number,
}

type Card = {
	name: string,
	amount: number,
	cost: number,
	id: number,
}

export {
	Room,
	User,
	Customer,
	Card,
}