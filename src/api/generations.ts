import AsyncStorage from "@react-native-async-storage/async-storage"

export type LinkData = {
	id?: string,
	name: string,
	url: string,
}

export type GenerationData = {
	id: string,
	name: string,
	pokemonSpecies: LinkData[],
}

const GENERATION_NAME_PATTERN: RegExp = /generation-[a-z]*/

export async function generationsAreSaved() {
	let generationsAreSaved: boolean = true
	const generations: LinkData[] = await getGenerations()
	for (var i = 0; i < generations.length; ++i) {
		if (await AsyncStorage.getItem(generations[i].name) === null) {
			generationsAreSaved = false
			break
		}
	}
	return generationsAreSaved
}

// Save all generations to AsyncStorage
export async function saveGenerationData() {
	(await getGenerations()).forEach(async gen => {
		const generation: GenerationData = await fetch(gen.url)
			.then(res => res.json())
			.then(data => {
				const generationData: GenerationData = {
					id: data.id,
					name: data.name,
					pokemonSpecies: data.pokemon_species
				}
				return generationData
			})

		// Save to AsyncStorage
		await AsyncStorage.setItem(gen.name, JSON.stringify(generation))
	})
	console.log("Generation Data Saved")
}

export async function getGenerationNames() {
	return (await AsyncStorage.getAllKeys()).filter(key => GENERATION_NAME_PATTERN.test(key))
}

export async function getGenerations() {
	const generations = await fetch("https://pokeapi.co/api/v2/generation/")
		.then(res => res.json())
		.then(data => (data.results as LinkData[]))

	return generations
}

// Get any generation from ALL of the generations
export async function getRandomGeneration() {
	const generationKeys: string[] = await getGenerationNames()
	const randomGenerationKey: number = Number.parseInt((Math.random() * (generationKeys.length - 1)).toFixed(0))
	const randomGeneration: GenerationData = JSON.parse(await AsyncStorage.getItem(generationKeys[randomGenerationKey]) ?? "{}")

	return randomGeneration.name
}

export function formatGenerationName(name: string) {
	let formattedName: string[] = [...name]
	formattedName[0] = formattedName[0].toUpperCase()

	const hyphenIndex: number | undefined = formattedName.findIndex(val => val === "-")
	if (hyphenIndex) {
		formattedName[hyphenIndex] = " "
		formattedName = formattedName.map((char, idx) => {
			if (idx > hyphenIndex) return char.toUpperCase()
			return char
		})
	}
	return formattedName.join('')
}