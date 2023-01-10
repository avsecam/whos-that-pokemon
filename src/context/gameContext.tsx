import { createContext, useEffect, useState } from "react";
import { generationsAreSaved, saveGenerationData } from "../api/generations";
import { getRandomPokemon, PokemonData } from "../api/pokemon";


// REMEMBER: After setting generation or when opening app, fetch pokemon list. Maybe save to cache


type GameState = {
	pokemon?: PokemonData,
	choices?: [string, string, string, string],
	choice?: string,
}

type GameContext = {
	gameState: GameState,
	generations: string[], // Which generations to pick from. IDs
	addGeneration: (id: string) => void,
	removeGeneration: (id: string) => void,
	setPokemon: (pokemon: PokemonData) => void,
	choose: (choice: string) => boolean, // true iff correct
}

export const GameContext = createContext({} as GameContext)

export function GameProvider({ children }: { children: JSX.Element }) {
	const [gameState, setGameState] = useState<GameState>({})

	const [generations, setGenerations] = useState<string[]>([])

	useEffect(() => {
		console.log(generations)
	}, [generations])

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

		if (!gameState.pokemon || !gameState.choices) {
			getRandomPokemon()
		}
	}, [])

	function setPokemon(pokemon: PokemonData) {

	}

	function addGeneration(id: string) { // Add generation if it isn't in the array yet
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
		setGenerations(generations.filter(val => val === id))
	}

	function choose(choice: string) {
		const choiceLowercase: string = choice.toLowerCase()
		setGameState({
			...gameState,
			choice: choiceLowercase
		})
		return (choiceLowercase === gameState.pokemon?.name)
	}

	return (
		<GameContext.Provider value={{ gameState, generations, addGeneration, removeGeneration, setPokemon, choose }}>
			{children}
		</GameContext.Provider>
	)
}