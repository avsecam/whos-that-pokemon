export function capitalizeFirstLetter(str: string) {
	const strArray: string[] = [...str]
	strArray[0] = strArray[0].toUpperCase()
	return strArray.join("")
}

export function getRandomFromArray<T>(arr: Array<T>) {
	if (arr.length <= 0) return arr[0]
	const randomNumber: number = Number.parseInt((Math.random() * (arr.length - 1)).toFixed(0))

	return arr[randomNumber]
}