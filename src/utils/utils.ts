export function capitalizeFirstLetter(str: string) {
	const strArray: string[] = [...str]
	strArray[0] = strArray[0].toUpperCase()
	return strArray.join("")
}