import AsyncStorage from "@react-native-async-storage/async-storage"

export type LinkData = {
	id?: string,
	name: string,
	url: string,
}

type GenerationData = {
	id: string,
	name: string,
	pokemon: LinkData[],
}

export async function getGenerations() {
	const generationLinks: LinkData[] = await fetch("https://pokeapi.co/api/v2/generation/")
		.then(res => res.json())
		.then(data => (data.results as LinkData[]))

	return generationLinks
}

export async function saveGenerationData() {
	(await getGenerations()).forEach(async gen => {
		const generation: GenerationData = await fetch(gen.url)
			.then(res => res.json())
			.then(data => {
				const generationData: GenerationData = {
					id: data.id,
					name: data.name,
					pokemon: data.pokemon_species
				}
				return generationData
			})

		// Save to AsyncStorage
		await AsyncStorage.setItem(gen.name, JSON.stringify(generation))
	})
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