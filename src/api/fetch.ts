import AsyncStorage from "@react-native-async-storage/async-storage"

type LinkData = {
	name: string,
	url: string,
}

type GenerationData = {
	name: string,
	pokemon: LinkData[],
}

export async function getGenerations() {
	const generationLinks: LinkData[] = await fetch("https://pokeapi.co/api/v2/generation/")
		.then(res => res.json())
		.then(data => (data.results as LinkData[]))

	// const generations: object[]
	generationLinks.forEach(async gen => {
		const generation: GenerationData = await fetch(gen.url)
			.then(res => res.json())

		// Save to AsyncStorage
		await AsyncStorage.setItem(gen.name, JSON.stringify(generation))
	})

	return -1
}