function getRandomNumber(max) {
	return Math.floor(Math.random() * max);
}

function getMove(hand, customer) {
	const $getScore = (card, index, preset = '', preValue = 0) => {
		const usedCards = preset.split('');
		if(usedCards.indexOf(index.toString()) >= 0) {
			return null;
		} 
		let score = preValue + card.cost;
		if(score > customer.budget) score = customer.budget - score;
		return {[`${preset}${index}`]: score };
	};

	const $getLevelScores = (preset = '', preValue = 0) => {
		let levelScores = hand.reduce(((acc, cur, index) => {
			return acc = {...acc, ...$getScore(cur, index, preset, preValue)};
		}), {});
		Object.entries(levelScores).map(([preset, score]) => {
			if(score > 0) {
				levelScores = {...levelScores, ...$getLevelScores(preset, score)};
			}
		});
		return levelScores;
	};

	const levelScores = $getLevelScores();
	let bestScore = -99999;
	let bestScoreIndex = '0';
	Object.entries(levelScores).map(([preset, score]) => {
		if(score > bestScore) {
			bestScore = score;
			bestScoreIndex = preset;
		}
	});

	const bestHand = bestScoreIndex.split('').map((i) => {
		return hand[i];
	});

	return bestHand;
}

function getHand(player) {
	const HAND_SIZE = 4;
	let hand = [];
	let deck = [...player.deck];
	const handSize = Math.min(HAND_SIZE, deck.length);
	while (hand.length < handSize) {
		hand = [...new Set(Array(handSize)
			.fill(null)
			.map(() => player.deck[getRandomNumber(deck.length)]))];
	}
	deck = deck.filter((card) => { return !(hand.find((card2) => card2.id === card.id)); });
	return {
		...player,
		hand,
		deck,
		hasPlayedCard: false,
	};
}

module.exports = {
	getRandomNumber,
	getMove,
	getHand,
};