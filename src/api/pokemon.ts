import AsyncStorage from "@react-native-async-storage/async-storage";
import { capitalizeFirstLetter } from "../utils/utils";
import { GenerationData, LinkData } from "./generations";


export type PokemonSpeciesData = {
	id: number,
	name: string,
	defaultVariety: PokemonVarietyData,
}

export type PokemonVarietyData = {
	isDefault: boolean,
	pokemon: LinkData,
}

export type PokemonData = {
	name: string,
	spriteUrl: string,
}

// Gets a random pokemon from a generation
export async function getRandomPokemon(genName: string) {
	function findDefaultVariety(varieties: PokemonVarietyData[]) {
		return varieties.find(variety => variety.isDefault) ?? varieties[0]
	}

	try {
		const generationDataAsString: string | null = await AsyncStorage.getItem(genName)
		if (generationDataAsString) {
			const generationData: GenerationData = JSON.parse(generationDataAsString)
			const randomIndex: number = Number.parseInt((Math.random() * (generationData.pokemonSpecies.length - 1)).toFixed(0))
			const randomPokemonSpecies: PokemonSpeciesData = await fetch(generationData.pokemonSpecies[randomIndex].url)
				.then(res => res.json())
				.then(data => {
					return {
						id: data.id,
						name: data.name,
						defaultVariety: findDefaultVariety(data.varieties)
					}
				})
			const randomPokemon: PokemonData = await fetch(randomPokemonSpecies.defaultVariety.pokemon.url)
				.then(res => res.json())
				.then(data => {
					return {
						name: randomPokemonSpecies.name,
						spriteUrl: data.sprites.front_default
					}
				})
			return {
				name: randomPokemonSpecies.name,
				spriteUrl: randomPokemon.spriteUrl,
			} as PokemonData
		}
	} catch(e) {
		console.error(e)
	}
}

export function convertToReadable(pokemonName: string) {
	const specialNames: [string, string][] = [
		// [API name, Formatted name]
		["ho-oh", "Ho-Oh"],
		["mime-jr", "Mime Jr."],
		["mr-mime", "Mr. Mime"],
		["mr-rime", "Mr. Rime"],
		["nidoran-f", "Nidoran-F"],
		["nidoran-m", "Nidoran-M"],
		["porygon-z", "Porygon-Z"],
		["type-null", "Type: Null"],
		["tapu-koko", "Tapu Koko"],
		["tapu-lele", "Tapu Lele"],
		["tapu-bulu", "Tapu Bulu"],
		["tapu-fini", "Tapu Fini"],
	]

	let readableName: string = pokemonName

	const specialName: [string, string] | undefined = specialNames.find(tuple => tuple[0] === readableName)
	if (specialName) readableName = specialName[1]
	
	return capitalizeFirstLetter(readableName)
}