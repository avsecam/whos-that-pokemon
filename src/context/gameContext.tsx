import { createContext, useEffect, useState } from "react";
import { generationsAreSaved, saveGenerationData } from "../api/generations";
import { convertToReadable, getRandomPokemon, PokemonData } from "../api/pokemon";
import { getRandomFromArray } from "../utils/utils";


// REMEMBER: After setting generation or when opening app, fetch pokemon list. Maybe save to cache

const NUMBER_OF_CHOICES: number = 4
export const MAX_LIVES: number = 3

type Choices = [string, string, string, string]

type GameState = {
	pokemon?: PokemonData,
	choices?: Choices,
	choice?: string,
	score?: number,
	lives?: number, // TODO: Add functionality
}

type GameContext = {
	gameState: GameState,
	generations: string[], // Which generations to pick from. IDs
	toggleGeneration: (id: string) => void,
	resetPokemonAndChoices: () => void,
	choose: (choice: string) => void,
	isGameOver: () => boolean,
}

export const GameContext = createContext({} as GameContext)

export function GameProvider({ children }: { children: JSX.Element }) {
	const [gameState, setGameState] = useState<GameState>({ lives: 3 })
	const [generations, setGenerations] = useState<string[]>([])

	useEffect(() => {
		// Load pokemon and choices
		(async () => {
			if (!await generationsAreSaved()) {
				saveGenerationData()
			}
		})()

		if (generations.length <= 0) {
			toggleGeneration("generation-i") // TODO: Figure out how to default this
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
		setGameState({ score: gameState.score, lives: gameState.lives })
		const pokemonData: PokemonData = await getRandomPokemon(getRandomFromArray<string>(generations)) as PokemonData
		const correctChoiceIndex: number = Number.parseInt((Math.random() * (NUMBER_OF_CHOICES - 1)).toFixed(0))

		let choices: Choices = [
			(await getRandomPokemon(getRandomFromArray<string>(generations)) as PokemonData).name,
			(await getRandomPokemon(getRandomFromArray<string>(generations)) as PokemonData).name,
			(await getRandomPokemon(getRandomFromArray<string>(generations)) as PokemonData).name,
			(await getRandomPokemon(getRandomFromArray<string>(generations)) as PokemonData).name,
		]
		choices[correctChoiceIndex] = pokemonData.name

		let choicesUnique: Set<string> = new Set(choices)
		if (choicesUnique.size !== NUMBER_OF_CHOICES) {
			while (choicesUnique.size !== NUMBER_OF_CHOICES) {
				choicesUnique.add((await getRandomPokemon(getRandomFromArray<string>(generations)) as PokemonData).name)
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

	// Add / remove generation
	function toggleGeneration(id: string) {
		if (!generations) {
			setGenerations([id])
			return
		}

		let newGenerations: string[] = []
		const existingGeneration: string | undefined = generations.find(val => val === id)

		// If it exists, filter it out. Else, add it
		newGenerations = (existingGeneration) ? generations.filter(val => val !== id) : [...generations, id]

		setGenerations(newGenerations)
	}

	function choose(choice: string) {
		const choiceLowercase: string = choice.toLowerCase()
		const isCorrect: boolean = (choiceLowercase === gameState.pokemon?.name)

		setGameState((prevState) => {
			return {
				...gameState,
				choice: choiceLowercase,
				score: isCorrect ? (prevState.score ?? 0) + 1 : prevState.score,
				lives: isCorrect ? gameState.lives : (gameState.lives ?? 0) - 1
			}
		})
	}

	function isGameOver() {
		return (gameState.lives ?? 0) <= 0
	}

	return (
		<GameContext.Provider value={{
			gameState,
			generations,
			toggleGeneration,
			resetPokemonAndChoices,
			choose,
			isGameOver,
		}}>
			{children}
		</GameContext.Provider>
	)
}