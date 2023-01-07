export const level = {
	LEVEL_1: 'Tích cực',
	LEVEL_2: 'Nhiệt tình',
	LEVEL_3: 'Năng động',
}

export const convertLevel = (point) => {
	if (point <= 3) {
		return level.LEVEL_1
	}
	if (point > 10) {
		return level.LEVEL_2
	}
	return level.LEVEL_3
}