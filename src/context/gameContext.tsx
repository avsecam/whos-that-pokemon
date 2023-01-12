import { createContext, useEffect, useState } from "react";
import { generationsAreSaved, saveGenerationData } from "../api/generations";
import { convertToReadable, getRandomPokemon, PokemonData } from "../api/pokemon";
import { getRandomFromArray } from "../utils/utils";


// REMEMBER: After setting generation or when opening app, fetch pokemon list. Maybe save to cache

const NUMBER_OF_CHOICES: number = 4

type Choices = [string, string, string, string]

type GameState = {
	pokemon?: PokemonData,
	choices?: Choices,
	choice?: string,
	score?: number,
}

type GameContext = {
	gameState: GameState,
	generations: string[], // Which generations to pick from. IDs
	addGeneration: (id: string) => void,
	removeGeneration: (id: string) => void,
	resetPokemonAndChoices: () => void,
	choose: (choice: string) => void,
}

export const GameContext = createContext({} as GameContext)

export function GameProvider({ children }: { children: JSX.Element }) {
	const [gameState, setGameState] = useState<GameState>({})
	const [generations, setGenerations] = useState<string[]>([])

	useEffect(() => {
		// Load pokemon and choices
		(async () => {
			if (!await generationsAreSaved()) {
				saveGenerationData()
			}
		})()

		if (generations.length <= 0) {
			addGeneration("generation-i") // TODO: Figure out how to default this
		}
	}, [])

	useEffect(() => { // Fetch data for first pokemon question
		if (generations.length > 0) {
			if (!gameState.pokemon || !gameState.choices) {
				resetPokemonAndChoices()
			}
		}
		console.log(generations)
	}, [generations])

	useEffect(() => {
		if (gameState.choice) {
			setTimeout(() => {
				resetPokemonAndChoices()
			}, 1000)
		}
	}, [gameState.choice])

	async function resetPokemonAndChoices() {
		async function getRandomPokemonFromChosenGenerations() {
			return await getRandomPokemon(getRandomFromArray<string>(generations)) as PokemonData
		}

		setGameState({ score: gameState.score })
		const pokemonData: PokemonData = await getRandomPokemon(getRandomFromArray<string>(generations)) as PokemonData
		const correctChoiceIndex: number = Number.parseInt((Math.random() * (NUMBER_OF_CHOICES - 1)).toFixed(0))

		const test = (await getRandomPokemonFromChosenGenerations()).name

		let choices: Choices = [
			(await getRandomPokemonFromChosenGenerations()).name,
			(await getRandomPokemonFromChosenGenerations()).name,
			(await getRandomPokemonFromChosenGenerations()).name,
			(await getRandomPokemonFromChosenGenerations()).name,
		]
		choices[correctChoiceIndex] = pokemonData.name

		let choicesUnique: Set<string> = new Set(choices)
		if (choicesUnique.size !== NUMBER_OF_CHOICES) {
			while (choicesUnique.size !== NUMBER_OF_CHOICES) {
				choicesUnique.add((await getRandomPokemonFromChosenGenerations()).name)
			}

			const choicesUniqueArray: Array<string> = Array.from(choicesUnique)
			choices = choicesUniqueArray.map(choice => choice) as Choices
		}

		choices = choices.map(choice => convertToReadable(choice)) as Choices

		setGameState({
			...gameState,
			pokemon: pokemonData,
			choices,
			choice: undefined,
		})
	}

	// Add generation if it isn't in the array yet
	function addGeneration(id: string) {
		let newGenerations: string[] = []
		if (generations !== undefined) {
			newGenerations = (generations.find(val => val === id)) ? generations : [...generations, id]
		} else {
			newGenerations = [id]
		}
		setGenerations(newGenerations)
	}

	function removeGeneration(id: string) {
		if (generations === undefined) return
		setGenerations(generations.filter(val => val !== id))
	}

	function choose(choice: string) {
		const choiceLowercase: string = choice.toLowerCase()

		setGameState((prevState) => {
			return {
				...gameState,
				choice: choiceLowercase,
				score: (choiceLowercase === gameState.pokemon?.name) ? (prevState.score ?? 0) + 1 : prevState.score,
			}
		})
	}

	return (
		<GameContext.Provider value={{ gameState, generations, addGeneration, removeGeneration, resetPokemonAndChoices, choose }}>
			{children}
		</GameContext.Provider>
	)
}