type User = {
	id: string;
	username: string;
}

enum GamePhase { // use these values in app
	LOBBY_PHASE = 'lobby',
	DRAFT_PHASE = 'draft',
	GAME_PHASE = 'game',
	SCORE_PHASE = 'score'
}

type Player = {
	id: string;
	username: string;
	deck: Array<Card>;
	hand: Array<Card>;
	hasPlayedCard: boolean;
	score?: number;
	status: 'player' | 'bot';
}

type RoomState = {
	phase: GamePhase,
	round: any, // set after draft
	cardpool: any,
	playerDecks: any,
	draftpool: any,
	customers: Array<any>,
	activePlayer: User,
	players: Array<Player>,
	playedCards: Array<Card>,
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
	budget: number,
	id: number,
	playedBy: string,
}

export {
	Room,
	User,
	Customer,
	Card,
	GamePhase,
	Player,
};